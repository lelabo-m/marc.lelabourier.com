"use client";
import { routing } from "@/lib/i18n/routing";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

import { usePathname, useRouter } from "@/lib/i18n/navigation";
import { validateLocale } from "@/lib/i18n/utils";
import { type Locale, useLocale } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

const LocaleToggle = () => {
  const currentLocale = validateLocale(useLocale());

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleChangeLocale = useCallback(
    (newLocale: Locale) => {
      const params = new URLSearchParams(searchParams).toString();
      const anchor = window.location.hash;
      const newPath = `${pathname}?${params.toString()}${anchor}`;

      router.replace(newPath, { locale: newLocale });
    },
    [searchParams, pathname, router],
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="select-none">
          {currentLocale}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-1">
        {routing.locales.map((locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleChangeLocale(locale)}
          >
            {locale}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { LocaleToggle };
