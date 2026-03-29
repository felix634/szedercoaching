"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Bubbles from "@/components/Bubbles";
import WaveDivider from "@/components/WaveDivider";
import AnimatedSection from "@/components/AnimatedSection";
import WaterRipple from "@/components/WaterRipple";

const angebote = [
  {
    title: "Angstabbau im Wasser",
    desc: "Für Kinder & Erwachsene – sanft und einfühlsam begleitet.",
    icon: "🌊",
  },
  {
    title: "Schwimmen lernen mit Vertrauen",
    desc: "Schritt für Schritt zu mehr Sicherheit im Wasser.",
    icon: "🏊",
  },
  {
    title: "Individuelles Coaching (1:1)",
    desc: "Persönliche Betreuung, abgestimmt auf Ihre Bedürfnisse.",
    icon: "🤝",
  },
  {
    title: "Parent Coaching",
    desc: "Begleitung für Eltern – gemeinsam Ängste überwinden.",
    icon: "👨‍👩‍👧",
  },
  {
    title: "Wassergewöhnung",
    desc: "Spielerisch und behutsam ans Wasser heranführen.",
    icon: "💧",
  },
  {
    title: "Trauma-sensibles Coaching",
    desc: "Mit besonderer Achtsamkeit und professionellem Feingefühl.",
    icon: "🩵",
  },
  {
    title: "Coaching für besondere Bedürfnisse",
    desc: "Für Menschen mit Behinderung – inklusiv und wertschätzend.",
    icon: "⭐",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      <Bubbles />
      <Navbar />

      {/* ===== HERO SECTION ===== */}
      <section
        id="start"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background image with overlay */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero-water.jpg"
            alt="Wasser Hintergrund"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-water-950/80 via-water-900/70 to-water-950/90" />
          <div className="absolute inset-0 water-caustics" />
        </div>

        <WaterRipple />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Image
              src="/images/logo.png"
              alt="Szeder Coaching Logo"
              width={160}
              height={160}
              className="mx-auto mb-8 rounded-full shadow-2xl shadow-water-500/30 w-28 h-28 md:w-40 md:h-40"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-white via-water-200 to-water-400 bg-clip-text text-transparent">
              Szeder Coaching
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-xl md:text-2xl text-water-200 mb-4 font-light"
          >
            Vertrauen lernen. Ängste überwinden. Freude am Schwimmen.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-lg md:text-xl text-water-300/80 mb-10 max-w-2xl mx-auto"
          >
            Freiheit erleben.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="#angebote"
              className="px-8 py-4 bg-water-500 hover:bg-water-400 text-white rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-water-500/40 hover:-translate-y-1"
            >
              Angebote entdecken
            </a>
            <a
              href="#kontakt"
              className="px-8 py-4 border-2 border-water-400/50 hover:border-water-400 text-water-200 hover:text-white rounded-full font-semibold text-lg transition-all duration-300 hover:-translate-y-1"
            >
              Kontakt aufnehmen
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-water-400/50 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-water-400 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ===== STORY / MOTTO ===== */}
      <WaveDivider colorFrom="#0f2554" colorTo="#1e4189" />
      <section className="relative bg-water-900 py-20 md:py-28">
        <div className="absolute inset-0 water-caustics opacity-30" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <AnimatedSection>
            <p className="text-lg md:text-xl text-water-200 leading-relaxed italic">
              &ldquo;Inspiriert von Szeder – einer geretteten Labrador-Hündin,
              die ihre Angst vor Wasser überwand und ihre Stärke
              entdeckte.&rdquo;
            </p>
            <p className="mt-4 text-water-400 font-medium">
              Heute begleite ich Kinder und Erwachsene auf genau diesem Weg.
            </p>
          </AnimatedSection>
        </div>
      </section>
      <WaveDivider colorFrom="#1e4189" colorTo="#0f2554" flip />

      {/* ===== ÜBER MICH ===== */}
      <section id="über-mich" className="relative py-20 md:py-28 bg-water-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-water-300 to-water-500 bg-clip-text text-transparent">
                Über mich
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <AnimatedSection delay={0.2}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-water-500/20 to-water-700/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-500" />
                <div className="relative overflow-hidden rounded-2xl">
                  <Image
                    src="/images/coach_photo.jpg"
                    alt="Eszter Bary – Schwimmcoach"
                    width={600}
                    height={700}
                    className="w-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-semibold text-water-200">
                  Eszter Bary
                </h3>
                <div className="space-y-4 text-water-300 text-lg leading-relaxed">
                  <p>
                    Szeder war meine geliebte Labrador-Hündin, die ich aus dem
                    Tierheim gerettet habe. Obwohl sie ein Wasserhund war, hatte
                    sie große Angst vor dem Wasser.
                  </p>
                  <p>
                    Mit Geduld, Vertrauen und einfühlsamer Begleitung habe ich
                    ihr geholfen, diese Angst Schritt für Schritt zu überwinden.
                    Aus Unsicherheit wurde Freude – und schließlich eine sichere,
                    starke Schwimmerin.
                  </p>
                  <p>
                    Diese Erfahrung prägt meine Arbeit bis heute: Ich
                    unterstütze Kinder und Erwachsene dabei, ihre Ängste zu
                    überwinden und sich im Wasser sicher und frei zu fühlen.
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== ANGEBOTE ===== */}
      <WaveDivider colorFrom="#0f2554" colorTo="#1e4aad" />
      <section id="angebote" className="relative bg-water-800 py-20 md:py-28">
        <div className="absolute inset-0 water-caustics opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-6">
              <span className="bg-gradient-to-r from-water-200 to-white bg-clip-text text-transparent">
                Meine Angebote
              </span>
            </h2>
            <p className="text-center text-water-300 text-lg mb-16 max-w-2xl mx-auto">
              Jeder Mensch verdient es, sich im Wasser sicher zu fühlen. Meine
              Angebote sind individuell auf Ihre Bedürfnisse abgestimmt.
            </p>
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {angebote.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  className="glass-card rounded-2xl p-6 h-full hover:shadow-xl hover:shadow-water-500/10 transition-shadow duration-300"
                >
                  <span className="text-4xl mb-4 block">{item.icon}</span>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-water-300">{item.desc}</p>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      <WaveDivider colorFrom="#1e4aad" colorTo="#0f2554" flip />

      {/* ===== PARALLAX IMAGE SECTION ===== */}
      <section className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: "url(/images/pool.jpg)" }}
        />
        <div className="absolute inset-0 bg-water-950/60" />
        <div className="relative z-10 flex items-center justify-center h-full">
          <AnimatedSection>
            <p className="text-2xl md:text-4xl font-bold text-center text-white px-4 max-w-3xl">
              &ldquo;Aus Unsicherheit wurde Freude – und schließlich eine
              sichere, starke Schwimmerin.&rdquo;
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* ===== KONTAKT ===== */}
      <section id="kontakt" className="relative py-20 md:py-28 bg-water-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">
              <span className="bg-gradient-to-r from-water-300 to-water-500 bg-clip-text text-transparent">
                Kontakt
              </span>
            </h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-10">
            <AnimatedSection delay={0.2}>
              <div className="glass-card rounded-2xl p-8 space-y-6">
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Nehmen Sie Kontakt auf
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-water-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-water-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-water-400 text-sm">Name</p>
                      <p className="text-white text-lg">Eszter Bary</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-water-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-water-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-water-400 text-sm">Telefon</p>
                      <a
                        href="tel:+4366761526206"
                        className="text-white text-lg hover:text-water-400 transition-colors"
                      >
                        0667 615 26206
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-water-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-water-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-water-400 text-sm">E-Mail</p>
                      <a
                        href="mailto:eszter.joga@gmail.com"
                        className="text-white text-lg hover:text-water-400 transition-colors break-all"
                      >
                        eszter.joga@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-water-500/20 flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-5 h-5 text-water-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-water-400 text-sm">Ort</p>
                      <p className="text-white text-lg">
                        Nordburgenland – Eisenstadt und Umgebung
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const form = e.target as HTMLFormElement;
                  const name = (
                    form.elements.namedItem("name") as HTMLInputElement
                  ).value;
                  const email = (
                    form.elements.namedItem("email") as HTMLInputElement
                  ).value;
                  const message = (
                    form.elements.namedItem("message") as HTMLTextAreaElement
                  ).value;
                  window.location.href = `mailto:eszter.joga@gmail.com?subject=Anfrage von ${encodeURIComponent(name)}&body=${encodeURIComponent(`Name: ${name}\nE-Mail: ${email}\n\n${message}`)}`;
                }}
                className="glass-card rounded-2xl p-8 space-y-5"
              >
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Schreiben Sie mir
                </h3>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-water-400 text-sm mb-1"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full bg-water-900/50 border border-water-700/50 rounded-xl px-4 py-3 text-white placeholder-water-500 focus:outline-none focus:border-water-400 transition-colors"
                    placeholder="Ihr Name"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-water-400 text-sm mb-1"
                  >
                    E-Mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full bg-water-900/50 border border-water-700/50 rounded-xl px-4 py-3 text-white placeholder-water-500 focus:outline-none focus:border-water-400 transition-colors"
                    placeholder="Ihre E-Mail-Adresse"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-water-400 text-sm mb-1"
                  >
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-water-900/50 border border-water-700/50 rounded-xl px-4 py-3 text-white placeholder-water-500 focus:outline-none focus:border-water-400 transition-colors resize-none"
                    placeholder="Ihre Nachricht..."
                  />
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  className="w-full py-4 bg-water-500 hover:bg-water-400 text-white rounded-xl font-semibold text-lg transition-colors duration-300"
                >
                  Nachricht senden
                </motion.button>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="relative">
        <WaveDivider colorFrom="#0f2554" colorTo="#1e4189" />
        <div className="bg-water-900 py-10">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="Szeder Coaching"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span className="text-lg font-semibold text-white">
                Szeder <span className="text-water-400">Coaching</span>
              </span>
            </div>
            <p className="text-water-400 text-sm">
              &copy; {new Date().getFullYear()} Szeder Coaching – Eszter Bary.
              Alle Rechte vorbehalten.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
