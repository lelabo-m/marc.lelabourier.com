"use client";
import { Collapsible } from "@radix-ui/react-collapsible";
import { createContext, type PropsWithChildren, use, useState } from "react";

export const CollapsibleContext = createContext<{
  isExpanded: boolean;
  setIsExpanded: (isExpanded: boolean) => void;
} | null>(null);

export const useCollapsibleContext = () => {
  const context = use(CollapsibleContext);
  if (!context) {
    throw new Error(
      "useCollapsibleContext must be used within a CollapsibleProvider component",
    );
  }
  return context;
};

export const CollapsibleProvider = ({ children }: PropsWithChildren) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <CollapsibleContext value={{ isExpanded, setIsExpanded }}>
      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        {children}
      </Collapsible>
    </CollapsibleContext>
  );
};
