import * as z from "zod";

import { parseWebsite } from "@/lib/firecrawl";
import { saveAsPdf } from "@/lib/save-as-pdf";
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
    .input(z.object({ url: z.string() }))
    .mutation(async ({ input }) => {
      return saveAsPdf(input.url);
    }),
});
