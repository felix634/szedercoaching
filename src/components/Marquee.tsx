"use client";

import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

const words = [
  "Schwimmen",
  "Vertrauen",
  "Wasser",
  "Freiheit",
  "Mut",
  "Coaching",
  "Stärke",
  "Freude",
  "Sicherheit",
  "Inklusion",
];

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

function Drop() {
  return (
    <svg className="w-4 h-4 md:w-5 md:h-5 text-water-500 mx-6 md:mx-10 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.5c-3.3 4.4-6.25 8.1-6.25 11.5a6.25 6.25 0 0012.5 0c0-3.4-2.95-7.1-6.25-11.5z" />
    </svg>
  );
}

/** Endless word band drifting slowly and steadily. */
export default function Marquee({ baseVelocity = -1.5 }: { baseVelocity?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();

  const baseX = useMotionValue(0);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce || !inView) return;
    baseX.set(baseX.get() + baseVelocity * (delta / 1000));
  });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative overflow-hidden py-8 md:py-12 bg-water-900/50 border-y border-water-800/30"
    >
      <motion.div className="flex w-max whitespace-nowrap items-center" style={{ x }}>
        {[0, 1].map((set) => (
          <div key={set} className="flex items-center">
            {words.map((word, i) => (
              <span key={`${set}-${i}`} className="flex items-center">
                <span
                  className={`font-heading text-4xl md:text-6xl lg:text-7xl tracking-tight ${
                    i % 2 ? "italic text-outline" : "text-cream/85"
                  }`}
                >
                  {word}
                </span>
                <Drop />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}
