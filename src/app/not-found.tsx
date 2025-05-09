import "~/styles/app.css";

import { AppSkeleton } from "@/components/app-skeleton";
import { PageNotFound } from "@/components/layout/not-found";
import HomePageLayout from "@/components/layout/page";
import { defaultMetadata, defaultViewport } from "./metadata";

export const viewport = defaultViewport;
export const metadata = defaultMetadata;

export default async function NotFoundPage() {
  return (
    <AppSkeleton locale="en">
      <HomePageLayout>
        <PageNotFound />
      </HomePageLayout>
      <PageNotFound />
    </AppSkeleton>
  );
}
