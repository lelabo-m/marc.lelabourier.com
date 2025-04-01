import { getTranslations } from "next-intl/server";
import Image from "next/image";

import { Github, Linkedin } from "@/components/icons";
import { AppSkeleton } from "@/components/layout/app";
import { ExternalLink } from "@/components/ui/link";
import {
  TypographyH1,
  TypographyLead,
  TypographyP,
} from "@/components/ui/typography";
import {
  CopyToClipboardButton,
  type CopyToClipboardButtonProps,
} from "@/components/utils/copy-to-clipboard-button";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Phone } from "lucide-react";
import Script from "next/script";
import { Section } from "./_components/sections";
import { sections } from "./config";
import { ContactAnimatedPill, ContactAnimatedText } from "./page.client";
import { jsonLd } from "./schema";

export default async function HomePage() {
  const t = await getTranslations("home");

  return (
    <AppSkeleton>
      <Hero />
      {sections.map(({ key, component }) => (
        <Section
          key={key}
          id={key}
          title={t(`${key}.title`)}
          subtitle={t(`${key}.subtitle`)}
        >
          {component()}
        </Section>
      ))}
      <Script
        id="schema-markup"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </AppSkeleton>
  );
}

const Hero = async () => {
  const t = await getTranslations("home");
  const yearsOfExperience = new Date().getFullYear() - 2011;

  return (
    <section className="@container/hero pt-8 pb-16">
      <div className="container mx-auto">
        <TypographyH1 className="text-5xl font-medium lg:text-7xl">
          {profile.name}
        </TypographyH1>
        <TypographyLead className="text-3xl lg:text-4xl">
          {profile.jobTitle}
        </TypographyLead>
        <div className="mt-14 flex gap-4 @max-2xl/hero:flex-col">
          <HeroImage />
          <div className="my-auto h-fit space-y-16 text-lg @2xl/hero:order-first @2xl/hero:max-w-1/2 @3xl/hero:max-w-2/3">
            <HeroActions />
            <TypographyP>{t("hero.intro", { yearsOfExperience })}</TypographyP>
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroImage = () => (
  <div className="bg-card text-card-foreground m-auto overflow-hidden rounded-2xl border shadow-sm @max-2xl/hero:w-1/2">
    <Image
      src="/profile.jpg"
      alt="Marc Le Labourier profile picture"
      width={1400}
      height={2100}
      className="h-auto w-full object-cover"
      priority
    />
  </div>
);

const HeroActions = () => (
  <div className="@container/contacts space-y-4 @max-2xl/hero:mt-4">
    <div className="flex w-fit gap-4 @max-2xl/hero:mx-auto @max-2xl/hero:items-center @max-sm/contacts:flex-col">
      <ContactAnimatedText>
        <CopyContactButton text={profile.email}>
          <Mail className="h-4 w-4" />
          {profile.email}
        </CopyContactButton>
      </ContactAnimatedText>

      <ContactAnimatedText>
        <CopyContactButton text={profile.phone}>
          <Phone className="h-4 w-4" />
          {profile.phone}
        </CopyContactButton>
      </ContactAnimatedText>
    </div>

    <div className="flex w-fit gap-4 @max-2xl/hero:mx-auto">
      <ContactAnimatedPill asChild>
        <ExternalLink href={profile.socials.linkedin.href}>
          <Linkedin className="h-4 w-4" />
          <span className="sr-only">{"LinkedIn"}</span>
        </ExternalLink>
      </ContactAnimatedPill>

      <ContactAnimatedPill asChild>
        <ExternalLink href={profile.socials.github.href}>
          <Github className="h-5 w-5" />
          <span className="sr-only">{"GitHub"}</span>
        </ExternalLink>
      </ContactAnimatedPill>

      <ContactAnimatedPill className="w-auto flex-wrap gap-2 px-4 text-sm">
        <MapPin className="h-4 w-4" />
        {profile.location}
      </ContactAnimatedPill>
    </div>
  </div>
);

const CopyContactButton = ({
  className,
  children,
  ...props
}: CopyToClipboardButtonProps) => (
  <CopyToClipboardButton
    timeout={1000}
    {...props}
    className={cn("flex items-center gap-2", className)}
  >
    {children}
  </CopyToClipboardButton>
);
