import { LocaleToggle } from "../locale-toggle";
import { ThemeToggle } from "../theme-toggle";
import { SidebarTrigger } from "../ui/sidebar";

export const Header = () => {
  return (
    <header className="bg-background sticky top-0 z-10 -mx-1 flex items-center py-2">
      <SidebarTrigger />
      <ThemeToggle />
      <LocaleToggle />
    </header>
  );
};
