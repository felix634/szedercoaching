"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const count = images.length;
  const current = ((index % count) + count) % count;

  const paginate = useCallback(
    (newDir: number) => {
      setState(([prev]) => [prev + newDir, newDir]);
    },
    []
  );

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl group/carousel">
      <AnimatePresence initial={false} custom={dir} mode="popLayout">
        <motion.div
          key={current}
          custom={dir}
          initial={{ opacity: 0, x: dir > 0 ? 60 : dir < 0 ? -60 : 0 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="absolute inset-0"
        >
          {/* Blurred fill so portrait & landscape images share the frame cleanly */}
          <Image
            src={images[current]}
            alt=""
            aria-hidden
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover scale-110 blur-2xl opacity-60"
          />
          <div className="absolute inset-0 bg-water-950/30" />
          {/* Full image, never cropped */}
          <Image
            src={images[current]}
            alt={`${alt} ${current + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient for legibility of controls */}
      <div className="absolute inset-0 bg-gradient-to-t from-water-950/50 via-transparent to-transparent pointer-events-none" />

      {count > 1 && (
        <>
          {/* Prev */}
          <button
            type="button"
            onClick={() => paginate(-1)}
            aria-label="Vorheriges Bild"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-water-950/50 backdrop-blur-md border border-water-400/20 flex items-center justify-center text-cream/80 hover:bg-water-500/60 hover:text-cream transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next */}
          <button
            type="button"
            onClick={() => paginate(1)}
            aria-label="Nächstes Bild"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-water-950/50 backdrop-blur-md border border-water-400/20 flex items-center justify-center text-cream/80 hover:bg-water-500/60 hover:text-cream transition-all duration-300 opacity-0 group-hover/carousel:opacity-100 focus:opacity-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setState(([prev]) => [prev + (i - current), i - current])}
                aria-label={`Bild ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 bg-water-300"
                    : "w-2 bg-cream/40 hover:bg-cream/60"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
