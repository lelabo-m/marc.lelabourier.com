import {
  Brain,
  CircleCheckBig,
  GraduationCap,
  Heart,
  Puzzle,
  Users,
} from "lucide-react";
import { getTranslations } from "next-intl/server";

import {
  EducationCard,
  EducationCardContent,
  EducationCardHeader,
  EducationCardLearnMoreButton,
  EducationCardModuleGrid,
} from "@/components/card/education";
import {
  ExperienceCard,
  ExperienceCardContent,
  ExperienceCardHeader,
} from "@/components/card/experience";
import {
  FormationCard,
  FormationCardContent,
  FormationCardHeader,
} from "@/components/card/formation";
import {
  HobbyCategoryCard,
  HobbyCategoryCardContent,
  HobbyCategoryCardHeader,
} from "@/components/card/hobby";
import { PatentCard, PublicationCard } from "@/components/card/publication";
import {
  TechLevelIndicator,
  TechStackCard,
} from "@/components/card/tech-stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/link";
import { TimelineRenderList } from "@/components/ui/timeline";
import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
} from "@/components/ui/typography";
import { degrees } from "@/data/degrees";
import {
  experiences,
  hobbies,
  HobbyCategoryProps,
  profile,
} from "@/data/profile";
import { patents, publications } from "@/data/publications";
import { stacks, techLevels } from "@/data/tech-stack";
import { getTranslationsType } from "@/lib/i18n/utils";
import { cn, objectEntries, objectKeys } from "@/lib/utils";
import React from "react";
import { SkillCard } from "../_components/card/skill";
import { contacts } from "./config";

const skills = {
  perspective: Brain,
  optimizer: Puzzle,
  team: Users,
  adaptability: Users,
  approach: Heart,
  mentorship: GraduationCap,
};

type Translations = getTranslationsType<"HomePage">;

export default async function HomePage() {
  const buildDate = new Date();
  const formattedDate = buildDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });

  const t = await getTranslations("HomePage");

  return (
    <div>
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <TypographyH1>{profile.name}</TypographyH1>
          <TypographyLead>{profile.jobTitle}</TypographyLead>
        </div>
        <ProfilePicture />
      </header>

      {/* Contact Section */}
      <Section id="contact" title={t("Contact.title")}>
        <ContactSection />
      </Section>

      {/* Summary Section */}
      <Section id="summary" title={t("Summary.title")}>
        <SummarySection />
      </Section>

      {/* Experience Section */}
      <Section id="experiences" title={t("Experiences.title")}>
        <ProfessionalExperienceSection />
      </Section>

      {/* Education Section */}
      <Section id="education" title={t("Educations.title")}>
        <EducationSection />
      </Section>

      {/* Formations */}
      <Section id="formations" title="Formations">
        <p className="text-muted-foreground">
          Professional development and specialized training
        </p>

        <div className="space-y-6">
          {/* Entrepreneurial Program */}
          <FormationCard>
            <FormationCardHeader
              title="Entrepreneurial Program in Publishing & Edition"
              subtitle="Edistart'up"
              date="September 2021 - February 2022"
              description="edinovo FORMATION (Asfored) x LABO DE L'ÉDITION (PARIS&CO)"
              duration="5 months"
            />
            <FormationCardContent>
              {t.rich(`Formations.entrepreneurialProgram.content`, {
                p: (chunks) => <p>{chunks}</p>,
                list: (chunks) => (
                  <ul className="list-disc space-y-1 pl-5">{chunks}</ul>
                ),
                li: (chunks) => <li>{chunks}</li>,
                listTitle: (chunks) => <p className="font-medium">{chunks}</p>,
                listContainer: (chunks) => (
                  <div className="space-y-2">{chunks}</div>
                ),
              })}
            </FormationCardContent>
          </FormationCard>

          {/* Digital Publishing & Edition Rights */}
          <Card className="flex h-full flex-col">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg font-semibold">
                    Digital Publishing & Edition Rights
                  </CardTitle>
                  <CardDescription className="mt-1 text-sm">
                    Professional Training
                  </CardDescription>
                </div>
                <Badge variant="outline" className="text-xs font-medium">
                  35 hours
                </Badge>
              </div>
              <div className="text-muted-foreground mt-1 flex items-center text-sm">
                <span>edinovo FORMATION (Asfored)</span>
              </div>
              <div className="text-muted-foreground text-xs">
                May – June 2021
              </div>
            </CardHeader>
            <CardContent className="flex-grow pt-0">
              <div className="space-y-3">
                <div>
                  <p className="mb-2 text-sm font-medium">Modules:</p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Discovering the Role of a Publisher</span>
                      <span className="text-muted-foreground text-xs">
                        7 hours | 17 May 2021
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Fundamentals of Publishing Law</span>
                      <span className="text-muted-foreground text-xs">
                        7 hours | 25 May 2021
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>
                        From Idea to Implementation of a Digital Editorial
                        Project
                      </span>
                      <span className="text-muted-foreground text-xs">
                        14 hours | 26–27 May 2021
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Copyright Applied to Digital Publishing</span>
                      <span className="text-muted-foreground text-xs">
                        7 hours | 24 June 2021
                      </span>
                    </li>
                  </ul>
                </div>
                <div className="pt-2">
                  <p className="text-sm">
                    Gained practical insights into edition rights, project
                    management, and digital publishing.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <FormationCard>
            <FormationCardHeader
              title="Digital Publishing & Edition Rights"
              subtitle="Professional Training"
              date="May – June 2021"
              description="edinovo FORMATION (Asfored)"
              duration="35 hours"
            />
            <FormationCardContent>
              {t.rich(`Formations.digitalPublishing.content`, {
                p: (chunks) => <p>{chunks}</p>,
                list: (chunks) => <ul className="space-y-2">{chunks}</ul>,
                item: (chunks) => (
                  <li className="flex justify-between">{chunks}</li>
                ),
                itemTitle: (chunks) => <span>{chunks}</span>,
                itemDetails: (chunks) => (
                  <span className="text-muted-foreground text-xs">
                    {chunks}
                  </span>
                ),
                listTitle: (chunks) => (
                  <p className="mb-2 font-medium">{chunks}</p>
                ),
                listContainer: (chunks) => <div className="mb-5">{chunks}</div>,
              })}
            </FormationCardContent>
          </FormationCard>
        </div>
      </Section>

      {/* Skills Section */}
      <Section id="skills" title="Skills">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {objectKeys(skills).map((skill) => (
            <SkillCard
              key={skill}
              title={t(`Skills.${skill}.title`)}
              icon={skills[skill]}
              description={t(`Skills.${skill}.description`)}
            />
          ))}
        </div>
      </Section>

      {/* Tech Stack Section */}
      <Section id="stack" title={t("Technologies.title")}>
        <blockquote className="text-muted-foreground my-4 border-l-2 pl-6 italic">
          {t("Technologies.disclaimer")}
        </blockquote>

        <div className="flex gap-4">
          {techLevels.map((level) => (
            <div key={level} className="flex items-baseline gap-1">
              <TechLevelIndicator level={level} />
              <span className="text-foreground">{level}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
          {objectEntries(stacks).map(([domain, stack]) => (
            <TechStackCard key={domain} {...stack} />
          ))}
        </div>
      </Section>

      {/* Hobbies & Interests Section */}
      <Section id="hobbies" title={t("Hobbies.title")}>
        <div className="mb-6 space-y-4">
          {t.rich("Hobbies.description", {
            p: (chunks) => <p>{chunks}</p>,
          })}
        </div>
        <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
          {hobbies.map((hobby, index) => (
            <HobbyCategory key={index} {...hobby} />
          ))}
        </div>
      </Section>

      <Section id="publications" title="Patents & Publications">
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold">Patents</h3>
          {patents.map((patent, index) => (
            <PatentCard key={index} {...patent} />
          ))}

          <h3 className="text-xl font-semibold">Publications</h3>
          {publications.map((publication, index) => (
            <PublicationCard key={index} {...publication} />
          ))}
        </div>
      </Section>

      <Section id="information" title="Additional Information">
        <Card className="w-full">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <ul className="mt-1 list-inside space-y-1">
                  <li className="flex justify-between">
                    <h3 className="font-medium">Driver's License</h3>
                    <span className="text-muted-foreground">Yes</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Languages</h3>
                <ul className="mt-1 list-inside space-y-1">
                  <li className="flex justify-between">
                    <span>French</span>
                    <span className="text-muted-foreground">Native</span>
                  </li>
                  <li className="flex justify-between">
                    <span>English</span>
                    <span className="text-muted-foreground">
                      Proficient (reading, writing, speaking)
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 pt-6">
        <div className="grid grid-cols-1 gap-4 text-sm text-gray-600 md:grid-cols-2 lg:grid-cols-3">
          {contacts.map((contact, index) => (
            <ContactElement key={index} {...contact} />
          ))}
        </div>
        <div className="mt-4 flex flex-col items-center justify-between text-xs text-gray-500 md:flex-row">
          <p>
            © {buildDate.getFullYear()} Marc Le Labourier. All rights reserved.
          </p>
          <p className="mt-2 md:mt-0">Last updated: {formattedDate}</p>
        </div>
      </footer>
    </div>
  );
}

const ProfilePicture = () => (
  <Avatar className="size-30">
    <AvatarImage
      src="/profile.jpg"
      alt="Marc Le Labourier profile picture"
      className="object-cover"
    />
    <AvatarFallback>MLL</AvatarFallback>
  </Avatar>
);

type SectionProps = { title: string } & React.ComponentProps<"section">;

const Section = ({ id, title, className, children }: SectionProps) => (
  <section className={cn("mb-8 snap-start scroll-mt-4", className)} id={id}>
    <TypographyH2 className="mb-4">{title}</TypographyH2>
    {children}
  </section>
);

const ContactElement = ({ icon: IconComp, text, link }: ContactProps) => {
  return (
    <div className="flex items-center">
      <IconComp className="text-muted-foreground mr-2 size-5" />
      {link ? <ExternalLink href={link}>{text}</ExternalLink> : <>{text}</>}
    </div>
  );
};

const HobbyCategory = ({
  category,
  icon: IconComp,
  items,
}: HobbyCategoryProps) => (
  <HobbyCategoryCard>
    <HobbyCategoryCardHeader>
      <div className="flex items-center">
        <IconComp className="mr-2 h-6 w-6" />
        {category}
      </div>
    </HobbyCategoryCardHeader>
    <HobbyCategoryCardContent>
      <ul className="list-inside list-disc">
        {items.map((item, index) => (
          <li key={index} className="mb-1">
            {item}
          </li>
        ))}
      </ul>
    </HobbyCategoryCardContent>
  </HobbyCategoryCard>
);

const ContactSection = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {contacts.map((contact, index) => (
      <ContactElement key={index} {...contact} />
    ))}
  </div>
);

const SummarySection = async () => {
  const t = await getTranslations("HomePage");

  return (
    <>
      <p className="text-foreground">{t("Summary.intro")}</p>
      <p className="text-foreground mt-4">{t("Summary.objective")}</p>
    </>
  );
};

const ProfessionalExperienceSection = async () => {
  const t = await getTranslations("HomePage.Experiences");

  return (
    <TimelineRenderList
      items={experiences}
      renderItem={(item) => (
        <ExperienceCard>
          <ExperienceCardHeader
            jobTitle={t(`${item}.title`)}
            companyName={t(`${item}.company`)}
            date={t(`${item}.date`)}
            description={t(`${item}.description`)}
          />
          <ExperienceCardContent>
            <ul className="text-foreground flex flex-col gap-2 text-left">
              {t.rich(`${item}.highlights`, {
                highlight: (chunks) => (
                  <li className="flex items-start">
                    <CircleCheckBig className="mt-1.5 h-4 w-4 shrink-0" />
                    <p className="ml-2">{chunks}</p>
                  </li>
                ),
                b: (chunks) => <b className="font-semibold">{chunks}</b>,
              })}
            </ul>
          </ExperienceCardContent>
        </ExperienceCard>
      )}
    />
  );
};

const EducationSection = async () => {
  const t = await getTranslations("HomePage.Educations.degrees");

  return (
    <TimelineRenderList
      items={objectKeys(degrees)}
      renderItem={(item) => (
        <EducationCard className="w-full">
          <EducationCardHeader
            degree={t(`${item}.title`)}
            institution={t(`${item}.institution`)}
            location={t(`${item}.location`)}
            date={t(`${item}.date`)}
          />
          <EducationCardContent>
            <div className="flex flex-col gap-4">
              <p className="text-left text-base">{t(`${item}.description`)}</p>
              <div className="flex items-baseline justify-between">
                <h4 className="mb-2 font-semibold">Learn more about:</h4>
                <div className="flex gap-4">
                  <EducationCardLearnMoreButton href={degrees[item].cursusUrl}>
                    Cursus
                  </EducationCardLearnMoreButton>
                  <EducationCardLearnMoreButton href={degrees[item].coursesUrl}>
                    Modules
                  </EducationCardLearnMoreButton>
                </div>
              </div>
              <div>
                <h4 className="mb-2 text-left font-semibold">Modules:</h4>
                <EducationCardModuleGrid courses={degrees[item].courses} />
              </div>
            </div>
          </EducationCardContent>
        </EducationCard>
      )}
    />
  );
};

const FormationSection = async () => {
  return (
    <>
      <p className="text-muted-foreground">
        Professional development and specialized training
      </p>

      <div className="space-y-6">
        {/* Entrepreneurial Program */}
        <Card className="flex h-full flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Entrepreneurial Program in Publishing & Edition
                </CardTitle>
                <CardDescription className="mt-1 text-sm">
                  Edistart'up
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs font-medium">
                5 months
              </Badge>
            </div>
            <div className="text-muted-foreground mt-1 flex items-center text-sm">
              <span>
                edinovo FORMATION (Asfored) x LABO DE L'ÉDITION (PARIS&CO)
              </span>
            </div>
            <div className="text-muted-foreground text-xs">
              September 2021 - February 2022
            </div>
          </CardHeader>
          <CardContent className="flex-grow pt-0">
            <p className="mb-3 text-sm">
              Participated in the inaugural cohort of a comprehensive program
              designed to launch publishing houses or book-related businesses.
            </p>
            <p className="mb-3 text-sm">
              Developed a deep understanding of the publishing ecosystem,
              business model development, and market viability.
            </p>
            <div className="space-y-2">
              <p className="text-sm font-medium">Program components:</p>
              <ul className="list-disc space-y-1 pl-5 text-sm">
                <li>An online toolbox and 20 hours of e-learning modules</li>
                <li>
                  7 in-person workshops with fellow entrepreneurs and industry
                  experts
                </li>
                <li>
                  7 hours of personalized mentoring and 14 hours of expert
                  consulting
                </li>
                <li>
                  Access to a dedicated coworking space at Le Labo de L'Edition
                </li>
              </ul>
            </div>
            <div className="mt-3 text-sm">
              <p>
                Gained practical expertise in project formulation, strategic
                pitching, and navigating the digital publishing landscape, while
                deepening entrepreneurial insights through discussions with
                seasoned experts, authors, and entrepreneurs.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Digital Publishing & Edition Rights */}
        <Card className="flex h-full flex-col">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg font-semibold">
                  Digital Publishing & Edition Rights
                </CardTitle>
                <CardDescription className="mt-1 text-sm">
                  Professional Training
                </CardDescription>
              </div>
              <Badge variant="outline" className="text-xs font-medium">
                35 hours
              </Badge>
            </div>
            <div className="text-muted-foreground mt-1 flex items-center text-sm">
              <span>edinovo FORMATION (Asfored)</span>
            </div>
            <div className="text-muted-foreground text-xs">May – June 2021</div>
          </CardHeader>
          <CardContent className="flex-grow pt-0">
            <div className="space-y-3">
              <div>
                <p className="mb-2 text-sm font-medium">Modules:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span>Discovering the Role of a Publisher</span>
                    <span className="text-muted-foreground text-xs">
                      7 hours | 17 May 2021
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Fundamentals of Publishing Law</span>
                    <span className="text-muted-foreground text-xs">
                      7 hours | 25 May 2021
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>
                      From Idea to Implementation of a Digital Editorial Project
                    </span>
                    <span className="text-muted-foreground text-xs">
                      14 hours | 26–27 May 2021
                    </span>
                  </li>
                  <li className="flex justify-between">
                    <span>Copyright Applied to Digital Publishing</span>
                    <span className="text-muted-foreground text-xs">
                      7 hours | 24 June 2021
                    </span>
                  </li>
                </ul>
              </div>
              <div className="pt-2">
                <p className="text-sm">
                  Gained practical insights into edition rights, project
                  management, and digital publishing.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};
