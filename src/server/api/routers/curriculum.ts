import * as z from "zod";

import { parseWebsite } from "@/lib/firecrawl";
import { routing } from "@/lib/i18n/routing";
import { saveAsPdf } from "@/lib/save-as-pdf";
import { getBaseUrl } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";

export const curriculumRouter = createTRPCRouter({
  scrape: publicProcedure
    .input(z.object({ url: z.string().url() }))
    .query(async ({ input }) => {
      return parseWebsite(input.url);
    }),

  scrapePdfData: publicProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      return parseWebsite(input.url);
    }),
  generatePdf: publicProcedure
    .input(z.object({ locale: z.enum(routing.locales), url: z.string().url() }))
    .mutation(async ({ input }) => {
      const url = `${getBaseUrl()}/${input.locale}/cv-template/?url=${input.url}`;
      return saveAsPdf(url);
    }),
});
