"use client";

import { useTranslations } from "next-intl";

import {
  ExperienceCard,
  ExperienceCardDetails,
  ExperienceCardHeader,
  ExperienceCardRichText,
} from "@/components/experience-card";
import {
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineSpacer,
} from "@/components/ui/timeline";

function ProfessionalExperienceSection() {
  const t = useTranslations("ProfessionalExperienceSection");

  const experiences = [
    "singlespot1",
    "singlespot2",
    "technicolor",
    "epitech",
    "creawave",
  ] as const;

  return (
    <section
      className="mb-8 snap-start scroll-mt-4"
      id="professional-experience"
    >
      <h2 className="text-foreground mb-4 text-2xl font-semibold">
        {t("title")}
      </h2>

      <Timeline>
        <TimelineContent>
          {experienceKeys.map((key, index) => (
            <>
              {index !== 0 && <TimelineSpacer key={`${key}-spacer`} />}
              <TimelineItem key={key}>
                <ExperienceCard key={key}>
                  <ExperienceCardHeader
                    jobTitle={t(`${key}.title`)}
                    companyName={t(`${key}.company`)}
                    date={t(`${key}.date`)}
                  >
                    <p className="text-foreground mt-2">
                      {t(`${key}.description`)}
                    </p>
                  </ExperienceCardHeader>

                  <ExperienceCardDetails>
                    <ExperienceCardRichText>
                      {" "}
                      {(tags) => t.rich(`${key}.highlights`, tags)}
                    </ExperienceCardRichText>
                  </ExperienceCardDetails>
                </ExperienceCard>
              </TimelineItem>
            </>
          ))}
        </TimelineContent>
      </Timeline>
    </section>
  );
}

export { ProfessionalExperienceSection };
