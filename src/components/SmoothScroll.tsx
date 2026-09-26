"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { cancelFrame, frame } from "framer-motion";
import { isSmoothScrolling, scrollToHash, setLenis } from "@/lib/scroll";

/**
 * Inertia-based smooth scrolling (Lenis) for wheel/trackpad. Touch devices keep
 * native scrolling, and it is skipped entirely for prefers-reduced-motion.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });
    setLenis(lenis);

    // Drive Lenis from framer-motion's frame loop so scroll-linked animations
    // read the freshly updated scroll position in the same frame.
    const update = ({ timestamp }: { timestamp: number }) => lenis.raf(timestamp);
    frame.update(update, true);

    // Same-page anchor links glide instead of jumping.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href^='#']");
      const href = link?.getAttribute("href");
      if (!href || href === "#" || !isSmoothScrolling()) return;
      e.preventDefault();
      scrollToHash(href);
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelFrame(update);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
