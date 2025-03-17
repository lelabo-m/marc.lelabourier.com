"use client";

import { InternalLink } from "@/components/ui/link";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { motion } from "framer-motion";
import { ComponentProps } from "react";

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

export const ContactAnimatedText = ({
  className,
  children,
  ...props
}: ComponentProps<typeof motion.div>) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className={cn("flex items-center gap-2 text-sm", className)}
    {...props}
  >
    {children}
  </motion.div>
);

export const ContactAnimatedPill = ({
  className,
  asChild = false,
  children,
  ...props
}: ComponentProps<"div"> & {
  asChild?: boolean;
}) => {
  const Comp = asChild ? Slot : "div";
  return (
    <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
      <div
        className={cn(
          "border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-10 w-10 items-center justify-center rounded-full border",
          className,
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};
