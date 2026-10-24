import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LegalPage from "@/components/LegalPage";
import RichText from "@/components/RichText";
import { getLegalPage } from "@/sanity/content";

// The text is edited in Sanity ("Adatvédelem"); re-read at most once a minute.
export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const page = await getLegalPage("datenschutz");
  return {
    title: page?.title ?? "Datenschutzerklärung",
    description: page?.seoDescription ?? undefined,
    alternates: { canonical: "/datenschutz" },
  };
}

export default async function DatenschutzPage() {
  const page = await getLegalPage("datenschutz");
  if (!page) notFound();

  return (
    <LegalPage title={page.title} intro={page.intro} lastUpdated={page.updated}>
      <RichText value={page.body} />
    </LegalPage>
  );
}
