export const formations = [
  "entrepreneurialProgram",
  "digitalPublishing",
] as const;

export type Formation = (typeof formations)[number];

export type CourseType = "Core" | "Elective" | "Specialized";

export type Course = {
  title: string;
  ref: string;
  type: CourseType;
  url?: string;
};

export type Degree = {
  cursusUrl: string;
  coursesUrl: string;
  courses: Course[];
};

export const degrees = {
  epitech: {
    cursusUrl: "https://www.epitech.eu/",
    coursesUrl:
      "https://international.epitech.eu/wp-content/uploads/Epitech-Incomings-Course-Catalogue-2024-2025-Paris.pdf",
    courses: [
      {
        title: "C Programming",
        ref: "Sem. 1, 2 & 4",
        type: "Core",
      },
      {
        title: "Graphical Programming (C)",
        ref: "Sem. 1 & 2",
        type: "Core",
      },
      {
        title: "UNIX System Programming",
        ref: "Sem. 1, 2 & 4",
        type: "Core",
      },
      {
        title: "Networking and System Administration",
        ref: "Sem. 2 & 5",
        type: "Core",
      },
      {
        title: "Security (Web)",
        ref: "Sem. 2 & 4",
        type: "Elective",
      },
      {
        title: "SQL and Databases",
        ref: "Sem. 2 & 4",
        type: "Core",
      },
      {
        title: "C++ Programming",
        ref: "Sem. 4 & 5",
        type: "Core",
      },
      {
        title: "Shell Scripting",
        ref: "Sem. 4",
        type: "Core",
      },
      {
        title: "Functional Programming (OCAML)",
        ref: "Sem. 4",
        type: "Elective",
      },
      {
        title: "Assembly (x86_64)",
        ref: "Sem. 4",
        type: "Elective",
      },
      {
        title: "Artificial Intelligence",
        ref: "Sem. 5 & 9",
        type: "Elective",
      },
      {
        title: ".NET Programming",
        ref: "Sem. 5",
        type: "Elective",
      },
      {
        title: "Java Programming",
        ref: "Sem. 5",
        type: "Elective",
      },
      {
        title: "System Conception",
        ref: "Sem. 5",
        type: "Elective",
      },
      {
        title: "Entrepreneurship & Start-up Creation",
        ref: "Sem. 9",
        type: "Elective",
      },
    ],
  },
  kent: {
    cursusUrl:
      "https://www.kent.ac.uk/courses/postgraduate/246/advanced-computer-science",
    coursesUrl: "https://www.kent.ac.uk/courses/modules/",
    courses: [
      {
        title: "Computer Graphics and Animation",
        ref: "COMP6410",
        type: "Elective",
        url: "https://www.kent.ac.uk/courses/modules/module/CO641",
      },
      {
        title: "Data Mining and Knowledge Discovery",
        ref: "COMP8320",
        type: "Specialized",
        url: "https://www.kent.ac.uk/courses/modules/module/CO832",
      },
      {
        title: "Cognitive Neural Networks",
        ref: "COMP8360",
        type: "Specialized",
        url: "https://www.kent.ac.uk/courses/modules/module/CO836",
      },
      {
        title: "Natural Computation",
        ref: "COMP8370",
        type: "Specialized",
        url: "https://www.kent.ac.uk/courses/modules/module/CO837",
      },
      {
        title: "Internet of Things and Mobile Devices",
        ref: "COMP8380",
        type: "Elective",
        url: "https://www.kent.ac.uk/courses/modules/module/CO838",
      },
      {
        title: "Advanced Java for Programmers",
        ref: "COMP8710",
        type: "Core",
        url: "https://www.kent.ac.uk/courses/modules/module/CO871",
      },
      {
        title: "Development Frameworks",
        ref: "COMP8940",
        type: "Elective",
        url: "https://www.kent.ac.uk/courses/modules/module/CO894",
      },
    ],
  },
} satisfies Record<string, Degree>;

export type DegreeList = keyof typeof degrees;
