import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";
import "./globals.css";

// Self-hosted via next/font (no requests to Google's servers → DSGVO-friendly).
const playfair = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const TITLE = "Szeder Coaching – Schwimmcoaching mit Herz";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | Szeder Coaching",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Schwimmcoaching",
    "Angst vor Wasser",
    "Schwimmen lernen",
    "Wassergewöhnung",
    "Schwimmkurs Erwachsene",
    "Schwimmen Kinder",
    "Eisenstadt",
    "Burgenland",
    "Nordburgenland",
    "Coaching",
  ],
  authors: [{ name: "Eszter Bary" }],
  creator: "Eszter Bary",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_AT",
    url: "/",
    siteName: SITE_NAME,
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Szeder Coaching – Schwimmcoaching mit Herz",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: SITE_DESCRIPTION,
    images: ["/images/hero.jpg"],
  },
  icons: {
    icon: [{ url: "/images/favicon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c1a35",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/images/hero.jpg`,
  logo: `${SITE_URL}/images/logo.png`,
  telephone: "+4366761526206",
  email: "eszter.joga@gmail.com",
  founder: {
    "@type": "Person",
    name: "Eszter Bary",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Eisenstadt",
    addressRegion: "Burgenland",
    addressCountry: "AT",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Nordburgenland – Eisenstadt und Umgebung",
  },
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${playfair.variable} ${dmSans.variable}`}>
      <body className="antialiased bg-water-950 text-cream overflow-x-hidden">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
