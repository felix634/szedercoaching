import { defineField, defineType } from "sanity";
import { imageField } from "./shared";

export default defineType({
  name: "settings",
  title: "Beállítások",
  type: "document",
  fields: [
    defineField({
      name: "seoTitle",
      title: "Az oldal címe",
      type: "string",
      description: "A Google-találatban és a böngészőfülön látszik.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "seoDescription",
      title: "Leírás a Google-nek",
      type: "text",
      rows: 3,
      description: "1–2 mondat a Google-találat alatt. Legfeljebb kb. 160 karakter.",
      validation: (rule) => rule.max(160).warning("A Google kb. 160 karakter után levágja."),
    }),
    defineField({
      name: "keywords",
      title: "Kulcsszavak",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    imageField("ogImage", "Megosztási kép", {
      description:
        "Ez látszik, ha valaki megosztja az oldalt (Facebook, WhatsApp…). Ideális méret: 1200 × 630 pixel.",
    }),
    defineField({
      name: "address",
      title: "Cím (csak a Google-nek)",
      type: "object",
      description: "Nem jelenik meg az oldalon; a Google ebből tudja, hol dolgozol.",
      options: { columns: 3 },
      fields: [
        defineField({ name: "street", title: "Utca, házszám", type: "string" }),
        defineField({ name: "postalCode", title: "Irányítószám", type: "string" }),
        defineField({ name: "city", title: "Település", type: "string" }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Beállítások" }) },
});
