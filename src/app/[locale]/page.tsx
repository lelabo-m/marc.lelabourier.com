import {
  Brain,
  CircleCheckBig,
  GraduationCap,
  Heart,
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
import {
  TechLevelIndicator,
  TechStackCard,
} from "@/components/card/tech-stack";
import { Github, Linkedin } from "@/components/icons";
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
import { stacks, techLevels } from "@/data/tech-stack";
import { getTranslationsType } from "@/lib/i18n/utils";
import { cn, objectEntries, objectKeys } from "@/lib/utils";
import React from "react";
import { SkillCard } from "../_components/card/skill";

const contacts = [
  <>
    <Mail />
    <a href={`mailto:${profile.email}`}>{profile.email}</a>
  </>,
  <>
    <Phone />
    {profile.phone}
  </>,
  <>
    <MapPin />
    {profile.location}
  </>,
  <>
    <Linkedin />
    <a href={profile.socials.linkedin.href}>{profile.socials.linkedin.text}</a>
  </>,
  <>
    <Github />
    <a href={profile.socials.github.href}>{profile.socials.github.text}</a>
  </>,
];

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
          {contacts.map((content, index) => (
            <ContactElement key={index}>{content}</ContactElement>
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

const ContactElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="[&_svg]:text-muted-foreground flex items-center [&_a]:text-blue-600 [&_a]:hover:underline [&_svg]:mr-2 [&_svg]:h-5 [&_svg]:w-5">
      {children}
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
