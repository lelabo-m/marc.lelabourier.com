import { getTranslations } from "next-intl/server";
import React from "react";

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
import { Card, CardContent } from "@/components/ui/card";
import { TimelineRenderList } from "@/components/ui/timeline";
import {
  TypographyBlockquote,
  TypographyH2,
  TypographyH3,
  TypographyLead,
  TypographyP,
} from "@/components/ui/typography";
import { skillsByExperience } from "@/data/career";
import { degrees } from "@/data/education";
import { patents, publications } from "@/data/publications";
import { stacks } from "@/data/tech-stack";
import { getMessageKeys } from "@/lib/i18n/utils";
import { cn, objectEntries, objectKeys } from "@/lib/utils";
import { hobbiesIcons, skillsIcons } from "./icons";

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

export const SkillSection = async () => {
  const t = await getTranslations("home.skills.items");
  const skills = await getMessageKeys("home.skills.items");

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
  const categories = await getMessageKeys("home.hobbies.categories");

  return (
    <div className="flex w-full flex-wrap gap-6">
      {categories.map(async (category) => {
        const t = await getTranslations(`home.hobbies.categories`);
        const items = await getMessageKeys(
          `home.hobbies.categories.${category}.items`,
        );
        const Icon = hobbiesIcons[category];

        return (
          <HobbyCategoryCard key={category} className="flex-1 basis-60">
            <HobbyCategoryCardHeader>
              <div className="flex items-center">
                <Icon className="mr-2 h-6 w-6" />
                {t(`${category}.title`)}
              </div>
            </HobbyCategoryCardHeader>
            <HobbyCategoryCardContent>
              <ul className="list-inside list-disc">
                {items.map((item) => (
                  <li key={item} className="mb-1">
                    {t(`${category}.items.${item}`)}
                  </li>
                ))}
              </ul>
            </HobbyCategoryCardContent>
          </HobbyCategoryCard>
        );
      })}
    </div>
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
