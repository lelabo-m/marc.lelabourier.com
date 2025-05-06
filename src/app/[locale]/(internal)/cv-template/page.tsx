import { tryCatch } from "@/lib/try-catch";
import { type CurriculumVitaeSchema } from "@/server/api/routers/curriculum";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import type { SearchParams } from "nuqs/server";
import { createLoader, parseAsString } from "nuqs/server";
import { Resume } from "./components";
import { getTranslations } from "next-intl/server";

const loader = createLoader({
  url: parseAsString,
});

type PageProps = {
  searchParams: Promise<SearchParams>;
};

const mockData = {
  curriculum: {
    name: "Marc Le Labourier",
    jobTitle: "Full Stack Developer",
    description:
      "French developer with 14+ years of hands-on experience in computer science and software development, drawing from both cutting-edge R&I and dynamic startup environments, I honed my expertise in backend, applied research & innovation, data processing and analysis, while broadening my skills in frontend, design, and infrastructure.",
    softSkills: [
      "Transparent & Down-to-Earth",
      "Problem Solver",
      "Holistic Perspective",
      "Leadership & Collaboration",
      "Flexibility & Alignment",
      "Mentorship & Learning",
    ],
    technicalSkills: [
      "TypeScript",
      "React",
      "Next.js",
      "Tailwind CSS",
      "Python",
      "Go",
      "AWS",
      "Vercel",
      "Rust",
      "C++",
    ],
    projects: [],
    education: [
      {
        title: "Master's degree in Computer Science and Information Technology",
        institution: "EPITECH (European Institute of Information Technology)",
        year: "2012 - 2017",
      },
      {
        title:
          "Master of Science in Advanced Computer Science (Computational Intelligence)",
        institution: "University of Kent",
        year: "2016",
      },
    ],
    experience: [
      {
        jobTitle: "Head of Backend, Data, and Research",
        company: "Singlespot",
        duration: "2 years",
        responsibilities: [
          "Python",
          "Rust",
          "Apache Pulsar",
          "Snowflake",
          "Docker",
          "AWS",
          "Kubernetes",
          "OpenStreetMap",
          "Microservices",
          "Data Engineering",
          "Cloud Architecture",
          "Geospatial Analysis",
          "Technical Leadership",
          "Strategic Thinking",
          "Negotiation",
        ],
      },
      {
        jobTitle: "Junior Backend Developer & Lead Data Engineer",
        company: "Singlespot",
        duration: "2 years",
        responsibilities: [
          "Python",
          "Ruby on Rails",
          "PostgreSQL",
          "AWS",
          "Data Mining",
          "Machine Learning",
          "Data Engineering",
          "Backend Development",
          "Audience Segmentation",
          "Research",
          "Leadership",
          "Mentoring",
        ],
      },
      {
        jobTitle: "Research Engineer Intern – 3D Object Protection",
        company: "Technicolor",
        duration: "1 year",
        responsibilities: [
          "C++",
          "Qt",
          "Meshlab",
          "3D Graphics",
          "3D Mathematics",
          "Cryptography",
          "Security",
          "Algorithm Implementation",
          "Research",
          "Problem-Solving",
          "Collaboration",
          "Technical Writing",
        ],
      },
      {
        jobTitle: "Regional Teaching Assistant",
        company: "Epitech",
        duration: "7 months",
        responsibilities: [
          "C",
          "Computer Science",
          "Algorithms",
          "Unix/Linux Administration",
          "Cybersecurity",
          "Mentoring",
          "Teaching",
          "Communication",
          "Teamwork",
        ],
      },
      {
        jobTitle: "Full Stack Developer Intern",
        company: "Creawave",
        duration: "6 months",
        responsibilities: [
          "Python",
          "Django",
          "Full-Stack Web Development",
          "UI/UX Design",
          "Autonomy",
          "Communication",
          "Self-Learning",
          "Project Management",
        ],
      },
    ],
    languages: [
      {
        name: "French",
        level: "native",
      },
      {
        name: "English",
        level: "proficient",
      },
    ],
    hobbies: [
      "Manga & Webtoons",
      "Video & Board Games",
      "Podcasts & Audio Fiction",
      "Roleplaying Games",
      "Metabolism & Nutrition",
      "Anatomy & Physiology",
      "Musculation",
      "Swimming",
      "Handball",
      "Wheelchair Handball",
      "Disability Awareness Initiatives",
    ],
    contact: {
      email: "marc.lelabourier@gmail.com",
      phone: "(+33)0638415550",
      address: "SQY, Yvelines, France",
      socials: [
        {
          platform: "LinkedIn",
          username: "marclelabourier",
          url: "https://www.linkedin.com/in/marclelabourier/",
        },
        {
          platform: "GitHub",
          username: "lelabo-m",
          url: "https://github.com/lelabo-m",
        },
      ],
    },
  },
};

const mockData2 = {
  curriculum: {
    name: "Dominik",
    jobTitle: "Web Developer",
    description:
      "I'm a Web Developer and open source maintainer who ❤️ ReactJs and TypeScript. I'm currently maintaining TanStack/query and TanStack/router.",
    contact: {
      email: "",
      phone: "",
      address: "",
      socials: [
        {
          platform: "GitHub",
          username: "TkDodo",
          url: "https://github.com/TkDodo",
        },
        {
          platform: "TanStack",
          username: "",
          url: "https://github.com/TanStack",
        },
        {
          platform: "TanStack/query",
          username: "",
          url: "https://github.com/TanStack/query",
        },
        {
          platform: "TanStack/router",
          username: "",
          url: "https://github.com/TanStack/router",
        },
        {
          platform: "Sponsor",
          username: "",
          url: "https://github.com/sponsors/TkDodo",
        },
      ],
    },
    softSkills: [],
    technicalSkills: ["ReactJs", "TypeScript"],
    education: [],
    experience: [],
    hobbies: [],
    languages: [],
  },
};

const getData = async (): Promise<CurriculumVitaeSchema> => mockData;

export default async function Home({ searchParams }: PageProps) {
  const t = await getTranslations("cv-template");
  const { url } = await loader(searchParams);

  if (!url) return <div>{"URL is required"}</div>;

  // const { data, error } = await tryCatch(api.cv.scrape({ url }));
  const { data, error } = await tryCatch(getData());

  if (error) {
    if (error instanceof TRPCError) {
      const statusCode = getHTTPStatusCodeFromError(error);
      return (
        <div>
          <h1>{`Error: ${statusCode}`}</h1>
          <p>{error.message}</p>
        </div>
      );
    }

    return (
      <div>
        <h1>{"Error: 500"}</h1>
        <p>{"Internal Server Error"}</p>
      </div>
    );
  }

  const { curriculum } = data;

  return (
    <Resume.Page>
      <Resume.Container>
        <Resume.Header>
          <div className="grid grid-cols-3">
            <Resume.Header.Contacts {...curriculum.contact} />
            <Resume.Header.Title
              name={curriculum.name}
              jobTitle={curriculum.jobTitle}
            />
          </div>

          <Resume.Header.Introduction>
            {curriculum.description}
          </Resume.Header.Introduction>
          <Resume.Header.Socials socials={curriculum.contact.socials} />
        </Resume.Header>

        <Resume.Layout>
          <Resume.Layout.LeftColumn>
            <Resume.Section>
              <Resume.Section.Title>
                {t("sections.tech-skills")}
              </Resume.Section.Title>
              <div className="flex flex-wrap gap-1">
                {curriculum.technicalSkills.map((skill) => (
                  <Resume.Skill key={skill} skill={skill} />
                ))}
              </div>
            </Resume.Section>

            <Resume.Section>
              <Resume.Section.Title>
                {t("sections.soft-skills")}
              </Resume.Section.Title>
              <ul className="space-y-1 text-sm">
                {curriculum.softSkills.map((skill) => (
                  <li key={skill} className="flex items-start">
                    <span className="mr-1">{"•"}</span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </Resume.Section>

            <Resume.Section>
              <Resume.Section.Title>{t("sections.lang")}</Resume.Section.Title>
              <ul className="space-y-1 text-sm">
                {curriculum.languages.map((language) => (
                  <li key={language.name}>
                    <span className="font-medium">{language.name}</span>
                    <span className="text-gray-600">
                      {" - "}
                      {language.level}
                    </span>
                  </li>
                ))}
              </ul>
            </Resume.Section>

            <Resume.Section>
              <Resume.Section.Title>
                {t("sections.education")}
              </Resume.Section.Title>
              <ul className="space-y-3 text-sm">
                {curriculum.education.map((degree) => (
                  <li key={degree.title}>
                    <div className="font-medium">{degree.title}</div>
                    <div>{degree.institution}</div>
                    <div className="text-gray-600">{degree.year}</div>
                  </li>
                ))}
              </ul>
            </Resume.Section>
          </Resume.Layout.LeftColumn>

          <Resume.Layout.RightColumn>
            <Resume.Section>
              <Resume.Section.Title>
                {t("sections.experience")}
              </Resume.Section.Title>
              <div className="space-y-8">
                {curriculum.experience.map((exp) => (
                  <Resume.Experience
                    key={exp.jobTitle + exp.company}
                    jobTitle={exp.jobTitle}
                    company={exp.company}
                    duration={exp.duration}
                    skills={exp.responsibilities}
                  />
                ))}
              </div>
            </Resume.Section>
          </Resume.Layout.RightColumn>
          <Resume.Layout.Footer>
            <Resume.Section>
              <Resume.Section.Title>
                {t("sections.interest")}
              </Resume.Section.Title>
              <div className="flex flex-wrap gap-1">
                {curriculum.hobbies.map((hobby) => (
                  <Resume.Skill key={hobby} skill={hobby} />
                ))}
              </div>
            </Resume.Section>
            <Resume.Watermark source={url} />
          </Resume.Layout.Footer>
        </Resume.Layout>
      </Resume.Container>
    </Resume.Page>
  );
}
