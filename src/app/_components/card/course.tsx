"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

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
      <CardHeader>
        <div className="flex justify-end">
          <Badge variant={badgeVariant}>{type}</Badge>
        </div>

        <div className="flex items-start">
          <CardTitle className="text-left text-lg">{title}</CardTitle>
        </div>
        <CardSubtitle className="flex items-baseline justify-between">
          {ref}
          {url && (
            <Button variant="link" className="px-0" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="text-muted-foreground h-4 w-4" />
              </a>
            </Button>
          )}
        </CardSubtitle>
      </CardHeader>
    </Card>
  );
}
