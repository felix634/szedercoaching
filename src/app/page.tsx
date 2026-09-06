"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Bubbles from "@/components/Bubbles";
import WaveDivider from "@/components/WaveDivider";
import AnimatedSection from "@/components/AnimatedSection";
import WaterSurface from "@/components/WaterSurface";
import Marquee from "@/components/Marquee";
import WaterCard from "@/components/WaterCard";
import ImageCarousel from "@/components/ImageCarousel";
import { LIMITS, type ContactPayload } from "@/lib/contact";

/* Angebote data is inline in the bento grid below */

const galleryGroups = [
  {
    title: "Erste Schritte",
    images: [
      "/images/kind1/one.jpg",
      "/images/kind1/two.jpg",
      "/images/kind1/three.jpg",
      "/images/kind1/four.jpg",
      "/images/kind1/five.jpg",
      "/images/kind1/six.jpg",
      "/images/kind1/seven.jpg",
      "/images/kind1/eight.jpg",
    ],
  },
  {
    title: "Vertrauen wächst",
    images: ["/images/kind2/1.jpg"],
  },
  {
    title: "Freude am Wasser",
    images: [
      "/images/kind3/1.jpg",
      "/images/kind3/2.jpg",
      "/images/kind3/3.jpg",
      "/images/levi/1.jpg",
      "/images/levi/2.jpg",
      "/images/levi/3.jpg",
      "/images/levi/4.jpg",
      "/images/levi/5.jpg",
      "/images/levi/6.jpg",
      "/images/levi/7.jpg",
      "/images/levi/8.jpg",
      "/images/levi/9.jpg",
      "/images/levi/10.jpg",
      "/images/levi/11.jpg",
      "/images/levi/12.jpg",
      "/images/levi/13.jpg",
      "/images/levi/14.jpg",
    ],
  },
  {
    title: "Sicher schwimmen",
    images: [
      "/images/kind5/1.png",
      "/images/kind5/2.png",
      "/images/kind5/3.jpg",
      "/images/alex/1.jpg",
      "/images/alex/2.jpg",
      "/images/alex/3.jpg",
      "/images/alex/4.jpg",
    ],
  },
  {
    title: "Mit Herz begleitet",
    images: [
      "/images/kind6/1.jpg",
      "/images/kind6/2.jpg",
      "/images/simon-anna/1.jpg",
      "/images/simon-anna/2.jpg",
      "/images/simon-anna/3.jpg",
      "/images/simon-anna/4.jpg",
      "/images/simon-anna/5.jpg",
      "/images/simon-anna/6.jpg",
      "/images/simon-anna/7.jpg",
    ],
  },
  {
    title: "Über sich hinauswachsen",
    images: [
      "/images/kind7/1.jpg",
      "/images/kind7/2.jpg",
      "/images/kind7/3.jpg",
      "/images/kind7/4.jpg",
      "/images/kind7/5.jpg",
      "/images/kind7/6.jpg",
      "/images/kind7/7.jpg",
      "/images/kind7/8.jpg",
    ],
  },
];

const testimonials = [
  {
    paragraphs: [
      "Liebe Eszter, vielen Dank für diese wunderbare Entwicklung, die Anna während der Schwimmstunden dank deines Wissens und deiner Unterstützung gemacht hat!",
      "Anna kann mit Misserfolgen nur schwer umgehen – das konntest du ja selbst erleben. Trotzdem hat sie sich immer auf die Freitage gefreut und deine Stunden sehr geliebt.",
      "Noch einmal von Herzen: Danke für alles! Mit Annas Worten möchte ich mich verabschieden. Nach der heutigen letzten Stunde sagte sie auf dem Weg aus dem Schwimmbad:",
    ],
    highlight: "„Ich möchte später einmal bei den Olympischen Spielen schwimmen!“",
    author: "Anna und Kitti",
    role: "Schwimmschülerin & Mama",
  },
  {
    paragraphs: [
      "Wir sind noch immer sehr begeistert und dankbar, dass es dieses Angebot gibt. Ich habe lange einen passenden Schwimmkurs für meinen Sohn mit Behinderung gesucht und haben letztendlich Eszter gefunden! Mein Sohn liebt sie und die Schwimmeinheit ist das Highlight seiner Woche.",
      "Vielen Dank Eszter, durch deine ruhige und liebevolle Art konntest du schnell Vertrauen aufbauen. Du erkennst die Bedürfnisse der Kinder und bist so flexibel, dass dein Coaching immer abwechslungsreich und lustig, aber trotzdem klar und strukturiert ist. Levi profitiert sehr davon und hat schon sehr viele Fortschritte gemacht.",
      "Ich empfehle das Szeder Coaching auf jeden Fall weiter, da es viel mehr als schwimmen ist! Mein Kind gewinnt an Selbstvertrauen, Sicherheit, Konzentration und Motivation und der Stolz in seinen Augen ist unbezahlbar. ❤",
    ],
    highlight: "„Wir freuen uns auf viele weitere Einheiten mit dir!“",
    author: "Levi und Nicole",
    role: "Schwimmschüler & Mama",
  },
  {
    paragraphs: [
      "Unser Sohn hat große Unsicherheit im Wasser und insbesondere Angst davor, den Kopf unterzutauchen.",
      "Eszter hat ihn von Anfang an unglaublich herzlich und einfühlsam begleitet und schon beim Betreten des Bades dafür gesorgt, dass er sich wohlfühlt. Sie geht auf ihn und sein Tempo ein – ohne Druck, mit viel Geduld und positiver Motivation.",
      "Heute geht er richtig gerne zum Schwimmen und freut sich auf jede Stunde. Es ist eine große Erleichterung zu sehen, wie er von Mal zu Mal sicherer und unbeschwerter im Wasser wird.",
    ],
    highlight:
      "„Eszters einfühlsame Art und ihr Gespür für Kinder machen für uns den ganz besonderen Unterschied – und auch unsere jüngere Tochter geht inzwischen schwimmen bei ihr.“ 😊",
    author: "Simon und Christina",
    role: "Schwimmschüler & Mama",
  },
];

const stats = [
  { value: "100%", label: "Individuell" },
  { value: "1:1", label: "Betreuung" },
  { value: "∞", label: "Geduld" },
  { value: "♡", label: "Mit Herz" },
];

type FormStatus = "idle" | "sending" | "success" | "error";

async function submitForm(
  payload: ContactPayload,
  setStatus: (status: FormStatus) => void,
  form: HTMLFormElement
) {
  setStatus("sending");
  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    form.reset();
    setStatus("success");
  } catch {
    setStatus("error");
  }
}

export default function Home() {
  const [contactStatus, setContactStatus] = useState<FormStatus>("idle");
  const [feedbackStatus, setFeedbackStatus] = useState<FormStatus>("idle");
  const reduce = useReducedMotion();

  return (
    <main className="relative overflow-hidden">
      <Bubbles count={10} />
      <Navbar />

      {/* ===== HERO ===== */}
      <section
        id="start"
        className="relative min-h-screen flex items-center justify-center noise-overlay"
      >
        <div className="absolute inset-0">
          <Image
            src="/images/hero-20260830.jpg"
            alt="Ruhige Wasseroberfläche – Schwimmcoaching mit Herz bei Szeder Coaching"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-water-950/70 via-water-950/50 to-water-950" />
          <div className="absolute inset-0 water-caustics opacity-40" />
        </div>

        <WaterSurface />

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20 pb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <Image
              src="/images/logo.png"
              alt="Szeder Coaching Logo"
              width={224}
              height={224}
              sizes="(max-width: 768px) 128px, 224px"
              priority
              className="mx-auto mb-10 rounded-full w-32 h-32 md:w-56 md:h-56 shadow-2xl shadow-water-500/20"
            />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="section-subtitle text-water-400 mb-6"
          >
            Schwimmcoaching mit Herz
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tight"
          >
            <span className="text-cream">Vertrauen lernen.</span>
            <br />
            <span className="gradient-text">Freiheit erleben.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-cream/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Ängste überwinden und die Freude am Schwimmen entdecken —
            für Kinder und Erwachsene mit besonderen Bedürfnissen.
          </motion.p>

        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-cream/30">Scrollen</span>
          <motion.div
            animate={reduce ? undefined : { y: [0, 8, 0] }}
            transition={reduce ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="w-5 h-5 text-cream/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* ===== MARQUEE ===== */}
      <Marquee />

      {/* ===== SZEDER STORY ===== */}
      <section id="geschichte" className="relative py-24 md:py-36 bg-water-950 noise-overlay">
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-subtitle text-water-500 mb-4 text-center">Die Geschichte</p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-center text-cream mb-16 leading-tight">
              Inspiriert von <span className="gradient-text italic">Szeder</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <AnimatedSection delay={0.1} direction="left">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-water-500/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/szedi.jpg"
                    alt="Szeder – die gerettete Labrador-Hündin, die ihre Angst vor dem Wasser überwand"
                    width={600}
                    height={600}
                    sizes="(max-width: 768px) 100vw, 45vw"
                    className="w-full object-cover aspect-square transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-water-950/60 to-transparent" />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2} direction="right">
              <div className="space-y-6">
                <blockquote className="font-heading text-2xl md:text-3xl italic text-cream/90 leading-relaxed border-l-2 border-water-500 pl-6">
                  &ldquo;Aus Unsicherheit wurde Freude – und schließlich eine sichere, starke Schwimmerin.&rdquo;
                </blockquote>
                <div className="space-y-4 text-cream/50 text-base leading-relaxed pl-6">
                  <p>
                    Szeder war meine geliebte Labrador-Hündin, die ich aus dem Tierheim gerettet habe.
                    Obwohl sie ein Wasserhund war, hatte sie große Angst vor dem Wasser.
                  </p>
                  <p>
                    Mit Geduld, Vertrauen und einfühlsamer Begleitung habe ich ihr geholfen,
                    diese Angst Schritt für Schritt zu überwinden.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section className="relative py-16 bg-water-900/40 border-y border-water-800/20 noise-overlay">
        <div className="relative z-10 max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <AnimatedSection key={stat.label} delay={i * 0.1}>
                <div className="text-center">
                  <p className="font-heading text-4xl md:text-5xl font-bold gradient-text mb-2">
                    {stat.value}
                  </p>
                  <p className="text-cream/40 text-sm tracking-wide uppercase">
                    {stat.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ÜBER MICH ===== */}
      <section id="über-mich" className="relative py-24 md:py-36 bg-water-950 noise-overlay">
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-subtitle text-water-500 mb-4 text-center">Schwimmcoach</p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-center text-cream mb-16">
              Über <span className="gradient-text">mich</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-5 gap-12 md:gap-16 items-center">
            <AnimatedSection delay={0.1} direction="left" className="md:col-span-2">
              <div className="relative group">
                <div className="absolute -inset-3 bg-gradient-to-br from-water-400/15 via-water-600/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="relative overflow-hidden rounded-2xl border border-water-800/30">
                  <Image
                    src="/images/coach_photo.jpg"
                    alt="Eszter Bary – Schwimmcoach"
                    width={500}
                    height={650}
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="w-full object-cover aspect-[3/4] transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-water-950/80 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="font-heading text-xl font-semibold text-cream">Eszter Bary</p>
                    <p className="text-water-400 text-sm">Schwimmcoach & Gründerin</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.3} direction="right" className="md:col-span-3">
              <div className="space-y-6">
                <h3 className="font-heading text-2xl md:text-3xl font-semibold text-cream animated-underline inline-block pb-2">
                  Meine Mission
                </h3>
                <div className="space-y-5 text-cream/50 text-base md:text-lg leading-relaxed">
                  <p>
                    Szeder war meine geliebte Labrador-Hündin, die ich aus dem Tierheim gerettet habe.
                    Obwohl sie ein Wasserhund war, hatte sie große Angst vor dem Wasser.
                  </p>
                  <p>
                    Mit Geduld, Vertrauen und einfühlsamer Begleitung habe ich ihr geholfen,
                    diese Angst Schritt für Schritt zu überwinden. Aus Unsicherheit wurde Freude –
                    und schließlich eine sichere, starke Schwimmerin.
                  </p>
                  <p className="text-cream/70 font-medium">
                    Diese Erfahrung prägt meine Arbeit bis heute: Ich begleite Menschen jeden Alters - auch mit besonderen Bedürfnissen - einfühlsam dabei, Vertrauen aufzubauen, Ängste zu überwinden und sich im Wasser sicher und frei zu fühlen.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3 pt-4">
                  {["Einfühlsam", "Geduldig", "Professionell", "Inklusiv"].map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 rounded-full bg-water-500/10 border border-water-500/20 text-water-400 text-xs tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== ANGEBOTE ===== */}
      <WaveDivider colorFrom="#0c1a35" colorTo="#172e59" />
      <section id="angebote" className="relative bg-water-900 py-24 md:py-36 noise-overlay">
        <div className="absolute inset-0 water-caustics opacity-15" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-subtitle text-water-400 mb-4 text-center">Was ich anbiete</p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-center text-cream mb-6">
              Meine <span className="gradient-text">Angebote</span>
            </h2>
            <p className="text-center text-cream/40 text-base md:text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
              Jeder Mensch verdient es, sich im Wasser sicher zu fühlen.
              Meine Angebote sind individuell auf Ihre Bedürfnisse abgestimmt.
            </p>
          </AnimatedSection>

          {/* === BENTO GRID === */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

            {/* ROW 1: Hero card (wide) + stacked pair */}
            <AnimatedSection delay={0.05} className="md:col-span-7">
              <WaterCard className="glass-card h-full group">
                <div className="relative p-8 md:p-10 h-full flex flex-col justify-between min-h-[280px]">
                  <div className="absolute top-6 right-6 md:top-8 md:right-8">
                    <span className="text-[10px] tracking-wider uppercase text-water-950 bg-water-400 px-3 py-1.5 rounded-full font-semibold">
                      Beliebtestes Angebot
                    </span>
                  </div>
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-water-400/15 border border-water-400/25 flex items-center justify-center text-water-300 mb-6 group-hover:bg-water-400/25 transition-all duration-500">
                      <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 01-6.364 0M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
                      </svg>
                    </div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-cream mb-3 group-hover:text-water-200 transition-colors">
                      Angstabbau im Wasser
                    </h3>
                    <p className="text-cream/50 text-base leading-relaxed max-w-md">
                      Sanft und einfühlsam begleitet — für Kinder und Erwachsene,
                      die ihre Angst vor dem Wasser Schritt für Schritt überwinden möchten.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <span className="text-xs text-water-400 bg-water-400/10 px-3 py-1 rounded-full border border-water-400/15">Kinder</span>
                    <span className="text-xs text-water-400 bg-water-400/10 px-3 py-1 rounded-full border border-water-400/15">Erwachsene</span>
                    <span className="text-xs text-water-400 bg-water-400/10 px-3 py-1 rounded-full border border-water-400/15">Alle Level</span>
                  </div>
                </div>
              </WaterCard>
            </AnimatedSection>

            <div className="md:col-span-5 flex flex-col gap-5">
              <AnimatedSection delay={0.1}>
                <WaterCard className="glass-card group">
                  <div className="p-7 flex gap-5 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-water-500/10 border border-water-500/20 flex items-center justify-center text-water-400 flex-shrink-0 group-hover:bg-water-500/20 transition-all duration-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-cream mb-1.5 group-hover:text-water-200 transition-colors">
                        Schwimmen lernen mit Vertrauen
                      </h3>
                      <p className="text-cream/40 text-sm leading-relaxed">
                        Auf Basis von Vertrauen und Sicherheit lernen Sie, sich im Wasser frei zu bewegen.
                      </p>
                    </div>
                  </div>
                </WaterCard>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <WaterCard className="glass-card group">
                  <div className="p-7 flex gap-5 items-start">
                    <div className="w-14 h-14 rounded-2xl bg-water-500/10 border border-water-500/20 flex items-center justify-center text-water-400 flex-shrink-0 group-hover:bg-water-500/20 transition-all duration-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-cream mb-1.5 group-hover:text-water-200 transition-colors">
                        Individuelles Coaching
                      </h3>
                      <p className="text-cream/40 text-sm leading-relaxed">
                        Persönliche 1:1 Betreuung, individuell abgestimmt auf Ihre Situation und Ziele.
                      </p>
                      <span className="inline-block mt-2 text-[10px] tracking-wider uppercase text-water-500 bg-water-500/10 px-3 py-1 rounded-full">1:1</span>
                    </div>
                  </div>
                </WaterCard>
              </AnimatedSection>
            </div>

            {/* ROW 2: Image card + wide feature */}
            <AnimatedSection delay={0.2} className="md:col-span-5">
              <WaterCard className="relative overflow-hidden rounded-2xl group h-full min-h-[260px]" disableWave>
                <Image
                  src="/images/pool.jpg"
                  alt="Wassergewöhnung im Pool – behutsamer Einstieg ins Schwimmen"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-water-950 via-water-950/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-water-950/40 to-transparent" />
                <div className="relative z-20 p-8 flex flex-col justify-end h-full">
                  <span className="text-[10px] tracking-wider uppercase text-water-300 mb-2 font-medium">Einstieg</span>
                  <h3 className="font-heading text-2xl font-bold text-cream mb-2">
                    Wassergewöhnung
                  </h3>
                  <p className="text-cream/60 text-sm leading-relaxed max-w-sm">
                    Spielerisch und behutsam werden Kinder und Erwachsene ans Wasser herangeführt — ohne Druck.
                  </p>
                </div>
              </WaterCard>
            </AnimatedSection>

            <AnimatedSection delay={0.25} className="md:col-span-7">
              <WaterCard className="glass-card h-full group">
                <div className="p-8 md:p-10 h-full flex flex-col justify-between min-h-[260px]">
                  <div className="flex items-start justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-400/20 flex items-center justify-center text-rose-400 group-hover:bg-rose-500/20 transition-all duration-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </div>
                    <span className="text-[10px] tracking-wider uppercase text-rose-400 bg-rose-500/10 px-3 py-1 rounded-full border border-rose-400/15">Sensibel</span>
                  </div>
                  <div>
                    <h3 className="font-heading text-2xl md:text-3xl font-bold text-cream mb-3 group-hover:text-water-200 transition-colors">
                      Trauma-sensibles Coaching
                    </h3>
                    <p className="text-cream/50 text-base leading-relaxed max-w-lg">
                      Mit besonderer Achtsamkeit und professionellem Feingefühl begleite ich Sie
                      durch belastende Erfahrungen mit Wasser. Ihr Tempo, Ihre Grenzen.
                    </p>
                  </div>
                </div>
              </WaterCard>
            </AnimatedSection>

            {/* ROW 3: Three equal cards */}
            <AnimatedSection delay={0.3} className="md:col-span-4">
              <WaterCard className="glass-card h-full group">
                <div className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-water-500/10 border border-water-500/20 flex items-center justify-center text-water-400 mb-5 group-hover:bg-water-500/20 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-cream mb-2 group-hover:text-water-200 transition-colors">
                    Parent Coaching
                  </h3>
                  <p className="text-cream/40 text-sm leading-relaxed">
                    Begleitung für Eltern, die gemeinsam mit ihren Kindern die Freude am Wasser entdecken möchten.
                  </p>
                  <span className="inline-block mt-4 text-[10px] tracking-wider uppercase text-water-500 bg-water-500/10 px-3 py-1 rounded-full">Familie</span>
                </div>
              </WaterCard>
            </AnimatedSection>

            <AnimatedSection delay={0.35} className="md:col-span-4">
              <WaterCard className="glass-card h-full group">
                <div className="p-7">
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-400/20 flex items-center justify-center text-amber-400 mb-5 group-hover:bg-amber-500/20 transition-all duration-300">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-cream mb-2 group-hover:text-water-200 transition-colors">
                    Besondere Bedürfnisse
                  </h3>
                  <p className="text-cream/40 text-sm leading-relaxed">
                    Inklusives Coaching für Menschen mit Behinderung — wertschätzend und auf Augenhöhe.
                  </p>
                  <span className="inline-block mt-4 text-[10px] tracking-wider uppercase text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full">Inklusiv</span>
                </div>
              </WaterCard>
            </AnimatedSection>

            <AnimatedSection delay={0.4} className="md:col-span-4">
              <WaterCard className="relative overflow-hidden rounded-2xl group h-full min-h-[220px]" disableWave>
                <Image
                  src="/images/swimming.jpg"
                  alt="Freude am Schwimmen – Freiheit und Sicherheit im Wasser"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-water-950 via-water-950/60 to-water-950/20" />
                <div className="relative z-20 p-7 flex flex-col justify-end h-full">
                  <h3 className="font-heading text-lg font-bold text-cream mb-1">
                    Freude am Schwimmen
                  </h3>
                  <p className="text-cream/60 text-sm">
                    Entdecken Sie die Freiheit im Wasser.
                  </p>
                  <a href="#kontakt" className="inline-flex items-center gap-2 mt-3 text-water-300 text-sm font-medium hover:text-water-200 transition-colors group/link">
                    Jetzt anfragen
                    <svg className="w-4 h-4 transition-transform group-hover/link:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </WaterCard>
            </AnimatedSection>

          </div>
        </div>
      </section>
      <WaveDivider colorFrom="#172e59" colorTo="#0c1a35" flip />

      {/* ===== PARALLAX QUOTE ===== */}
      <section className="relative py-32 md:py-44 overflow-hidden noise-overlay">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center scale-110"
          style={{ backgroundImage: "url(/images/pool.jpg)" }}
        />
        <div className="absolute inset-0 bg-water-950/75" />
        <div className="absolute inset-0 water-caustics opacity-20" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <AnimatedSection>
            <svg className="w-10 h-10 text-water-500/40 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
            </svg>
            <p className="font-heading text-3xl md:text-5xl font-semibold text-cream leading-tight italic mb-6">
              Inspiriert von Szeder – einer geretteten Labrador-Hündin,
              die ihre Angst vor Wasser überwand.
            </p>
            <p className="text-cream/40 text-base">
              Heute begleite ich Kinder und Erwachsene auf genau diesem Weg.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== GALERIE ===== */}
      <section id="galerie" className="relative py-24 md:py-36 bg-water-950 noise-overlay">
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-subtitle text-water-500 mb-4 text-center">Augenblicke</p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-center text-cream mb-6">
              Momente im <span className="gradient-text">Wasser</span>
            </h2>
            <p className="text-center text-cream/40 text-base md:text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
              Echte Augenblicke aus dem Coaching — blättern Sie durch die Bilder
              und erleben Sie, wie aus Unsicherheit Freude wird.
            </p>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {galleryGroups.map((group, i) => (
              <AnimatedSection key={group.title} delay={i * 0.1}>
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-br from-water-500/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-water-800/30">
                    <ImageCarousel images={group.images} alt={group.title} />
                    <div className="absolute bottom-0 left-0 right-0 z-10 p-6 pointer-events-none">
                      <h3 className="font-heading text-xl md:text-2xl font-semibold text-cream">
                        {group.title}
                      </h3>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ERFAHRUNGEN / FEEDBACK ===== */}
      <WaveDivider colorFrom="#0c1a35" colorTo="#172e59" />
      <section id="erfahrungen" className="relative bg-water-900 py-24 md:py-36 noise-overlay">
        <div className="absolute inset-0 water-caustics opacity-15" />
        <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-subtitle text-water-400 mb-4 text-center">Stimmen</p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-center text-cream mb-6">
              Erfahrungen mit <span className="gradient-text">Szeder Coaching</span>
            </h2>
            <p className="text-center text-cream/40 text-base md:text-lg mb-16 max-w-2xl mx-auto leading-relaxed">
              Echte Rückmeldungen von Familien, die den Weg ins Wasser
              gemeinsam mit mir gegangen sind.
            </p>
          </AnimatedSection>

          {/* Testimonials */}
          <div className="space-y-8 mb-20 md:mb-24">
            {testimonials.map((t, i) => (
              <AnimatedSection key={t.author} delay={0.1 + i * 0.1}>
                <figure className="glass-card rounded-2xl p-8 md:p-12 hover:transform-none relative overflow-hidden">
                  <svg
                    className="absolute top-6 right-8 w-16 h-16 text-water-500/10"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
                  </svg>

                  <div className="flex gap-1 mb-6" role="img" aria-label="Bewertung: 5 von 5 Sternen">
                    {[...Array(5)].map((_, s) => (
                      <svg key={s} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557L3.041 10.385a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                    ))}
                  </div>

                  <blockquote className="space-y-4 text-cream/60 text-base md:text-lg leading-relaxed">
                    {t.paragraphs.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                    <p className="font-heading text-xl md:text-2xl italic text-water-300 pt-2">
                      {t.highlight}
                    </p>
                  </blockquote>

                  <figcaption className="mt-8 flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-water-500/15 border border-water-500/25 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-water-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-cream font-medium">{t.author}</p>
                      <p className="text-water-400/60 text-sm">{t.role}</p>
                    </div>
                  </figcaption>
                </figure>
              </AnimatedSection>
            ))}
          </div>

          {/* Feedback form */}
          <AnimatedSection>
            <h3 className="font-heading text-2xl md:text-3xl font-semibold text-center text-cream mb-4">
              Teilen Sie Ihre <span className="gradient-text">Erfahrung</span>
            </h3>
            <p className="text-center text-cream/40 text-base mb-10 max-w-2xl mx-auto leading-relaxed">
              Sie waren bereits bei mir im Wasser? Ich freue mich sehr über Ihre Rückmeldung —
              teilen Sie Ihre Erfahrung mit mir.
            </p>
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                submitForm(
                  {
                    type: "erfahrung",
                    name: (form.elements.namedItem("feedback-name") as HTMLInputElement).value,
                    feedback: (form.elements.namedItem("feedback-text") as HTMLTextAreaElement).value,
                    company: (form.elements.namedItem("company") as HTMLInputElement).value,
                  },
                  setFeedbackStatus,
                  form
                );
              }}
              className="glass-card rounded-2xl p-8 md:p-10 hover:transform-none"
            >
              <div className="space-y-5">
                <div>
                  <label htmlFor="feedback-name" className="block text-water-400 text-xs tracking-wider uppercase mb-2">Name</label>
                  <input
                    type="text" id="feedback-name" name="feedback-name" required maxLength={LIMITS.name}
                    className="w-full bg-water-950/50 border border-water-800/40 rounded-xl px-5 py-3.5 text-cream placeholder-cream/20 focus:outline-none focus:border-water-500/50 focus:bg-water-950/70 focus-visible:ring-2 focus-visible:ring-water-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-water-950 transition-all text-sm"
                    placeholder="Ihr Name"
                  />
                </div>
                <div>
                  <label htmlFor="feedback-text" className="block text-water-400 text-xs tracking-wider uppercase mb-2">Ihre Erfahrung</label>
                  <textarea
                    id="feedback-text" name="feedback-text" required rows={6} maxLength={LIMITS.message}
                    className="w-full bg-water-950/50 border border-water-800/40 rounded-xl px-5 py-3.5 text-cream placeholder-cream/20 focus:outline-none focus:border-water-500/50 focus:bg-water-950/70 focus-visible:ring-2 focus-visible:ring-water-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-water-950 transition-all resize-none text-sm"
                    placeholder="Erzählen Sie von Ihrer Erfahrung mit Szeder Coaching..."
                  />
                </div>
                {/* Honeypot: offscreen statt sr-only (Screenreader sollen es nicht vorlesen), nicht disabled (Bots überspringen disabled-Felder) */}
                <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
                  <label htmlFor="feedback-company">Firma</label>
                  <input type="text" id="feedback-company" name="company" tabIndex={-1} autoComplete="off" />
                </div>
                <div className="flex items-start gap-3 pt-1">
                  <input
                    type="checkbox" id="feedback-privacy" name="feedback-privacy" required
                    className="mt-0.5 h-4 w-4 flex-shrink-0 accent-water-500"
                  />
                  <label htmlFor="feedback-privacy" className="text-cream/60 text-xs leading-relaxed">
                    Ich habe die{" "}
                    <a href="/datenschutz" className="text-water-300 underline hover:text-water-200 transition-colors">
                      Datenschutzerklärung
                    </a>{" "}
                    gelesen und stimme der Verarbeitung meiner Daten zu.
                  </label>
                </div>
                <button
                  type="submit"
                  disabled={feedbackStatus === "sending"}
                  className="w-full py-4 bg-water-500 hover:bg-water-400 text-white rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-water-500/20 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {feedbackStatus === "sending" ? "Wird gesendet…" : "Erfahrung senden"}
                </button>
                {feedbackStatus === "success" && (
                  <p role="status" className="mt-4 rounded-xl border border-water-500/20 bg-water-500/10 p-4 text-sm text-water-300">
                    Vielen Dank für Ihre Rückmeldung!
                  </p>
                )}
                {feedbackStatus === "error" && (
                  <p role="status" className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                    Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder schreiben Sie direkt an eszterbary@szedercoaching.at.
                  </p>
                )}
              </div>
            </form>
          </AnimatedSection>
        </div>
      </section>
      <WaveDivider colorFrom="#172e59" colorTo="#0c1a35" flip />

      {/* ===== KONTAKT ===== */}
      <section id="kontakt" className="relative py-24 md:py-36 bg-water-950 noise-overlay">
        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <AnimatedSection>
            <p className="section-subtitle text-water-500 mb-4 text-center">Lassen Sie uns sprechen</p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-center text-cream mb-16">
              <span className="gradient-text">Kontakt</span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact info */}
            <AnimatedSection delay={0.1} direction="left">
              <div className="glass-card rounded-2xl p-8 md:p-10 h-full hover:transform-none">
                <h3 className="font-heading text-2xl font-semibold text-cream mb-8 animated-underline inline-block pb-2">
                  Kontaktdaten
                </h3>

                <div className="space-y-6">
                  {[
                    {
                      label: "Name",
                      value: "Eszter Bary",
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                      ),
                    },
                    {
                      label: "Telefon",
                      value: "+43 677 6152 6206",
                      href: "tel:+4367761526206",
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                      ),
                    },
                    {
                      label: "E-Mail",
                      value: "eszterbary@szedercoaching.at",
                      href: "mailto:eszterbary@szedercoaching.at",
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                      ),
                    },
                    {
                      label: "Ort",
                      value: "Nordburgenland – Eisenstadt und Umgebung",
                      icon: (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      ),
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex items-start gap-4 group">
                      <div className="w-11 h-11 rounded-xl bg-water-500/10 border border-water-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-water-500/20 transition-colors">
                        <svg className="w-5 h-5 text-water-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          {item.icon}
                        </svg>
                      </div>
                      <div>
                        <p className="text-water-500 text-xs tracking-wider uppercase mb-1">{item.label}</p>
                        {item.href ? (
                          <a href={item.href} className="text-cream text-base hover:text-water-300 transition-colors break-all">
                            {item.value}
                          </a>
                        ) : (
                          <p className="text-cream text-base">{item.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>

            {/* Contact form */}
            <AnimatedSection delay={0.2} direction="right">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  submitForm(
                    {
                      type: "kontakt",
                      name: (form.elements.namedItem("name") as HTMLInputElement).value,
                      email: (form.elements.namedItem("email") as HTMLInputElement).value,
                      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
                      company: (form.elements.namedItem("company") as HTMLInputElement).value,
                    },
                    setContactStatus,
                    form
                  );
                }}
                className="glass-card rounded-2xl p-8 md:p-10 hover:transform-none"
              >
                <h3 className="font-heading text-2xl font-semibold text-cream mb-8 animated-underline inline-block pb-2">
                  Nachricht senden
                </h3>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-water-400 text-xs tracking-wider uppercase mb-2">Name</label>
                    <input
                      type="text" id="name" name="name" required maxLength={LIMITS.name}
                      className="w-full bg-water-950/50 border border-water-800/40 rounded-xl px-5 py-3.5 text-cream placeholder-cream/20 focus:outline-none focus:border-water-500/50 focus:bg-water-950/70 focus-visible:ring-2 focus-visible:ring-water-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-water-950 transition-all text-sm"
                      placeholder="Ihr Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-water-400 text-xs tracking-wider uppercase mb-2">E-Mail</label>
                    <input
                      type="email" id="email" name="email" required maxLength={LIMITS.email}
                      className="w-full bg-water-950/50 border border-water-800/40 rounded-xl px-5 py-3.5 text-cream placeholder-cream/20 focus:outline-none focus:border-water-500/50 focus:bg-water-950/70 focus-visible:ring-2 focus-visible:ring-water-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-water-950 transition-all text-sm"
                      placeholder="Ihre E-Mail-Adresse"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-water-400 text-xs tracking-wider uppercase mb-2">Nachricht</label>
                    <textarea
                      id="message" name="message" required rows={5} maxLength={LIMITS.message}
                      className="w-full bg-water-950/50 border border-water-800/40 rounded-xl px-5 py-3.5 text-cream placeholder-cream/20 focus:outline-none focus:border-water-500/50 focus:bg-water-950/70 focus-visible:ring-2 focus-visible:ring-water-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-water-950 transition-all resize-none text-sm"
                      placeholder="Ihre Nachricht..."
                    />
                  </div>
                  {/* Honeypot: offscreen statt sr-only (Screenreader sollen es nicht vorlesen), nicht disabled (Bots überspringen disabled-Felder) */}
                  <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden">
                    <label htmlFor="contact-company">Firma</label>
                    <input type="text" id="contact-company" name="company" tabIndex={-1} autoComplete="off" />
                  </div>
                  <div className="flex items-start gap-3 pt-1">
                    <input
                      type="checkbox" id="privacy" name="privacy" required
                      className="mt-0.5 h-4 w-4 flex-shrink-0 accent-water-500"
                    />
                    <label htmlFor="privacy" className="text-cream/60 text-xs leading-relaxed">
                      Ich habe die{" "}
                      <a href="/datenschutz" className="text-water-300 underline hover:text-water-200 transition-colors">
                        Datenschutzerklärung
                      </a>{" "}
                      gelesen und stimme der Verarbeitung meiner Daten zur Bearbeitung meiner Anfrage zu.
                    </label>
                  </div>
                  <button
                    type="submit"
                    disabled={contactStatus === "sending"}
                    className="w-full py-4 bg-water-500 hover:bg-water-400 text-white rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-water-500/20 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {contactStatus === "sending" ? "Wird gesendet…" : "Nachricht senden"}
                  </button>
                  {contactStatus === "success" && (
                    <p role="status" className="mt-4 rounded-xl border border-water-500/20 bg-water-500/10 p-4 text-sm text-water-300">
                      Vielen Dank! Ihre Nachricht wurde gesendet. Ich melde mich in Kürze bei Ihnen.
                    </p>
                  )}
                  {contactStatus === "error" && (
                    <p role="status" className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-300">
                      Leider ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut oder schreiben Sie direkt an eszterbary@szedercoaching.at.
                    </p>
                  )}
                </div>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-water-800/20 bg-water-950 noise-overlay">
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Szeder Coaching"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div>
                <span className="font-heading text-base font-semibold text-cream">
                  Szeder <span className="text-water-400">Coaching</span>
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-8 text-sm text-cream/50">
              {[
                { href: "#start", label: "Start" },
                { href: "#geschichte", label: "Geschichte" },
                { href: "#über-mich", label: "Über mich" },
                { href: "#angebote", label: "Angebote" },
                { href: "#galerie", label: "Galerie" },
                { href: "#erfahrungen", label: "Erfahrungen" },
                { href: "#kontakt", label: "Kontakt" },
              ].map((link) => (
                <a key={link.href} href={link.href} className="hover:text-cream/60 transition-colors">
                  {link.label}
                </a>
              ))}
            </div>

            <p className="text-cream/50 text-xs">
              &copy; {new Date().getFullYear()} Szeder Coaching
            </p>
          </div>

          {/* Legal links */}
          <div className="mt-8 pt-6 border-t border-water-800/20 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-cream/50">
            <a href="/impressum" className="hover:text-cream/60 transition-colors">
              Impressum
            </a>
            <a href="/datenschutz" className="hover:text-cream/60 transition-colors">
              Datenschutz
            </a>
          </div>

          {/* Agency credit */}
          <p className="mt-6 text-center text-xs text-cream/30">
            made by{" "}
            <a
              href="https://prometheusdigital.hu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream/60 transition-colors"
            >
              Prometheus Digital Kft.
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
