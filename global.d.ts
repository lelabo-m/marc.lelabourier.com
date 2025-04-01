import type { formats } from "@/lib/i18n/request";
import type { routing } from "@/lib/i18n/routing";
import type en from "~/messages/en.json";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof en;
    Formats: typeof formats;
    Locale: (typeof routing.locales)[number];
  }
}
