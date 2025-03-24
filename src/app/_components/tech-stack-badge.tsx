import { Badge } from "@/components/ui/badge";
import { Tech, techLevels } from "@/data/tech-stack";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ComponentProps } from "react";

export const levelVariant = cva("inline-block size-3 rounded-full", {
  variants: {
    variant: {
      expert: "bg-green-500",
      experienced: "bg-blue-500",
      proficient: "bg-yellow-500",
      familiar: "bg-red-500",
      willingToLearn: "bg-purple-500",
    },
    side: {
      left: "mr-2",
      right: "ml-2",
    },
  },
  defaultVariants: {},
});

type TechLevelLabelProps = VariantProps<typeof levelVariant> &
  ComponentProps<"div">;

const TechLevelLabel = ({
  variant,
  side,
  className,
  children,
  ...props
}: TechLevelLabelProps) => (
  <div className={cn("flex items-baseline gap-1", className)} {...props}>
    {variant && <span className={cn(levelVariant({ variant, side }))}></span>}
    {children}
  </div>
);

export const TechBadge = ({ tech, level, rusty }: Tech) => (
  <Badge variant="outline" className="mr-2 mb-2 flex cursor-pointer gap-2">
    {tech}
    <TechLevelLabel variant={level} />
    {rusty && <Clock className="text-foreground" />}
  </Badge>
);

const TechLevelLegend = async () => {
  const t = await getTranslations("home.techstacks.labels");

  return (
    <div className="flex flex-wrap gap-4">
      {techLevels.map((level) => (
        <TechLevelLabel key={level} variant={level} side="left">
          {t(`${level}`)}
        </TechLevelLabel>
      ))}
      <TechLevelLabel className="items-center">
        <Clock className="mr-2 h-4 w-4" />
        {t("not-used-in-a-while")}
      </TechLevelLabel>
    </div>
  );
};

export { TechLevelLabel, TechLevelLegend };
