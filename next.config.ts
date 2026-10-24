import type { NextConfig } from "next";
import { dataset, projectId } from "./src/sanity/env";

// Content-Security-Policy: allows the site's own assets, inline styles (Tailwind /
// framer-motion) and the inline JSON-LD script, data/blob images (next/image),
// while blocking framing and plugins. Sanity images also come through next/image
// (/_next/image), so visitors' browsers never contact Sanity directly.
const isDev = process.env.NODE_ENV !== "production";

const ContentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-eval' is only needed by Next.js Fast Refresh in development.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
];

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF (≈20–30 % smaller than WebP) and keep optimized variants
    // cached for 31 days instead of the 60-second default.
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: `/images/${projectId}/${dataset}/**` },
    ],
  },
  // The embedded Sanity Studio (/studio) is built with styled-components.
  compiler: { styledComponents: true },
  async headers() {
    return [
      {
        // Everything except the Studio, which calls Sanity's API from the browser.
        source: "/((?!studio).*)",
        headers: [{ key: "Content-Security-Policy", value: ContentSecurityPolicy }],
      },
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
