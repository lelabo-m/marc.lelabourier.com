import type { CareerKey, TechStackTypeKey } from "@/lib/types";
import { objectValues } from "@/lib/utils";
import type { SkillBadge } from "~/app/[locale]/(external)/_components/skill-badges";
import type { TechStackBadgeProps } from "~/app/[locale]/(external)/_components/tech-stack-badge";

export const skillsByExperience = {
  entrepreneurialProgram: [
    { name: "Entrepreneurship", type: "technical" },
    { name: "Business Model Development", type: "technical" },
    { name: "Market Analysis", type: "technical" },
    { name: "Digital Publishing", type: "technical" },
    { name: "Project Formulation", type: "soft" },
    { name: "Strategic Pitching", type: "soft" },
    { name: "Networking", type: "soft" },
    { name: "Communication", type: "soft" },
    { name: "Problem-Solving", type: "soft" },
  ],
  digitalPublishing: [
    { name: "Editorial Project Implementation", type: "tech" },
    { name: "Publisher Role", type: "tech" },
    { name: "Edition Rights", type: "technical" },
    { name: "Publishing Law", type: "technical" },
    { name: "Digital Publishing", type: "technical" },
    { name: "Copyright Law", type: "technical" },
    { name: "Legal Compliance", type: "technical" },
    { name: "Project Management", type: "soft" },
  ],
  singlespot1: [
    { name: "Python", type: "tech" },
    { name: "Rust", type: "tech" },
    { name: "Apache Pulsar", type: "tech" },
    { name: "Snowflake", type: "tech" },
    { name: "Docker", type: "tech" },
    { name: "AWS", type: "tech" },
    { name: "Kubernetes", type: "tech" },
    { name: "OpenStreetMap", type: "tech" },
    { name: "Microservices", type: "technical" },
    { name: "Data Engineering", type: "technical" },
    { name: "Cloud Architecture", type: "technical" },
    { name: "Geospatial Analysis", type: "technical" },
    { name: "Technical Leadership", type: "soft" },
    { name: "Strategic Thinking", type: "soft" },
    { name: "Negotiation", type: "soft" },
  ],
  singlespot2: [
    { name: "Python", type: "tech" },
    { name: "Ruby on Rails", type: "tech" },
    { name: "PostgreSQL", type: "tech" },
    { name: "AWS", type: "tech" },
    { name: "Data Mining", type: "technical" },
    { name: "Machine Learning", type: "technical" },
    { name: "Data Engineering", type: "technical" },
    { name: "Backend Development", type: "technical" },
    { name: "Audience Segmentation", type: "technical" },
    { name: "Research", type: "technical" },
    { name: "Leadership", type: "soft" },
    { name: "Mentoring", type: "soft" },
  ],
  technicolor: [
    { name: "C++", type: "tech" },
    { name: "Qt", type: "tech" },
    { name: "Meshlab", type: "tech" },
    { name: "3D Graphics", type: "technical" },
    { name: "3D Mathematics", type: "technical" },
    { name: "Cryptography", type: "technical" },
    { name: "Security", type: "technical" },
    { name: "Algorithm Implementation", type: "technical" },
    { name: "Research", type: "technical" },
    { name: "Problem-Solving", type: "technical" },
    { name: "Collaboration", type: "soft" },
    { name: "Technical Writing", type: "soft" },
  ],
  epitech: [
    { name: "C", type: "tech" },
    { name: "Computer Science", type: "technical" },
    { name: "Algorithms", type: "technical" },
    { name: "Unix/Linux Administration", type: "technical" },
    { name: "Cybersecurity", type: "technical" },
    { name: "Mentoring", type: "soft" },
    { name: "Teaching", type: "soft" },
    { name: "Communication", type: "soft" },
    { name: "Teamwork", type: "soft" },
  ],
  creawave: [
    { name: "Python", type: "tech" },
    { name: "Django", type: "tech" },
    { name: "Full-Stack Web Development", type: "technical" },
    { name: "UI/UX Design", type: "technical" },
    { name: "Autonomy", type: "soft" },
    { name: "Communication", type: "soft" },
    { name: "Self-Learning", type: "soft" },
    { name: "Project Management", type: "soft" },
  ],
} satisfies Record<CareerKey, SkillBadge[]>;

export interface TechStack {
  current: TechStackBadgeProps[];
  ifNeeded: TechStackBadgeProps[];
}

export const techStack: Record<TechStackTypeKey, TechStack> = {
  frontend: {
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
} satisfies Record<TechStackTypeKey, TechStack>;

export const currentTechStack = objectValues(techStack).flatMap(
  ({ current }) => current,
);
