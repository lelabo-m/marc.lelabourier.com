import { AppSkeleton } from "@/components/app-skeleton";
import { validateLocale } from "@/lib/i18n/utils";
import { setRequestLocale } from "next-intl/server";
import { defaultMetadata, defaultViewport } from "~/app/metadata";
import "~/styles/app.css";

export const viewport = defaultViewport;
export const metadata = defaultMetadata;

type LayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{
    locale: string;
  }>;
}>;

export default async function RootLayout({ params, children }: LayoutProps) {
  const { locale: requestedLocale } = await params;

  const locale = validateLocale(requestedLocale);

  // Enable static rendering
  setRequestLocale(locale);

  return <AppSkeleton locale={locale}> {children}</AppSkeleton>;
}
