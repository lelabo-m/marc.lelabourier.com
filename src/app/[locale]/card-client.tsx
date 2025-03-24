"use client";
import { Button } from "@/components/ui/button";
import { CollapsibleTrigger } from "@/components/ui/collapsible";
import { useCollapsibleContext } from "@/components/utils/collapsible-provider";
import { Condition } from "@/components/utils/condition";
import { cn } from "@/lib/utils";

import { ChevronDown, ChevronUp } from "lucide-react";

type CollapsibleCardTriggerProps = {
  hideText?: string;
  showText?: string;
} & React.ComponentProps<"button">;

export const CollapsibleCardTrigger = ({
  className,
  hideText = "Hide details",
  showText = "Show details",
  ...props
}: CollapsibleCardTriggerProps) => {
  const { isExpanded } = useCollapsibleContext();
  return (
    <CollapsibleTrigger asChild>
      <Button
        variant="ghost"
        className={cn(
          "w-full justify-between text-blue-500 hover:text-blue-600 focus:ring-2 focus:ring-blue-500",
          className,
        )}
        aria-expanded={isExpanded}
        {...props}
      >
        <Condition on={isExpanded}>
          <Condition.True>
            {hideText}
            <ChevronUp className="size-4" />
          </Condition.True>
          <Condition.False>
            {showText}
            <ChevronDown className="size-4" />
          </Condition.False>
        </Condition>
      </Button>
    </CollapsibleTrigger>
  );
};
