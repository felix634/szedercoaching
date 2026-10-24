import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/site";
import { getSiteSettings } from "@/sanity/content";

export default async function manifest(): Promise<MetadataRoute.Manifest> {
  const settings = await getSiteSettings();
  return {
    name: SITE_NAME,
    short_name: "Szeder",
    description: settings?.seoDescription ?? undefined,
    start_url: "/",
    display: "standalone",
    background_color: "#0c1a35",
    theme_color: "#0c1a35",
    lang: "de-AT",
    icons: [
      {
        src: "/images/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/images/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/images/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
