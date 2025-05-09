"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { InternalLink } from "@/components/ui/link";
import { usePathname } from "@/lib/i18n/navigation";
import { type IntlKeysOf } from "@/lib/i18n/utils";
import { useTranslations } from "next-intl";
import * as React from "react";

export const HeaderBreadcrumbs = () => {
  const t = useTranslations();
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").slice(1);
  if (!segments) return null;

  let currentPath = "/";

  const items = segments.reduce(
    (acc, segment) => {
      currentPath += segment;
      acc.push({
        label: t(`routes.${segment as IntlKeysOf<"routes">}`),
        path: currentPath,
      });
      return acc;
    },
    [
      {
        label: t("routes.home"),
        path: currentPath,
      },
    ],
  );

  return (
    <>
      <span className="text-muted-foreground px-2">{"|"}</span>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {index == items.length - 1 ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <InternalLink href={item.path}>{item.label}</InternalLink>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {index < items.length - 1 && <BreadcrumbSeparator />}
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </>
  );
};
