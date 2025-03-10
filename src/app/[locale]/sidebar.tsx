import { Home } from "lucide-react";

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
import { getLocale, getTranslations } from "next-intl/server";
import { ScrollToTopLink } from "./client";
import { sections } from "./config";

export async function AppSidebar() {
  const t = await getTranslations("home");
  const locale = await getLocale();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Table of Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <ScrollToTopLink>
                    <Home />
                    Home
                  </ScrollToTopLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {sections.map(({ key, icon: IconComponent }, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild>
                    <InternalLink href={`#${key}`}>
                      <IconComponent />
                      {t(`${key}.title`)}
                    </InternalLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
