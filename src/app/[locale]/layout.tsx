import { RootLayoutSkeleton } from "@/components/layout/root-layout";
import { routing } from "@/lib/i18n/routing";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import PlausibleProvider from "next-plausible";
import { notFound } from "next/navigation";
import "~/styles/app.css";

export const metadata: Metadata = {
  title: "Marc Le Labourier | Full Stack Developer",
  description:
    "Marc Le Labourier own little space online. Maybe one day, a more complete description will be written. But for now, deal with it.",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export default async function Layout({ children, params }: LayoutProps) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <meta name="apple-mobile-web-app-title" content="Marc Le Labourier" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      <body>
        <PlausibleProvider domain="lelabourier.com">
          <NextIntlClientProvider messages={messages}>
            <RootLayoutSkeleton>{children}</RootLayoutSkeleton>
          </NextIntlClientProvider>
        </PlausibleProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
