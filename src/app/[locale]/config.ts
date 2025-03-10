import { CustomIcon, Github, Linkedin } from "@/components/icons";
import { profile } from "@/data/profile";
import {
  BriefcaseBusiness,
  Contact,
  GraduationCap,
  Lightbulb,
  LucideIcon,
  Mail,
  MapPin,
  MessageSquareText,
  Phone,
  Puzzle,
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

export type SectionConfig = {
  key: keyof IntlMessages["home"];
  icon?: LucideIcon;
  component: React.FC;
};

export const sections = [
  {
    key: "summary",
    icon: MessageSquareText,
    component: SummarySection,
  },
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
    key: "skill",
    icon: Puzzle,
    component: SkillSection,
  },
  {
    key: "formation",
    icon: Lightbulb, // Or choose a relevant icon
    component: FormationSection,
  },
  {
    key: "techstack",
    icon: Puzzle,
    component: TechStackSection,
  },
  {
    key: "hobby",
    icon: Puzzle,
    component: HobbySection,
  },
  {
    key: "publication",
    icon: Puzzle,
    component: PublicationSection,
  },
  {
    key: "information",
    icon: Puzzle,
    component: InformationSection,
  },
  {
    key: "contact",
    icon: Contact,
    component: ContactSection,
  },
] as const satisfies SectionConfig[];
