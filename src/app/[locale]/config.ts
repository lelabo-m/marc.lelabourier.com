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
  id: string;
  titleKey: string; // Key for translation
  icon?: LucideIcon;
  //   component: React.FC; // Make this required
};

export const sections: SectionConfig[] = [
  {
    id: "summary",
    titleKey: "Summary.title",
    icon: MessageSquareText,
    // component: SummarySection,
  },
  {
    id: "experiences",
    titleKey: "Experiences.title",
    icon: BriefcaseBusiness,
    // component: ExperienceSection,
  },
  {
    id: "education",
    titleKey: "Educations.title",
    icon: GraduationCap,
    // component: EducationSection,
  },
  {
    id: "skills",
    titleKey: "Skills.title",
    icon: Puzzle,
    // component: SkillsSection,
  },
  {
    id: "formations",
    titleKey: "Formations",
    icon: Lightbulb, // Or choose a relevant icon
    // component: FormationsSection,
  },
  {
    id: "stack",
    titleKey: "Technologies.title",
    icon: Puzzle,
    // component: TechStackSection,
  },
  {
    id: "hobbies",
    titleKey: "Hobbies.title",
    icon: Puzzle,
    // component: HobbiesSection,
  },
  {
    id: "publications",
    titleKey: "Patents & Publications",
    icon: Puzzle,
    // component: PublicationsSection,
  },
  {
    id: "information",
    titleKey: "Additional Information",
    icon: Puzzle,
    // component: InformationSection,
  },
  {
    id: "contact",
    titleKey: "Contact.title",
    icon: Contact,
    // component: ContactSection,
  },
];
