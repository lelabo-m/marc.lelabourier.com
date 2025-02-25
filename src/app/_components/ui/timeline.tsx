import { cn } from "@/lib/utils";

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
    className={cn("my-3 h-36 w-[2px]", className)}
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

export { Timeline, TimelineContent, TimelineItem, TimelineSpacer };
