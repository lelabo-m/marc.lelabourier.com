import { SectionKey, SidebarKey } from "@/lib/types";
import { ConfigRecord } from "@/lib/utils";
import {
  CareerSection,
  EducationSection,
  HobbySection,
  InformationSection,
  PublicationSection,
  SkillSection,
  TechStackSection,
} from "./sections";

export const sectionComponents = {
  skills: SkillSection,
  techstacks: TechStackSection,
  career: CareerSection,
  educations: EducationSection,
  publications: PublicationSection,
  hobbies: HobbySection,
  information: InformationSection,
} as const satisfies ConfigRecord<SectionKey, React.FC>;

type SidebarGroup = {
  key: SidebarKey;
  sections: SectionKey[];
};

export const sidebarMapping = [
  {
    key: "about-me",
    sections: ["skills", "techstacks"],
  },
  {
    key: "background",
    sections: ["career", "educations", "publications"],
  },
  {
    key: "misc",
    sections: ["hobbies", "information"],
  },
] as const satisfies SidebarGroup[];

export const sections = sidebarMapping.flatMap(({ sections }) =>
  sections.map((key) => ({
    key,
    component: sectionComponents[key],
  })),
);
