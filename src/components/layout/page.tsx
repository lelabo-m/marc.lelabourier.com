import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Toaster } from "@/components/ui/sonner";
import type { PropsWithChildren } from "react";

export default function HomePageLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-container-h-32 flex flex-col">
      <Header />
      {children}
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
