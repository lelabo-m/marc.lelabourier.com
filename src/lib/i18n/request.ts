import { getRequestConfig } from "next-intl/server";

import { validateLocale } from "./utils";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  const requested = await requestLocale;
  const locale = validateLocale(requested);

  return {
    locale,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    messages: (await import(`~/messages/${locale}.json`)).default,
  };
});
