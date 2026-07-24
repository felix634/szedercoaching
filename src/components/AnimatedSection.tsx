"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimatedSectionProps) {
  const reduce = useReducedMotion();

  // Respect prefers-reduced-motion: keep a gentle fade, drop the translation.
  const initial = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === "up" ? 50 : 0,
        x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: reduce ? 0.3 : 0.8,
        delay: reduce ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
