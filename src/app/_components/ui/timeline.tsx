import { cn } from "@/lib/utils";
import React from "react";

const Timeline = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div data-slot="timeline" className={cn("container", className)} {...props} />
);

const TimelineContent = ({
  className,
  ...props
}: React.ComponentProps<"div">) => (
  <div
    data-slot="timeline-content"
    className={cn(
      "mx-auto flex flex-col items-center justify-center text-center sm:max-w-xl",
      className,
    )}
    {...props}
  />
);

const TimelineItem = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="timeline-element"
    className={cn("flex flex-col items-center", className)}
    {...props}
  />
);

const TimelineSpacer = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    data-slot="timeline-spacer"
    className={cn("my-3 h-16 w-[2px]", className)}
    {...props}
    style={{
      backgroundImage:
        "linear-gradient(to bottom, #000 10%, rgba(255, 255, 255, 0) 0%)",
      backgroundPosition: "left",
      backgroundSize: "3px 15px",
      backgroundRepeat: "repeat-y",
    }}
  ></span>
);

interface TimelineRenderListProps<T> {
  items: readonly T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  renderSpacer?: (index: number) => React.ReactNode;
}

const TimelineRenderList = <T,>({
  items,
  renderItem,
  renderSpacer,
}: TimelineRenderListProps<T>) => {
  return (
    <Timeline>
      <TimelineContent className="mt-8 sm:max-w-5xl">
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <TimelineItem className="w-full">
              {renderItem(item, index)}
            </TimelineItem>
            {index < items.length - 1 && // Conditionally render spacer
              (renderSpacer ? renderSpacer(index) : <TimelineSpacer />)}
          </React.Fragment>
        ))}
      </TimelineContent>
    </Timeline>
  );
};
export {
  Timeline,
  TimelineContent,
  TimelineItem,
  TimelineRenderList,
  TimelineSpacer,
};
