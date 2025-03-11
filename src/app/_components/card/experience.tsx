import { Calendar, CircleCheckBig } from "lucide-react";

import { RichTextProps } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import React, { ComponentProps } from "react";
import { CardHeader, CardSubtitle, CardTitle } from "../ui/card";
import {
  CollapsibleCard,
  CollapsibleCardContent,
  CollapsibleCardDetails,
  CollapsibleCardTrigger,
} from "../ui/collapsible-card";
import { TypographyP } from "../ui/typography";

const ExperienceCard = CollapsibleCard;

interface ExperienceCardHeaderProps {
  jobTitle: string;
  companyName: string;
  date: string;
  children?: React.ReactNode;
}

const ExperienceCardHeader = ({
  jobTitle,
  companyName,
  date,
  children,
}: ExperienceCardHeaderProps) => (
  <CardHeader>
    <CardTitle className="text-xl font-semibold">{jobTitle}</CardTitle>
    <CardSubtitle className="flex-col items-center gap-2">
      <span className="text-lg">{companyName}</span>
      <span className="flex items-center text-sm">
        <Calendar className="mr-2 size-4" /> {date}
      </span>
    </CardSubtitle>
    {children}
  </CardHeader>
);

type ExperienceCardContentProps = {
  description: string;
} & RichTextProps<"highlight" | "b">;

const ExperienceCardContent = ({
  description,
  children,
}: ExperienceCardContentProps) => {
  return (
    <CollapsibleCardContent>
      <CollapsibleCardTrigger />
      <CollapsibleCardDetails>
        <TypographyP className="text-left">{description}</TypographyP>
        <ul className="text-foreground flex flex-col gap-2 pt-6 text-left">
          {children({
            highlight: (chunks) => (
              <li className="flex items-start">
                <CircleCheckBig className="mt-1.5 h-4 w-4 shrink-0" />
                <p className="ml-2">{chunks}</p>
              </li>
            ),
            b: (chunks) => <b className="font-semibold">{chunks}</b>,
          })}
        </ul>
      </CollapsibleCardDetails>
    </CollapsibleCardContent>
  );
};

const skillBadgeVariants = cva("px-2 py-1 text-xs font-medium", {
  variants: {
    type: {
      tech: "bg-blue-100 text-blue-800 rounded-md",
      technical: "bg-purple-100 text-purple-800 rounded-full",
      soft: "bg-green-100 text-green-800 rounded-sm",
    },
  },
});

type SkillBadgeProps = {
  name: string;
} & VariantProps<typeof skillBadgeVariants> &
  ComponentProps<"span">;

function SkillBadge({ name, className, type, ...props }: SkillBadgeProps) {
  return (
    <span className={cn(skillBadgeVariants({ type, className }))} {...props}>
      {name}
    </span>
  );
}

export type ProSkillBadge = Pick<SkillBadgeProps, "name" | "type">;

type ExperienceCardSkillsProps = {
  skills: ProSkillBadge[];
};

const ExperienceCardSkills = ({ skills }: ExperienceCardSkillsProps) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {skills.map((skill, index) => (
      <SkillBadge key={index} {...skill} />
    ))}
  </div>
);

export {
  ExperienceCard,
  ExperienceCardContent,
  ExperienceCardHeader,
  ExperienceCardSkills,
};
