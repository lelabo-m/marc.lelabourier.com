import { Messages } from "global";
import {
  Brain,
  GraduationCap,
  Handshake,
  Heart,
  LucideIcon,
  Puzzle,
  Users,
} from "lucide-react";

export type SkillKey = keyof Messages["home"]["skills"]["items"];

export const skillsIcons = {
  perspective: Brain,
  optimizer: Puzzle,
  leadership: Users,
  adaptability: Handshake,
  approach: Heart,
  mentorship: GraduationCap,
} satisfies Record<SkillKey, LucideIcon>;
