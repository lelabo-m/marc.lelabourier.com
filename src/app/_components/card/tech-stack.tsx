import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  levelColors,
  Tech,
  TechLevel,
  techLevels,
  TechStack,
} from "@/data/tech-stack";

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

const TechStackCard = ({
  label,
  icon: IconComp,
  current,
  ifNeeded,
}: TechStack) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        <IconComp className="h-6 w-6" />
        <span>{label}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="grid grid-cols-2 space-y-4">
        <div>
          <h4 className="mb-2 font-semibold">Current</h4>
          <div>
            {current.map((tech, index) => (
              <TechBadge key={index} {...tech} />
            ))}
          </div>
        </div>
        {ifNeeded.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold">If Needed</h4>
            <div>
              {ifNeeded.map((tech, index) => (
                <TechBadge key={index} {...tech} />
              ))}
            </div>
          </div>
        )}
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

export { TechLevelIndicator, TechLevelLegend, TechStackCard };
