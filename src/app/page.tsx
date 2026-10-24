import HomePage from "@/components/HomePage";
import { getHomeContent } from "@/sanity/content";

// Re-read Sanity at most once a minute (see src/sanity/content.ts).
export const revalidate = 60;

export default async function Page() {
  return <HomePage content={await getHomeContent()} />;
}
