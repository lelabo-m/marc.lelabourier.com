import { InternalLink } from "@/components/ui/link";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Factory, Home } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { sidebarMapping } from "~/app/[locale]/(external)/config";
import { sidebarIcons } from "~/app/[locale]/(external)/icons";
import { ScrollToTopLink } from "./sidebar.client";

export async function AppSidebar() {
  const t = await getTranslations();

  return (
    <Sidebar>
      <SidebarContent className="pt-4">
        <SidebarMenu className="pl-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <ScrollToTopLink>
                <Home />
                {t("routes.home")}
              </ScrollToTopLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {sidebarMapping.map((group) => (
          <SidebarGroup key={group.key}>
            <SidebarGroupLabel>{t(`sidebar.${group.key}`)}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.sections.map((section) => {
                  const IconComponent = sidebarIcons[section];
                  return (
                    <SidebarMenuItem key={section}>
                      <SidebarMenuButton asChild>
                        <InternalLink href={`/#${section}`}>
                          <IconComponent />
                          {t(`home.${section}.title`)}
                        </InternalLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
        <SidebarGroup>
          <SidebarGroupLabel>{"Tools"}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <InternalLink href="/cv">
                    <Factory />
                    {t("routes.cv")}
                  </InternalLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
