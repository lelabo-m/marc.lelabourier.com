import { z } from "zod";

import { saveAsPdf } from "@/lib/save-as-pdf";
import { getBaseUrl } from "@/lib/utils";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import FirecrawlApp, { type ScrapeResponse } from "@mendable/firecrawl-js";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";

export const resumeSchema = z
  .object({
    resume: z.object({
      name: z.string().describe("The name of the person"),
      jobTitle: z
        .string()
        .describe(
          "The job title of the person (for current position or most relevant)",
        ),
      description: z.string().describe("How the person describes themselves"),
      contact: z.object({
        email: z.string().optional(),
        phone: z.string().optional(),
        address: z.string().optional(),
        socials: z.array(
          z
            .object({
              platform: z
                .string()
                .describe(
                  "The name of the social media platform (should usually match the url)",
                ),
              username: z
                .string()
                .describe("The username of the person on the platform"),
              url: z.string().describe("The URL of the social media account"),
            })
            .describe("The social media accounts of the person"),
        ),
      }),
      softSkills: z
        .array(z.string())
        .describe(
          "The soft skills of the person: e.g. communication, teamwork",
        ),
      technicalSkills: z
        .array(z.string())
        .describe(
          "The technical skills of the person or specialized tools used by this person: e.g. python, javascript",
        ),
      education: z
        .array(
          z.object({
            title: z.string(),
            institution: z.string(),
            year: z.string(),
          }),
        )
        .describe(
          "The education of the person: e.g. degree's title, institution, year",
        ),
      experience: z.array(
        z.object({
          jobTitle: z.string(),
          company: z.string(),
          duration: z.string(),
          responsibilities: z.array(z.string()),
        }),
      ),
      hobbies: z.array(z.string()),
      languages: z.array(
        z.object({
          name: z.string(),
          level: z.enum(["basic", "intermediate", "fluent", "native"]),
        }),
      ),
    }),
  })
  .describe("Resume Schema");

export type ResumeSchema = z.infer<typeof resumeSchema>;

const firecrawl = new FirecrawlApp({
  apiKey: env.FIRECRAWL_API_KEY,
});

export const resumeRouter = createTRPCRouter({
  scrape: publicProcedure
    .input(z.object({ url: z.string().url() }))
    .query(async ({ input }) => {
      const scrapeResult = await firecrawl.scrapeUrl(input.url, {
        formats: ["json"],
        jsonOptions: { schema: resumeSchema },
      }) as ScrapeResponse;

      if (!scrapeResult.success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: `Failed to scrape: ${scrapeResult.error}`,
        });
      }


      const data = (scrapeResult.json) as ResumeSchema | undefined;

      if (!data) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "No data found.",
        });
      }

      return data;
    }),

  generatePdf: publicProcedure
    .input(z.object({ url: z.string().url() }))
    .mutation(async ({ input }) => {
      const url = `${getBaseUrl()}/en/resume-layout/?url=${input.url}`;
      const pdf = await saveAsPdf(url);
      return pdf;
    }),
});
