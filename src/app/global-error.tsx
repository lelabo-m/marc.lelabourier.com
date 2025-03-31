"use client";

import { Footer } from "@/components/layout/footer";
import { InternalLink } from "@/components/ui/link";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyLead,
  TypographyP,
} from "@/components/ui/typography";
import { profile } from "@/data/profile";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Home, RefreshCw } from "lucide-react";
import PlausibleProvider from "next-plausible";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <html>
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
          <div className="@container/root-layout mx-auto min-h-svh w-full max-w-5xl">
            <div className="bg-background min-container-h sm:min-container-h-16 @container/frame snap-x p-4 shadow-lg sm:m-8 sm:p-8 dark:border">
              <div className="min-container-h-32 flex flex-col">
                <header className="mb-12">
                  <TypographyH1>{profile.name}</TypographyH1>
                  <TypographyLead>{profile.jobTitle}</TypographyLead>
                </header>

                <main className="flex flex-1 flex-col items-center justify-center text-center">
                  <div className="mb-8">
                    <TypographyH2 className="mb-4">{"Oops!"}</TypographyH2>
                    <TypographyH3 className="mb-2">
                      {"Something went wrong"}
                    </TypographyH3>
                    <TypographyP className="mx-auto mb-8 max-w-md">
                      {
                        "An unexpected error has occurred. Please try again later."
                      }
                    </TypographyP>
                  </div>

                  <div className="flex flex-col gap-4 sm:flex-row">
                    <InternalLink
                      href="/"
                      className="flex items-center justify-center gap-2 rounded-md bg-black px-6 py-3 text-white transition-colors hover:bg-gray-800"
                    >
                      <Home size={18} />
                      <span>{"Back to Home"}</span>
                    </InternalLink>
                    <button
                      onClick={() => reset()}
                      className="flex items-center justify-center gap-2 rounded-md border border-gray-300 px-6 py-3 transition-colors hover:bg-gray-50"
                    >
                      <RefreshCw size={18} />
                      <span>{"Try Again"}</span>
                    </button>
                  </div>
                </main>

                <Footer />
              </div>
            </div>
          </div>
        </PlausibleProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
