import type { ButtonHTMLAttributes, ClassAttributes } from "react";
import type { IntlKeysOf } from "./i18n/utils";

export type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  ClassAttributes<HTMLButtonElement>;

export type SectionKey = IntlKeysOf<"home">;
export type SidebarKey = IntlKeysOf<"sidebar">;
export type SkillKey = IntlKeysOf<"home.skills.items">;
export type HobbyKey = IntlKeysOf<"home.hobbies.categories">;
export type CareerKey = IntlKeysOf<"home.career.items">;
export type EducationKey = IntlKeysOf<"home.educations.items">;
export type TechStackTypeKey = IntlKeysOf<"home.techstacks.types">;
export type TechStackLevelKey = IntlKeysOf<"home.techstacks.levels">;
