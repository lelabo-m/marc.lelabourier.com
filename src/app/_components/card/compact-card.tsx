import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ComponentProps, ReactNode } from "react";

export interface CompactCardProps {
  title: string;
  icon?: LucideIcon;
  children: ReactNode;
}

export const CompactCard = ({
  title,
  icon: IconComponent,
  children,
}: CompactCardProps) => {
  return (
    <Card className="grid-rows-[auto_1fr_auto]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {IconComponent && <IconComponent className="h-6 w-6" />}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export const CompactCardGrid = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => (
  <div
    className={cn(
      "sm:grid-cols-repeat-64 grid max-w-full grid-cols-1 gap-6",
      className,
    )}
    {...props}
  >
    {children}
  </div>
);
