import { GeistSans } from "geist/font/sans";

import { AppSkeleton } from "@/components/layout/app";
import { PageNotFound } from "@/components/layout/not-found";
import { RootLayoutSkeleton } from "@/components/layout/root-layout";
import "~/styles/app.css";

export default function NotFoundPage() {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <meta name="apple-mobile-web-app-title" content="Marc Le Labourier" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <RootLayoutSkeleton>
          <AppSkeleton>
            <PageNotFound />
          </AppSkeleton>
        </RootLayoutSkeleton>
      </body>
    </html>
  );
}
