import { TechStackBadgeProps } from "@/components/tech-stack-badge";
import { Cloud, Code, Cpu, LucideIcon, Server } from "lucide-react";

export interface TechStack {
  label: string;
  icon: LucideIcon;
  current: TechStackBadgeProps[];
  ifNeeded: TechStackBadgeProps[];
}

export const stacks = {
  frontend: {
    label: "Frontend",
    icon: Code,
    current: [
      {
        name: "TypeScript",
        level: "experienced",
      },
      {
        name: "React",
        level: "proficient",
      },
      {
        name: "Next.js",
        level: "proficient",
      },
      {
        name: "Tailwind CSS",
        level: "proficient",
      },
    ],
    ifNeeded: [
      {
        name: "JavaScript",
        level: "experienced",
      },
    ],
  },
  backend: {
    label: "Backend",
    icon: Server,
    current: [
      {
        name: "Python",
        level: "expert",
      },
      {
        name: "Go",
        level: "willing",
      },
    ],
    ifNeeded: [
      {
        name: "C#",
        level: "proficient",
      },
      {
        name: "Java",
        level: "proficient",
      },
      {
        name: "Ruby",
        level: "familiar",
      },
    ],
  },
  infrastructure: {
    label: "Infrastructure",
    icon: Cloud,
    current: [
      {
        name: "AWS",
        level: "experienced",
      },
      {
        name: "Vercel",
        level: "familiar",
      },
    ],
    ifNeeded: [],
  },
  compute: {
    label: "Systems & Compute",
    icon: Cpu,
    current: [
      {
        name: "Rust",
        level: "familiar",
      },
      {
        name: "C",
        level: "expert",
        notRecent: true,
      },
      {
        name: "C++",
        level: "experienced",
        notRecent: true,
      },
    ],
    ifNeeded: [],
  },
} satisfies Record<string, TechStack>;
