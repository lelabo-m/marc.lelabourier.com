"use client";

import { AppSkeleton } from "@/components/layout/app";
import { ErrorPage } from "@/components/layout/error";
import type { NextErrorProps } from "@/lib/nextjs";
import { useEffect } from "react";
import "~/styles/app.css";

export default function Error({ error, reset }: NextErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <AppSkeleton>
      <ErrorPage error={error} reset={reset} />
    </AppSkeleton>
  );
}
