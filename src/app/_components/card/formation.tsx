import { RichTextProps } from "@/lib/i18n/utils";
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
  <Card className="flex h-full w-full flex-col text-left">{children}</Card>
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

const FormationCardContent = ({
  modulesTitle,
  children,
}: {
  modulesTitle: string;
} & RichTextProps<"description" | "p" | "modules" | "module">) => {
  return (
    <CardContent className="flex-grow pt-0 text-sm">
      {children({
        description: (chunks) => <div className="mb-4 space-y-2">{chunks}</div>,
        p: (chunks) => <p>{chunks}</p>,
        modules: (chunks) => (
          <div>
            <p className="mb-2 text-sm font-medium">{modulesTitle}</p>
            <ul className="space-y-2">{chunks}</ul>
          </div>
        ),
        module: (chunks) => {
          if (!Array.isArray(chunks) || !chunks[0]) {
            return null;
          }
          const [title, ...info] = (chunks[0] as string).split("|");

          return (
            <li className="flex justify-between">
              <div className="flex items-center">
                <span className="mr-2 inline-block size-1 rounded-full bg-current align-middle" />
                {title}
              </div>
              <span className="text-muted-foreground text-xs">{info}</span>
            </li>
          );
        },
      })}
    </CardContent>
  );
};

export { FormationCard, FormationCardContent, FormationCardHeader };
