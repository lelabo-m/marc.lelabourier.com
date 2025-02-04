import * as React from "react";

import { cn } from "~/app/_lib/utils";

type Props = React.ComponentPropsWithRef<"div">;

const Card = ({ ref, className, ...props }: Props) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
      className,
    )}
    {...props}
  />
);

const CardHeader = ({ ref, className, ...props }: Props) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
);

const CardTitle = ({ ref, className, ...props }: Props) => (
  <div
    ref={ref}
    className={cn("leading-none font-semibold tracking-tight", className)}
    {...props}
  />
);

const CardDescription = ({ ref, className, ...props }: Props) => (
  <div
    ref={ref}
    className={cn("text-sm text-neutral-500 dark:text-neutral-400", className)}
    {...props}
  />
);

const CardContent = ({ ref, className, ...props }: Props) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
);

const CardFooter = ({ ref, className, ...props }: Props) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
);

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
