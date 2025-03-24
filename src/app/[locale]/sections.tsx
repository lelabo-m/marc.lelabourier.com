import { getFormatter, getTranslations } from "next-intl/server";
import React from "react";

import {
  CareerCardComponents,
  CareerCardSkills,
  CareerSkillsLegend,
} from "@/components/card/career";
import { TechBadge, TechLevelLegend } from "@/components/tech-stack-badge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TimelineRenderList } from "@/components/ui/timeline";
import {
  TypographyBlockquote,
  TypographyH2,
  TypographyH3,
  TypographyLead,
  TypographyP,
} from "@/components/ui/typography";

import {
  CardButtonLink,
  DetailledCard,
  DetailledCardDetails,
} from "@/components/card/detailled-card";
import { skillsByExperience } from "@/data/career";
import { Course, degreeModules, degreeReferences } from "@/data/education";
import { patents, publications } from "@/data/publications";
import { stacks } from "@/data/tech-stack";
import { getMessageKeys } from "@/lib/i18n/utils";
import { cn, objectEntries } from "@/lib/utils";
import { Award, ExternalLinkIcon, FileText } from "lucide-react";

import { CompactCard, CompactCardGrid } from "@/components/card/compact-card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/link";
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
    <>
      <CareerSkillsLegend />
      <TimelineRenderList
        items={experiences}
        renderItem={(item) => {
          return (
            <DetailledCard
              title={t(`items.${item}.title`)}
              highlight={t(`items.${item}.duration`)}
              description={t(`items.${item}.company`)}
              date={t(`items.${item}.date`)}
            >
              <CareerCardSkills skills={skillsByExperience[item]} />
              <DetailledCardDetails>
                <TypographyP className="leading-5">
                  {t(`items.${item}.description`)}
                </TypographyP>
                <CareerCardComponents
                  type={t(`items.${item}.type`)}
                  item={item}
                />
              </DetailledCardDetails>
            </DetailledCard>
          );
        }}
      />
    </>
  );
};

export const EducationSection = async () => {
  const t = await getTranslations("home.educations");
  const degrees = await getMessageKeys("home.educations.items");

  return (
    <TimelineRenderList
      items={degrees}
      renderItem={(item) => {
        const { curriculum, modules } = degreeReferences[item];
        const modulesList = degreeModules[item];
        return (
          <DetailledCard
            key={item}
            title={t(`items.${item}.title`)}
            description={t(`items.${item}.institution`)}
            date={t(`items.${item}.date`)}
          >
            <DetailledCardDetails>
              <TypographyP>{t(`items.${item}.description`)}</TypographyP>
              <div className="flex flex-wrap gap-4">
                <CardButtonLink href={curriculum} icon={ExternalLinkIcon}>
                  {t("labels.curriculum")}
                </CardButtonLink>
                <CardButtonLink href={modules} icon={ExternalLinkIcon}>
                  {t("labels.modules")}
                </CardButtonLink>
              </div>

              <CompactCardGrid className="grid-cols-repeat-60">
                {modulesList.map((module) => (
                  <EducationModuleCard key={module.title} {...module} />
                ))}
              </CompactCardGrid>
            </DetailledCardDetails>
          </DetailledCard>
        );
      }}
    />
  );
};

const EducationModuleCard = ({ title, type, modules, url }: Course) => (
  <CompactCard title={title}>
    <div className="flex items-baseline justify-between">
      {url ? (
        <Button variant="link" className="has-[>svg]:px-0" asChild>
          <ExternalLink href={url}>
            {modules}
            <ExternalLinkIcon className="h-4 w-4" />
          </ExternalLink>
        </Button>
      ) : (
        modules
      )}
      <CourseBadge type={type} />
    </div>
  </CompactCard>
);

const CourseBadge = ({ type }: Pick<Course, "type">) => {
  const badgeVariant =
    type === "Core"
      ? "default"
      : type === "Specialized"
        ? "secondary"
        : "outline";
  return <Badge variant={badgeVariant}>{type}</Badge>;
};

export const SkillSection = async () => {
  const t = await getTranslations("home.skills.items");
  const skills = await getMessageKeys("home.skills.items");

  return (
    <CompactCardGrid>
      {skills.map((skill) => (
        <CompactCard
          key={skill}
          title={t(`${skill}.title`)}
          icon={skillsIcons[skill]}
        >
          <p>{t(`${skill}.description`)}</p>
        </CompactCard>
      ))}
    </CompactCardGrid>
  );
};

export const TechStackSection = async () => {
  const t = await getTranslations("home.techstacks");
  return (
    <div className="space-y-6">
      <CompactCardGrid className="sm:grid-cols-repeat-80">
        {objectEntries(stacks).map(([domain, stack]) => (
          <CompactCard key={domain} title={stack.label} icon={stack.icon}>
            <div className="flex flex-wrap items-baseline">
              {stack.current.map((tech, index) => (
                <TechBadge key={index} {...tech} />
              ))}
            </div>
          </CompactCard>
        ))}
      </CompactCardGrid>
      <TechLevelLegend />
      <TypographyBlockquote>{t("disclaimer")}</TypographyBlockquote>
    </div>
  );
};

export const HobbySection = async () => {
  const t = await getTranslations(`home.hobbies.categories`);
  const categories = await getMessageKeys("home.hobbies.categories");
  return (
    <CompactCardGrid>
      {categories.map(async (category) => {
        const items = await getMessageKeys(
          `home.hobbies.categories.${category}.items`,
        );

        return (
          <CompactCard
            key={category}
            title={t(`${category}.title`)}
            icon={hobbiesIcons[category]}
          >
            <ul className="list-inside list-disc">
              {items.map((item) => (
                <li key={item} className="mb-1">
                  {t(`${category}.items.${item}`)}
                </li>
              ))}
            </ul>
          </CompactCard>
        );
      })}
    </CompactCardGrid>
  );
};

export const PublicationSection = async () => {
  const t = await getTranslations("home.publications");
  const format = await getFormatter();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">{t("subsections.patents")}</h3>
      {patents.map((patent) => {
        const formattedDate = format.dateTime(patent.date, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
          <DetailledCard
            key={patent.patentNumber}
            title={patent.title}
            description={patent.patentNumber}
            date={formattedDate}
            icon={Award}
          >
            <CardFooter className="flex px-0">
              <CardButtonLink href={patent.url} icon={FileText}>
                View Patent
              </CardButtonLink>
            </CardFooter>
          </DetailledCard>
        );
      })}

      <h3 className="text-xl font-semibold">{t("subsections.publications")}</h3>
      {publications.map((publication) => {
        const formattedDate = format.dateTime(publication.date, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        return (
          <DetailledCard
            key={publication.title}
            title={publication.title}
            description={publication.where}
            highlight={publication.status}
            date={formattedDate}
            icon={FileText}
          >
            <CardFooter className="flex flex-wrap gap-4 px-0">
              <CardButtonLink href={publication.docUrl} icon={FileText}>
                View Paper
              </CardButtonLink>
              <CardButtonLink href={publication.confUrl} icon={FileText}>
                View Journal / Conference
              </CardButtonLink>
            </CardFooter>
          </DetailledCard>
        );
      })}
    </div>
  );
};

export const InformationSection = async () => {
  const t = await getTranslations("home.information");

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="space-y-4">
          <ul className="mt-1 list-inside space-y-1">
            <li className="flex justify-between">
              <TypographyH3 className="text-lg">
                {t("driversLicense.title")}
              </TypographyH3>
              <span className="text-foreground">
                {t("driversLicense.status")}
              </span>
            </li>
          </ul>

          <div>
            <TypographyH3 className="text-lg">
              {t("languages.title")}
            </TypographyH3>
            <ul className="mt-1 list-inside space-y-1">
              <li className="flex justify-between">
                <span>{t("languages.items.french.title")}</span>
                <span className="text-foreground">
                  {t("languages.items.french.level")}
                </span>
              </li>
              <li className="flex justify-between">
                <span>{t("languages.items.english.title")}</span>
                <span className="text-foreground">
                  {t("languages.items.english.level")}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
