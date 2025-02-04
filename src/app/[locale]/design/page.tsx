import * as React from "react";
import {
  ExperienceCard,
  ExperienceCardDetails,
  ExperienceCardHeader,
  ExperienceCardHighlightItem,
  ExperienceCardHighlightList,
} from "~/app/_components/experience-card";

export default function DesignPage() {
  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Timeline>
          <ExperienceCard>
            <ExperienceCardHeader
              jobTitle="Technical Lead"
              companyName="Singlespot"
              date="Sep 2018 - Nov 2020"
            >
              <p>
                Oversaw all technical projects involving backend development,
                data processing, and infrastructure. Led a cross-functional team
                to deliver reliable, scalable solutions and data pipelines in a
                fast-paced startup environment.
              </p>
            </ExperienceCardHeader>

            <ExperienceCardDetails>
              <ExperienceCardHighlightList>
                <ExperienceCardHighlightItem>
                  Led and managed a team of 4 engineers, including senior
                  developers and a DevOps/sysadmin, ensuring high-quality
                  project delivery.
                </ExperienceCardHighlightItem>
                <ExperienceCardHighlightItem>
                  Led and managed a team of 4 engineers, including senior
                  developers and a DevOps/sysadmin, ensuring high-quality
                  project delivery.
                </ExperienceCardHighlightItem>
                <ExperienceCardHighlightItem>
                  Led and managed a team of 4 engineers, including senior
                  developers and a DevOps/sysadmin, ensuring high-quality
                  project delivery.
                </ExperienceCardHighlightItem>
              </ExperienceCardHighlightList>
            </ExperienceCardDetails>
          </ExperienceCard>

          <ExperienceCard>
            <ExperienceCardHeader
              jobTitle="Technical Lead"
              companyName="Singlespot"
              date="Sep 2018 - Nov 2020"
            >
              <p>
                Oversaw all technical projects involving backend development,
                data processing, and infrastructure. Led a cross-functional team
                to deliver reliable, scalable solutions and data pipelines in a
                fast-paced startup environment.
              </p>
            </ExperienceCardHeader>

            <ExperienceCardDetails>
              <ExperienceCardHighlightList>
                <ExperienceCardHighlightItem>
                  Led and managed a team of 4 engineers, including senior
                  developers and a DevOps/sysadmin, ensuring high-quality
                  project delivery.
                </ExperienceCardHighlightItem>
                <ExperienceCardHighlightItem>
                  Led and managed a team of 4 engineers, including senior
                  developers and a DevOps/sysadmin, ensuring high-quality
                  project delivery.
                </ExperienceCardHighlightItem>
                <ExperienceCardHighlightItem>
                  Led and managed a team of 4 engineers, including senior
                  developers and a DevOps/sysadmin, ensuring high-quality
                  project delivery.
                </ExperienceCardHighlightItem>
              </ExperienceCardHighlightList>
            </ExperienceCardDetails>
          </ExperienceCard>

          <ExperienceCard>
            <ExperienceCardHeader
              jobTitle="Technical Lead"
              companyName="Singlespot"
              date="Sep 2018 - Nov 2020"
            >
              <p>
                Oversaw all technical projects involving backend development,
                data processing, and infrastructure. Led a cross-functional team
                to deliver reliable, scalable solutions and data pipelines in a
                fast-paced startup environment.
              </p>
            </ExperienceCardHeader>

            <ExperienceCardDetails>
              <ExperienceCardHighlightList>
                <ExperienceCardHighlightItem>
                  Led and managed a team of 4 engineers, including senior
                  developers and a DevOps/sysadmin, ensuring high-quality
                  project delivery.
                </ExperienceCardHighlightItem>
                <ExperienceCardHighlightItem>
                  Led and managed a team of 4 engineers, including senior
                  developers and a DevOps/sysadmin, ensuring high-quality
                  project delivery.
                </ExperienceCardHighlightItem>
                <ExperienceCardHighlightItem>
                  Led and managed a team of 4 engineers, including senior
                  developers and a DevOps/sysadmin, ensuring high-quality
                  project delivery.
                </ExperienceCardHighlightItem>
              </ExperienceCardHighlightList>
            </ExperienceCardDetails>
          </ExperienceCard>
        </Timeline>
      </div>
    </div>
  );
}

function Timeline({ children }: { children: React.ReactNode }) {
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {React.Children.map(children, (child) => (
        <li className="ms-6 mb-10">
          {" "}
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
