import { VanillaAppSkeleton } from "@/components/app-skeleton";
import { defaultMetadata, defaultViewport } from "~/app/metadata";
import "~/styles/app.css";

export const viewport = defaultViewport;
export const metadata = defaultMetadata;

type LayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default async function Layout({ children }: LayoutProps) {
  return <VanillaAppSkeleton>{children}</VanillaAppSkeleton>;
}
