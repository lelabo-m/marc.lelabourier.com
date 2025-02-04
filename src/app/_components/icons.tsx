import Image, { ImageProps } from "next/image";

import githubIcon from "@/public/brands/github-color.svg";
import linkedinIcon from "@/public/brands/linkedin-black.svg";

export type IconProps = Omit<ImageProps, "src" | "alt">;

function Github(props: IconProps) {
  return <Image src={githubIcon} alt="Github logo" {...props} />;
}

function Linkedin(props: IconProps) {
  return <Image src={linkedinIcon} alt="Linkedin logo" {...props} />;
}

export { Github, Linkedin };
