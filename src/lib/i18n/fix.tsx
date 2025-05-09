"use client";

// From https://github.com/amannn/next-intl/issues/1271
// Re-export from the file that creates the `<Link />` component
// This is to make sure the `Link` component is available with Radix UI Primitives and Shadcn UI components.
export { Link as UiI18nLink } from "./navigation";
