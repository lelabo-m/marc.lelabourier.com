import type { MetadataRoute } from "next";
import { env } from "~/env";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: env.DOMAIN,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
      alternates: {
        languages: {
          en: `${env.DOMAIN}/en`,
          fr: `${env.DOMAIN}/fr`,
        },
      },
    },
  ];
}
