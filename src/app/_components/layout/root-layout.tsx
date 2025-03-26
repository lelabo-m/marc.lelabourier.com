import { PropsWithChildren } from "react";
import { ThemeProvider } from "../theme-provider";
import { SidebarProvider } from "../ui/sidebar";
import { AppSidebar } from "./sidebar";

export const RootLayoutSkeleton = ({ children }: PropsWithChildren) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="@container/root-layout mx-auto min-h-svh w-full max-w-5xl">
        <div className="bg-background min-container-h sm:min-container-h-16 @container/frame snap-x p-4 shadow-lg sm:m-8 sm:p-8 dark:border">
          {children}
        </div>
      </div>
    </SidebarProvider>
  </ThemeProvider>
);
