import { Badge } from "@/components/ui/badge";
import { cn, objectEntries } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TechStackLevelKey } from "@/lib/types";
import { Clock, Lightbulb, LucideIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";

export type TechStackLevel = {
  color: string;
  textColor: string;
  icon?: LucideIcon;
  special?: boolean;
  notRecent?: boolean;
};

const techStackLevels: Record<TechStackLevelKey, TechStackLevel> = {
  expert: {
    color: "bg-emerald-700",
    textColor: "text-emerald-800",
  },
  experienced: {
    color: "bg-teal-500",
    textColor: "text-teal-600",
  },
  proficient: {
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
  },
  familiar: {
    color: "bg-orange-500",
    textColor: "text-orange-600",
  },
  willing: {
    color: "text-amber-500",
    textColor: "text-amber-600",
    icon: Lightbulb,
    special: true,
  },
  "not-used-in-a-while": {
    color: "bg-foreground",
    textColor: "text-foreground",
    icon: Clock,
    special: true,
  },
};

export type TechStackBadgeProps = {
  name: string;
  level: keyof typeof techStackLevels;
  notRecent?: boolean;
};

// Tech badge component with colored dot
export const TechStackBadge = async ({
  name,
  level,
  notRecent,
}: TechStackBadgeProps) => {
  const t = await getTranslations("home.techstacks.levels");
  const { color, textColor, icon: IconComponent } = techStackLevels[level];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant="outline" className="gap-2 [&>svg]:size-3.5">
            {name}

            {IconComponent ? (
              <IconComponent className={color} />
            ) : (
              <span className={`inline-block size-3 rounded-full ${color}`} />
            )}
            {notRecent && <Clock />}
          </Badge>
        </TooltipTrigger>
        <TooltipContent avoidCollisions>
          <p className="text-xs">{t(level)}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Legend component with gradient bar for main skills and separate indicators for special categories
export const TechStackLegend = async () => {
  const t = await getTranslations("home.techstacks.levels");

  // Filter out the main skill levels (non-special)
  const mainSkills = objectEntries(techStackLevels).filter(
    ([, skill]) => !skill.special,
  );
  // Filter out the special categories
  const specialSkills = objectEntries(techStackLevels).filter(
    ([_, skill]) => skill.special,
  );

  return (
    <div className="mt-6 space-y-3">
      {/* Gradient bar for main skills */}
      <div className="h-2 w-full rounded-md bg-[linear-gradient(to_right,var(--color-emerald-600)_0%,var(--color-emerald-400)_30%,var(--color-yellow-500)_70%,var(--color-orange-500)_100%)]"></div>
      <div className="flex justify-between text-xs">
        {mainSkills.map(([key, { textColor }]) => (
          <span key={key} className={`${textColor} font-medium`}>
            {t(key)}
          </span>
        ))}
      </div>

      {/* Special categories */}
      <div className="mt-2 flex flex-wrap items-center gap-4">
        {specialSkills.map(([key, { textColor, icon: IconComponent }]) => (
          <div key={key} className="flex items-center gap-1.5">
            {IconComponent && (
              <IconComponent className={cn("size-4", textColor)} />
            )}
            <span className={`text-sm ${textColor} font-medium`}>{t(key)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
