import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tech, techLevels, TechStack } from "@/data/tech-stack";
import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ComponentProps, ReactNode } from "react";

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
    <span className={cn(levelVariant({ variant, side }))}></span>
    {children}
  </div>
);

const TechBadge = ({ tech, level, rusty }: Tech) => (
  <Badge variant="outline" className="mr-2 mb-2 flex cursor-pointer gap-2">
    {tech}
    <TechLevelLabel variant={level} />
    {rusty && <Clock className="text-foreground" />}
  </Badge>
);

const TechStackCard = ({ label, icon: IconComp, current }: TechStack) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <IconComp className="h-6 w-6" />
        {label}
      </CardTitle>
    </CardHeader>
    <CardContent className="pb-4">
      <div className="flex flex-wrap items-baseline">
        {current.map((tech, index) => (
          <TechBadge key={index} {...tech} />
        ))}
      </div>
    </CardContent>
  </Card>
);

const TechLevelLegend = async () => {
  const t = await getTranslations("home.techstacks.labels");

  return (
    <div className="flex gap-4">
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

const TechStackGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">{children}</div>
);

export { TechLevelLabel, TechLevelLegend, TechStackCard, TechStackGrid };
