import { defineArrayMember, defineField, defineType } from "sanity";
import { eyebrowField, headingField } from "./shared";

export default defineType({
  name: "cooperation",
  title: "Együttműködés",
  type: "document",
  fields: [
    eyebrowField,
    headingField,
    defineField({
      name: "partners",
      title: "Partnerek",
      type: "array",
      description: "Minden partner egy kártya. Ha a lista üres, a rész nem jelenik meg.",
      of: [
        defineArrayMember({
          type: "object",
          name: "partner",
          title: "Partner",
          fields: [
            defineField({
              name: "symbol",
              title: "Jel a kártya bal oldalán",
              type: "string",
              description: "1–2 karakter, pl. ∞",
              validation: (rule) => rule.max(3),
            }),
            defineField({ name: "topics", title: "Kis felirat a név fölött", type: "string" }),
            defineField({
              name: "name",
              title: "Név",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "text", title: "Leírás", type: "text", rows: 4 }),
            defineField({ name: "url", title: "Weboldal", type: "url" }),
            defineField({ name: "linkLabel", title: "Gomb szövege", type: "string" }),
          ],
          preview: { select: { title: "name", subtitle: "topics" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Együttműködés" }) },
});
