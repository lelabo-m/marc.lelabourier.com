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

type SkillKey = keyof Messages["home"]["skills"]["skillset"];

export const skillsIcons = {
  perspective: Brain,
  optimizer: Puzzle,
  team: Users,
  adaptability: Handshake,
  approach: Heart,
  mentorship: GraduationCap,
} satisfies Record<SkillKey, LucideIcon>;
