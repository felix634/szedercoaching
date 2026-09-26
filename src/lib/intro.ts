/** Length of the water intro (fill + exit) before the hero starts animating, in seconds. */
export const INTRO_SECONDS = 2.2;

const STORAGE_KEY = "szeder-intro";

/**
 * Runs inline before first paint: the intro plays once per browser session and
 * never for prefers-reduced-motion. Otherwise <html> gets `intro-done`, which
 * hides the overlay via CSS before it can flash.
 */
export const INTRO_BOOT_SCRIPT = `try{var d=document.documentElement;if(sessionStorage.getItem("${STORAGE_KEY}")||matchMedia("(prefers-reduced-motion: reduce)").matches){d.classList.add("intro-done")}else{sessionStorage.setItem("${STORAGE_KEY}","1")}}catch(e){document.documentElement.classList.add("intro-done")}`;

/** Extra delay for hero entrance animations while the intro is covering the page. */
export function introDelay() {
  if (typeof document === "undefined") return 0;
  return document.documentElement.classList.contains("intro-done") ? 0 : INTRO_SECONDS;
}
