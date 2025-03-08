import { Link } from "@/lib/i18n/navigation";
import { routing } from "@/lib/i18n/routing";
import { getLocale } from "next-intl/server";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const LocaleToggle = async () => {
  const currentLocale = await getLocale();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="select-none">
          {currentLocale}
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
