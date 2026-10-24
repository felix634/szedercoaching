import { defineField, defineType } from "sanity";

export default defineType({
  name: "marquee",
  title: "Futó szavak",
  type: "document",
  fields: [
    defineField({
      name: "words",
      title: "Szavak",
      type: "array",
      of: [{ type: "string" }],
      description:
        "A nyitókép alatt végtelenítve úszó szalag. Minden második szó dőlt, körvonalas betűs. A sorrend húzással állítható.",
      validation: (rule) => rule.min(2).error("Legalább két szó kell."),
    }),
  ],
  preview: { prepare: () => ({ title: "Futó szavak" }) },
});
