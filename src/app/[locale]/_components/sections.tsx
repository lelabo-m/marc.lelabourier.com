import { getFormatter, getTranslations } from "next-intl/server";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { TimelineRenderList } from "@/components/ui/timeline";
import {
  TypographyBlockquote,
  TypographyH2,
  TypographyH3,
  TypographyLead,
  TypographyP,
  TypographyText,
} from "@/components/ui/typography";
import { TechStackBadge, TechStackLegend } from "./tech-stack-badge";

import {
  CardButtonLink,
  DetailledCard,
  DetailledCardDetails,
} from "@/components/card/detailled-card";
import { type Course, degreeModules, degreeReferences } from "@/data/education";
import { patents, publications } from "@/data/portfolio";
import { skillsByExperience, techStack } from "@/data/skills";
import { getMessageKeys } from "@/lib/i18n/utils";
import { cn, objectEntries } from "@/lib/utils";
import {
  Award,
  CircleCheckBig,
  ExternalLinkIcon,
  FileText,
} from "lucide-react";

import { CompactCard, CompactCardGrid } from "@/components/card/compact-card";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "@/components/ui/link";
import type { CareerKey } from "@/lib/types";
import {
  SkillLegend,
  SkillList,
} from "~/app/[locale]/_components/skill-badges";
import { hobbiesIcons, skillsIcons, techStackIcons } from "../icons";

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
      <SkillLegend />
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
              <SkillList skills={skillsByExperience[item]} />
              <DetailledCardDetails>
                <TypographyP className="leading-5">
                  {t(`items.${item}.description`)}
                </TypographyP>
                <CareerComponents type={t(`items.${item}.type`)} item={item} />
              </DetailledCardDetails>
            </DetailledCard>
          );
        }}
      />
    </>
  );
};

const CareerComponents = async ({
  item,
  type,
}: {
  item: CareerKey;
  type: string;
}) => {
  const t = await getTranslations("home.career.items");
  const components = await getMessageKeys(
    `home.career.items.${item}.components`,
  );

  if (type === "formation") {
    return (
      <ul className="space-y-2">
        {components.map((component) => {
          const [title, ...info] = t(`${item}.components.${component}`).split(
            "|",
          );

          return (
            <li key={component} className="flex justify-between">
              <div className="flex items-center">
                <span className="mr-2 inline-block size-1 rounded-full bg-current align-middle" />
                {title}
              </div>
              <span className="text-muted-foreground text-xs">{info}</span>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {components.map((component) => (
        <li key={component} className="flex items-start">
          <CircleCheckBig className="mt-1 size-3 shrink-0" />
          <p className="ml-2">
            {t.rich(`${item}.components.${component}`, {
              b: (chunks) => <b className="font-semibold">{chunks}</b>,
            })}
          </p>
        </li>
      ))}
    </ul>
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
        {objectEntries(techStack).map(([domain, stack]) => (
          <CompactCard
            key={domain}
            title={t(`types.${domain}`)}
            icon={techStackIcons[domain]}
          >
            <div className="flex flex-wrap items-baseline gap-2">
              {stack.current.map((tech, index) => (
                <TechStackBadge key={index} {...tech} />
              ))}
            </div>
          </CompactCard>
        ))}
      </CompactCardGrid>
      <TechStackLegend />
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
  const t = await getTranslations("home.publications.labels");
  const format = await getFormatter();

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">{t("patents")}</h3>
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
                {t("patent-button")}
              </CardButtonLink>
            </CardFooter>
          </DetailledCard>
        );
      })}

      <h3 className="text-xl font-semibold">{t("publications")}</h3>
      {publications.map((publication) => {
        const formattedDate = format.dateTime(publication.date, {
          year: "numeric",
          month: "short",
          day: "numeric",
        });
        const title = `${publication.title} (${publication.status})`;
        return (
          <DetailledCard
            key={publication.title}
            title={title}
            description={publication.where}
            date={formattedDate}
            icon={FileText}
          >
            <CardFooter className="flex flex-wrap gap-4 px-0">
              <CardButtonLink href={publication.docUrl} icon={FileText}>
                {t("publication-button-1")}
              </CardButtonLink>
              <CardButtonLink href={publication.confUrl} icon={FileText}>
                {t("publication-button-2")}
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
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between">
            <TypographyH3 className="text-lg">
              {t("driversLicense.title")}
            </TypographyH3>
            <TypographyText className="text-foreground">
              {t("driversLicense.status")}
            </TypographyText>
          </div>

          <div>
            <TypographyH3 className="text-lg">
              {t("languages.title")}
            </TypographyH3>
            <ul className="mt-1 list-inside space-y-1">
              <li className="flex justify-between">
                <TypographyText>
                  {t("languages.items.french.title")}
                </TypographyText>
                <TypographyText>
                  {t("languages.items.french.level")}
                </TypographyText>
              </li>
              <li className="flex justify-between">
                <TypographyText>
                  {t("languages.items.english.title")}
                </TypographyText>
                <TypographyText>
                  {t("languages.items.english.level")}
                </TypographyText>
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
