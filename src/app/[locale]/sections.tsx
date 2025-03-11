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
  ExperienceCardSkills,
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
import { SkillCard } from "@/components/card/skill";
import { TechLevelLegend, TechStackCard } from "@/components/card/tech-stack";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/link";
import { TimelineRenderList } from "@/components/ui/timeline";
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyLead,
  TypographyP,
} from "@/components/ui/typography";
import { degrees, formations } from "@/data/education";
import { skillsByExperience } from "@/data/experiences";
import { experiences, hobbies, profile } from "@/data/profile";
import { patents, publications } from "@/data/publications";
import { stacks } from "@/data/tech-stack";
import { cn, objectEntries, objectKeys } from "@/lib/utils";
import React from "react";
import { ContactProps, contacts } from "./config";
import { skillsIcons } from "./icons";

export type SectionProps = { title: string } & React.ComponentProps<"section">;

export const Header = () => {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <TypographyH1>{profile.name}</TypographyH1>
        <TypographyLead>{profile.jobTitle}</TypographyLead>
      </div>
      <ProfilePicture />
    </header>
  );
};

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

export const Footer = () => {
  const buildDate = new Date();
  const formattedDate = buildDate.toLocaleString("en-US", {
    month: "long",
    year: "numeric",
  });
  return (
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
  );
};

export const Section = ({ id, title, className, children }: SectionProps) => (
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

export const ContactSection = () => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
    {contacts.map((contact, index) => (
      <ContactElement key={index} {...contact} />
    ))}
  </div>
);

export const SummarySection = async () => {
  const t = await getTranslations("home.summary");

  return (
    <>
      <p className="text-foreground">{t("intro")}</p>
      <p className="text-foreground mt-4">{t("objective")}</p>
    </>
  );
};

export const ProfessionalExperienceSection = async () => {
  const t = await getTranslations("home.experiences.items");

  return (
    <TimelineRenderList
      items={experiences}
      renderItem={(item) => (
        <ExperienceCard className="w-full">
          <ExperienceCardHeader
            jobTitle={t(`${item}.title`)}
            companyName={t(`${item}.company`)}
            date={t(`${item}.date`)}
          >
            <ExperienceCardSkills skills={skillsByExperience[item]} />
          </ExperienceCardHeader>
          <ExperienceCardContent description={t(`${item}.description`)}>
            {(tags) => t.rich(`${item}.highlights`, { ...tags })}
          </ExperienceCardContent>
        </ExperienceCard>
      )}
    />
  );
};

export const EducationSection = async () => {
  const t = await getTranslations("home.educations.degrees");

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
              <TypographyP className="text-left">
                {t(`${item}.description`)}
              </TypographyP>
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

export const FormationSection = async () => {
  const t = await getTranslations("home.formations");

  return (
    <>
      <TypographyLead className="text-lg">{t("description")}</TypographyLead>

      <div className="mt-4 space-y-6">
        {formations.map((formation) => (
          <FormationCard key={formation}>
            <FormationCardHeader
              title={t(`${formation}.title`)}
              subtitle={t(`${formation}.subtitle`)}
              date={t(`${formation}.date`)}
              description={t(`${formation}.description`)}
              duration={t(`${formation}.duration`)}
            />
            <FormationCardContent modulesTitle={t(`${formation}.modulesTitle`)}>
              {(tags) =>
                t.rich(`${formation}.content`, {
                  ...tags,
                })
              }
            </FormationCardContent>
          </FormationCard>
        ))}
      </div>
    </>
  );
};

export const SkillSection = async () => {
  const t = await getTranslations("home.skills.items");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {objectKeys(skillsIcons).map((skill) => (
        <SkillCard
          key={skill}
          title={t(`${skill}.title`)}
          icon={skillsIcons[skill]}
          description={t(`${skill}.description`)}
        />
      ))}
    </div>
  );
};

export const TechStackSection = async () => {
  const t = await getTranslations("home.techstacks");
  return (
    <>
      <TypographyBlockquote>{t("disclaimer")}</TypographyBlockquote>

      <TechLevelLegend />
      <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
        {objectEntries(stacks).map(([domain, stack]) => (
          <TechStackCard key={domain} {...stack} />
        ))}
      </div>
    </>
  );
};

export const HobbySection = async () => {
  const t = await getTranslations("home.hobbies");
  return (
    <>
      <div className="mb-6">
        {t.rich("description", {
          p: (chunks) => <TypographyP> {chunks} </TypographyP>,
        })}
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {hobbies.map((hobby) => (
          <HobbyCategoryCard key={hobby.category}>
            <HobbyCategoryCardHeader>
              <div className="flex items-center">
                <hobby.icon className="mr-2 h-6 w-6" />
                {hobby.category}
              </div>
            </HobbyCategoryCardHeader>
            <HobbyCategoryCardContent>
              <ul className="list-inside list-disc">
                {hobby.items.map((item, index) => (
                  <li key={index} className="mb-1">
                    {item}
                  </li>
                ))}
              </ul>
            </HobbyCategoryCardContent>
          </HobbyCategoryCard>
        ))}
      </div>
    </>
  );
};

export const PublicationSection = () => {
  return (
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
  );
};

export const InformationSection = () => {
  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <ul className="mt-1 list-inside space-y-1">
              <li className="flex justify-between">
                <TypographyH3 className="text-lg">
                  Driver's License
                </TypographyH3>
                <span className="text-foreground">Yes</span>
              </li>
            </ul>
          </div>
          <div>
            <TypographyH3 className="text-lg">Languages</TypographyH3>
            <ul className="mt-1 list-inside space-y-1">
              <li className="flex justify-between">
                <span>French</span>
                <span className="text-foreground">Native</span>
              </li>
              <li className="flex justify-between">
                <span>English</span>
                <span className="text-foreground">
                  Proficient (reading, writing, speaking)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
