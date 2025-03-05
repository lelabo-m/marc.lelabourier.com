import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";

import { LocaleToggle } from "@/components/locale-toggle";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeToggle } from "@/components/theme-toggle";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { routing } from "@/lib/i18n/routing";
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
      className={`${GeistSans.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <meta name="apple-mobile-web-app-title" content="Marc Le Labourier" />
      <body>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider defaultOpen={false}>
              <AppSidebar />
              <div className="bg-background m-8 mx-auto max-w-5xl snap-x p-8 shadow-lg dark:border">
                <div className="flex items-center gap-4">
                  <SidebarTrigger />
                  <ThemeToggle />
                  <LocaleToggle locale={locale} />
                </div>
                {children}
              </div>
            </SidebarProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
