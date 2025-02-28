"use client";

import Link from "next/link";
import { ComponentProps } from "react";

const ScrollToTopLink = ({
  onClick,
  children,
  ...props
}: Omit<ComponentProps<typeof Link>, "href">) => (
  <Link
    {...props}
    href="#"
    onClick={(e) => {
      e.preventDefault();
      onClick?.(e);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  >
    {children}
  </Link>
);

export { ScrollToTopLink };
