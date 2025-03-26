import { Button } from "@/components/ui/button";
import { InternalLink } from "@/components/ui/link";
import { Toaster } from "@/components/ui/sonner";
import { BackButton } from "@/components/utils/back-button";
import { ArrowLeft, Home } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Footer, Header } from "./page";

export default function NotFoundPage() {
  return (
    <div className="min-container-h-32 flex flex-col">
      <Header />
      <NotFound />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

const NotFound = async () => {
  const t = await getTranslations("common");

  return (
    <main className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="mb-8">
        <h2 className="mb-4 text-6xl font-bold">404</h2>
        <h3 className="mb-2 text-2xl font-semibold md:text-3xl">
          {t("not-found")}
        </h3>
        <p className="mx-auto mb-8 max-w-md text-gray-600">
          {t("not-found-description")}
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row">
        <Button size="xl" asChild>
          <InternalLink href="/">
            <Home className="size-4.5" />
            {t("back-to-home")}
          </InternalLink>
        </Button>

        <Button size="xl" variant="outline" asChild>
          <BackButton>
            <ArrowLeft className="size-4.5" />
            {t("back")}
          </BackButton>
        </Button>
      </div>
    </main>
  );
};
