import {
  EducationCard,
  EducationCardContent,
  EducationCardHeader,
} from "@/components/education-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CollapsibleDetails } from "./client";

export default function DesignPage() {
  return (
    <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <EducationCard>
          <EducationCardHeader
            degree="Master's degree in Computer Science and Information Technology"
            institution="EPITECH (European Institute of Information Technology)"
            location="Rennes, Paris (France)"
            date="2012 - 2017"
          />
          <EducationCardContent>
            <p>
              I have a Master's degree in Computer Science and Information
              Technology from the University of Rennes 1. I specialized in
              software engineering and web development.
            </p>

            <div className="mt-4 flex flex-wrap">
              <CourseCard />
            </div>
          </EducationCardContent>
        </EducationCard>
      </div>
    </div>
  );
}

// Title: Big and bold.
// Semester/Module Reference: Small text under the title.
// Description: Short paragraph (truncate with a "Read more" option if long).
// Tags: Small labels for Core, Specialized, Elective, etc.

const CourseCard = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-lg">
            Natural Computation - COMP8370
          </CardTitle>
          <Badge variant="outline" className="rounded-full">
            Elective
          </Badge>
        </div>

        <CardContent>
          <CollapsibleDetails>
            There is an increasing use of nature-inspired computational
            techniques in computer science. These include the use of biology as
            a source of inspiration for solving computational problems, such as
            developments in evolutionary algorithms and swarm intelligence.
            Similarly, there is now also an increasing interest in understanding
            how biological, chemical and other natural systems compute, and how
            this could be exploited for practical applications. It is therefore
            proposed to allow students the opportunity to become exposed to
            these types of methods for use in their later careers.
          </CollapsibleDetails>
        </CardContent>
      </CardHeader>
    </Card>
  );
};
