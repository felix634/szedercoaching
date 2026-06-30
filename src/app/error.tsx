"use client";

import Image from "next/image";
import Link from "next/link";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="relative min-h-screen flex items-center justify-center bg-water-950 text-cream overflow-hidden noise-overlay px-6">
      <div className="absolute inset-0 water-caustics opacity-20" />
      <div className="relative z-10 text-center max-w-xl mx-auto">
        <Image
          src="/images/logo.png"
          alt="Szeder Coaching Logo"
          width={96}
          height={96}
          className="mx-auto mb-8 rounded-full w-20 h-20 shadow-2xl shadow-water-500/20"
        />
        <h1 className="font-heading text-3xl md:text-4xl font-semibold text-cream mb-4">
          Etwas ist schiefgelaufen
        </h1>
        <p className="text-cream/50 text-base md:text-lg leading-relaxed mb-10">
          Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es
          erneut oder kehren Sie zur Startseite zurück.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-water-500 hover:bg-water-400 text-white rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-water-500/20"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Erneut versuchen
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-water-500/40 text-cream/80 hover:text-cream hover:border-water-400/60 rounded-xl font-semibold text-sm tracking-wide transition-all duration-300"
          >
            Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
