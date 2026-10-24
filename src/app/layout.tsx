import type { Metadata, Viewport } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import { SITE_URL, SITE_NAME } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";
import { INTRO_BOOT_SCRIPT } from "@/lib/intro";
import { getSiteSettings, phoneHref, type SiteSettings } from "@/sanity/content";
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

// Title, description, keywords and the social preview image are edited in Sanity
// ("Beállítások"); the rest is fixed.
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const title = settings?.seoTitle ?? SITE_NAME;
  const description = settings?.seoDescription ?? undefined;
  const author = settings?.contact?.name;
  // Cropped to 1200×630 by Sanity's image CDN; only crawlers fetch this URL.
  const ogImage = settings?.ogImage && {
    url: `${settings.ogImage.url}?w=1200&h=630&fit=crop`,
    width: 1200,
    height: 630,
    alt: settings.ogImage.alt ?? title,
  };

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: title,
      template: "%s | Szeder Coaching",
    },
    description,
    keywords: settings?.keywords ?? undefined,
    authors: author ? [{ name: author }] : undefined,
    creator: author ?? undefined,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: "de_AT",
      url: "/",
      siteName: SITE_NAME,
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage.url] : undefined,
    },
    icons: {
      icon: [
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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0c1a35",
};

// Contact data, address, description and images come from Sanity; undefined
// values simply drop out of the JSON.
const structuredData = (settings: SiteSettings | null) => ({
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#business`,
  name: SITE_NAME,
  description: settings?.seoDescription ?? undefined,
  slogan: settings?.slogan || undefined,
  url: SITE_URL,
  image: settings?.images ?? undefined,
  logo: `${SITE_URL}/images/logo.png`,
  telephone: settings?.contact?.phone ? phoneHref(settings.contact.phone) : undefined,
  email: settings?.contact?.email ?? undefined,
  inLanguage: "de-AT",
  founder: settings?.contact?.name
    ? {
        "@type": "Person",
        name: settings.contact.name,
        jobTitle: "Schwimmcoach",
      }
    : undefined,
  address: settings?.address?.street
    ? {
        "@type": "PostalAddress",
        streetAddress: settings.address.street,
        addressLocality: settings.address.city ?? undefined,
        addressRegion: "Burgenland",
        postalCode: settings.address.postalCode ?? undefined,
        addressCountry: "AT",
      }
    : undefined,
  // Coordinates of the Hirm address — update together if the address ever moves.
  geo: {
    "@type": "GeoCoordinates",
    latitude: 47.7865,
    longitude: 16.4546,
  },
  areaServed: settings?.contact?.location
    ? {
        "@type": "AdministrativeArea",
        name: settings.contact.location,
      }
    : undefined,
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
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // "<" escaped so text edited in Sanity can never close the inline script.
  const jsonLd = JSON.stringify(structuredData(await getSiteSettings())).replace(/</g, "\\u003c");

  return (
    // suppressHydrationWarning: the intro boot script may add a class to <html> before hydration.
    <html lang="de-AT" className={`${playfair.variable} ${dmSans.variable}`} suppressHydrationWarning>
      <body className="antialiased bg-water-950 text-cream overflow-x-hidden">
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
        <a
          href="#start"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-water-500 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-white focus:shadow-lg"
        >
          Zum Inhalt springen
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLd }}
        />
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
