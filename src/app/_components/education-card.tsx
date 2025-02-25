"use client";
import React, { ReactNode } from "react";

import { Course } from "@/data/degrees";
import { ExternalLink } from "lucide-react";
import { CourseCard } from "./course";
import { Button } from "./ui/button";
import { CardHeader, CardSubtitle, CardTitle } from "./ui/card";
import {
  CollapsibleCard,
  CollapsibleCardContent,
  CollapsibleCardDetails,
  CollapsibleCardTrigger,
} from "./ui/collapsible-card";

const EducationCard = CollapsibleCard;

const EducationCardHeader = ({
  degree,
  institution,
  location,
  date,
}: {
  degree: string;
  institution: string;
  location: string;
  date: string;
}) => (
  <CardHeader>
    <CardTitle className="text-xl font-semibold">{degree}</CardTitle>
    <CardSubtitle className="flex-col items-center">
      <span>{institution}</span>
      <span>
        {location} | {date}
      </span>
    </CardSubtitle>
  </CardHeader>
);

const EducationCardContent = ({ children }: { children: ReactNode }) => {
  return (
    <CollapsibleCardContent>
      <CollapsibleCardTrigger>
        {(isExpanded) =>
          isExpanded ? "Hide details and courses" : "Show details and courses"
        }
      </CollapsibleCardTrigger>
      <CollapsibleCardDetails>{children}</CollapsibleCardDetails>
    </CollapsibleCardContent>
  );
};

const EducationCardModuleGrid = ({ courses }: { courses: Course[] }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {courses.map((course, index) => (
      <CourseCard key={index} {...course} />
    ))}
  </div>
);

const EducationCardLearnMoreButton = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Button variant="outline" asChild>
    <a href={href} target="_blank" rel="noopener noreferrer">
      {children} <ExternalLink className="ml-2 h-4 w-4" />
    </a>
  </Button>
);

export {
  EducationCard,
  EducationCardContent,
  EducationCardHeader,
  EducationCardLearnMoreButton,
  EducationCardModuleGrid,
};
