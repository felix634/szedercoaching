"use client";

import { ReactNode, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

interface ParallaxImageProps {
  src: string;
  alt: string;
  sizes: string;
  /** Sizing/shape of the frame, e.g. "aspect-square rounded-2xl". */
  className?: string;
  /** Overlays rendered above the image (gradients, captions). */
  children?: ReactNode;
}

/**
 * Image that is revealed like a rising water level when it scrolls into view,
 * then drifts slightly slower than the page for depth.
 */
export default function ParallaxImage({ src, alt, sizes, className = "", children }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);

  return (
    <motion.div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      initial={reduce ? false : { clipPath: "inset(100% 0% 0% 0% round 16px)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 16px)" }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
    >
      <motion.div className="absolute inset-x-0 -inset-y-[8%]" style={reduce ? undefined : { y }}>
        <motion.div
          className="relative h-full w-full"
          initial={reduce ? false : { scale: 1.25 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        </motion.div>
      </motion.div>
      {children}
    </motion.div>
  );
}
