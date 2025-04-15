import { profile } from "@/data/profile";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "~/styles/app.css";

export const metadata: Metadata = {
  title: `${profile.name} | ${profile.jobTitle}`,
  description:
    "Marc Le Labourier own little space online. Maybe one day, a more complete description will be written. But for now, deal with it.",
  // icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: LayoutProps) {
  return (
    <html className={`${GeistSans.variable}`} suppressHydrationWarning>
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

      <body>{children}</body>
    </html>
  );
}
