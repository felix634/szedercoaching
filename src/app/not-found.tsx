import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: true },
};

export default function NotFound() {
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
        <p className="font-heading text-7xl md:text-8xl font-bold gradient-text mb-4">404</p>
        <h1 className="font-heading text-2xl md:text-3xl font-semibold text-cream mb-4">
          Diese Seite ist abgetaucht
        </h1>
        <p className="text-cream/50 text-base md:text-lg leading-relaxed mb-10">
          Die gesuchte Seite konnte nicht gefunden werden. Vielleicht wurde sie
          verschoben oder existiert nicht mehr.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-7 py-3.5 bg-water-500 hover:bg-water-400 text-white rounded-xl font-semibold text-sm tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-water-500/20"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
