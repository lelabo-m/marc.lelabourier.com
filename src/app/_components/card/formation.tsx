import { ReactNode } from "react";
import { Badge } from "../ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const FormationCard = ({ children }: { children: ReactNode }) => (
  <Card className="flex h-full flex-col">{children}</Card>
);

const FormationCardHeader = ({
  title,
  subtitle,
  date,
  description,
  duration,
}: {
  title: string;
  subtitle: string;
  date: string;
  description: string;
  duration: string;
}) => (
  <CardHeader className="pb-3">
    <div className="flex items-start justify-between">
      <div>
        <CardTitle className="text-lg font-semibold">{title}</CardTitle>
        <CardDescription className="mt-1 text-sm">{subtitle}</CardDescription>
      </div>
      <Badge variant="outline" className="text-xs font-medium">
        {duration}
      </Badge>
    </div>
    <div className="text-muted-foreground mt-1 flex items-center text-sm">
      <span>{description}</span>
    </div>
    <div className="text-muted-foreground text-xs">{date}</div>
  </CardHeader>
);

const FormationCardContent = ({ children }: { children: ReactNode }) => (
  <CardContent className="flex-grow pt-0 text-sm">{children}</CardContent>
);

export { FormationCard, FormationCardContent, FormationCardHeader };
