import type { PortableTextBlock } from "next-sanity";
import { client } from "./client";

// Pages re-read Sanity at most once a minute (ISR), so a published edit is live
// within about a minute. Route files repeat the 60 as a literal (`revalidate`),
// because Next.js only accepts literals there.
const CACHE = { next: { revalidate: 60 } };

/** An image from Sanity; `position` is the editor's focus point as CSS object-position. */
export type Picture = { url: string; alt: string | null; position: string | null };
/** Section title: plain part + coloured highlight at the end. */
export type Heading = { text: string | null; highlight: string | null };
export type RichText = PortableTextBlock[];

type Section = { eyebrow: string | null; heading: Heading | null };

export type HeroContent = {
  image: Picture | null;
  eyebrow: string | null;
  line1: string | null;
  line2: string | null;
  text: string | null;
  scrollLabel: string | null;
};

export type OfferCard = {
  image?: Picture | null;
  label?: string | null;
  title: string | null;
  text: string | null;
  tags?: string[] | null;
  linkLabel?: string | null;
};

export type GalleryGroup = { _key: string; title: string; images: Picture[] | null };

export type Testimonial = {
  _key: string;
  body: RichText | null;
  highlight: string | null;
  author: string | null;
  role: string | null;
};

export type Partner = {
  _key: string;
  symbol: string | null;
  topics: string | null;
  name: string | null;
  text: string | null;
  url: string | null;
  linkLabel: string | null;
};

export type ContactContent = Section & {
  infoTitle: string | null;
  name: string | null;
  phone: string | null;
  email: string | null;
  location: string | null;
  formTitle: string | null;
};

export type HomeContent = {
  hero: HeroContent | null;
  marquee: string[] | null;
  story: (Section & { image: Picture | null; quote: string | null; body: RichText | null }) | null;
  stats: { value: string; label: string | null }[] | null;
  about:
    | (Section & {
        image: Picture | null;
        name: string | null;
        role: string | null;
        missionTitle: string | null;
        body: RichText | null;
        highlight: string | null;
        tags: string[] | null;
      })
    | null;
  offers:
    | (Section & {
        intro: string | null;
        card1: OfferCard | null;
        card2: OfferCard | null;
        card3: OfferCard | null;
        card4: OfferCard | null;
        card5: OfferCard | null;
        card6: OfferCard | null;
        card7: OfferCard | null;
        card8: OfferCard | null;
      })
    | null;
  quote: { image: Picture | null; text: string | null; subtext: string | null } | null;
  gallery: (Section & { intro: string | null; groups: GalleryGroup[] | null }) | null;
  testimonials:
    | (Section & {
        intro: string | null;
        items: Testimonial[] | null;
        formHeading: Heading | null;
        formIntro: string | null;
      })
    | null;
  cooperation: (Section & { partners: Partner[] | null }) | null;
  contact: ContactContent | null;
};

const PICTURE = `{
  "url": asset->url,
  alt,
  "position": select(defined(hotspot) => string(round(hotspot.x * 100)) + "% " + string(round(hotspot.y * 100)) + "%")
}`;

const SECTION = `eyebrow, heading{ text, highlight }`;

const HOME_QUERY = `{
  "hero": *[_id == "hero"][0]{ image${PICTURE}, eyebrow, line1, line2, text, scrollLabel },
  "marquee": *[_id == "marquee"][0].words,
  "story": *[_id == "story"][0]{ ${SECTION}, image${PICTURE}, quote, body },
  "stats": *[_id == "stats"][0].items[]{ value, label },
  "about": *[_id == "about"][0]{
    ${SECTION}, image${PICTURE}, name, role, missionTitle, body, highlight, tags
  },
  "offers": *[_id == "offers"][0]{
    ${SECTION}, intro,
    card1, card2, card3, card4{ ..., image${PICTURE} }, card5, card6, card7, card8{ ..., image${PICTURE} }
  },
  "quote": *[_id == "quote"][0]{ image${PICTURE}, text, subtext },
  "gallery": *[_id == "gallery"][0]{
    ${SECTION}, intro, groups[]{ _key, title, images[]${PICTURE} }
  },
  "testimonials": *[_id == "testimonials"][0]{
    ${SECTION}, intro, items[]{ _key, body, highlight, author, role },
    formHeading{ text, highlight }, formIntro
  },
  "cooperation": *[_id == "cooperation"][0]{
    ${SECTION}, partners[]{ _key, symbol, topics, name, text, url, linkLabel }
  },
  "contact": *[_id == "contact"][0]{ ${SECTION}, infoTitle, name, phone, email, location, formTitle }
}`;

export function getHomeContent() {
  return client.fetch<HomeContent>(HOME_QUERY, {}, CACHE);
}

export type SiteSettings = {
  seoTitle: string | null;
  seoDescription: string | null;
  keywords: string[] | null;
  ogImage: Picture | null;
  address: { street: string | null; postalCode: string | null; city: string | null } | null;
  slogan: string | null;
  images: string[] | null;
  contact: Pick<ContactContent, "name" | "phone" | "email" | "location"> | null;
};

// Everything the layout needs: metadata, the social preview and the JSON-LD.
const SETTINGS_QUERY = `*[_id == "settings"][0]{
  seoTitle, seoDescription, keywords, ogImage${PICTURE}, address,
  "slogan": array::join(array::compact([*[_id == "hero"][0].line1, *[_id == "hero"][0].line2]), " "),
  "images": array::compact([
    ogImage.asset->url,
    *[_id == "hero"][0].image.asset->url,
    *[_id == "offers"][0].card4.image.asset->url
  ]),
  "contact": *[_id == "contact"][0]{ name, phone, email, location }
}`;

export function getSiteSettings() {
  return client.fetch<SiteSettings | null>(SETTINGS_QUERY, {}, CACHE);
}

export type LegalContent = {
  title: string;
  intro: string | null;
  updated: string | null;
  body: RichText | null;
  seoDescription: string | null;
};

export function getLegalPage(id: "impressum" | "datenschutz") {
  return client.fetch<LegalContent | null>(
    `*[_type == "legalPage" && _id == $id][0]{ title, intro, updated, body, seoDescription }`,
    { id },
    CACHE
  );
}

/** "+43 677 6152 6206" → "+4367761526206" for tel: links and structured data. */
export function phoneHref(phone: string) {
  return phone.replace(/[^\d+]/g, "");
}
