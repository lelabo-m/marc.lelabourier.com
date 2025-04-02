import { RootLayoutSkeleton } from "@/components/layout/root-layout";
import { profile } from "@/data/profile";
import { validateLocale } from "@/lib/i18n/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import PlausibleProvider from "next-plausible";
import "~/styles/app.css";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.jobTitle}`,
  description:
    "Marc Le Labourier own little space online. Maybe one day, a more complete description will be written. But for now, deal with it.",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function Layout({ children, params }: LayoutProps) {
  const { locale: requestedLocale } = await params;

  const locale = validateLocale(requestedLocale);

  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html
      lang={locale}
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
            <RootLayoutSkeleton>{children}</RootLayoutSkeleton>
          </NextIntlClientProvider>
        </PlausibleProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
