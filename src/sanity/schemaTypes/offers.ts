import { defineField, defineType } from "sanity";
import { eyebrowField, headingField, imageField, introField } from "./shared";

/** One slot of the bento grid: the slot fixes the shape, the fields fill it. */
function card(
  name: string,
  title: string,
  parts: { label?: string; tags?: boolean; image?: boolean; link?: boolean; description?: string }
) {
  return defineField({
    name,
    title,
    type: "object",
    description: parts.description,
    options: { collapsible: true, collapsed: true },
    fields: [
      ...(parts.image ? [imageField("image", "Kép")] : []),
      ...(parts.label ? [defineField({ name: "label", title: parts.label, type: "string" })] : []),
      defineField({ name: "title", title: "Cím", type: "string", validation: (rule) => rule.required() }),
      defineField({ name: "text", title: "Szöveg", type: "text", rows: 3 }),
      ...(parts.tags
        ? [
            defineField({
              name: "tags",
              title: "Címkék",
              type: "array",
              of: [{ type: "string" }],
              options: { layout: "tags" },
            }),
          ]
        : []),
      ...(parts.link
        ? [
            defineField({
              name: "linkLabel",
              title: "Link szövege",
              type: "string",
              description: "A Kapcsolat részhez görget.",
            }),
          ]
        : []),
    ],
  });
}

export default defineType({
  name: "offers",
  title: "Ajánlatok",
  type: "document",
  fields: [
    eyebrowField,
    headingField,
    introField,
    card("card1", "1. Nagy kártya (bal felső)", {
      label: "Jelvény jobb felül",
      tags: true,
      description:
        "A nyolc kártya helye és formája rögzített; a szövegük, címkéjük és képük szabadon írható.",
    }),
    card("card2", "2. Kártya (jobb felső)", { tags: true }),
    card("card3", "3. Kártya (jobb, a 2. alatt)", { tags: true }),
    card("card4", "4. Képes kártya (bal középen)", { image: true, label: "Kis felirat a cím fölött" }),
    card("card5", "5. Széles kártya (jobb középen)", { label: "Jelvény jobb felül" }),
    card("card6", "6. Kártya (bal alsó)", { tags: true }),
    card("card7", "7. Kártya (középső alsó)", { tags: true }),
    card("card8", "8. Képes kártya (jobb alsó)", { image: true, link: true }),
  ],
  preview: { prepare: () => ({ title: "Ajánlatok" }) },
});
