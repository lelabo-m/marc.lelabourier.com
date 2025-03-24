import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CollapsibleContent } from "@/components/ui/collapsible";
import { CollapsibleProvider } from "@/components/utils/collapsible-provider";
import { cn } from "@/lib/utils";
import { Calendar, LucideIcon } from "lucide-react";
import { ComponentProps, PropsWithChildren, ReactNode } from "react";
import { Button } from "../ui/button";
import { ExternalLink } from "../ui/link";
import { DetailledCardTrigger } from "./detailled-card.client";

interface DetailledCardProps
  extends DetailledCardHeaderProps,
    PropsWithChildren {}

export const DetailledCard = ({ children, ...props }: DetailledCardProps) => (
  <Card className="w-full">
    <DetailledCardHeader {...props} />
    <CollapsibleProvider>
      <CardContent className="flex flex-col gap-4">{children}</CardContent>
    </CollapsibleProvider>
  </Card>
);

interface DetailledCardHeaderProps {
  title: string;
  description: string;
  date: string;
  highlight?: string;
  icon?: LucideIcon;
}

export const DetailledCardHeader = ({
  title,
  description,
  date,
  highlight,
  icon: IconComponent,
}: DetailledCardHeaderProps) => (
  <CardHeader className="grid-cols-[auto_1fr_auto]">
    {IconComponent && (
      <CardIcon>
        <IconComponent className="mt-1 mr-2 size-6" />
      </CardIcon>
    )}
    <CardTitle>{title}</CardTitle>
    {highlight && (
      <CardAction className="col-start-3">
        <Badge variant="outline">{highlight}</Badge>
      </CardAction>
    )}

    <CardDescription className="row-start-2 flex items-start gap-4">
      <span>{description}</span> |
      <span className="flex">
        <Calendar className="mr-2 size-4" />
        {date}
      </span>
    </CardDescription>
  </CardHeader>
);

export const CardIcon = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-icon"
      className={cn(
        "col-start-1 row-span-2 row-start-1 self-start justify-self-start",
        className,
      )}
      {...props}
    />
  );
};

export const DetailledCardDetails = ({
  children,
  ...props
}: ComponentProps<"div">) => (
  <>
    <DetailledCardTrigger />
    <CollapsibleContent>
      <div className="space-y-4 text-left text-sm" {...props}>
        {children}
      </div>
    </CollapsibleContent>
  </>
);

export const CardButtonLink = ({
  href,
  icon: IconComponent,
  children,
}: {
  href: string;
  icon: LucideIcon;
  children: ReactNode;
}) => (
  <Button variant="outline" asChild>
    <ExternalLink href={href}>
      <IconComponent className="h-4 w-4" />
      {children}
    </ExternalLink>
  </Button>
);
