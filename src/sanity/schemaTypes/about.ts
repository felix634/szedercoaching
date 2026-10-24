import { defineField, defineType } from "sanity";
import { eyebrowField, headingField, imageField } from "./shared";

export default defineType({
  name: "about",
  title: "Rólam",
  type: "document",
  fields: [
    eyebrowField,
    headingField,
    imageField("image", "Portré"),
    defineField({ name: "name", title: "Név a portrén", type: "string" }),
    defineField({ name: "role", title: "Szerep a portrén", type: "string" }),
    defineField({ name: "missionTitle", title: "Alcím a szöveg fölött", type: "string" }),
    defineField({ name: "body", title: "Szöveg", type: "richText" }),
    defineField({
      name: "highlight",
      title: "Kiemelt bekezdés",
      type: "text",
      rows: 4,
      description: "A szöveg végén, világosabb betűvel.",
    }),
    defineField({
      name: "tags",
      title: "Címkék",
      type: "array",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
  ],
  preview: { prepare: () => ({ title: "Rólam" }) },
});
