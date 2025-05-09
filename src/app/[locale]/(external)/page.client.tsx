"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import type { ComponentProps } from "react";

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
  children,
}: ComponentProps<"div"> & {
  asChild?: boolean;
}) => {
  return (
    <motion.div whileHover={{ scale: 1.1 }} className="flex items-center">
      <div
        className={cn(
          "border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex min-h-10 min-w-10 items-center justify-center rounded-full border",
          className,
        )}
      >
        {children}
      </div>
    </motion.div>
  );
};
