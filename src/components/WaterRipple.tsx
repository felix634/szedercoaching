"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { createWaterRenderer } from "@/lib/waterRipple";

interface WaterRippleProps {
  src: string;
  alt: string;
  /** Waterline in the photo, as a fraction of its height from the top. */
  waterline?: number;
}

/**
 * Full-bleed background photo that turns into an interactive water surface:
 * the pointer (or a tap) sends ripples through the image, occasional drops
 * fall on their own, and the lake below the waterline shimmers gently.
 *
 * The regular next/image stays underneath as the LCP element and as the
 * fallback when WebGL2 is unavailable or the user prefers reduced motion.
 */
export default function WaterRipple({ src, alt, waterline = 0.61 }: WaterRippleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !image) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Decode the exact variant next/image picked, so the texture matches pixel for pixel.
    const texture = new window.Image();
    texture.decoding = "async";
    texture.src = image.currentSrc || image.src;

    let renderer: ReturnType<typeof createWaterRenderer> = null;
    let raf = 0;
    let visible = true;
    let disposed = false;
    let last = 0;
    let nextRain = 0;
    let pointer: { x: number; y: number } | null = null;
    let lastDrop: { x: number; y: number } | null = null;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    const size = () => {
      if (!renderer) return;
      const rect = canvas.getBoundingClientRect();
      renderer.resize(canvas.clientWidth || rect.width, canvas.clientHeight || rect.height, Math.min(window.devicePixelRatio || 1, 2));
    };

    const loop = (now: number) => {
      raf = 0;
      if (!renderer || disposed) return;
      const t = now / 1000;
      const dt = last ? Math.min(t - last, 0.1) : 1 / 60;
      last = t;

      // Pointer trail: a drop every few pixels of travel.
      if (pointer) {
        const moved = lastDrop ? Math.hypot(pointer.x - lastDrop.x, pointer.y - lastDrop.y) : Infinity;
        if (moved * canvas.clientWidth > 6) {
          renderer.drop(pointer.x, pointer.y, 18, 0.035);
          lastDrop = pointer;
        }
      }

      // Rain: an occasional drop keeps the surface alive without interaction.
      if (t > nextRain) {
        if (nextRain) {
          renderer.drop(Math.random(), 0.15 + Math.random() * 0.8, 10 + Math.random() * 10, 0.05 + Math.random() * 0.05);
        }
        nextRain = t + (coarse ? 0.7 : 1.4) + Math.random() * 1.6;
      }

      renderer.frame(dt, t);
      schedule();
    };

    const schedule = () => {
      if (!raf && visible && !document.hidden && !disposed) raf = requestAnimationFrame(loop);
    };

    const toLocal = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      return x >= 0 && x <= 1 && y >= 0 && y <= 1 ? { x, y } : null;
    };
    const onMove = (e: PointerEvent) => {
      pointer = toLocal(e);
      if (!pointer) lastDrop = null;
    };
    const onDown = (e: PointerEvent) => {
      const p = toLocal(e);
      if (p && renderer) renderer.drop(p.x, p.y, 34, 0.16);
    };
    const onLeave = () => {
      pointer = null;
      lastDrop = null;
    };
    const onVisibility = () => {
      last = 0;
      schedule();
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      last = 0;
      schedule();
    });
    const ro = new ResizeObserver(size);

    const start = () => {
      if (disposed) return;
      renderer = createWaterRenderer(canvas, texture, { waterline });
      if (!renderer) return;
      size();
      renderer.frame(0, performance.now() / 1000);
      setReady(true);

      // A first drop behind the logo announces that the water is alive.
      window.setTimeout(() => renderer?.drop(0.5, 0.3, 46, 0.22), 900);

      io.observe(canvas);
      ro.observe(canvas);
      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerdown", onDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      schedule();
    };

    const onContextLost = (e: Event) => {
      e.preventDefault();
      disposed = true;
      setReady(false);
    };
    canvas.addEventListener("webglcontextlost", onContextLost);

    texture.decode().then(start, () => {});

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      renderer?.destroy();
    };
  }, [image, waterline]);

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        onLoad={(e) => setImage(e.currentTarget)}
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full transition-opacity duration-700"
        style={{ opacity: ready ? 1 : 0 }}
      />
    </>
  );
}
