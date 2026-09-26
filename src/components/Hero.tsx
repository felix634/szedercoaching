"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  transform,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import WaterRipple from "@/components/WaterRipple";
import WaterSurface from "@/components/WaterSurface";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

// Function mappers (not range arrays) on purpose: framer-motion hands range-mapped
// opacity to a native ScrollTimeline, which binds before the section ref exists
// and then tracks the whole page instead of the hero.
const toDeep = transform([0, 0.9], [0, 0.85]);
const toFaded = transform([0, 0.55], [1, 0]);

const lineReveal = {
  hidden: { y: "110%" },
  show: (i: number) => ({
    y: "0%",
    transition: { duration: 1.2, delay: 0.45 + i * 0.14, ease: EASE_OUT },
  }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  // Scrolling out of the hero feels like sinking below the surface: the photo
  // drifts and zooms, the headline sinks, blurs and fades into the deep.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const deep = useTransform(scrollYProgress, toDeep);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const contentOpacity = useTransform(scrollYProgress, toFaded);
  const blur = useTransform(scrollYProgress, [0, 0.55], [0, 10]);
  const contentFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <section
      ref={ref}
      id="start"
      className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay"
    >
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={reduce ? undefined : { scale: bgScale, y: bgY }}
      >
        <WaterRipple
          src="/images/hero-20260830.jpg"
          alt="Ruhige Wasseroberfläche – Schwimmcoaching mit Herz bei Szeder Coaching"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-water-950/70 via-water-950/35 to-water-950 pointer-events-none" />
      <motion.div
        aria-hidden="true"
        className="absolute inset-0 bg-water-950 pointer-events-none"
        style={{ opacity: reduce ? 0 : deep }}
      />

      <WaterSurface />

      <motion.div
        className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-20 pb-24"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity, filter: contentFilter }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.4, ease: EASE_OUT }}
        >
          <Image
            src="/images/logo.png"
            alt="Szeder Coaching Logo"
            width={224}
            height={224}
            sizes="(max-width: 768px) 128px, 224px"
            priority
            className="mx-auto mb-10 rounded-full w-32 h-32 md:w-56 md:h-56 shadow-2xl shadow-water-500/20 animate-bob"
          />
        </motion.div>

        <motion.p
          initial={reduce ? false : { opacity: 0, letterSpacing: "0.5em" }}
          animate={{ opacity: 1, letterSpacing: "0.2em" }}
          transition={{ duration: 1.4, delay: 0.3, ease: EASE_OUT }}
          className="section-subtitle text-water-300 mb-6"
        >
          Schwimmcoaching mit Herz
        </motion.p>

        <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-[1.08] tracking-tight">
          <span className="block overflow-hidden pb-[0.08em] px-[0.08em]">
            <motion.span
              className="block text-cream"
              custom={0}
              variants={lineReveal}
              initial={reduce ? false : "hidden"}
              animate="show"
            >
              Vertrauen lernen.
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.12em] px-[0.08em]">
            <motion.span
              className="block italic gradient-text"
              custom={1}
              variants={lineReveal}
              initial={reduce ? false : "hidden"}
              animate="show"
            >
              Freiheit erleben.
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: EASE_OUT }}
          className="text-lg md:text-xl text-cream/75 max-w-2xl mx-auto leading-relaxed"
        >
          Ängste überwinden und die Freude am Schwimmen entdecken —
          für Kinder und Erwachsene mit besonderen Bedürfnissen.
        </motion.p>
      </motion.div>

      {/* Scroll indicator: a drop sliding down a thin line */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        style={reduce ? undefined : { opacity: contentOpacity }}
      >
        <motion.a
          href="#geschichte"
          aria-label="Weiter nach unten scrollen"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="flex flex-col items-center gap-3 group"
        >
          <span className="text-[10px] tracking-[0.3em] uppercase text-cream/40 group-hover:text-cream/70 transition-colors">
            Eintauchen
          </span>
          <span className="relative block h-14 w-px overflow-hidden bg-cream/15">
            <span className="absolute left-0 top-0 h-5 w-px bg-gradient-to-b from-transparent to-water-300 animate-scroll-drop" />
          </span>
        </motion.a>
      </motion.div>
    </section>
  );
}
