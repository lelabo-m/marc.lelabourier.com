import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Brain,
  Cloud,
  Code,
  Cpu,
  Heart,
  Puzzle,
  Server,
  Shuffle,
  Users,
} from "lucide-react";
import type React from "react";

const SkillCard = ({
  title,
  icon,
  description,
}: {
  title: string;
  icon: React.ReactNode;
  description: string;
}) => (
  <Card className="h-full">
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
);

type TechLevel = "expert" | "proficient" | "familiar";

const levelColors: Record<TechLevel, string> = {
  expert: "bg-green-500",
  proficient: "bg-blue-500",
  familiar: "bg-yellow-500",
};

const TechBadge = ({
  tech,
  level,
  description,
}: {
  tech: string;
  level: TechLevel;
  description: string;
}) => (
  <HoverCard>
    <HoverCardTrigger asChild>
      <Badge variant="outline" className="mr-2 mb-2 cursor-pointer">
        {tech}
        <span
          className={`ml-2 inline-block h-2 w-2 rounded-full ${levelColors[level]}`}
        ></span>
      </Badge>
    </HoverCardTrigger>
    <HoverCardContent className="w-80">
      <div className="flex justify-between space-x-4">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{tech}</h4>
          <p className="text-sm">{description}</p>
          <div className="flex items-center pt-2">
            <span className="text-muted-foreground text-xs">
              Level: {level.charAt(0).toUpperCase() + level.slice(1)}
            </span>
          </div>
        </div>
      </div>
    </HoverCardContent>
  </HoverCard>
);

const TechSection = ({
  title,
  icon,
  myStack,
  ifNeeded,
}: {
  title: string;
  icon: React.ReactNode;
  myStack: Array<{ tech: string; level: TechLevel; description: string }>;
  ifNeeded: Array<{ tech: string; level: TechLevel; description: string }>;
}) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-2">
        {icon}
        <span>{title}</span>
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <h4 className="mb-2 font-semibold">My Stack</h4>
          <div>
            {myStack.map((tech, index) => (
              <TechBadge key={index} {...tech} />
            ))}
          </div>
        </div>
        {ifNeeded.length > 0 && (
          <div>
            <h4 className="mb-2 font-semibold">If Needed</h4>
            <div>
              {ifNeeded.map((tech, index) => (
                <TechBadge key={index} {...tech} />
              ))}
            </div>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

export default function SkillsAndTechnologies() {
  return (
    <section className="bg-muted py-12">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Skills & Technologies
        </h2>

        <div className="mb-12">
          <h3 className="mb-6 text-2xl font-semibold">
            My Core Non-Technical Qualities
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <SkillCard
              title="Holistic Perspective"
              icon={<Brain className="h-6 w-6" />}
              description="Broad exposure across multiple fields, allowing for diverse problem-solving and critical thinking."
            />
            <SkillCard
              title="Problem Solver & Optimizer"
              icon={<Puzzle className="h-6 w-6" />}
              description="Quick to identify issues and streamline processes, devising practical, team-focused solutions."
            />
            <SkillCard
              title="Team Leadership & Collaboration"
              icon={<Users className="h-6 w-6" />}
              description="Lead by example, foster open communication, and ensure every team member's contribution is acknowledged."
            />
            <SkillCard
              title="Adaptability & Negotiation"
              icon={<Shuffle className="h-6 w-6" />}
              description="Bridge gaps between technical specialists, adapt to various methodologies, and unite people around common goals."
            />
            <SkillCard
              title="Ethical & Down-to-Earth Approach"
              icon={<Heart className="h-6 w-6" />}
              description="Work with integrity and in good faith, grounded in reciprocity and fairness."
            />
          </div>
        </div>

        <div>
          <h3 className="mb-6 text-2xl font-semibold">
            Technologies & Proficiencies
          </h3>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <TechSection
              title="Frontend"
              icon={<Code className="h-6 w-6" />}
              myStack={[
                {
                  tech: "TypeScript",
                  level: "expert",
                  description:
                    "My go-to language for frontend development, used extensively in React projects.",
                },
                {
                  tech: "React",
                  level: "expert",
                  description:
                    "Primary framework for building modern, responsive interfaces.",
                },
                {
                  tech: "Next.js",
                  level: "proficient",
                  description:
                    "Preferred React framework for building full-stack applications.",
                },
                {
                  tech: "Tailwind CSS",
                  level: "proficient",
                  description:
                    "Utility-first CSS framework for rapid UI development.",
                },
              ]}
              ifNeeded={[
                {
                  tech: "JavaScript",
                  level: "expert",
                  description:
                    "Solid foundation in vanilla JavaScript, used when TypeScript is not an option.",
                },
              ]}
            />
            <TechSection
              title="Backend"
              icon={<Server className="h-6 w-6" />}
              myStack={[
                {
                  tech: "Python",
                  level: "expert",
                  description:
                    "Extensive professional experience in API development and data processing.",
                },
              ]}
              ifNeeded={[
                {
                  tech: "C#",
                  level: "familiar",
                  description:
                    "Used in past projects, can work with it when required.",
                },
                {
                  tech: "Java",
                  level: "familiar",
                  description:
                    "Basic knowledge, can adapt to Java-based projects if needed.",
                },
                {
                  tech: "Ruby",
                  level: "familiar",
                  description:
                    "Occasional use in specific projects or legacy systems.",
                },
              ]}
            />
            <TechSection
              title="Infrastructure"
              icon={<Cloud className="h-6 w-6" />}
              myStack={[
                {
                  tech: "AWS",
                  level: "proficient",
                  description:
                    "Experienced in designing and managing cloud infrastructure on Amazon Web Services.",
                },
              ]}
              ifNeeded={[]}
            />
            <TechSection
              title="Systems Programming"
              icon={<Cpu className="h-6 w-6" />}
              myStack={[
                {
                  tech: "Rust",
                  level: "familiar",
                  description:
                    "Currently improving proficiency, excited about its potential for safe systems programming.",
                },
              ]}
              ifNeeded={[
                {
                  tech: "C",
                  level: "proficient",
                  description:
                    "Strong foundation, used in past projects for low-level programming.",
                },
                {
                  tech: "C++",
                  level: "proficient",
                  description:
                    "Experienced in object-oriented systems programming, may need a refresher for complex projects.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
