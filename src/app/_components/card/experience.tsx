import { Calendar } from "lucide-react";
import { ReactNode } from "react";

import {
  CardDescription,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "../ui/card";
import {
  CollapsibleCard,
  CollapsibleCardContent,
  CollapsibleCardDetails,
  CollapsibleCardTrigger,
} from "../ui/collapsible-card";

const ExperienceCard = CollapsibleCard;

interface ExperienceCardHeaderProps {
  jobTitle: string;
  companyName: string;
  date: string;
  description: string;
}

const ExperienceCardHeader = ({
  jobTitle,
  companyName,
  date,
  description,
}: ExperienceCardHeaderProps) => (
  <CardHeader>
    <CardTitle className="text-xl font-semibold">{jobTitle}</CardTitle>
    <CardSubtitle className="flex-col items-center">
      <span className="text-lg">{companyName}</span>
      <span className="my-2 flex items-center text-sm">
        <Calendar className="mr-2 size-4" /> {date}
      </span>
    </CardSubtitle>
    <CardDescription className="text-foreground text-left text-base">
      {description}
    </CardDescription>
  </CardHeader>
);

const ExperienceCardContent = ({ children }: { children: ReactNode }) => {
  return (
    <CollapsibleCardContent>
      <CollapsibleCardTrigger />
      <CollapsibleCardDetails>{children}</CollapsibleCardDetails>
    </CollapsibleCardContent>
  );
};

export { ExperienceCard, ExperienceCardContent, ExperienceCardHeader };
