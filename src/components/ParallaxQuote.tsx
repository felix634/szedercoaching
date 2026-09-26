"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const QUOTE =
  "Inspiriert von Szeder – einer geretteten Labrador-Hündin, die ihre Angst vor Wasser überwand.";

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [8, 0]);
  return (
    <>
      <motion.span className="inline-block" style={{ opacity, y }}>
        {children}
      </motion.span>{" "}
    </>
  );
}

/** Full-bleed quote over a parallax pool photo; words surface as you scroll. */
export default function ParallaxQuote() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(sectionProgress, [0, 1], ["-12%", "12%"]);

  const { scrollYProgress: textProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.5"],
  });

  const words = QUOTE.split(" ");

  return (
    <section ref={sectionRef} className="relative py-32 md:py-44 overflow-hidden noise-overlay">
      <motion.div
        className="absolute inset-x-0 -inset-y-[15%]"
        style={reduce ? undefined : { y: bgY }}
      >
        <Image src="/images/pool.jpg" alt="" fill sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-water-950/75" />
      <div className="absolute inset-0 water-caustics opacity-30" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.svg
          className="w-10 h-10 text-water-400/50 mx-auto mb-8"
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          initial={reduce ? false : { opacity: 0, scale: 0.6 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609L9.978 5.151C7.546 6.068 5.983 8.789 5.983 11H10v10H0z" />
        </motion.svg>

        <p
          ref={textRef}
          className="font-heading text-3xl md:text-5xl font-semibold text-cream leading-tight italic mb-8"
        >
          {reduce
            ? QUOTE
            : words.map((word, i) => (
                <Word
                  key={i}
                  progress={textProgress}
                  range={[i / words.length, (i + 1) / words.length]}
                >
                  {word}
                </Word>
              ))}
        </p>

        <motion.p
          className="text-cream/50 text-base"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          Heute begleite ich Kinder und Erwachsene auf genau diesem Weg.
        </motion.p>
      </div>
    </section>
  );
}
