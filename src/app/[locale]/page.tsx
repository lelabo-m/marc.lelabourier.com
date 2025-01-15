import { useTranslations } from "next-intl";
import { Link } from "~/i18n/routing";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          {/* {curriculumVitae.identity.firstName}{" "}
          {curriculumVitae.identity.lastName} */}
          <div>
            <h1>{t("title")}</h1>
            <Link href="/about">{t("about")}</Link>
          </div>
        </h1>
      </div>
    </main>
  );
}
