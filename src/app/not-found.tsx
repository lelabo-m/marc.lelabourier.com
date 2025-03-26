import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/components/ui/sidebar";
import { GeistSans } from "geist/font/sans";

import "~/styles/app.css";
import NotFound from "./[locale]/not-found";
import { AppSidebar } from "./[locale]/sidebar";

export default function NotFoundPage() {
  console.log("This is a 404 page");
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      suppressHydrationWarning
    >
      <meta name="apple-mobile-web-app-title" content="Marc Le Labourier" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SidebarProvider defaultOpen={false}>
            <AppSidebar />
            <div className="@container/root-layout mx-auto min-h-svh w-full max-w-5xl">
              <div className="bg-background min-container-h sm:min-container-h-16 @container/frame snap-x p-4 shadow-lg sm:m-8 sm:p-8 dark:border">
                <NotFound />
              </div>
            </div>
          </SidebarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
