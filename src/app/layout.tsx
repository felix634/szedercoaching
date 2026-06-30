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
        url: "/images/og-image.jpg",
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
    images: ["/images/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/images/apple-touch-icon.png", sizes: "180x180" }],
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
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  slogan: "Vertrauen lernen. Freiheit erleben.",
  url: SITE_URL,
  image: [
    `${SITE_URL}/images/og-image.jpg`,
    `${SITE_URL}/images/hero.jpg`,
    `${SITE_URL}/images/pool.jpg`,
  ],
  logo: `${SITE_URL}/images/logo.png`,
  telephone: "+4367761526206",
  email: "eszter.joga@gmail.com",
  inLanguage: "de-AT",
  founder: {
    "@type": "Person",
    name: "Eszter Bary",
    jobTitle: "Schwimmcoach",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Krensdorferstraße 10",
    addressLocality: "Hirm",
    addressRegion: "Burgenland",
    postalCode: "7024",
    addressCountry: "AT",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.7865,
    longitude: 16.4546,
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Nordburgenland – Eisenstadt und Umgebung",
  },
  knowsAbout: [
    "Schwimmcoaching",
    "Angstabbau im Wasser",
    "Wassergewöhnung",
    "Trauma-sensibles Coaching",
    "Inklusives Schwimmen",
    "Schwimmen lernen für Erwachsene",
    "Schwimmen lernen für Kinder",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Angebote",
    itemListElement: [
      "Angstabbau im Wasser",
      "Schwimmen lernen mit Vertrauen",
      "Wassergewöhnung",
      "Individuelles 1:1 Coaching",
      "Trauma-sensibles Coaching",
      "Parent Coaching",
      "Coaching für Menschen mit besonderen Bedürfnissen",
    ].map((name) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name },
    })),
  },
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de-AT" className={`${playfair.variable} ${dmSans.variable}`}>
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
