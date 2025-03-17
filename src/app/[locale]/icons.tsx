import { HobbyKey, SectionKey, SkillKey } from "@/lib/types";
import { ConfigRecord } from "@/lib/utils";
import {
  Braces,
  Brain,
  BriefcaseBusiness,
  Dices,
  Ellipsis,
  FileBadge,
  Flame,
  Gamepad,
  GraduationCap,
  Handshake,
  Heart,
  LucideIcon,
  Puzzle,
  Sparkles,
  Users,
} from "lucide-react";

type IconSet<Keys extends string> = ConfigRecord<Keys, LucideIcon>;

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

export const sectionIcons = {
  skills: Sparkles,
  techstacks: Braces,
  career: BriefcaseBusiness,
  educations: GraduationCap,
  publications: FileBadge,
  hobbies: Dices,
  information: Ellipsis,
} satisfies IconSet<SectionKey>;
