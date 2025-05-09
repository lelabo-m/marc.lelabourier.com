import * as z from "zod";

export const curriculumVitaeSchema = z
  .object({
    curriculum: z.object({
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
          year: z.string(),
          responsibilities: z.array(z.string()),
        }),
      ),
      hobbies: z.array(z.string()),
      languages: z.array(
        z.object({
          name: z.string(),
          level: z.string(),
        }),
      ),
    }),
  })
  .describe("Curriculum Vitae Schema");

export type CurriculumVitaeSchema = z.infer<typeof curriculumVitaeSchema>;
