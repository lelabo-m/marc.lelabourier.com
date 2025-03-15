"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import { ExternalLink } from "../ui/link";

export function CourseCard({
  title,
  ref,
  type,
  url,
}: {
  title: string;
  ref: string;
  type: "Core" | "Specialized" | "Elective";
  url?: string;
}) {
  const badgeVariant =
    type === "Core"
      ? "default"
      : type === "Specialized"
        ? "secondary"
        : "outline";

  return (
    <Card>
      <CardHeader className="h-full p-4">
        <CardTitle className="text-left text-base">{title}</CardTitle>
        <CardSubtitle className="mt-auto flex flex-wrap items-baseline text-sm">
          {ref}
          {url && (
            <Button variant="link" className="px-0" asChild>
              <ExternalLink href={url}>
                <ExternalLinkIcon className="text-muted-foreground h-4 w-4" />
              </ExternalLink>
            </Button>
          )}
          <Badge className="ml-auto" variant={badgeVariant}>
            {type}
          </Badge>
        </CardSubtitle>
      </CardHeader>
    </Card>
  );
}
