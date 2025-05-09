import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "fr"],
  defaultLocale: "en",
});

export const routingExceptions = [
  /^robots\.txt$/,
  /^sitemap\.xml$/,
  /^favicon\.(ico|png)$/,
  /^apple-touch-icon(-precomposed)?\.png$/,
  /^manifest\.json$/,
  /^ads\.txt$/,
  /^humans\.txt$/,
];
