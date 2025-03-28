import { GeistSans } from "geist/font/sans";

import { AppSkeleton } from "@/components/layout/app";
import { PageNotFound } from "@/components/layout/not-found";
import { RootLayoutSkeleton } from "@/components/layout/root-layout";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "~/styles/app.css";

export default async function NotFoundPage() {
  const messages = await getMessages();

  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <meta name="apple-mobile-web-app-title" content="Marc Le Labourier" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <NextIntlClientProvider messages={messages}>
          <RootLayoutSkeleton>
            <AppSkeleton>
              <PageNotFound />
            </AppSkeleton>
          </RootLayoutSkeleton>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
