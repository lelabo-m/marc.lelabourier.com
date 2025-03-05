import {
  Brain,
  CircleCheckBig,
  GraduationCap,
  Heart,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
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
  HobbyCategoryCard,
  HobbyCategoryCardContent,
  HobbyCategoryCardHeader,
} from "@/components/card/hobby";
import { PatentCard, PublicationCard } from "@/components/card/publication";
import {
  TechLevelIndicator,
  TechStackCard,
} from "@/components/card/tech-stack";
import { CustomIcon, Github, Linkedin } from "@/components/icons";
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
import {
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineSpacer,
} from "@/components/ui/timeline";
import {
  TypographyH1,
  TypographyH2,
  TypographyLead,
} from "@/components/ui/typography";
import { DegreeList, degrees } from "@/data/degrees";
import {
  ExperienceList,
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

interface ContactProps {
  icon: CustomIcon | LucideIcon;
  link?: string;
  text: string;
}

const contacts = [
  {
    icon: Mail,
    link: `mailto:${profile.email}`,
    text: profile.email,
  },
  {
    icon: Phone,
    text: profile.phone,
  },
  {
    icon: MapPin,
    text: profile.location,
  },
  {
    icon: Linkedin,
    link: profile.socials.linkedin.href,
    text: profile.socials.linkedin.text,
  },
  {
    icon: Github,
    link: profile.socials.github.href,
    text: profile.socials.github.text,
  },
] satisfies ContactProps[];

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
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {contacts.map((contact, index) => (
            <ContactElement key={index} {...contact} />
          ))}
        </div>
      </Section>

      {/* Summary Section */}
      <Section id="summary" title={t("Summary.title")}>
        <p className="text-foreground">{t("Summary.intro")}</p>
        <p className="text-foreground mt-4">{t("Summary.objective")}</p>
      </Section>

      {/* Experience Section */}
      <Section id="experiences" title={t("Experiences.title")}>
        <CardTimeline keys={experiences}>
          {(exp) => <ProfessionalExperience exp={exp} t={t} />}
        </CardTimeline>
      </Section>

      {/* Education Section */}
      <Section id="education" title={t("Educations.title")}>
        <CardTimeline keys={objectKeys(degrees)}>
          {(degree) => <Degree degree={degree} t={t} />}
        </CardTimeline>
      </Section>

      {/* Formations */}
      <Section id="formations" title="Formations">
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
                    Access to a dedicated coworking space at Le Labo de
                    L'Edition
                  </li>
                </ul>
              </div>
              <div className="mt-3 text-sm">
                <p>
                  Gained practical expertise in project formulation, strategic
                  pitching, and navigating the digital publishing landscape,
                  while deepening entrepreneurial insights through discussions
                  with seasoned experts, authors, and entrepreneurs.
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

const Section = ({
  id,
  title,
  className,
  children,
}: { title: string } & React.ComponentProps<"section">) => (
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

const CardTimeline = <List extends readonly string[]>({
  keys,
  children,
}: {
  keys: List;
  children: (key: List[number]) => React.ReactNode;
}) => (
  <Timeline>
    <TimelineContent className="mt-8 sm:max-w-5xl">
      {keys.flatMap((key, index) =>
        index !== 0
          ? [
              <TimelineSpacer key={`${key}-spacer`} />,
              <TimelineItem key={`${key}-item`} className="w-full">
                {children(key)}
              </TimelineItem>,
            ]
          : [
              <TimelineItem key={`${key}-item`} className="w-full">
                {children(key)}
              </TimelineItem>,
            ],
      )}
    </TimelineContent>
  </Timeline>
);

const ProfessionalExperience = ({
  exp,
  t,
}: {
  exp: ExperienceList;
  t: Translations;
}) => (
  <ExperienceCard>
    <ExperienceCardHeader
      jobTitle={t(`Experiences.${exp}.title`)}
      companyName={t(`Experiences.${exp}.company`)}
      date={t(`Experiences.${exp}.date`)}
      description={t(`Experiences.${exp}.description`)}
    />
    <ExperienceCardContent>
      <ul className="text-foreground flex flex-col gap-2 text-left">
        {t.rich(`Experiences.${exp}.highlights`, {
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
);

const Degree = ({ degree, t }: { degree: DegreeList; t: Translations }) => (
  <EducationCard className="w-full">
    <EducationCardHeader
      degree={t(`Educations.degrees.${degree}.title`)}
      institution={t(`Educations.degrees.${degree}.institution`)}
      location={t(`Educations.degrees.${degree}.location`)}
      date={t(`Educations.degrees.${degree}.date`)}
    />
    <EducationCardContent>
      <div className="flex flex-col gap-4">
        <p className="text-left text-base">
          {t(`Educations.degrees.${degree}.description`)}
        </p>
        <div className="flex items-baseline justify-between">
          <h4 className="mb-2 font-semibold">Learn more about:</h4>
          <div className="flex gap-4">
            <EducationCardLearnMoreButton href={degrees[degree].cursusUrl}>
              Cursus
            </EducationCardLearnMoreButton>
            <EducationCardLearnMoreButton href={degrees[degree].coursesUrl}>
              Modules
            </EducationCardLearnMoreButton>
          </div>
        </div>
        <div>
          <h4 className="mb-2 text-left font-semibold">Modules:</h4>
          <EducationCardModuleGrid courses={degrees[degree].courses} />
        </div>
      </div>
    </EducationCardContent>
  </EducationCard>
);

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
