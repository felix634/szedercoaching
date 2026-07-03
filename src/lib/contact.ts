/**
 * Shared contract between the contact/feedback forms (src/app/page.tsx)
 * and the /api/contact route handler, so client maxLength attributes and
 * server-side validation cannot drift apart.
 */
export const LIMITS = {
  name: 200,
  email: 254,
  message: 5000,
} as const;

/** `company` is a honeypot field: hidden from humans, bots fill it in. */
export type ContactPayload =
  | {
      type: "kontakt";
      name: string;
      email: string;
      message: string;
      company?: string;
    }
  | {
      type: "erfahrung";
      name: string;
      feedback: string;
      company?: string;
    };
