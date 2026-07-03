import { Resend } from "resend";
import { LIMITS } from "@/lib/contact";

const RECIPIENT = process.env.CONTACT_RECIPIENT ?? "eszterbary@szedercoaching.at";
const FROM = process.env.CONTACT_FROM ?? "Szeder Coaching Website <formular@szedercoaching.at>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort throttle: state lives per warm serverless instance (resets on
// cold start, not shared across instances) — a courtesy brake against form
// spam, not a security boundary.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function throttled(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  const blocked = recent.length >= MAX_PER_WINDOW;
  if (!blocked) recent.push(now);
  hits.set(ip, recent);
  return blocked;
}

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

type Mail = { subject: string; text: string; replyTo?: string };

function buildMail(body: Record<string, unknown>): Mail | null {
  const name = str(body.name);
  if (!name || name.length > LIMITS.name) return null;
  // Line breaks stripped so user input cannot smuggle extra mail headers via the subject.
  const safeName = name.replace(/[\r\n]+/g, " ");

  if (body.type === "kontakt") {
    const email = str(body.email);
    const message = str(body.message);
    if (!email || email.length > LIMITS.email || !EMAIL_RE.test(email)) return null;
    if (!message || message.length > LIMITS.message) return null;
    return {
      subject: `Anfrage von ${safeName}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
      replyTo: email,
    };
  }

  if (body.type === "erfahrung") {
    const feedback = str(body.feedback);
    if (!feedback || feedback.length > LIMITS.message) return null;
    return {
      subject: `Erfahrung mit Szeder Coaching – ${safeName}`,
      text: `Name: ${name}\n\n${feedback}`,
    };
  }

  return null;
}

export async function POST(request: Request) {
  if (Number(request.headers.get("content-length")) > 20_000) {
    return Response.json({ error: "Anfrage zu groß." }, { status: 413 });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
    if (typeof body !== "object" || body === null) throw new Error("not an object");
  } catch {
    return Response.json({ error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot filled in → pretend success so bots don't adapt.
  if (str(body.company) !== "") {
    return Response.json({ ok: true });
  }

  const mail = buildMail(body);
  if (!mail) {
    return Response.json({ error: "Bitte überprüfen Sie Ihre Eingaben." }, { status: 400 });
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (throttled(ip)) {
    return Response.json(
      { error: "Zu viele Anfragen. Bitte versuchen Sie es später erneut." },
      { status: 429 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[api/contact] RESEND_API_KEY fehlt – E-Mail wird nur geloggt:", mail);
      return Response.json({ ok: true });
    }
    return Response.json(
      { error: "Der E-Mail-Versand ist derzeit nicht verfügbar." },
      { status: 503 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: FROM,
      to: RECIPIENT,
      subject: mail.subject,
      text: mail.text,
      ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
    });
    if (error) {
      console.error("[api/contact] Resend error:", error);
      return Response.json(
        { error: "Die E-Mail konnte nicht gesendet werden." },
        { status: 502 }
      );
    }
  } catch (err) {
    console.error("[api/contact] send failed:", err);
    return Response.json(
      { error: "Die E-Mail konnte nicht gesendet werden." },
      { status: 500 }
    );
  }

  return Response.json({ ok: true });
}
