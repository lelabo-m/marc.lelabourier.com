"use client";

import { InternalLink } from "@/components/ui/link";
import { motion } from "framer-motion";
import { ComponentProps, ReactNode } from "react";

export const ScrollToTopLink = ({
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

export const ContactAnimatedText = ({ children }: { children: ReactNode }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="flex items-center gap-2 text-sm"
  >
    {children}
  </motion.div>
);

export const ContactAnimatedPill = ({ children }: { children: ReactNode }) => (
  <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
    {children}
  </motion.div>
);
