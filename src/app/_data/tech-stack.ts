import { Cloud, Code, Cpu, LucideIcon, Server } from "lucide-react";

export const techLevels = ["expert", "proficient", "familiar"] as const;

export type TechLevel = (typeof techLevels)[number];

export const levelColors = {
  expert: "bg-green-500",
  proficient: "bg-blue-500",
  familiar: "bg-yellow-500",
} satisfies Record<TechLevel, string>;

export interface Tech {
  tech: string;
  level: TechLevel;
}

export interface TechStack {
  label: string;
  icon: LucideIcon;
  current: Tech[];
  ifNeeded: Tech[];
}

export const stacks = {
  frontend: {
    label: "Frontend",
    icon: Code,
    current: [
      {
        tech: "TypeScript",
        level: "expert",
      },
      {
        tech: "React",
        level: "expert",
      },
      {
        tech: "Next.js",
        level: "proficient",
      },
      {
        tech: "Tailwind CSS",
        level: "proficient",
      },
    ],
    ifNeeded: [
      {
        tech: "JavaScript",
        level: "expert",
      },
    ],
  },
  backend: {
    label: "Backend",
    icon: Server,
    current: [
      {
        tech: "Python",
        level: "expert",
      },
    ],
    ifNeeded: [
      {
        tech: "C#",
        level: "familiar",
      },
      {
        tech: "Java",
        level: "familiar",
      },
      {
        tech: "Ruby",
        level: "familiar",
      },
    ],
  },
  infrastructure: {
    label: "Infrastructure",
    icon: Cloud,
    current: [
      {
        tech: "AWS",
        level: "proficient",
      },
      {
        tech: "Vercel",
        level: "familiar",
      },
    ],
    ifNeeded: [],
  },
  compute: {
    label: "Systems Programming & Compute",
    icon: Cpu,
    current: [
      {
        tech: "Rust",
        level: "familiar",
      },
    ],
    ifNeeded: [
      {
        tech: "C",
        level: "proficient",
      },
      {
        tech: "C++",
        level: "proficient",
      },
    ],
  },
} satisfies Record<string, TechStack>;
