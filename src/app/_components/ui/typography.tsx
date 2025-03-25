import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

const TypographyH1 = ({
  className,
  children,
  ...props
}: ComponentProps<"h1">) => (
  <h1
    className={cn(
      "text-foreground scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
      className,
    )}
    {...props}
  >
    {children}
  </h1>
);

const TypographyH2 = ({
  className,
  children,
  ...props
}: ComponentProps<"h2">) => (
  <h2
    className={cn(
      "text-foreground scroll-m-20 text-3xl font-semibold tracking-tight",
      className,
    )}
    {...props}
  >
    {children}
  </h2>
);

const TypographyH3 = ({
  className,
  children,
  ...props
}: ComponentProps<"h3">) => (
  <h3
    className={cn(
      "text-foreground scroll-m-20 text-2xl font-semibold tracking-tight",
      className,
    )}
    {...props}
  >
    {children}
  </h3>
);

const TypographyH4 = ({
  className,
  children,
  ...props
}: ComponentProps<"h4">) => (
  <h4
    className={cn(
      "text-foreground scroll-m-20 text-xl font-semibold tracking-tight",
      className,
    )}
    {...props}
  >
    {children}
  </h4>
);

const TypographyP = ({
  className,
  children,
  ...props
}: ComponentProps<"p">) => (
  <p
    className={cn(
      "text-foreground leading-7 [&:not(:first-child)]:mt-6",
      className,
    )}
    {...props}
  >
    {children}
  </p>
);

const TypographyBlockquote = ({
  className,
  children,
  ...props
}: ComponentProps<"blockquote">) => (
  <blockquote
    className={cn("mt-6 border-l-4 pl-6 italic", className)}
    {...props}
  >
    {children}
  </blockquote>
);

const TypographyList = ({
  className,
  children,
  ...props
}: ComponentProps<"ul">) => (
  <ul className={cn("my-6 ml-6 list-disc [&>li]:mt-2", className)} {...props}>
    {children}
  </ul>
);

const TypographyInlineCode = ({
  className,
  children,
  ...props
}: ComponentProps<"code">) => (
  <code
    className={cn(
      "bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
      className,
    )}
    {...props}
  >
    {children}
  </code>
);

const TypographyLead = ({
  className,
  children,
  ...props
}: ComponentProps<"p">) => (
  <p className={cn("text-muted-foreground text-xl", className)} {...props}>
    {children}
  </p>
);

const TypographyLarge = ({
  className,
  children,
  ...props
}: ComponentProps<"span">) => (
  <span className={cn("text-lg font-semibold", className)} {...props}>
    {children}
  </span>
);

const TypographySmall = ({
  className,
  children,
  ...props
}: ComponentProps<"small">) => (
  <small
    className={cn("text-sm leading-none font-medium", className)}
    {...props}
  >
    {children}
  </small>
);

const TypographyMuted = ({
  className,
  children,
  ...props
}: ComponentProps<"p">) => (
  <p className={cn("text-muted-foreground text-sm", className)} {...props}>
    {children}
  </p>
);

const TypographyText = ({
  className,
  children,
  ...props
}: ComponentProps<"span">) => (
  <span className={cn("text-foreground", className)} {...props}>
    {children}
  </span>
);

export {
  TypographyBlockquote,
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyH4,
  TypographyInlineCode,
  TypographyLarge,
  TypographyLead,
  TypographyList,
  TypographyMuted,
  TypographyP,
  TypographySmall,
  TypographyText,
};
