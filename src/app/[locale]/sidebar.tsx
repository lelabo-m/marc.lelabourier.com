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
import { Home } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ScrollToTopLink } from "./client";
import { sidebarMapping } from "./config";
import { sectionIcons } from "./icons";

export async function AppSidebar() {
  const t = await getTranslations("home");

  return (
    <Sidebar>
      <SidebarContent className="pt-4">
        <SidebarMenu className="pl-1">
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <ScrollToTopLink>
                <Home />
                Home
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
                  const IconComponent = sectionIcons[section];
                  return (
                    <SidebarMenuItem key={section}>
                      <SidebarMenuButton asChild>
                        <InternalLink href={`#${section}`}>
                          <IconComponent />
                          {t(`${section}.title`)}
                        </InternalLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
