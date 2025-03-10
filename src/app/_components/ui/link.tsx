import { UiI18nLink } from "@/lib/i18n/fix";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const ExternalLink = ({
  className,
  children,
  ...props
}: ComponentProps<"a">) => (
  <a
    className={cn("text-blue-600 hover:underline", className)}
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
