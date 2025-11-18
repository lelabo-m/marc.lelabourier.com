import { Flame, Gamepad, Heart, type LucideIcon } from "lucide-react";

export const profile = {
  name: "Marc Le Labourier",
  jobTitle: "Full Stack Developer",
  email: "marc.lelabourier@gmail.com",
  phone: "(+33)0638415550",
  location: "Clermont-Ferrand, Auvergne-Rhône-Alpes, France",
  address: {
    locality: "Clermont-Ferrand",
    region: "Auvergne-Rhône-Alpes",
    country: "FR",
  },
  socials: {
    github: {
      text: "github.com/lelabo-m",
      href: "https://github.com/lelabo-m",
    },
    linkedin: {
      text: "linkedin.com/in/marclelabourier",
      href: "https://www.linkedin.com/in/marclelabourier/",
    },
  },
};

export const experiences = [
  "singlespot1",
  "singlespot2",
  "technicolor",
  "epitech",
  "creawave",
] as const;

export type ExperienceList = (typeof experiences)[number];

export interface HobbyCategoryProps {
  category: string;
  items: string[];
  icon: LucideIcon;
}

export const hobbies = [
  {
    category: "Entertainment",
    items: [
      "Manga & Webtoons",
      "Video & Board Games",
      "Podcasts & Audio Fiction",
    ],
    icon: Gamepad,
  },
  {
    category: "Interests",
    items: [
      "Roleplaying Games",
      "Metabolism & Nutrition",
      "Anatomy & Physiology",
      "Disability Awareness Initiatives",
    ],
    icon: Flame,
  },

  {
    category: "Sports & Community",
    items: ["Musculation", "Swimming", "Handball (Valid & Wheelchair)"],
    icon: Heart,
  },
] satisfies HobbyCategoryProps[];
