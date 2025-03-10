"use client";

import { InternalLink } from "@/components/ui/link";
import { ComponentProps } from "react";

const ScrollToTopLink = ({
  onClick,
  children,
  ...props
}: Omit<ComponentProps<typeof InternalLink>, "href">) => (
  <InternalLink
    href="#"
    onClick={(e) => {
      onClick?.(e);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
    {...props}
  >
    {children}
  </InternalLink>
);

export { ScrollToTopLink };
