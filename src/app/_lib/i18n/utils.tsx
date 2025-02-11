import { AbstractIntlMessages } from "next-intl";
import { ReactNode } from "react";

type RichTextProps<Tag extends keyof any> = {
  children(tags: Record<Tag, (chunks: ReactNode) => ReactNode>): ReactNode;
};

function RichText({ children }: RichTextProps<"p" | "b" | "i">) {
  return (
    <div className="prose">
      {children({
        p: (chunks: ReactNode) => <p>{chunks}</p>,
        b: (chunks: ReactNode) => <b className="font-semibold">{chunks}</b>,
        i: (chunks: ReactNode) => <i className="italic">{chunks}</i>,
      })}
    </div>
  );
}

function isAbstractIntlMessages(
  value: string | AbstractIntlMessages,
): value is AbstractIntlMessages {
  return typeof value === "object" && value !== null;
}

export type { RichTextProps };

export { isAbstractIntlMessages, RichText };
