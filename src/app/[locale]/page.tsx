import { Github, Linkedin } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { profile } from "@/data/profile";
import { Mail, MapPin, Phone } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "~/i18n/routing";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  // const { props } = getImageProps({
  //   src: "/profile.jpg",
  //   alt: "Marc Le Labourier profile picture",
  // });
  return (
    <>
      <div className="mx-auto max-w-4xl bg-white p-8 shadow-lg">
        <Header />
        <ContactSection />
        <SummarySection />

        <section className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">
            Work Experience
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Senior Software Engineer
              </h3>
              <p className="text-gray-600">
                TechCorp Inc. | Jan 2019 - Present
              </p>
              <ul className="mt-2 list-inside list-disc text-gray-700">
                <li>Led development of a high-traffic e-commerce platform</li>
                <li>
                  Implemented CI/CD pipelines, reducing deployment time by 50%
                </li>
                <li>Mentored junior developers and conducted code reviews</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800">
                Software Engineer
              </h3>
              <p className="text-gray-600">
                WebSolutions LLC | Jun 2016 - Dec 2018
              </p>
              <ul className="mt-2 list-inside list-disc text-gray-700">
                <li>Developed and maintained multiple client websites</li>
                <li>
                  Optimized database queries, improving application performance
                  by 30%
                </li>
                <li>
                  Collaborated with design team to implement responsive UI/UX
                </li>
              </ul>
            </div>
          </div>
        </section>

        <EducationSection />

        <section>
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {[
              "JavaScript",
              "React",
              "Node.js",
              "Python",
              "SQL",
              "Git",
              "AWS",
              "Docker",
              "GraphQL",
              "TypeScript",
            ].map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

{
  /* <main className="flex min-h-screen flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            {curriculumVitae.identity.firstName}{" "}
          {curriculumVitae.identity.lastName}
            <div>
              <h1>{t("title")}</h1>
              <Link href="/about">{t("about")}</Link>
            </div>
            <ProfilePicture />
            <h2>Education</h2>
            <h3> Epitech (European Institute of Technologie)</h3>
            <h4>Rennes, Paris (France)</h4> <h4>2012 - 2017</h4>
            <p>
              Bachelor and Master's degree in computer science. 3 internships
              (24 months of intership) Field: Programmation (C / C++ / Python /
              C#), Sécurité, système Unix, Agile, géstion de projets
            </p>
            <h3>University of Kent</h3>
            <h4>Canterbury (England)</h4> <h4>2015 - 2016</h4>
            <p>
              Master of Science in Advanced Computer Science : Artificial
              Intelligence. Field studied: Neural Networks, Data Mining, Natural
              Computation, Computer graphics and Animation, IOT
            </p>
          </h1>
        </div>
      </main> */
}

async function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">{profile.name}</h1>
        <p className="text-xl text-gray-600">{profile.jobTitle}</p>
      </div>
      <Avatar className="size-30">
        <AvatarImage
          src="/profile.jpg"
          alt="Marc Le Labourier profile picture"
          className="object-cover"
        />
        <AvatarFallback>MLL</AvatarFallback>
      </Avatar>
    </header>
  );
}

async function ContactSection() {
  const t = await getTranslations("ContactSection");

  return (
    <>
      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          {t("title")}
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex items-center">
            <Mail className="mr-2 h-5 w-5 text-gray-600" />
            <Link href={`mailto:${profile.email}`} className="text-blue-600">
              {profile.email}
            </Link>
          </div>
          <div className="flex items-center">
            <Phone className="mr-2 h-5 w-5 text-gray-600" />
            <span>{profile.phone}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-gray-600" />
            <span>{profile.location}</span>
          </div>
          <div className="flex items-center">
            <Linkedin className="mr-2 h-5 w-5 text-gray-600" />
            <a
              href={profile.socialLinks.linkedin.href}
              className="text-blue-600 hover:underline"
            >
              {profile.socialLinks.linkedin.text}
            </a>
          </div>
          <div className="flex items-center">
            <Github className="mr-2 h-5 w-5 text-gray-600" />
            <a
              href={profile.socialLinks.github.href}
              className="text-blue-600 hover:underline"
            >
              {profile.socialLinks.github.text}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

async function SummarySection() {
  const t = await getTranslations("SummarySection");

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        {t("title")}
      </h2>
      <p className="text-gray-700">{t("intro")}</p>
      <p className="mt-4 text-gray-700">{t("objective")}</p>
    </section>
  );
}

async function EducationSection() {
  const t = await getTranslations("EducationSection");
  const degrees = ["epitech", "kent"] as const;

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        {t("title")}
      </h2>

      <div className="space-y-4">
        {degrees.map((degree) => (
          <div key={degree}>
            <h3 className="text-xl font-semibold text-gray-800">
              {t(`degrees.${degree}.title`)}
            </h3>
            <p className="text-gray-600">
              {t(`degrees.${degree}.location`)} | {t(`degrees.${degree}.date`)}
            </p>
            <p>{t(`degrees.${degree}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
