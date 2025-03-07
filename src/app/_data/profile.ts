import { Book, Dumbbell, Gamepad, Heart, LucideIcon } from "lucide-react";

export const profile = {
  name: "Marc Le Labourier",
  jobTitle: "Full Stack Developer",
  email: "marc.lelabourier@gmail.com",
  phone: "(+33)0638415550",
  location: "SQY, Yvelines, France",
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
    category: "Entertainment & Creativity",
    items: [
      "Manga & Webtoons",
      "Video & Board Games",
      "Podcasts & Audio Fiction",
      "Roleplaying Games (D&D, Call of Cthulhu)",
    ],
    icon: Gamepad,
  },
  {
    category: "Health & Fitness",
    items: ["Musculation", "Metabolism & Nutrition", "Anatomy & Physiology"],
    icon: Dumbbell,
  },
  {
    category: "Continuous Learning",
    items: [
      "Cultural & Scientific Facts",
      "Lores & Mythologies",
      "News & Politics",
    ],
    icon: Book,
  },
  {
    category: "Sports & Community",
    items: [
      "Handball",
      "Wheelchair Handball",
      "Disability Awareness Initiatives",
    ],
    icon: Heart,
  },
] satisfies HobbyCategoryProps[];
