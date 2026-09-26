import type Lenis from "lenis";

// The active Lenis instance (null when smooth scrolling is off, e.g. with
// prefers-reduced-motion), shared so any component can trigger a glide.
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function isSmoothScrolling() {
  return lenis !== null;
}

/** Scrolls to an in-page anchor like "#kontakt" and updates the URL hash. */
export function scrollToHash(hash: string) {
  const id = decodeURIComponent(hash.replace(/^#/, ""));
  const target = document.getElementById(id);
  if (!target) return;

  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6 });
  } else {
    target.scrollIntoView();
  }
  history.pushState(null, "", `#${encodeURIComponent(id)}`);
}
