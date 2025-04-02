import type { MetadataRoute } from "next";
import { env } from "~/env";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: `${env.DOMAIN}/sitemap.xml`,
  };
}
