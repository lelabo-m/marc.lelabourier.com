import type { MetadataRoute } from "next";

const DOMAIN = "https://marc.lelabourier.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: DOMAIN,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${DOMAIN}/en`,
          fr: `${DOMAIN}/fr`,
        },
      },
    },
  ];
}
