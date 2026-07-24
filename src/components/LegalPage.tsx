import Link from "next/link";
import Image from "next/image";

/**
 * Shared chrome for the legal subpages (Impressum / Datenschutz).
 * Server component — keeps the site's water theme without the heavy
 * homepage animations, so the legal text stays calm and readable.
 */
export default function LegalPage({
  title,
  intro,
  lastUpdated,
  children,
}: {
  title: string;
  intro?: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <main className="relative min-h-screen bg-water-950 text-cream noise-overlay">
      <div className="absolute inset-0 water-caustics opacity-10 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 border-b border-water-800/30 bg-water-950/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="/images/logo.png"
              alt="Szeder Coaching Logo"
              width={44}
              height={44}
              className="w-10 h-10 rounded-full transition-transform duration-300 group-hover:scale-110"
            />
            <div className="flex flex-col leading-tight">
              <span className="font-heading text-base font-semibold text-cream">Szeder</span>
              <span className="text-[10px] tracking-[0.25em] uppercase text-water-400 font-medium">
                Coaching
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="text-sm text-cream/60 hover:text-cream transition-colors inline-flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Zurück zur Startseite</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <article className="relative z-10 max-w-3xl mx-auto px-6 py-16 md:py-24">
        <p className="section-subtitle text-water-500 mb-3">Rechtliches</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold text-cream mb-4">{title}</h1>
        {intro && <p className="text-cream/50 text-base mb-2 max-w-2xl">{intro}</p>}
        <p className="text-cream/30 text-xs mb-12">Stand: {lastUpdated}</p>
        <div className="legal-prose">{children}</div>
      </article>

      {/* Footer */}
      <footer className="relative z-10 border-t border-water-800/30">
        <div className="max-w-3xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-cream/30 text-xs">© {year} Szeder Coaching</p>
            <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-cream/50">
              <Link href="/" className="hover:text-cream transition-colors">
                Startseite
              </Link>
              <Link href="/impressum" className="hover:text-cream transition-colors">
                Impressum
              </Link>
              <Link href="/datenschutz" className="hover:text-cream transition-colors">
                Datenschutz
              </Link>
            </nav>
          </div>

          {/* Agency credit */}
          <p className="mt-6 text-center text-xs text-cream/30">
            made by{" "}
            <a
              href="https://prometheusdigital.hu"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-cream transition-colors"
            >
              Prometheus Digital Kft.
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
