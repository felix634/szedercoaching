"use client";

import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder, type StructureResolver } from "sanity/structure";
import { huHULocale } from "@sanity/locale-hu-hu";
import { projectId, dataset } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";

// Homepage sections in page order. Every section is one fixed document whose ID
// equals its type, so the owner edits them in place and can never create a second one.
const SECTIONS = [
  ["hero", "Nyitókép (Start)"],
  ["marquee", "Futó szavak"],
  ["story", "Történet (Geschichte)"],
  ["stats", "Számok"],
  ["about", "Rólam (Über mich)"],
  ["offers", "Ajánlatok (Angebote)"],
  ["quote", "Idézet"],
  ["gallery", "Galéria (Momente im Wasser)"],
  ["testimonials", "Vélemények (Erfahrungen)"],
  ["cooperation", "Együttműködés (Kooperation)"],
  ["contact", "Kapcsolat (Kontakt)"],
] as const;

const LEGAL_PAGES = [
  ["impressum", "Impresszum"],
  ["datenschutz", "Adatvédelem (Datenschutz)"],
] as const;

const FIXED_TYPES = new Set<string>([...SECTIONS.map(([type]) => type), "legalPage", "settings"]);
const FIXED_ACTIONS = new Set(["publish", "discardChanges", "restore"]);

const fixedDocument = (S: StructureBuilder, type: string, id: string, title: string) =>
  S.listItem()
    .id(id)
    .title(title)
    .child(S.document().schemaType(type).documentId(id).title(title));

const structure: StructureResolver = (S) =>
  S.list()
    .title("Tartalom")
    .items([
      ...SECTIONS.map(([type, title]) => fixedDocument(S, type, type, title)),
      S.divider(),
      ...LEGAL_PAGES.map(([id, title]) => fixedDocument(S, "legalPage", id, title)),
      S.divider(),
      fixedDocument(S, "settings", "settings", "Beállítások (Google, megosztás)"),
    ]);

export default defineConfig({
  name: "szedercoaching",
  title: "Szeder Coaching",
  basePath: "/studio",
  projectId,
  dataset,
  plugins: [structureTool({ structure }), huHULocale()],
  schema: {
    types: schemaTypes,
    // No "new document" entries: every document already exists.
    templates: (templates) => templates.filter(({ schemaType }) => !FIXED_TYPES.has(schemaType)),
  },
  document: {
    // Fixed documents can be published, but not deleted, duplicated or unpublished.
    actions: (actions, { schemaType }) =>
      FIXED_TYPES.has(schemaType)
        ? actions.filter(({ action }) => action && FIXED_ACTIONS.has(action))
        : actions,
  },
});
