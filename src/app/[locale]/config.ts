import { CustomIcon, Github, Linkedin } from "@/components/icons";
import { profile } from "@/data/profile";
import { Messages } from "global";
import {
  Braces,
  BriefcaseBusiness,
  Dices,
  Ellipsis,
  FileBadge,
  GraduationCap,
  LucideIcon,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from "lucide-react";
import {
  CareerSection,
  EducationSection,
  HobbySection,
  InformationSection,
  PublicationSection,
  SkillSection,
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
    key: "about-me",
    sections: [
      {
        key: "skills",
        icon: Sparkles,
        component: SkillSection,
      },
      {
        key: "techstacks",
        icon: Braces,
        component: TechStackSection,
      },
    ],
  },
  {
    key: "background",
    sections: [
      {
        key: "career",
        icon: BriefcaseBusiness,
        component: CareerSection,
      },
      {
        key: "educations",
        icon: GraduationCap,
        component: EducationSection,
      },
      {
        key: "publications",
        icon: FileBadge,
        component: PublicationSection,
      },
    ],
  },
  {
    key: "misc",
    sections: [
      {
        key: "hobbies",
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
