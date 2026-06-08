import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "Szeder",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0c1a35",
    theme_color: "#0c1a35",
    lang: "de-AT",
    icons: [
      {
        src: "/images/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
