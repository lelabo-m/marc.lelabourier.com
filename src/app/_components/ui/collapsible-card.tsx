"use client";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { ComponentProps, createContext, use, useState } from "react";
import { Button } from "./button";
import { Card, CardContent } from "./card";

const CollapsibleCardContext = createContext<{
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
} | null>(null);

const useCollapsibleCardContext = () => {
  const context = use(CollapsibleCardContext);
  if (!context) {
    throw new Error(
      "useCollapsibleCardContext must be used within an CollapsibleCard component",
    );
  }
  return context;
};

const CollapsibleCard = ({
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card {...props}>
      <CollapsibleCardContext value={{ isExpanded, setIsExpanded }}>
        {children}
      </CollapsibleCardContext>
    </Card>
  );
};

const CollapsibleCardContent = ({
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { isExpanded, setIsExpanded } = useCollapsibleCardContext();

  return (
    <CardContent {...props}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        {children}
      </Collapsible>
    </CardContent>
  );
};

type CollapsibleCardTriggerProps = {
  hideText?: string;
  showText?: string;
} & React.ComponentProps<"button">;

const CollapsibleCardTrigger = ({
  className,
  hideText = "Hide details",
  showText = "Show details",
  ...props
}: CollapsibleCardTriggerProps) => {
  const { isExpanded } = useCollapsibleCardContext();
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
        {isExpanded ? hideText : showText}
        {isExpanded ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </Button>
    </CollapsibleTrigger>
  );
};

const CollapsibleCardDetails = ({
  children,
  ...props
}: ComponentProps<"div">) => (
  <CollapsibleContent>
    <div className="p-4" {...props}>
      {children}
    </div>
  </CollapsibleContent>
);

export {
  CollapsibleCard,
  CollapsibleCardContent,
  CollapsibleCardDetails,
  CollapsibleCardTrigger,
  useCollapsibleCardContext,
};
