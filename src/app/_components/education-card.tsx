"use client";
import { createContext, ReactNode, use, useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { Course } from "~/app/_data/degrees";
import { CourseCard } from "./course";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "./ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";

const EducationCardContext = createContext<{
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
} | null>(null);

const useEducationCardContext = () => {
  const context = use(EducationCardContext);
  if (!context) {
    throw new Error(
      "useEducationCardContext must be used within an EducationCard component",
    );
  }
  return context;
};

const EducationCard = ({ children }: { children: ReactNode }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card>
      <EducationCardContext value={{ isExpanded, setIsExpanded }}>
        {children}
      </EducationCardContext>
    </Card>
  );
};

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
    <CardTitle>{degree}</CardTitle>
    <CardSubtitle className="flex-col items-start">
      <p>{institution}</p>
      <p>
        {location} | {date}
      </p>
    </CardSubtitle>
  </CardHeader>
);

const EducationCardContent = ({ children }: { children: ReactNode }) => {
  const { isExpanded, setIsExpanded } = useEducationCardContext();

  return (
    <CardContent>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger asChild>
          <Button
            variant="ghost"
            className="mb-4 w-full justify-between text-blue-500 hover:text-blue-600 focus:ring-2 focus:ring-blue-500"
            aria-expanded={isExpanded}
          >
            {isExpanded
              ? "Hide details and courses"
              : "Show details and courses"}
            {isExpanded ? (
              <ChevronUp className="size-4" />
            ) : (
              <ChevronDown className="size-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Collapsible>
    </CardContent>
  );
};

const EducationCardModuleGrid = ({ courses }: { courses: Course[] }) => (
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {courses.map((course, index) => (
      <CourseCard key={index} {...course} />
    ))}
  </div>
);

export {
  EducationCard,
  EducationCardContent,
  EducationCardHeader,
  EducationCardModuleGrid,
};
