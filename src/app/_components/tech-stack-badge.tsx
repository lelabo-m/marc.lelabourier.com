import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import { Clock, Lightbulb, LucideIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export type TechStackLevel = {
  name: string;
  color: string;
  textColor: string;
  icon?: LucideIcon;
  special?: boolean;
  notRecent?: boolean;
};

export type TechStackLevelKey =
  | "expert"
  | "experienced"
  | "proficient"
  | "familiar"
  | "willing"
  | "notRecent";

const techStackLevels: Record<TechStackLevelKey, TechStackLevel> = {
  expert: {
    name: "Expert",
    color: "bg-emerald-700",
    textColor: "text-emerald-800",
  },
  experienced: {
    name: "Experienced",
    color: "bg-teal-500",
    textColor: "text-teal-600",
  },
  proficient: {
    name: "Proficient",
    color: "bg-yellow-500",
    textColor: "text-yellow-600",
  },
  familiar: {
    name: "Familiar",
    color: "bg-orange-500",
    textColor: "text-orange-600",
  },
  willing: {
    name: "Willing to learn",
    color: "bg-amber-300",
    textColor: "text-amber-600",
    icon: Lightbulb,
    special: true,
  },
  notRecent: {
    name: "Not used in a while",
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
export const TechStackBadge = ({
  name,
  level,
  notRecent,
}: TechStackBadgeProps) => {
  const {
    name: levelName,
    color,
    textColor,
    icon: IconComponent,
  } = techStackLevels[level];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            variant="outline"
            className="flex items-center gap-2 bg-white transition-colors hover:bg-gray-50"
          >
            {name}

            {IconComponent ? (
              <IconComponent className={cn("size-4", textColor)} />
            ) : (
              <span className={`inline-block size-3 rounded-full ${color}`} />
            )}
            {notRecent && <Clock className="size-4" />}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{levelName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Legend component with gradient bar for main skills and separate indicators for special categories
export const TechStackLegend = () => {
  // Filter out the main skill levels (non-special)
  const mainSkills = Object.entries(techStackLevels).filter(
    ([_, skill]) => !skill.special,
  );
  // Filter out the special categories
  const specialSkills = Object.entries(techStackLevels).filter(
    ([_, skill]) => skill.special,
  );

  return (
    <div className="mt-6 space-y-3">
      {/* Gradient bar for main skills */}
      <div className="h-2 w-full rounded-md bg-[linear-gradient(to_right,var(--color-emerald-600)_0%,var(--color-emerald-400)_30%,var(--color-yellow-500)_70%,var(--color-orange-500)_100%)]"></div>
      <div className="flex justify-between text-xs">
        {mainSkills.map(([key, { name, textColor }]) => (
          <span key={key} className={`${textColor} font-medium`}>
            {name}
          </span>
        ))}
      </div>

      {/* Special categories */}
      <div className="mt-2 flex flex-wrap items-center gap-4">
        {specialSkills.map(
          ([key, { name, textColor, icon: IconComponent }]) => (
            <div key={key} className="flex items-center gap-1.5">
              {IconComponent && (
                <IconComponent className={cn("size-4", textColor)} />
              )}
              <span className={`text-xs ${textColor} font-medium`}>{name}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
