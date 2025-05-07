/* eslint-disable */
import FirecrawlApp from "@mendable/firecrawl-js";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env";
import {
  curriculumVitaeSchema,
  type CurriculumVitaeSchema,
} from "~/schema/curriculum";

const firecrawl = new FirecrawlApp({
  apiKey: env.FIRECRAWL_API_KEY,
});


export async function parseWebsite(url: string) {
    const options = {
        formats: ["json"],
        jsonOptions: { schema: z.object({ curriculum: curriculumVitaeSchema}) },
      };

  const scrapeResult = await firecrawl.scrapeUrl(url, options);

  if (!scrapeResult.success) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Failed to scrape: ${scrapeResult.error}`,
    });
  }

  const data = scrapeResult.json as { curriculum: CurriculumVitaeSchema} | undefined;

  if (!data) {
    throw new TRPCError({
      code: "BAD_REQUEST",
      message: "No data found.",
    });
  }
  return data;
}
