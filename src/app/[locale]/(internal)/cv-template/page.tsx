import type { SearchParams } from "nuqs/server";
import { createLoader, parseAsJson, parseAsString } from "nuqs/server";
import { Resume } from "./components";
import { getTranslations } from "next-intl/server";
import { curriculumVitaeSchema } from "~/schema/curriculum";

const loader = createLoader({
  url: parseAsString,
  // eslint-disable-next-line @typescript-eslint/unbound-method
  data: parseAsJson(curriculumVitaeSchema.parse),
});

type PageProps = {
  searchParams: Promise<SearchParams>;
};

export default async function Home({ searchParams }: PageProps) {
  const t = await getTranslations("cv-template");
  const { url, data } = await loader(searchParams);

  console.log("URL:", url);
  console.log("Data:", data);

  if (!url || !data) {
    return (
      <div>
        <h1>{"Error: 400"}</h1>
        <p>{"Bad Request"}</p>
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
                    year={exp.year}
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
