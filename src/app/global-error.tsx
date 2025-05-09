"use client";

import * as Sentry from "@sentry/nextjs";
import { Home, RefreshCw } from "lucide-react";
// eslint-disable-next-line no-restricted-imports
import Link from "next/link";
import { useEffect } from "react";

import { GlobalErrorAppSkeleton } from "@/components/app-skeleton";
import { Footer } from "@/components/layout/footer";
import { GlobalErrorProvider } from "@/components/provider";
import { Button } from "@/components/ui/button";
import {
  TypographyH1,
  TypographyH2,
  TypographyH3,
  TypographyLead,
  TypographyP,
} from "@/components/ui/typography";
import { profile } from "@/data/profile";
import { defaultMetadata, defaultViewport } from "./metadata";

export const viewport = defaultViewport;
export const metadata = defaultMetadata;

export type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError(props: GlobalErrorProps) {
  const { error } = props;
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <GlobalErrorAppSkeleton>
      <GlobalErrorProvider>
        <GlobalErrorPage {...props} />
      </GlobalErrorProvider>
    </GlobalErrorAppSkeleton>
  );
}

const GlobalErrorPage = ({ reset }: GlobalErrorProps) => {
  return (
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
                {"Something is really broken."}
              </TypographyH3>
              <TypographyP className="mx-auto mb-8 max-w-md">
                {"An unexpected error has occurred. Please try again later."}
                <br />
                {`You can report it there: ${profile.email}`}
              </TypographyP>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Button size="xl" asChild>
                <Link href="/">
                  <Home className="size-4.5" />
                  <span>{"Back to Home"}</span>
                </Link>
              </Button>

              <Button size="xl" variant="outline" onClick={() => reset()}>
                <RefreshCw className="size-4.5" />
                <span>{"Try Again"}</span>
              </Button>
            </div>
          </main>

          <Footer />
        </div>
      </div>
    </div>
  );
};
