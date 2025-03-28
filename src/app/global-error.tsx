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
import { Home, RefreshCw } from "lucide-react";
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
      <body>
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
      </body>
    </html>
  );
}
