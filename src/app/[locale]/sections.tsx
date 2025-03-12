import { getTranslations } from "next-intl/server";
import Image from "next/image";
import React, { ReactNode } from "react";

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
import { TechStackCard, TechStackGrid } from "@/components/card/tech-stack";
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
import { degrees, formations } from "@/data/education";
import { skillsByExperience } from "@/data/experiences";
import { experiences, hobbies, profile } from "@/data/profile";
import { patents, publications } from "@/data/publications";
import { stacks } from "@/data/tech-stack";
import { cn, objectEntries, objectKeys } from "@/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";
import { ContactAnimatedPill, ContactAnimatedText } from "./client";
import { ContactProps, contacts } from "./config";
import { skillsIcons } from "./icons";

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
  return (
    <section className="pt-8 pb-16">
      <div className="container mx-auto">
        <TypographyH1 className="text-5xl font-medium lg:text-7xl">
          {profile.name}
        </TypographyH1>
        <TypographyLead className="text-3xl lg:text-4xl">
          {profile.jobTitle}
        </TypographyLead>
        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          <div className="m-auto max-w-1/2 sm:max-w-2/5 lg:col-span-2 lg:max-w-5/6">
            <div className="overflow-hidden rounded-full">
              <Image
                src="/profile.jpg"
                alt="Marc Le Labourier profile picture"
                width={1400}
                height={2100}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <div className="text-lg lg:order-first lg:col-span-3">
            <TypographyP>{t("hero.intro")}</TypographyP>
            <TypographyP>{t("hero.objective")}</TypographyP>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row">
              <div className="grid grid-cols-2 gap-4 sm:flex sm:flex-row">
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
            </div>

            <div className="mt-4 flex gap-4">
              <ContactAnimatedPill>
                <a
                  href={profile.socials.linkedin.href}
                  className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-full border"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                  <span className="sr-only">LinkedIn</span>
                </a>
              </ContactAnimatedPill>

              <ContactAnimatedPill>
                <a
                  href={profile.socials.github.href}
                  className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-full border"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </ContactAnimatedPill>

              <ContactAnimatedPill>
                <div className="border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 items-center justify-center gap-2 rounded-full border px-4">
                  <MapPin className="h-4 w-4" />
                  <span className="text-sm">{profile.location}</span>
                </div>
              </ContactAnimatedPill>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

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
      {link ? <ExternalLink href={link}>{text}</ExternalLink> : <>{text}</>}
    </div>
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
    <div className="mt-4 space-y-6">
      <TimelineRenderList
        items={formations}
        renderItem={(item) => (
          <FormationCard key={item}>
            <FormationCardHeader
              title={t(`${item}.title`)}
              subtitle={t(`${item}.subtitle`)}
              date={t(`${item}.date`)}
              description={t(`${item}.description`)}
              duration={t(`${item}.duration`)}
            />
            <FormationCardContent modulesTitle={t(`${item}.modulesTitle`)}>
              {(tags) =>
                t.rich(`${item}.content`, {
                  ...tags,
                })
              }
            </FormationCardContent>
          </FormationCard>
        )}
      />
    </div>
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
      <TechStackGrid>
        {objectEntries(stacks).map(([domain, stack]) => (
          <TechStackCard key={domain} {...stack} />
        ))}
      </TechStackGrid>
      <TypographyBlockquote className="mt-6">
        {t("disclaimer")}
      </TypographyBlockquote>
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
