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
import {
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineSpacer,
} from "@/components/ui/timeline";
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
    <div className="snap-x">
      {/* Header */}
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-4xl font-bold">{profile.name}</h1>
          <p className="text-muted-foreground text-xl">{profile.jobTitle}</p>
        </div>
        <Avatar className="size-30">
          <AvatarImage
            src="/profile.jpg"
            alt="Marc Le Labourier profile picture"
            className="object-cover"
          />
          <AvatarFallback>MLL</AvatarFallback>
        </Avatar>
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
      <Section id="experience" title={t("Experiences.title")}>
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

const Section = ({
  id,
  title,
  className,
  children,
}: { title: string } & React.ComponentProps<"section">) => (
  <section className={cn("mb-8 snap-start scroll-mt-4", className)} id={id}>
    <h2 className="text-foreground mb-4 text-2xl font-semibold">{title}</h2>
    {children}
  </section>
);

const ContactElement = ({ icon: IconComp, text, link }: ContactProps) => {
  return (
    <div className="flex items-center">
      <IconComp className="text-muted-foreground mr-2 size-5" />
      {link ? (
        <a
          className="text-blue-600 hover:underline"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      ) : (
        <>{text}</>
      )}
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
    <TimelineContent className="sm:max-w-4xl">
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
