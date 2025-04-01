import { profile } from "@/data/profile";
import { currentTechStack } from "@/data/skills";
import { type Person, type WithContext } from "schema-dts";
import { env } from "~/env";

const yearsOfExperience = new Date().getFullYear() - 2011;

export const jsonLd: WithContext<Person> = {
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
  description: `French developer with ${yearsOfExperience}+ years of hands-on experience in computer science and software development, drawing from both cutting-edge R&I and dynamic startup environments, I honed my expertise in backend, applied research & innovation, data processing and analysis, while broadening my skills in frontend, design, and infrastructure.`,
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
};
