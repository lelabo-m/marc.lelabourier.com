import { EducationKey } from "@/lib/types";

export const formations = [
  "entrepreneurialProgram",
  "digitalPublishing",
] as const;

export type Formation = (typeof formations)[number];

export type CourseType = "Core" | "Elective" | "Specialized";

export type Course = {
  title: string;
  modules: string;
  type: CourseType;
  url?: string;
};

export type Reference = {
  curriculum: string;
  modules: string;
};

export const degreeReferences = {
  epitech: {
    curriculum: "https://www.epitech.eu/",
    modules:
      "https://international.epitech.eu/wp-content/uploads/Epitech-Incomings-Course-Catalogue-2024-2025-Paris.pdf",
  },
  kent: {
    curriculum:
      "https://www.kent.ac.uk/courses/postgraduate/246/advanced-computer-science",
    modules: "https://www.kent.ac.uk/courses/modules/",
  },
} satisfies Record<EducationKey, Reference>;

export const degreeModules = {
  epitech: [
    {
      title: "C Programming",
      modules: "Sem. 1, 2 & 4",
      type: "Core",
    },
    {
      title: "Graphical Programming (C)",
      modules: "Sem. 1 & 2",
      type: "Core",
    },
    {
      title: "UNIX System Programming",
      modules: "Sem. 1, 2 & 4",
      type: "Core",
    },
    {
      title: "Networking and System Administration",
      modules: "Sem. 2 & 5",
      type: "Core",
    },
    {
      title: "Security (Web)",
      modules: "Sem. 2 & 4",
      type: "Elective",
    },
    {
      title: "SQL and Databases",
      modules: "Sem. 2 & 4",
      type: "Core",
    },
    {
      title: "C++ Programming",
      modules: "Sem. 4 & 5",
      type: "Core",
    },
    {
      title: "Shell Scripting",
      modules: "Sem. 4",
      type: "Core",
    },
    {
      title: "Functional Programming (OCAML)",
      modules: "Sem. 4",
      type: "Elective",
    },
    {
      title: "Assembly (x86_64)",
      modules: "Sem. 4",
      type: "Elective",
    },
    {
      title: "Artificial Intelligence",
      modules: "Sem. 5 & 9",
      type: "Elective",
    },
    {
      title: ".NET Programming",
      modules: "Sem. 5",
      type: "Elective",
    },
    {
      title: "Java Programming",
      modules: "Sem. 5",
      type: "Elective",
    },
    {
      title: "System Conception",
      modules: "Sem. 5",
      type: "Elective",
    },
    {
      title: "Entrepreneurship & Start-up Creation",
      modules: "Sem. 9",
      type: "Elective",
    },
  ],
  kent: [
    {
      title: "Computer Graphics and Animation",
      modules: "COMP6410",
      type: "Elective",
      url: "https://www.kent.ac.uk/courses/modules/module/CO641",
    },
    {
      title: "Data Mining and Knowledge Discovery",
      modules: "COMP8320",
      type: "Specialized",
      url: "https://www.kent.ac.uk/courses/modules/module/CO832",
    },
    {
      title: "Cognitive Neural Networks",
      modules: "COMP8360",
      type: "Specialized",
      url: "https://www.kent.ac.uk/courses/modules/module/CO836",
    },
    {
      title: "Natural Computation",
      modules: "COMP8370",
      type: "Specialized",
      url: "https://www.kent.ac.uk/courses/modules/module/CO837",
    },
    {
      title: "Internet of Things and Mobile Devices",
      modules: "COMP8380",
      type: "Elective",
      url: "https://www.kent.ac.uk/courses/modules/module/CO838",
    },
    {
      title: "Advanced Java for Programmers",
      modules: "COMP8710",
      type: "Core",
      url: "https://www.kent.ac.uk/courses/modules/module/CO871",
    },
    {
      title: "Development Frameworks",
      modules: "COMP8940",
      type: "Elective",
      url: "https://www.kent.ac.uk/courses/modules/module/CO894",
    },
  ],
} satisfies Record<EducationKey, Course[]>;
