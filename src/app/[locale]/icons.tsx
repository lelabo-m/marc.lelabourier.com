import {
  Brain,
  Flame,
  Gamepad,
  GraduationCap,
  Handshake,
  Heart,
  LucideIcon,
  Puzzle,
  Users,
} from "lucide-react";
import { NestedValueOf } from "next-intl";

export type SkillKey = keyof NestedValueOf<IntlMessages, "home.skills.items">;

export const skillsIcons = {
  perspective: Brain,
  optimizer: Puzzle,
  leadership: Users,
  adaptability: Handshake,
  approach: Heart,
  mentorship: GraduationCap,
} satisfies Record<SkillKey, LucideIcon>;

type HobbyKey = keyof NestedValueOf<IntlMessages, "home.hobbies.categories">;

export const hobbiesIcons = {
  entertainment: Gamepad,
  interests: Flame,
  sports: Heart,
} satisfies Record<HobbyKey, LucideIcon>;
