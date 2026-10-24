import { defineArrayMember, defineField, defineType } from "sanity";
import { eyebrowField, headingField, introField } from "./shared";

export default defineType({
  name: "testimonials",
  title: "Vélemények",
  type: "document",
  groups: [
    { name: "reviews", title: "Vélemények", default: true },
    { name: "form", title: "Visszajelzés-űrlap" },
  ],
  fields: [
    { ...eyebrowField, group: "reviews" },
    { ...headingField, group: "reviews" },
    { ...introField, group: "reviews" },
    defineField({
      name: "items",
      title: "Vélemények",
      type: "array",
      group: "reviews",
      description: "Új vélemény a lista alján adható hozzá, a sorrend húzással állítható.",
      of: [
        defineArrayMember({
          type: "object",
          name: "testimonial",
          title: "Vélemény",
          fields: [
            defineField({ name: "body", title: "Szöveg", type: "richText" }),
            defineField({
              name: "highlight",
              title: "Kiemelt mondat a végén",
              type: "text",
              rows: 2,
              description: "Nagyobb, dőlt betűvel. Az idézőjeleket ide kell írni: „…“",
            }),
            defineField({
              name: "author",
              title: "Név",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "role",
              title: "Kiegészítés a név alatt",
              type: "string",
              description: "Pl. Schwimmschüler & Mama",
            }),
          ],
          preview: { select: { title: "author", subtitle: "role" } },
        }),
      ],
    }),
    defineField({
      name: "formHeading",
      title: "Az űrlap címe",
      type: "heading",
      group: "form",
    }),
    defineField({
      name: "formIntro",
      title: "Az űrlap bevezetője",
      type: "text",
      rows: 3,
      group: "form",
    }),
  ],
  preview: { prepare: () => ({ title: "Vélemények" }) },
});
