import { profile } from "@/data/profile";
import { currentTechStack } from "@/data/skills";
import {
  type JobPosting,
  type Person,
  type ProfilePage,
  type WithContext,
} from "schema-dts";
import { env } from "~/env";

const yearsOfExperience = new Date().getFullYear() - 2011;
const description = `French developer with ${yearsOfExperience}+ years of hands-on experience in computer science and software development, drawing from both cutting-edge R&I and dynamic startup environments, I honed my expertise in backend, applied research & innovation, data processing and analysis, while broadening my skills in frontend, design, and infrastructure.`;

const me: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.jobTitle,
  url: env.DOMAIN,
  email: profile.email,
  telephone: profile.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.locality,
    addressCountry: profile.country,
  },
  sameAs: [profile.socials.linkedin.href, profile.socials.github.href],
  description,
  skills: currentTechStack.map((skill) => skill.name),
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "Epitech",
      url: "https://www.epitech.eu",
      description: "Master's Degree",
    },
    {
      "@type": "EducationalOrganization",
      name: "University of Kent",
      url: "https://www.kent.ac.uk/",
      description:
        "Master of Science in Advanced Computer Science (Computationnal Intelligence)",
    },
  ],
  knowsAbout: [
    "Full Stack Development",
    "Backend Development",
    "Applied Research & Innovation",
    "Data Processing and Analysis",
    "Frontend Development",
    "Design",
    "Infrastructure",
  ],
};

const profilePage: WithContext<ProfilePage> = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: me,
  headline: `${profile.name} | ${profile.jobTitle}`,
  description,
  author: me,
  datePublished: new Date("2025-04-01").toISOString(),
  dateModified: new Date().toISOString(),
  url: env.DOMAIN,
  image: `${env.DOMAIN}/profile.jpg`,
};

const jobPosting: WithContext<JobPosting> = {
  "@context": "https://schema.org",
  "@type": "JobPosting",
  title: profile.jobTitle,
  description,
  datePosted: new Date("2025-04-01").toISOString(),
  validThrough: new Date("2025-12-31").toISOString(),
  hiringOrganization: me,
  employmentType: "part-time",
  industry: "Software Development",
  jobLocation: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: profile.locality,
      addressCountry: profile.country,
    },
  },
  skills: currentTechStack.map((skill) => skill.name),
};

export const jsonLd = {
  me,
  profilePage,
  jobPosting,
};
