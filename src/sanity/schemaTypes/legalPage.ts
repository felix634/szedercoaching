import { defineField, defineType } from "sanity";

// Impressum and Datenschutz: two fixed documents of this type.
export default defineType({
  name: "legalPage",
  title: "Jogi oldal",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Oldal címe",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "intro", title: "Bevezető", type: "text", rows: 3 }),
    defineField({
      name: "updated",
      title: "Hatályos (Stand)",
      type: "string",
      description: "Pl. Juli 2026 – módosítás után érdemes átírni.",
    }),
    defineField({ name: "body", title: "Szöveg", type: "legalText" }),
    defineField({
      name: "seoDescription",
      title: "Leírás a Google-nek",
      type: "text",
      rows: 2,
    }),
  ],
  preview: { select: { title: "title" } },
});
