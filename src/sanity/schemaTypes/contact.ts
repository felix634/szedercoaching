import { defineField, defineType } from "sanity";
import { eyebrowField, headingField } from "./shared";

export default defineType({
  name: "contact",
  title: "Kapcsolat",
  type: "document",
  fields: [
    eyebrowField,
    headingField,
    defineField({ name: "infoTitle", title: "Az elérhetőségek doboz címe", type: "string" }),
    defineField({ name: "name", title: "Név", type: "string" }),
    defineField({
      name: "phone",
      title: "Telefonszám",
      type: "string",
      description: "Így jelenik meg, pl. +43 677 6152 6206. A hívható link ebből készül.",
    }),
    defineField({
      name: "email",
      title: "E-mail-cím",
      type: "string",
      description:
        "Az oldalon megjelenő cím. Az űrlapok üzenetei ettől függetlenül az eszterbary@szedercoaching.at címre mennek; ha ez változik, szólj a fejlesztőnek.",
      validation: (rule) => rule.email(),
    }),
    defineField({ name: "location", title: "Hely", type: "string" }),
    defineField({ name: "formTitle", title: "Az üzenetküldő űrlap címe", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "Kapcsolat" }) },
});
