import { heading, legalText, richText } from "./shared";
import hero from "./hero";
import marquee from "./marquee";
import story from "./story";
import stats from "./stats";
import about from "./about";
import offers from "./offers";
import quote from "./quote";
import gallery from "./gallery";
import testimonials from "./testimonials";
import cooperation from "./cooperation";
import contact from "./contact";
import legalPage from "./legalPage";
import settings from "./settings";

export const schemaTypes = [
  // homepage sections, top to bottom (one fixed document each)
  hero,
  marquee,
  story,
  stats,
  about,
  offers,
  quote,
  gallery,
  testimonials,
  cooperation,
  contact,
  // other pages and site-wide data
  legalPage,
  settings,
  // shared field types
  heading,
  richText,
  legalText,
];
