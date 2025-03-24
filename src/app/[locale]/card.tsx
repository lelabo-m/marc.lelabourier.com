import { CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

export const IconCardHeader = ({ children }: PropsWithChildren) => {
  return (
    <CardHeader className="grid-cols-[auto_1fr_auto]">{children}</CardHeader>
  );
};

export const CardIcon = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="card-icon"
      className={cn(
        "col-start-1 row-span-2 row-start-1 self-start justify-self-start",
        className,
      )}
      {...props}
    />
  );
};
/* <Card key={patent.patentNumber}>
            <CardHeader>
              <div className="flex items-start gap-4">
                <Award className="text-primary mt-1 h-6 w-6 shrink-0" />
                <div className="space-y-2">
                  <h4 className="font-medium">{patent.title}</h4>
                  <div className="text-muted-foreground text-sm">
                    <p>Patent Number: {patent.patentNumber}</p>
                    <div className="mt-1 flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Published: {formattedDate}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardFooter className="flex">
              <PublicationCardAction href={patent.url}>
                View Patent
              </PublicationCardAction>
            </CardFooter>
          </Card> */
