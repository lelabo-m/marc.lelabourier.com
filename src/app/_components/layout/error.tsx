"use client";
import { NextErrorProps } from "@/lib/nextjs";
import { Home, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { PropsWithChildren } from "react";
import { Button } from "../ui/button";
import { InternalLink } from "../ui/link";

interface ErrorPageProps extends NextErrorProps, PropsWithChildren {}

export const ErrorPage = ({ reset }: ErrorPageProps) => {
  const t = useTranslations("common");

  return (
    <main className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-8">
        <h2 className="mb-4 text-6xl font-bold">Oops!</h2>
        <h3 className="mb-2 text-2xl font-semibold md:text-3xl">
          {t("error")}
        </h3>
        <p className="mx-auto mb-8 max-w-md text-gray-600">
          {t("error-description")}
        </p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row">
        <Button size="xl" asChild>
          <InternalLink href="/">
            <Home className="size-4.5" />
            {t("back-to-home-button")}
          </InternalLink>
        </Button>

        <Button variant="outline" size="xl" asChild>
          <button onClick={() => reset()}>
            <RefreshCw className="size-4.5" />
            {t("reset-button")}
          </button>
        </Button>
      </div>
    </main>
  );
};
