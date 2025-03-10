import { CustomIcon, Github, Linkedin } from "@/components/icons";
import { profile } from "@/data/profile";
import { Messages } from "global";
import {
  Braces,
  BriefcaseBusiness,
  Contact,
  Dices,
  Ellipsis,
  FileBadge,
  GraduationCap,
  LucideIcon,
  Mail,
  MapPin,
  MessageSquareText,
  Microscope,
  Phone,
  Sparkles,
} from "lucide-react";
import {
  ContactSection,
  EducationSection,
  FormationSection,
  HobbySection,
  InformationSection,
  ProfessionalExperienceSection,
  PublicationSection,
  SkillSection,
  SummarySection,
  TechStackSection,
} from "./sections";

export interface ContactProps {
  icon: CustomIcon | LucideIcon;
  link?: string;
  text: string;
}

export const contacts = [
  {
    icon: Mail,
    link: `mailto:${profile.email}`,
    text: profile.email,
  },
  {
    icon: Phone,
    text: profile.phone,
  },
  {
    icon: MapPin,
    text: profile.location,
  },
  {
    icon: Linkedin,
    link: profile.socials.linkedin.href,
    text: profile.socials.linkedin.text,
  },
  {
    icon: Github,
    link: profile.socials.github.href,
    text: profile.socials.github.text,
  },
] satisfies ContactProps[];

export type SubSection = {
  key: keyof IntlMessages["home"];
  icon?: LucideIcon;
  component: React.FC;
};

export type Section = {
  key: keyof Messages["home"]["sidebar"];
  sections: SubSection[];
};

export const sections = [
  {
    key: "toc",
    sections: [
      {
        key: "contact",
        icon: Contact,
        component: ContactSection,
      },
    ],
  },
  {
    key: "about-me",
    sections: [
      {
        key: "summary",
        icon: MessageSquareText,
        component: SummarySection,
      },
      {
        key: "skill",
        icon: Sparkles,
        component: SkillSection,
      },
      {
        key: "techstack",
        icon: Braces,
        component: TechStackSection,
      },
    ],
  },
  {
    key: "background",
    sections: [
      {
        key: "experience",
        icon: BriefcaseBusiness,
        component: ProfessionalExperienceSection,
      },
      {
        key: "education",
        icon: GraduationCap,
        component: EducationSection,
      },

      {
        key: "formation",
        icon: Microscope,
        component: FormationSection,
      },
      {
        key: "publication",
        icon: FileBadge,
        component: PublicationSection,
      },
    ],
  },
  {
    key: "misc",
    sections: [
      {
        key: "hobby",
        icon: Dices,
        component: HobbySection,
      },
      {
        key: "information",
        icon: Ellipsis,
        component: InformationSection,
      },
    ],
  },
] as const satisfies Section[];
