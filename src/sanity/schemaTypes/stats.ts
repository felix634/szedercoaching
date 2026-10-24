import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "stats",
  title: "Számok",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Elemek",
      type: "array",
      description: "A sáv a Történet alatt. Négy elem fér el egy sorban.",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({
              name: "value",
              title: "Nagy szám vagy jel",
              type: "string",
              description: "Pl. 100%, 1:1, ∞ vagy ♡",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "label", title: "Felirat alatta", type: "string" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Számok" }) },
});
