import { defineField, defineType } from "sanity";
import { imageField } from "./shared";

export default defineType({
  name: "quote",
  title: "Idézet",
  type: "document",
  fields: [
    imageField("image", "Háttérkép", {
      description: "Sötét réteg kerül rá, hogy a szöveg olvasható maradjon.",
    }),
    defineField({
      name: "text",
      title: "Idézet",
      type: "text",
      rows: 3,
      description: "Görgetés közben szavanként tűnik elő.",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "subtext", title: "Szöveg az idézet alatt", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Idézet" }) },
});
