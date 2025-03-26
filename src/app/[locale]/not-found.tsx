import { Button } from "@/components/ui/button";
import { InternalLink } from "@/components/ui/link";
import { Toaster } from "@/components/ui/sonner";
import {
  TypographyH1,
  TypographyH2,
  TypographyP,
} from "@/components/ui/typography";
import { BackButton } from "@/components/utils/back-button";
import { ArrowLeft, Home } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Footer, Header } from "./page";

export default NotFoundLayout;

export async function NotFoundLayout() {
  const t = await getTranslations("common");
  return (
    <div className="min-container-h-32 flex flex-col">
      <Header />

      <main className="flex flex-1 flex-col items-center justify-center text-center">
        <div className="mb-8">
          <TypographyH1 className="mb-4">404</TypographyH1>
          <TypographyH2 className="mb-2">{t("not-found")}</TypographyH2>
          <TypographyP className="mx-auto mb-8 max-w-md">
            {t("not-found-description")}
          </TypographyP>
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

      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
