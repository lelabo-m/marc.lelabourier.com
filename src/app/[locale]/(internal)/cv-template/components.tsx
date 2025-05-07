import { brandIcons } from "@/components/icons";
import { ExternalLink } from "@/components/ui/link";
import { Link, type LucideIcon, Mail, MapPin, Phone } from "lucide-react";
import type { PropsWithChildren } from "react";
import QRCode from "react-qr-code";

const Page = ({ children }: PropsWithChildren) => (
  <div className="w-[210mm] overflow-hidden bg-white">{children}</div>
);

const Container = ({ children }: PropsWithChildren) => (
  <div className="flex h-full flex-col p-8"> {children}</div>
);

function shortenUrl(url: string): string {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.host;
  } catch (error) {
    console.error("Invalid URL:", error);
    return url;
  }
}

const WATERMARK_URL = "https://marc.lelabourier.com/en/cv";

interface WatermarkProps {
  source: string;
}
function Header({ children }: PropsWithChildren) {
  return (
    <header className="mb-4 border-b border-gray-300 py-6">{children}</header>
  );
}

interface TitleProps {
  name: string;
  jobTitle: string;
}
const HeaderTitle = ({ name, jobTitle }: TitleProps) => (
  <div className="col-span-1 text-center">
    <h1 className="text-3xl font-bold text-nowrap text-gray-800">{name}</h1>
    <h2 className="text-xl text-nowrap text-gray-600">{jobTitle}</h2>
  </div>
);

const Watermark = ({ source }: WatermarkProps) => {
  return (
    <div className="flex flex-col items-center p-16 text-right">
      <QRCode
        className="mb-1 rounded border border-gray-200"
        value={source}
        size={80}
      />
      <div className="pt-6 text-sm text-gray-500">
        Content from{" "}
        <ExternalLink href={source} variant="text">
          {shortenUrl(source)}
        </ExternalLink>
      </div>
      <div className="pt-2 text-sm text-gray-500">
        Generated with{" "}
        <ExternalLink href={WATERMARK_URL} variant="text">
          {shortenUrl(WATERMARK_URL)}
        </ExternalLink>
      </div>
    </div>
  );
};

const Introduction = ({ children }: PropsWithChildren) => (
  <p className="pt-4 text-justify text-sm text-gray-700">{children}</p>
);

interface ContactsProps {
  email?: string;
  phone?: string;
  address?: string;
}
export const Contacts = ({ email, phone, address }: ContactsProps) => {
  return (
    <div className="col-span-1 text-sm">
      {email && <ContactInfo value={email} icon={Mail} />}
      {phone && <ContactInfo value={phone} icon={Phone} />}
      {address && <ContactInfo value={address} icon={MapPin} />}
    </div>
  );
};

interface SocialPillProps {
  platform: string;
  url: string;
}

const SocialPill = ({ platform, url }: SocialPillProps) => {
  const iconExists = Object.keys(brandIcons).includes(platform.toLowerCase());

  const IconComp = iconExists
    ? brandIcons[platform.toLowerCase() as keyof typeof brandIcons]
    : Link;

  return (
    <ExternalLink
      href={url}
      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 bg-white shadow-sm transition-shadow hover:shadow-md"
      aria-label={platform}
    >
      <IconComp className="h-4 w-4" />
    </ExternalLink>
  );
};

export const Socials = ({ socials }: { socials: SocialPillProps[] }) => {
  if (!socials || socials.length === 0) return null;

  return (
    <div className="mt-2 flex items-center space-x-2">
      {socials.map((social) => (
        <SocialPill
          key={social.platform}
          platform={social.platform}
          url={social.url}
        />
      ))}
    </div>
  );
};

interface ContactInfoProps {
  value: string;
  icon: LucideIcon;
}
export const ContactInfo = ({ value, icon: IconComp }: ContactInfoProps) => (
  <div className="mb-1 flex items-center">
    <IconComp className="mr-1 h-4 w-4" />
    <span>{value}</span>
  </div>
);

Header.Title = HeaderTitle;
Header.Introduction = Introduction;
Header.Contacts = Contacts;
Header.Socials = Socials;

const Skill = ({ skill }: { skill: string }) => (
  <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">
    {skill}
  </span>
);

interface ExperienceProps {
  jobTitle: string;
  company: string;
  year: string;
  skills: string[];
}
const Experience = ({ jobTitle, company, year, skills }: ExperienceProps) => (
  <div>
    <div className="grid grid-cols-3 grid-rows-2 items-baseline">
      <h4 className="col-span-2 row-span-1 font-medium">{jobTitle}</h4>
      <div className="col-span-1 row-span-1 text-sm text-gray-600">{year}</div>
      <div className="col-span-3 row-span-2 text-gray-700">{company}</div>
    </div>
    <div className="mt-4 flex flex-wrap gap-1">
      {skills.map((skill) => (
        <Resume.Skill key={skill} skill={skill} />
      ))}
    </div>
  </div>
);

const Layout = ({ children }: PropsWithChildren) => (
  <div className="grid flex-grow grid-cols-3 gap-x-6">{children}</div>
);

const LeftColumn = ({ children }: PropsWithChildren) => (
  <div className="col-span-1 space-y-8">{children}</div>
);
const RightColumn = ({ children }: PropsWithChildren) => (
  <div className="col-span-2">{children}</div>
);
const Footer = ({ children }: PropsWithChildren) => (
  <div className="col-span-3">{children}</div>
);

Layout.LeftColumn = LeftColumn;
Layout.RightColumn = RightColumn;
Layout.Footer = Footer;

const Section = ({ children }: PropsWithChildren) => (
  <section>{children}</section>
);

const SectionTitle = ({ children }: PropsWithChildren) => (
  <h3 className="mb-2 text-lg font-semibold text-gray-800">{children}</h3>
);

Section.Title = SectionTitle;

export const Resume = {
  Page,
  Container,
  Header,
  Layout,
  Section,
  Skill,
  Experience,
  Watermark,
};
