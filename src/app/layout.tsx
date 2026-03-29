import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Szeder Coaching – Schwimmcoaching mit Herz",
  description:
    "Angstabbau im Wasser, Schwimmen lernen mit Vertrauen. Individuelles Coaching für Kinder und Erwachsene mit besonderen Bedürfnissen.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-water-950 text-white">{children}</body>
    </html>
  );
}
