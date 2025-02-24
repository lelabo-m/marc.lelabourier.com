import {
  Brain,
  ExternalLink,
  GraduationCap,
  Heart,
  Mail,
  MapPin,
  Phone,
  Puzzle,
  Shuffle,
  Users,
} from "lucide-react";
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
import React from "react";
import { ProfessionalExperienceSection } from "./components";
import { SkillCard } from "./skills";
import SkillsAndTechnologies from "./test";

const contacts = [
  <>
    <Mail />
    <a href={`mailto:${profile.email}`}>{profile.email}</a>
  </>,
  <>
    <Phone />
    {profile.phone}
  </>,
  <>
    <MapPin />
    {profile.location}
  </>,
  <>
    <Linkedin />
    <a href={profile.socials.linkedin.href}>{profile.socials.linkedin.text}</a>
  </>,
  <>
    <Github />
    <a href={profile.socials.github.href}>{profile.socials.github.text}</a>
  </>,
];
export default async function HomePage() {
  const t = await getTranslations("HomePage");

  return (
    <div className="snap-x">
      {/* Header */}
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

      {/* Contact Section */}
      <Section id="contact" title={t("Contact.title")}>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {contacts.map((content, index) => (
            <ContactElement key={index}>{content}</ContactElement>
          ))}
        </div>
      </Section>

      {/* Summary Section */}
      <Section id="summary" title={t("Summary.title")}>
        <p className="text-foreground">{t("Summary.intro")}</p>
        <p className="text-foreground mt-4">{t("Summary.objective")}</p>
      </Section>

      <ProfessionalExperienceSection />
      <EducationSection />
      <SkillsSection />
      <SkillsAndTechnologies />
    </div>
  );
}

const Section = ({
  id,
  title,
  children,
}: React.ComponentProps<"section"> & { title: string }) => (
  <section className="mb-8 snap-start scroll-mt-4" id={id}>
    <h2 className="text-foreground mb-4 text-2xl font-semibold">{title}</h2>
    {children}
  </section>
);

const ContactElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="[&_svg]:text-muted-foreground flex items-center [&_a]:text-blue-600 [&_a]:hover:underline [&_svg]:mr-2 [&_svg]:h-5 [&_svg]:w-5">
      {children}
    </div>
  );
};

async function EducationSection() {
  const t = await getTranslations("EducationSection");
  const messages = await getMessages();

  const degreeKeys = ["epitech", "kent"] as const;

  return (
    <Section id="education" title={t("title")}>
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
    </Section>
  );
}

const SkillsSection = () => {
  return (
    <Section id="skills" title="Skills">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <SkillCard
          title="Holistic Perspective"
          icon={<Brain className="h-6 w-6" />}
          description="Broad exposure across multiple fields, allowing for diverse problem-solving and critical thinking."
        />
        <SkillCard
          title="Problem Solver & Optimizer"
          icon={<Puzzle className="h-6 w-6" />}
          description="Quick to identify issues and streamline processes, devising practical, team-focused solutions."
        />
        <SkillCard
          title="Team Leadership & Collaboration"
          icon={<Users className="h-6 w-6" />}
          description="Lead by example, foster open communication, and ensure every team member's contribution is acknowledged."
        />
        <SkillCard
          title="Adaptability & Negotiation"
          icon={<Shuffle className="h-6 w-6" />}
          description="Bridge gaps between technical specialists, adapt to various methodologies, and unite people around common goals."
        />
        <SkillCard
          title="Ethical & Down-to-Earth Approach"
          icon={<Heart className="h-6 w-6" />}
          description="Work with integrity and in good faith, grounded in reciprocity and fairness."
        />
        <SkillCard
          title="Mentorship & Teaching"
          icon={<GraduationCap className="h-6 w-6" />}
          description="Passionate about nurturing talent, from assisting first-year students to mentoring career-switching professionals. Foster a collaborative learning environment."
        />
      </div>
    </Section>
  );
};
