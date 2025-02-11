"use client";

import { useTranslations } from "next-intl";
import * as React from "react";

import {
  ExperienceCard,
  ExperienceCardDetails,
  ExperienceCardHeader,
  ExperienceCardRichText,
} from "@/components/experience-card";

function ProfessionalExperienceSection() {
  const t = useTranslations("ProfessionalExperienceSection");

  const experienceKeys = [
    "singlespot1",
    "singlespot2",
    "technicolor",
    "epitech",
    "creawave",
  ] as const;

  return (
    <section className="mb-8" id="professional-experience">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        {t("title")}
      </h2>

      <Timeline>
        {experienceKeys.map((key) => (
          <ExperienceCard key={key}>
            <ExperienceCardHeader
              jobTitle={t(`${key}.title`)}
              companyName={t(`${key}.company`)}
              date={t(`${key}.date`)}
            >
              <p className="mt-2 text-gray-700">{t(`${key}.description`)}</p>
            </ExperienceCardHeader>

            <ExperienceCardDetails>
              <ExperienceCardRichText>
                {(tags) => t.rich(`${key}.highlights`, tags)}
              </ExperienceCardRichText>
            </ExperienceCardDetails>
          </ExperienceCard>
        ))}
      </Timeline>
    </section>
  );
}

function Timeline({ children }: { children: React.ReactNode }) {
  if (React.Children.count(children) < 2) {
    return <>{children}</>;
  }
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {React.Children.map(children, (child, index) => (
        <li className="ms-6 mb-10" key={index}>
          <span className="absolute -start-3 flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 ring-8 ring-white dark:bg-blue-900 dark:ring-gray-900">
            <svg
              className="h-2.5 w-2.5 text-blue-800 dark:text-blue-300"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
            </svg>
          </span>
          {child}
        </li>
      ))}
    </ol>
  );
}
export { ProfessionalExperienceSection };
