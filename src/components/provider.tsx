import { SpeedInsights } from "@vercel/speed-insights/next";
import { NextIntlClientProvider } from "next-intl";
import PlausibleProvider from "next-plausible";
import { NuqsAdapter } from "nuqs/adapters/next";
import type { PropsWithChildren } from "react";
import { TRPCReactProvider } from "../trpc/react";
import { ThemeProvider } from "./theme-provider";

export function AppProvider({ children }: PropsWithChildren) {
  return (
    <>
      <PlausibleProvider domain="lelabourier.com">
        <NuqsAdapter>
          <TRPCReactProvider>
            <NextIntlClientProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                {children}
              </ThemeProvider>
            </NextIntlClientProvider>
          </TRPCReactProvider>
        </NuqsAdapter>
      </PlausibleProvider>
      <SpeedInsights />
    </>
  );
}

export function GlobalErrorProvider({ children }: PropsWithChildren) {
  return (
    <>
      <PlausibleProvider domain="lelabourier.com">{children}</PlausibleProvider>
      <SpeedInsights />
    </>
  );
}
