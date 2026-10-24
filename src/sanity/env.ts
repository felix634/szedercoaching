// The project ID and dataset are public (they appear in every image URL), so they
// live in code; the env vars only exist to point a local build at another dataset.
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "x0bcfevf";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const apiVersion = "2026-10-01";
