import { defineField, defineType } from "sanity";
import { eyebrowField, headingField, imageField } from "./shared";

export default defineType({
  name: "story",
  title: "Történet",
  type: "document",
  fields: [
    eyebrowField,
    headingField,
    imageField("image", "Kép"),
    defineField({
      name: "quote",
      title: "Idézet a kép mellett",
      type: "text",
      rows: 2,
      description: "Az idézőjeleket az oldal teszi hozzá.",
    }),
    defineField({ name: "body", title: "Szöveg az idézet alatt", type: "richText" }),
  ],
  preview: { prepare: () => ({ title: "Történet" }) },
});
