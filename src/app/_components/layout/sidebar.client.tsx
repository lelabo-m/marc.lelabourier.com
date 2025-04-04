"use client";

import type { InternalLink } from "@/components/ui/link";
import type { ComponentProps } from "react";

export const ScrollToTopLink = ({
  onClick,
  children,
  ...props
}: Omit<ComponentProps<typeof InternalLink>, "href">) => (
  // Only work with a tag.
  <a
    href="#"
    onClick={(e) => {
      onClick?.(e);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    {...props}
  >
    {children}
  </a>
);
