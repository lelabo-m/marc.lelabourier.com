"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { Calendar, ChevronDown, ChevronUp, CircleCheckBig } from "lucide-react";
import { ReactNode, useState } from "react";

import { RichTextProps } from "@/lib/i18n/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

const ExperienceCard = Card;

const ExperienceCardHeader = ({
  jobTitle,
  companyName,
  date,
  children,
}: {
  jobTitle: string;
  companyName: string;
  date: string;
  children: ReactNode;
}) => (
  <CardHeader>
    <CardTitle className="text-xl font-semibold">{jobTitle}</CardTitle>
    <CardDescription className="text-lg">
      {companyName}
      <div className="my-2 flex items-center text-sm text-neutral-500 dark:text-neutral-400">
        <Calendar className="mr-2 size-4" />
        {date}
      </div>
      {children}
    </CardDescription>
  </CardHeader>
);

const ExperienceCardDetails = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  return (
    <CardContent>
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <button
            className="flex items-center rounded text-blue-500 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            aria-expanded={open}
          >
            {open ? (
              <>
                <ChevronUp className="mr-2 size-4" />
                Hide details
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 size-4" />
                Show details
              </>
            )}
          </button>
        </CollapsibleTrigger>
        <CollapsibleContent>{children}</CollapsibleContent>
      </Collapsible>
    </CardContent>
  );
};

function ExperienceCardHighlightList({ children }: { children: ReactNode }) {
  return <ul className="flex flex-col gap-2">{children}</ul>;
}

function ExperienceCardHighlightItem({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start first:mt-4">
      <CircleCheckBig className="mt-1.5 h-4 w-4 shrink-0 text-gray-600" />
      <p className="ml-2 text-gray-600">{children}</p>
    </li>
  );
}

function ExperienceCardRichText({
  children,
}: RichTextProps<"highlight" | "b">) {
  return (
    <ExperienceCardHighlightList>
      {children({
        highlight: (chunks: ReactNode) => (
          <ExperienceCardHighlightItem>{chunks}</ExperienceCardHighlightItem>
        ),
        b: (chunks: ReactNode) => <b className="font-semibold">{chunks}</b>,
      })}
    </ExperienceCardHighlightList>
  );
}

export {
  ExperienceCard,
  ExperienceCardDetails,
  ExperienceCardHeader,
  ExperienceCardHighlightItem,
  ExperienceCardHighlightList,
  ExperienceCardRichText,
};
