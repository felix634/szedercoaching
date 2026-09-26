"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const fade: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

const hairline: Variants = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, delay: 0.15, ease: EASE_OUT } },
};

const rise: Variants = {
  hidden: { y: "105%", rotate: 2 },
  show: { y: "0%", rotate: 0, transition: { duration: 1.1, delay: 0.1, ease: EASE_OUT } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, delay: 0.3, ease: EASE_OUT } },
};

interface SectionHeadingProps {
  eyebrow: string;
  children: ReactNode;
  intro?: ReactNode;
  /** Eyebrow colour, tuned to the section background. */
  eyebrowClassName?: string;
  className?: string;
}

/**
 * Section title with an editorial reveal: the eyebrow's hairlines draw in,
 * the heading rises out of a mask and the intro fades up behind it.
 */
export default function SectionHeading({
  eyebrow,
  children,
  intro,
  eyebrowClassName = "text-water-500",
  className = "mb-16",
}: SectionHeadingProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={`text-center ${className}`}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
    >
      <motion.p
        variants={fade}
        className={`section-subtitle mb-5 flex items-center justify-center gap-4 ${eyebrowClassName}`}
      >
        <motion.span
          aria-hidden="true"
          variants={hairline}
          className="h-px w-10 bg-gradient-to-r from-transparent to-current origin-right"
        />
        {eyebrow}
        <motion.span
          aria-hidden="true"
          variants={hairline}
          className="h-px w-10 bg-gradient-to-l from-transparent to-current origin-left"
        />
      </motion.p>

      <h2
        className={`font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-cream leading-tight overflow-hidden pb-[0.12em] ${
          intro ? "mb-4" : ""
        }`}
      >
        <motion.span variants={rise} className="block origin-bottom-left">
          {children}
        </motion.span>
      </h2>

      {intro && (
        <motion.p
          variants={fadeUp}
          className="text-cream/50 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          {intro}
        </motion.p>
      )}
    </motion.div>
  );
}
