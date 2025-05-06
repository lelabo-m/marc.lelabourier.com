import { UiI18nLink } from "@/lib/i18n/fix";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";

const linkVariants = cva("", {
  variants: {
    variant: {
      text: "text-blue-600 hover:underline",
    },
  },
});

const ExternalLink = ({
  variant,
  className,
  children,
  ...props
}: ComponentProps<"a"> & VariantProps<typeof linkVariants>) => (
  <a
    className={cn(linkVariants({ variant, className }))}
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
);

const InternalLink = ({
  children,
  ...props
}: ComponentProps<typeof UiI18nLink>) => (
  <UiI18nLink {...props}>{children}</UiI18nLink>
);

export { ExternalLink, InternalLink };
