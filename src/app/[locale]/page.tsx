import { getTranslations } from "next-intl/server";

import { Toaster } from "@/components/ui/sonner";
import { sections } from "./config";
import { Footer, Header, Hero, Section } from "./sections";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <>
      <Header />
      <Hero />
      {sections.map(({ sections: subsections }) =>
        subsections.map(({ key, component }) => (
          <Section
            key={key}
            id={key}
            title={t(`${key}.title`)}
            subtitle={t(`${key}.subtitle`)}
          >
            {component()}
          </Section>
        )),
      )}

      <Footer />
      <Toaster position="top-right" />
    </>
  );
}
