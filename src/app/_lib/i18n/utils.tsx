import type {
  AbstractIntlMessages,
  NamespaceKeys,
  NestedKeyOf,
  useTranslations,
} from "next-intl";
import type { getTranslations } from "next-intl/server";

type RichTextProps<Tag extends keyof any> = {
  children(
    tags: Record<Tag, (chunks: React.ReactNode) => React.ReactNode>,
  ): React.ReactNode;
};

function RichText({ children }: RichTextProps<"p" | "b" | "i">) {
  return (
    <div className="prose">
      {children({
        p: (chunks: React.ReactNode) => <p>{chunks}</p>,
        b: (chunks: React.ReactNode) => (
          <b className="font-semibold">{chunks}</b>
        ),
        i: (chunks: React.ReactNode) => <i className="italic">{chunks}</i>,
      })}
    </div>
  );
}

function isAbstractIntlMessages(
  value: string | AbstractIntlMessages,
): value is AbstractIntlMessages {
  return typeof value === "object" && value !== null;
}

/**
 * from https://github.com/amannn/next-intl/issues/1704
 * Type for passing around NextIntl getTranslation or useTranslations functions
 */
type getTranslationsType<
  T extends NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>,
> =
  | Awaited<ReturnType<typeof getTranslations<T>>>
  | ReturnType<typeof useTranslations<T>>;

/**
 * from https://github.com/amannn/next-intl/issues/1704
 * Type for passing around keys for given getTranslation or useTranslations functions
 */
type getTranslationsKeys<
  T extends NamespaceKeys<IntlMessages, NestedKeyOf<IntlMessages>>,
> = Parameters<getTranslationsType<T>>[0];

export type { getTranslationsKeys, getTranslationsType, RichTextProps };

export { isAbstractIntlMessages, RichText };
