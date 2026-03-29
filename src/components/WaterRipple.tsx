"use client";

import { motion } from "framer-motion";

export default function WaterRipple() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-water-400/20"
          style={{
            left: `${30 + i * 20}%`,
            top: `${40 + i * 10}%`,
            width: 100 + i * 80,
            height: 100 + i * 80,
          }}
          animate={{
            scale: [1, 2, 3],
            opacity: [0.3, 0.1, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
