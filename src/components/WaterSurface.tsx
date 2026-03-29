"use client";

import { motion } from "framer-motion";

export default function WaterSurface({ className = "" }: { className?: string }) {
  return (
    <div className={`absolute bottom-0 left-0 right-0 overflow-hidden ${className}`}>
      <svg
        viewBox="0 0 1280 320"
        className="w-full h-[100px] md:h-[160px]"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="waterGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59,143,244,0.15)" />
            <stop offset="100%" stopColor="rgba(12,26,53,0.8)" />
          </linearGradient>
          <linearGradient id="waterGrad2" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(96,174,248,0.1)" />
            <stop offset="100%" stopColor="rgba(12,26,53,0.6)" />
          </linearGradient>
        </defs>

        <motion.path
          fill="url(#waterGrad2)"
          animate={{
            d: [
              "M0,192 C213,150 427,210 640,192 C853,174 1067,210 1280,192 L1280,320 L0,320 Z",
              "M0,210 C213,230 427,170 640,210 C853,230 1067,170 1280,210 L1280,320 L0,320 Z",
              "M0,192 C213,150 427,210 640,192 C853,174 1067,210 1280,192 L1280,320 L0,320 Z",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          fill="url(#waterGrad1)"
          animate={{
            d: [
              "M0,224 C320,200 480,256 640,224 C800,192 960,256 1280,224 L1280,320 L0,320 Z",
              "M0,240 C320,260 480,210 640,240 C800,260 960,210 1280,240 L1280,320 L0,320 Z",
              "M0,224 C320,200 480,256 640,224 C800,192 960,256 1280,224 L1280,320 L0,320 Z",
            ],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          fill="rgba(12,26,53,0.9)"
          animate={{
            d: [
              "M0,256 C160,240 320,272 480,256 C640,240 800,272 960,256 C1120,240 1200,260 1280,256 L1280,320 L0,320 Z",
              "M0,264 C160,280 320,248 480,264 C640,280 800,248 960,264 C1120,280 1200,256 1280,264 L1280,320 L0,320 Z",
              "M0,256 C160,240 320,272 480,256 C640,240 800,272 960,256 C1120,240 1200,260 1280,256 L1280,320 L0,320 Z",
            ],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
}
