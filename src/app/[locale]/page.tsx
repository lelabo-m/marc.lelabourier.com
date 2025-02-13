import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { getMessages, getTranslations } from "next-intl/server";

import {
  EducationCard,
  EducationCardContent,
  EducationCardHeader,
  EducationCardModuleGrid,
} from "@/components/education-card";
import { Github, Linkedin } from "@/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { degrees } from "@/data/degrees";
import { profile } from "@/data/profile";
import { Link } from "@/lib/i18n/routing";
import { ProfessionalExperienceSection } from "./components";

export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div className="snap-x">
      {/* <div className="mx-auto max-w-4xl bg-white p-8 shadow-lg"> */}
      <Header />
      <ContactSection />
      <SummarySection />
      <ProfessionalExperienceSection />
      <EducationSection />

      <section>
        <h2 className="text-foreground mb-4 text-2xl font-semibold">Skills</h2>
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
      {/* </div> */}
    </div>
  );
}

async function Header() {
  return (
    <header className="mb-8 flex items-center justify-between">
      <div>
        <h1 className="text-foreground text-4xl font-bold">{profile.name}</h1>
        <p className="text-muted-foreground text-xl">{profile.jobTitle}</p>
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
    <section className="mb-8 snap-start scroll-mt-4" id="contact">
      <h2 className="text-foreground mb-4 text-2xl font-semibold">
        {t("title")}
      </h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex items-center">
          <Mail className="text-muted-foreground mr-2 h-5 w-5" />
          <Link href={`mailto:${profile.email}`} className="text-blue-600">
            {profile.email}
          </Link>
        </div>
        <div className="flex items-center">
          <Phone className="text-muted-foreground mr-2 h-5 w-5" />
          <span>{profile.phone}</span>
        </div>
        <div className="flex items-center">
          <MapPin className="text-muted-foreground mr-2 h-5 w-5" />
          <span>{profile.location}</span>
        </div>
        <div className="flex items-center">
          <Linkedin className="text-muted-foreground mr-2 h-5 w-5" />
          <a
            href={profile.socialLinks.linkedin.href}
            className="text-blue-600 hover:underline"
          >
            {profile.socialLinks.linkedin.text}
          </a>
        </div>
        <div className="flex items-center">
          <Github className="text-muted-foreground mr-2 h-5 w-5" />
          <a
            href={profile.socialLinks.github.href}
            className="text-blue-600 hover:underline"
          >
            {profile.socialLinks.github.text}
          </a>
        </div>
      </div>
    </section>
  );
}

async function SummarySection() {
  const t = await getTranslations("SummarySection");

  return (
    <section className="mb-8 snap-start scroll-mt-4" id="summary">
      <h2 className="text-foreground mb-4 text-2xl font-semibold">
        {t("title")}
      </h2>
      <p className="text-foreground">{t("intro")}</p>
      <p className="text-foreground mt-4">{t("objective")}</p>
    </section>
  );
}

async function EducationSection() {
  const t = await getTranslations("EducationSection");
  const messages = await getMessages();

  const degreeKeys = ["epitech", "kent"] as const;

  return (
    <section className="mb-8 snap-start scroll-mt-4" id="education">
      <h2 className="text-foreground mb-4 text-2xl font-semibold">
        {t("title")}
      </h2>

      <div className="space-y-4">
        {degreeKeys.map((degree) => (
          <EducationCard key={degree}>
            <EducationCardHeader
              degree={t(`degrees.${degree}.title`)}
              institution={t(`degrees.${degree}.institution`)}
              location={t(`degrees.${degree}.location`)}
              date={t(`degrees.${degree}.date`)}
            />
            <EducationCardContent>
              <div className="space-y-6">
                <p className="text-sm">{t(`degrees.${degree}.description`)}</p>
                <div>
                  <h4 className="mb-2 font-semibold">Learn more about:</h4>
                  <div className="flex space-x-4">
                    <Button variant="outline" asChild>
                      <a
                        href={degrees[degree].cursusUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Cursus <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href={degrees[degree].coursesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Course Link <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="mb-2 font-semibold">Modules:</h4>
                  <EducationCardModuleGrid courses={degrees[degree].courses} />
                </div>
              </div>
            </EducationCardContent>
          </EducationCard>
        ))}
      </div>
    </section>
  );
}
