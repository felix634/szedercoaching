import { defineField, defineType } from "sanity";
import { imageField } from "./shared";

export default defineType({
  name: "hero",
  title: "Nyitókép",
  type: "document",
  fields: [
    imageField("image", "Háttérkép", { description: "A teljes képernyős fotó a lap tetején." }),
    defineField({ name: "eyebrow", title: "Kis felirat a logó alatt", type: "string" }),
    defineField({
      name: "line1",
      title: "Főcím, 1. sor",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "line2",
      title: "Főcím, 2. sor",
      type: "string",
      description: "Színes, dőlt betűvel.",
    }),
    defineField({ name: "text", title: "Szöveg a főcím alatt", type: "text", rows: 3 }),
    defineField({ name: "scrollLabel", title: "Felirat a lefelé mutató jel fölött", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Nyitókép" }) },
});
