"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardSubtitle,
  CardTitle,
} from "@/components/ui/card";

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
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant={badgeVariant}>{type}</Badge>
        </div>
        <CardSubtitle>{ref}</CardSubtitle>

        <div className="flex">
          {url && (
            <Button variant="link" className="px-0" asChild>
              <a href={url} target="_blank" rel="noopener noreferrer">
                Learn more
              </a>
            </Button>
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
