import { defineArrayMember, defineField, defineType } from "sanity";

// Studio labels are Hungarian (for the owner); the content itself stays German.

const altField = defineField({
  name: "alt",
  title: "Képleírás",
  type: "string",
  description: "Rövid német leírás arról, mi látszik a képen (Google és képernyőolvasók). Díszítő képnél üresen hagyható.",
});

/** Image with a focus point (hotspot) and an alt text. */
export function imageField(
  name: string,
  title: string,
  { description, required = true }: { description?: string; required?: boolean } = {}
) {
  return defineField({
    name,
    title,
    type: "image",
    description,
    options: { hotspot: true },
    fields: [altField],
    validation: required ? (rule) => rule.required() : undefined,
  });
}

export const imageMember = defineArrayMember({
  type: "image",
  options: { hotspot: true },
  fields: [altField],
});

export const eyebrowField = defineField({
  name: "eyebrow",
  title: "Kis felirat a cím fölött",
  type: "string",
});

export const headingField = defineField({ name: "heading", title: "Cím", type: "heading" });

export const introField = defineField({
  name: "intro",
  title: "Bevezető a cím alatt",
  type: "text",
  rows: 3,
});

/** Section title: a plain part followed by the coloured, italic highlight. */
export const heading = defineType({
  name: "heading",
  title: "Cím",
  type: "object",
  options: { columns: 2 },
  fields: [
    defineField({ name: "text", title: "Cím eleje", type: "string" }),
    defineField({
      name: "highlight",
      title: "Kiemelt rész",
      type: "string",
      description: "Színes, dőlt betűvel jelenik meg a cím végén.",
    }),
  ],
  validation: (rule) =>
    rule.custom((value: { text?: string; highlight?: string } | undefined) =>
      value?.text || value?.highlight ? true : "Adj meg címet."
    ),
});

const link = {
  name: "link",
  type: "object",
  title: "Link",
  fields: [
    defineField({
      name: "href",
      title: "Cím (URL)",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
    }),
  ],
};

const decorators = [
  { title: "Félkövér", value: "strong" },
  { title: "Dőlt", value: "em" },
];

/** Paragraphs only — the design has no headings or lists inside sections. */
export const richText = defineType({
  name: "richText",
  title: "Szöveg",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [{ title: "Bekezdés", value: "normal" }],
      lists: [],
      marks: { decorators, annotations: [link] },
    }),
  ],
});

/** Legal pages: paragraphs, subheadings and bullet lists. */
export const legalText = defineType({
  name: "legalText",
  title: "Szöveg",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Bekezdés", value: "normal" },
        { title: "Alcím", value: "h2" },
      ],
      lists: [{ title: "Felsorolás", value: "bullet" }],
      marks: { decorators, annotations: [link] },
    }),
  ],
});
