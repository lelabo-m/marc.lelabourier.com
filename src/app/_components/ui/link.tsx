import { ComponentProps } from "react";

const ExternalLink = ({
  className,
  children,
  ...props
}: ComponentProps<"a">) => (
  <a
    className="text-blue-600 hover:underline"
    target="_blank"
    rel="noopener noreferrer"
    {...props}
  >
    {children}
  </a>
);

export { ExternalLink };
