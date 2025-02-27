import { Patent, Publication } from "@/data/publications";
import { Award, Clock, FileText } from "lucide-react";
import { getFormatter } from "next-intl/server";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader } from "../ui/card";

const PatentCard = async ({ title, patentNumber, date, url }: Patent) => {
  const format = await getFormatter();
  const formattedDate = format.dateTime(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <Award className="text-primary mt-1 h-6 w-6 shrink-0" />
          <div className="space-y-2">
            <h4 className="font-medium">{title}</h4>
            <div className="text-muted-foreground text-sm">
              <p>Patent Number: {patentNumber}</p>
              <div className="mt-1 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Published: {formattedDate}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex">
        <Button variant="outline" asChild>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <FileText className="h-4 w-4" />
            View Patent
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

const PublicationCard = async ({
  title,
  where,
  date,
  status,
  docUrl,
  confUrl,
}: Publication) => {
  const format = await getFormatter();
  const formattedDate = format.dateTime(date, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start gap-4">
          <FileText className="text-primary mt-1 h-6 w-6 shrink-0" />
          <div className="space-y-2">
            <h4 className="font-medium">{title}</h4>
            <div className="text-muted-foreground text-sm">
              <p>Submitted to {where}</p>
              <div className="mt-1 flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>Submitted: {formattedDate}</span>
              </div>
              <p className="mt-1 italic">{status}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardFooter className="flex gap-4">
        <Button variant="outline" asChild>
          <a href={docUrl} target="_blank" rel="noopener noreferrer">
            <FileText className="h-4 w-4" />
            View Paper
          </a>
        </Button>
        <Button variant="outline" asChild>
          <a href={confUrl} target="_blank" rel="noopener noreferrer">
            <FileText className="h-4 w-4" />
            View Journal / Conference
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export { PatentCard, PublicationCard };
