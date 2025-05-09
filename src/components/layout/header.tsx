import { LocaleToggle } from "@/components/locale-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { HeaderBreadcrumbs } from "./header.client";

export const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-10 -mx-1 flex items-center py-2">
      <SidebarTrigger />
      <ThemeToggle />
      <LocaleToggle />
      <HeaderBreadcrumbs />
    </header>
  );
};
