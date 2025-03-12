import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  levelColors,
  Tech,
  TechLevel,
  techLevels,
  TechStack,
} from "@/data/tech-stack";
import { ReactNode } from "react";

const TechLevelIndicator = ({ level }: { level: TechLevel }) => (
  <span
    className={`ml-2 inline-block h-2 w-2 rounded-full ${levelColors[level]}`}
  ></span>
);

const TechBadge = ({ tech, level }: Tech) => (
  <Badge variant="outline" className="mr-2 mb-2 cursor-pointer">
    {tech}
    <TechLevelIndicator level={level} />
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

const TechLevelLegend = () => {
  return (
    <div className="flex gap-4">
      {techLevels.map((level) => (
        <div key={level} className="flex items-baseline gap-1">
          <TechLevelIndicator level={level} />
          <span className="text-foreground">{level}</span>
        </div>
      ))}
    </div>
  );
};

const TechStackGrid = ({ children }: { children: ReactNode }) => (
  <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">{children}</div>
);

export { TechLevelIndicator, TechLevelLegend, TechStackCard, TechStackGrid };
