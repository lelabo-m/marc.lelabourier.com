import {
  hasLocale,
  type AbstractIntlMessages,
  type Messages,
  type NamespaceKeys,
  type NestedKeyOf,
  type NestedValueOf,
} from "next-intl";
import { getMessages, type getTranslations } from "next-intl/server";
import { routing, routingExceptions } from "./routing";

export type IntlNamespaceKeys = NamespaceKeys<Messages, NestedKeyOf<Messages>>;

export type IntlKeysOf<Namespace extends IntlNamespaceKeys> =
  keyof NestedValueOf<Messages, Namespace>;

// Example usage:
// function RichText({ children }: RichTextProps<"p" | "b" | "i">) {
//   return (
//     <div className="prose">
//       {children({
//         p: (chunks: React.ReactNode) => <p>{chunks}</p>,
//         b: (chunks: React.ReactNode) => (
//           <b className="font-semibold">{chunks}</b>
//         ),
//         i: (chunks: React.ReactNode) => <i className="italic">{chunks}</i>,
//       })}
//     </div>
//   );
// }
export type RichTextProps<Tag extends keyof unknown> = {
  children(
    tags: Record<Tag, (chunks: React.ReactNode) => React.ReactNode>,
  ): React.ReactNode;
};

/**
 * from https://github.com/amannn/next-intl/issues/1704
 * Type for passing around NextIntl getTranslation or useTranslations functions
 */
export type getTranslationsType<Namespace extends IntlNamespaceKeys> = Awaited<
  ReturnType<typeof getTranslations<Namespace>>
>;
// | ReturnType<typeof useTranslations<Namespace>>;

/**
 * from https://github.com/amannn/next-intl/issues/1704
 * Type for passing around keys for given getTranslation or useTranslations functions
 */
export type getTranslationsKeys<Namespace extends IntlNamespaceKeys> =
  Parameters<getTranslationsType<Namespace>>[0];

export function isAbstractIntlMessages(
  value: string | AbstractIntlMessages | undefined,
): value is AbstractIntlMessages {
  return typeof value === "object" && value !== null;
}

export function collectsMessageKeys<Namespace extends IntlNamespaceKeys>(
  namespace: Namespace,
  messages: Messages,
) {
  const path = namespace.split(".");

  let obj: AbstractIntlMessages = messages;
  for (const key of path) {
    const item = obj[key];
    if (item === undefined) {
      throw new Error(`${namespace} does not exist in messages.`);
    }
    if (typeof item === "string") {
      throw new Error(`${namespace} is not a collection of messages.`);
    }
    obj = item;
  }

  if (obj === undefined) {
    throw new Error(`${namespace} does not exist in messages.`);
  }
  if (typeof obj === "string") {
    throw new Error(`${namespace} is not a collection of messages.`);
  }

  return Object.keys(obj) as unknown as IntlKeysOf<Namespace>[];
}

export async function getMessageKeys<Namespace extends IntlNamespaceKeys>(
  namespace: Namespace,
) {
  const messages = await getMessages();
  return collectsMessageKeys(namespace, messages);
}

export const validateLocale = (
  requestedLocale: string[] | string | undefined,
) => {
  if (Array.isArray(requestedLocale)) {
    requestedLocale = requestedLocale[0];
  }
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return locale;
};

export const isRoutingException = (pathname: string | undefined) => {
  return pathname === undefined
    ? false
    : routingExceptions.some((regex) => regex.test(pathname));
};
