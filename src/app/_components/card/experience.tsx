import { Calendar, CircleCheckBig } from "lucide-react";

import { RichTextProps } from "@/lib/i18n/utils";
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

const ExperienceCardContent = ({
  children,
}: RichTextProps<"highlight" | "b">) => {
  return (
    <CollapsibleCardContent>
      <CollapsibleCardTrigger />
      <CollapsibleCardDetails>
        <ul className="text-foreground flex flex-col gap-2 text-left">
          {children({
            highlight: (chunks) => (
              <li className="flex items-start">
                <CircleCheckBig className="mt-1.5 h-4 w-4 shrink-0" />
                <p className="ml-2">{chunks}</p>
              </li>
            ),
            b: (chunks) => <b className="font-semibold">{chunks}</b>,
          })}
        </ul>
      </CollapsibleCardDetails>
    </CollapsibleCardContent>
  );
};

export { ExperienceCard, ExperienceCardContent, ExperienceCardHeader };
