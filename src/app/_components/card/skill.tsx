import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

const SkillCard = ({
  title,
  icon: IconComponent,
  description,
}: {
  title: string;
  icon: LucideIcon;
  description: string;
}) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 [&_a]:h-6 [&_a]:w-6">
        <IconComponent className="size-6" />
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p>{description}</p>
    </CardContent>
  </Card>
);

export { SkillCard };
