import { GeistSans } from "geist/font/sans";
import type { Locale } from "next-intl";
import type { PropsWithChildren } from "react";
import { AppSidebar } from "./layout/sidebar";
import { AppProvider } from "./provider";
import { SidebarProvider } from "./ui/sidebar";
import { NextIntlClientProvider } from "next-intl";

interface AppSkeletonProps extends PropsWithChildren {
  locale: Locale;
}

export const AppSkeleton = ({ locale, children }: AppSkeletonProps) => {
  return (
    <html
      lang={locale}
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <body>
        <AppProvider>
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <div className="@container/root-layout mx-auto min-h-svh w-full max-w-5xl">
              <div className="bg-background min-container-h sm:min-container-h-16 @container/frame snap-x p-4 shadow-lg sm:m-8 sm:p-8 dark:border">
                {children}
              </div>
            </div>
          </SidebarProvider>
        </AppProvider>
      </body>
    </html>
  );
};

export const VanillaAppSkeleton = ({ children }: PropsWithChildren) => {
  return (
    <html className={`${GeistSans.variable}`} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
};

export const GlobalErrorAppSkeleton = ({ children }: PropsWithChildren) => (
  <html>
    <body>{children}</body>
  </html>
);
