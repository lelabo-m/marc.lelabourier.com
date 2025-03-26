import { GeistSans } from "geist/font/sans";

import "~/styles/app.css";
import { RootLayoutContent } from "./[locale]/layout";
import { NotFoundLayout } from "./[locale]/not-found";

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
        <RootLayoutContent>
          <NotFoundLayout />
        </RootLayoutContent>
      </body>
    </html>
  );
}
