import { defineArrayMember, defineField, defineType } from "sanity";
import { eyebrowField, headingField, imageMember, introField } from "./shared";

export default defineType({
  name: "gallery",
  title: "Galéria",
  type: "document",
  fields: [
    eyebrowField,
    headingField,
    introField,
    defineField({
      name: "groups",
      title: "Képcsoportok",
      type: "array",
      description:
        "Minden csoport egy lapozható képsor a saját címével. Új csoport a lista alján adható hozzá, a sorrend húzással állítható.",
      of: [
        defineArrayMember({
          type: "object",
          name: "galleryGroup",
          title: "Képcsoport",
          fields: [
            defineField({
              name: "title",
              title: "Csoport címe",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "images",
              title: "Képek",
              type: "array",
              of: [imageMember],
              options: { layout: "grid" },
              description: "Több képet egyszerre is ráhúzhatsz. A sorrend húzással állítható.",
              validation: (rule) => rule.min(1).error("Legalább egy kép kell."),
            }),
          ],
          preview: {
            select: { title: "title", media: "images.0", images: "images" },
            prepare: ({ title, media, images }) => ({
              title,
              media,
              subtitle: `${images?.length ?? 0} kép`,
            }),
          },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Galéria" }) },
});
