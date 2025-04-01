import { GeistSans } from "geist/font/sans";

import { AppSkeleton } from "@/components/layout/app";
import { PageNotFound } from "@/components/layout/not-found";
import { RootLayoutSkeleton } from "@/components/layout/root-layout";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import PlausibleProvider from "next-plausible";
import "~/styles/app.css";

export default async function NotFoundPage() {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <meta name="apple-mobile-web-app-title" content="Marc Le Labourier" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/svg+xml" href="/favicon/icon.svg" />
      <link rel="shortcut icon" href="/favicon/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/favicon/apple-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="96x96"
        href="/favicon/icon.png"
      />
      <body>
        <PlausibleProvider domain="lelabourier.com">
          <NextIntlClientProvider>
            <RootLayoutSkeleton>
              <AppSkeleton>
                <PageNotFound />
              </AppSkeleton>
            </RootLayoutSkeleton>
          </NextIntlClientProvider>
        </PlausibleProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
