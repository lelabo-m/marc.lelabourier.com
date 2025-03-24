import { levelVariant } from "@/components/tech-stack-badge";
import { VariantProps } from "class-variance-authority";
import { Cloud, Code, Cpu, LucideIcon, Server } from "lucide-react";

export type TechLevel = VariantProps<typeof levelVariant>["variant"];

export const techLevels = [
  "expert",
  "experienced",
  "proficient",
  "familiar",
  "willingToLearn",
] satisfies TechLevel[];

export interface Tech {
  tech: string;
  level: TechLevel;
  rusty?: boolean;
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
        level: "experienced",
      },
      {
        tech: "React",
        level: "proficient",
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
        level: "experienced",
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
      {
        tech: "Go",
        level: "willingToLearn",
      },
    ],
    ifNeeded: [
      {
        tech: "C#",
        level: "proficient",
      },
      {
        tech: "Java",
        level: "proficient",
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
        level: "experienced",
      },
      {
        tech: "Vercel",
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
        tech: "Rust",
        level: "familiar",
      },
      {
        tech: "C",
        level: "expert",
        rusty: true,
      },
      {
        tech: "C++",
        level: "experienced",
        rusty: true,
      },
    ],
    ifNeeded: [],
  },
} satisfies Record<string, TechStack>;
