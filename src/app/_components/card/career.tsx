import { Calendar, CircleCheckBig } from "lucide-react";

import { getMessageKeys } from "@/lib/i18n/utils";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { NestedValueOf } from "next-intl";
import { getTranslations } from "next-intl/server";
import React, { ComponentProps, ReactNode } from "react";
import { Badge } from "../ui/badge";
import { CardHeader, CardSubtitle, CardTitle } from "../ui/card";
import {
  CollapsibleCard,
  CollapsibleCardContent,
  CollapsibleCardDetails,
  CollapsibleCardTrigger,
} from "../ui/collapsible-card";

export const CareerCard = CollapsibleCard;

interface CareerCardHeaderProps {
  jobTitle: string;
  companyName: string;
  date: string;
  duration?: string;
  children?: React.ReactNode;
}

export const CareerCardHeader = ({
  jobTitle,
  companyName,
  date,
  duration,
  children,
}: CareerCardHeaderProps) => (
  <CardHeader>
    <div className="flex w-full items-center">
      <CardTitle className="w-full text-center text-xl font-semibold">
        {jobTitle}
      </CardTitle>
      {duration && (
        <Badge variant="outline" className="ml-auto text-xs font-medium">
          {duration}
        </Badge>
      )}
    </div>
    <CardSubtitle className="flex-col items-center gap-2">
      <span className="text-lg">{companyName}</span>
      <span className="flex items-center text-sm">
        <Calendar className="mr-2 size-4" /> {date}
      </span>
    </CardSubtitle>

    {children}
  </CardHeader>
);

type CareerCardContentProps = {
  children: ReactNode;
};

export const CareerCardContent = ({ children }: CareerCardContentProps) => {
  return (
    <CollapsibleCardContent>
      <CollapsibleCardTrigger />
      <CollapsibleCardDetails className="space-y-4 text-left text-sm">
        {children}
      </CollapsibleCardDetails>
    </CollapsibleCardContent>
  );
};

type ExprienceKey = keyof NestedValueOf<IntlMessages, "home.career.items">;

export const CareerCardContentComponents = async ({
  item,
  type,
}: {
  item: ExprienceKey;
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

const skillBadgeVariants = cva("px-2 py-1 text-xs font-medium rounded-full", {
  variants: {
    type: {
      tech: "bg-blue-100 text-blue-800",
      technical: "bg-purple-100 text-purple-800 ",
      soft: "bg-green-100 text-green-800",
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

type CareerCardSkillsProps = {
  skills: ProSkillBadge[];
};

export const CareerCardSkills = ({ skills }: CareerCardSkillsProps) => (
  <div className="mt-4 flex flex-wrap gap-2">
    {skills.map((skill, index) => (
      <SkillBadge key={index} {...skill} />
    ))}
  </div>
);

export const CareerSkillsLegend = async () => {
  const t = await getTranslations("home.career.labels");
  return (
    <div className="flex flex-wrap gap-2">
      <SkillBadge name={t("tech")} type="tech" />
      <SkillBadge name={t("technical")} type="technical" />
      <SkillBadge name={t("soft")} type="soft" />
    </div>
  );
};
