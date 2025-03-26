import { getMessageKeys } from "@/lib/i18n/utils";
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

export type SkillBadge = Pick<SkillBadgeProps, "name" | "type">;

type SkillListProps = {
  skills: SkillBadge[];
};

export const SkillList = ({ skills }: SkillListProps) => (
  <div className="flex flex-wrap gap-2">
    {skills.map((skill, index) => (
      <SkillBadge key={index} {...skill} />
    ))}
  </div>
);

export const SkillLegend = async () => {
  const t = await getTranslations("home.career.labels");
  const skillTypes = await getMessageKeys("home.career.labels");

  const skills = skillTypes.map((type) => ({
    name: t(type),
    type,
  }));

  return <SkillList skills={skills} />;
};
