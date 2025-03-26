import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { routing } from "@/lib/i18n/routing";
import { PropsWithChildren } from "react";
import "~/styles/app.css";
import { AppSidebar } from "./sidebar";

export const metadata: Metadata = {
  title: "Marc Le Labourier | Full Stack Developer",
  description:
    "Marc Le Labourier own little space online. Maybe one day, a more complete description will be written. But for now, deal with it.",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as any)) {
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
        <NextIntlClientProvider messages={messages}>
          <RootLayoutContent>{children}</RootLayoutContent>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export const RootLayoutContent = ({ children }: PropsWithChildren) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <div className="@container/root-layout mx-auto min-h-svh w-full max-w-5xl">
        <div className="bg-background min-container-h sm:min-container-h-16 @container/frame snap-x p-4 shadow-lg sm:m-8 sm:p-8 dark:border">
          {children}
        </div>
      </div>
    </SidebarProvider>
  </ThemeProvider>
);
