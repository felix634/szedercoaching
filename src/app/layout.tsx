import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Szeder Coaching – Schwimmcoaching mit Herz",
  description:
    "Angstabbau im Wasser, Schwimmen lernen mit Vertrauen. Individuelles Coaching für Kinder und Erwachsene mit besonderen Bedürfnissen. Nordburgenland – Eisenstadt.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,500&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-water-950 text-cream overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
