import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React, { ReactNode } from "react";

import {
  CareerCard,
  CareerCardContent,
  CareerCardContentComponents,
  CareerCardHeader,
  CareerCardSkills,
  CareerSkillsLegend,
} from "@/components/card/career";
import {
  EducationCard,
  EducationCardContent,
  EducationCardHeader,
  EducationCardLearnMoreButton,
  EducationCardModuleGrid,
} from "@/components/card/education";
import {
  HobbyCategoryCard,
  HobbyCategoryCardContent,
  HobbyCategoryCardHeader,
} from "@/components/card/hobby";
import { PatentCard, PublicationCard } from "@/components/card/publication";
import { SkillCard } from "@/components/card/skill";
import {
  TechLevelLegend,
  TechStackCard,
  TechStackGrid,
} from "@/components/card/tech-stack";
import { CopyToClipboardButton } from "@/components/copy-to-clipboard-button";
import { Github, Linkedin } from "@/components/icons";
import { LocaleToggle } from "@/components/locale-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { ExternalLink } from "@/components/ui/link";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { TimelineRenderList } from "@/components/ui/timeline";
import {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyLead,
  TypographyP,
} from "@/components/ui/typography";
import { skillsByExperience } from "@/data/career";
import { degrees } from "@/data/education";
import { hobbies, profile } from "@/data/profile";
import { patents, publications } from "@/data/publications";
import { stacks } from "@/data/tech-stack";
import { getMessageKeys } from "@/lib/i18n/utils";
import { cn, objectEntries, objectKeys } from "@/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactAnimatedPill, ContactAnimatedText } from "./client";
import { ContactProps, contacts } from "./config";
import { SkillKey, skillsIcons } from "./icons";

export const Header = () => {
  return (
    <div className="bg-background sticky top-0 z-10 pt-4">
      <SidebarTrigger />
      <ThemeToggle />
      <LocaleToggle />
    </div>
  );
};

export const Hero = async () => {
  const t = await getTranslations("home");
  const yearsOfExperience = new Date().getFullYear() - 2011;

  return (
    <section className="@container/hero pt-8 pb-16">
      <div className="container mx-auto">
        <TypographyH1 className="text-5xl font-medium lg:text-7xl">
          {profile.name}
        </TypographyH1>
        <TypographyLead className="text-3xl lg:text-4xl">
          {profile.jobTitle}
        </TypographyLead>
        <div className="mt-14 flex gap-4 @max-2xl/hero:flex-col">
          <HeroImage />
          <div className="my-auto h-fit text-lg @2xl/hero:order-first @2xl/hero:max-w-1/2 @3xl/hero:max-w-2/3">
            <HeroActions />
            <TypographyP>{t("hero.intro", { yearsOfExperience })}</TypographyP>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroImage = () => (
  <div className="bg-card text-card-foreground m-auto overflow-hidden rounded-2xl border shadow-sm @max-2xl/hero:w-1/2">
    <Image
      src="/profile.jpg"
      alt="Marc Le Labourier profile picture"
      width={1400}
      height={2100}
      className="h-auto w-full object-cover"
    />
  </div>
);

const HeroActions = () => (
  <div className="@container/contacts mb-8 @max-2xl/hero:mt-4">
    <div className="flex w-fit gap-4 @max-2xl/hero:mx-auto @max-2xl/hero:items-center @max-sm/contacts:flex-col">
      <ContactAnimatedText>
        <CopyContactButton text={profile.email}>
          <Mail className="h-4 w-4" />
          {profile.email}
        </CopyContactButton>
      </ContactAnimatedText>

      <ContactAnimatedText>
        <CopyContactButton text={profile.phone}>
          <Phone className="h-4 w-4" />
          {profile.phone}
        </CopyContactButton>
      </ContactAnimatedText>
    </div>

    <div className="mt-4 flex w-fit gap-4 @max-2xl/hero:mx-auto">
      <ContactAnimatedPill asChild>
        <ExternalLink href={profile.socials.linkedin.href}>
          <Linkedin className="h-4 w-4" />
          <span className="sr-only">LinkedIn</span>
        </ExternalLink>
      </ContactAnimatedPill>

      <ContactAnimatedPill asChild>
        <ExternalLink href={profile.socials.github.href}>
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </ExternalLink>
      </ContactAnimatedPill>

      <ContactAnimatedPill className="w-auto gap-2 px-4 text-sm">
        <MapPin className="h-4 w-4" />
        {profile.location}
      </ContactAnimatedPill>
    </div>
  </div>
);

const CopyContactButton = ({
  text,
  children,
}: {
  text: string;
  children: ReactNode;
}) => (
  <CopyToClipboardButton
    text={text}
    timeout={1000}
    className="flex items-center gap-2"
  >
    {children}
  </CopyToClipboardButton>
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

export type SectionProps = {
  title: string;
  subtitle?: string;
} & React.ComponentProps<"section">;

export const Section = ({
  id,
  title,
  subtitle,
  className,
  children,
}: SectionProps) => (
  <section className={cn("snap-start scroll-mt-4 py-8", className)} id={id}>
    <div className="mb-8 space-y-2">
      <TypographyH2>{title}</TypographyH2>
      {subtitle && (
        <TypographyLead className="text-lg">{subtitle}</TypographyLead>
      )}
    </div>
    {children}
  </section>
);

const ContactElement = ({ icon: IconComp, text, link }: ContactProps) => {
  return (
    <div className="flex items-center">
      <IconComp className="text-muted-foreground mr-2 size-5" />
      {link ? (
        <ExternalLink href={link} variant="text">
          {text}
        </ExternalLink>
      ) : (
        <>{text}</>
      )}
    </div>
  );
};

export const CareerSection = async () => {
  const t = await getTranslations("home.career");

  const experiences = await getMessageKeys("home.career.items");

  return (
    <div>
      <CareerSkillsLegend />
      <TimelineRenderList
        items={experiences}
        renderItem={(item) => {
          return (
            <CareerCard className="w-full">
              <CareerCardHeader
                jobTitle={t(`items.${item}.title`)}
                companyName={t(`items.${item}.company`)}
                date={t(`items.${item}.date`)}
                duration={t(`items.${item}.duration`)}
              >
                <CareerCardSkills skills={skillsByExperience[item]} />
              </CareerCardHeader>
              <CareerCardContent>
                <TypographyP>{t(`items.${item}.description`)}</TypographyP>
                <CareerCardContentComponents
                  type={t(`items.${item}.type`)}
                  item={item}
                />
              </CareerCardContent>
            </CareerCard>
          );
        }}
      />
    </div>
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
            <TypographyP>{t(`${item}.description`)}</TypographyP>

            <div className="flex gap-4">
              <EducationCardLearnMoreButton href={degrees[item].cursusUrl}>
                Cursus
              </EducationCardLearnMoreButton>
              <EducationCardLearnMoreButton href={degrees[item].coursesUrl}>
                Modules
              </EducationCardLearnMoreButton>
            </div>

            <EducationCardModuleGrid courses={degrees[item].courses} />
          </EducationCardContent>
        </EducationCard>
      )}
    />
  );
};

const skills = [
  "approach",
  "optimizer",
  "perspective",
  "leadership",
  "adaptability",
  "mentorship",
] satisfies SkillKey[];
export const SkillSection = async () => {
  const t = await getTranslations("home.skills.items");

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill) => (
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
    <div className="space-y-6">
      <TechStackGrid>
        {objectEntries(stacks).map(([domain, stack]) => (
          <TechStackCard key={domain} {...stack} />
        ))}
      </TechStackGrid>
      <TechLevelLegend />
      <TypographyBlockquote>{t("disclaimer")}</TypographyBlockquote>
    </div>
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
