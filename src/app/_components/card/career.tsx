import { CircleCheckBig } from "lucide-react";

import { getMessageKeys } from "@/lib/i18n/utils";
import { CareerKey } from "@/lib/types";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { getTranslations } from "next-intl/server";
import { ComponentProps } from "react";

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

export function SkillBadge({
  name,
  className,
  type,
  ...props
}: SkillBadgeProps) {
  return (
    <span className={cn(skillBadgeVariants({ type, className }))} {...props}>
      {name}
    </span>
  );
}

export type CareerSkillBadge = Pick<SkillBadgeProps, "name" | "type">;

type CareerCardSkillsProps = {
  skills: CareerSkillBadge[];
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

export const CareerCardComponents = async ({
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
