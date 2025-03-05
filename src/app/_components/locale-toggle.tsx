import { Link } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LocaleToggle = ({ locale: current }: { locale: string }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="select-none">
          {current}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-1">
        {routing.locales.map((locale) => (
          <DropdownMenuItem key={locale}>
            <Link href="/" locale={locale}>
              {locale}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LocaleToggle };
