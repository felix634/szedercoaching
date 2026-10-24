import { PortableText, type PortableTextComponents } from "next-sanity";
import type { RichText as RichTextValue } from "@/sanity/content";

const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }) => {
      const href: string = value?.href ?? "";
      const external = href.startsWith("http") && !href.includes("szedercoaching.at");
      return (
        <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
          {children}
        </a>
      );
    },
  },
};

const hasText = (block: RichTextValue[number]) =>
  (block.children as { text?: string }[] | undefined)?.some((span) => span.text?.trim());

/**
 * Text edited in Sanity, rendered as bare <p> (and on the legal pages <h2>/<ul>)
 * elements without a wrapper, so the parent's spacing and colours apply.
 * Empty paragraphs (an extra Enter in the editor) are dropped.
 */
export default function RichText({ value }: { value: RichTextValue | null }) {
  if (!value?.length) return null;
  return <PortableText value={value.filter(hasText)} components={components} />;
}
