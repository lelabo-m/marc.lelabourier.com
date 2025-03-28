import type {
  HobbyKey,
  SectionKey,
  SkillKey,
  TechStackTypeKey,
} from "@/lib/types";
import type { ConfigRecord } from "@/lib/utils";
import {
  Braces,
  Brain,
  BriefcaseBusiness,
  Cloud,
  Code,
  Cpu,
  Dices,
  Ellipsis,
  FileBadge,
  Flame,
  Gamepad,
  GraduationCap,
  Handshake,
  Heart,
  type LucideIcon,
  Puzzle,
  Server,
  Sparkles,
  Users,
} from "lucide-react";

type IconSet<Keys extends string> = ConfigRecord<Keys, LucideIcon>;

export const sidebarIcons = {
  skills: Sparkles,
  techstacks: Braces,
  career: BriefcaseBusiness,
  educations: GraduationCap,
  publications: FileBadge,
  hobbies: Dices,
  information: Ellipsis,
} satisfies IconSet<SectionKey>;

export const skillsIcons = {
  perspective: Brain,
  optimizer: Puzzle,
  leadership: Users,
  adaptability: Handshake,
  approach: Heart,
  mentorship: GraduationCap,
} satisfies IconSet<SkillKey>;

export const hobbiesIcons = {
  entertainment: Gamepad,
  interests: Flame,
  sports: Heart,
} satisfies IconSet<HobbyKey>;

export const techStackIcons = {
  frontend: Code,
  backend: Server,
  infrastructure: Cloud,
  compute: Cpu,
} satisfies IconSet<TechStackTypeKey>;
