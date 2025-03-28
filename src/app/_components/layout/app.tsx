import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { Toaster } from "../ui/sonner";
import { Footer } from "./footer";
import { Header } from "./header";

export const AppSkeleton = ({
  className,
  children,
  ...props
}: ComponentProps<"div">) => (
  <div {...props} className={cn("min-container-h-32 flex flex-col", className)}>
    <Header />
    {children}
    <Footer />
    <Toaster position="top-right" />
  </div>
);
