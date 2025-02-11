"use client";
import { ChevronDown, ChevronUp } from "lucide-react";
import * as React from "react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

const CollapsibleDetails = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger asChild>
        <button
          className="flex items-center rounded text-blue-500 hover:text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          aria-expanded={open}
        >
          {open ? (
            <>
              <ChevronUp className="mr-2 size-4" />
              Hide details
            </>
          ) : (
            <>
              <ChevronDown className="mr-2 size-4" />
              Show details
            </>
          )}
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
};

export { CollapsibleDetails };
