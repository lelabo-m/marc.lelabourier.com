import { getTranslations } from "next-intl/server";

import { sections } from "./config";
import { Footer, Header, Section } from "./sections";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <div>
      <Header />
      {sections.map(({ key, component }) => (
        <Section key={key} id={key} title={t(`${key}.title`)}>
          {component()}
        </Section>
      ))}
      <Footer />
    </div>
  );
}
