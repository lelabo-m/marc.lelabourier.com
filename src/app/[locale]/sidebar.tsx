import { Home } from "lucide-react";

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
import { Link } from "@/lib/i18n/navigation";
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
                    <div>
                      <Link
                        href={`#${key}`}
                        locale={locale}
                        className="flex items-center gap-2"
                      >
                        <IconComponent className="h-4 w-4" />
                        {t(`${key}.title`)}
                      </Link>
                    </div>
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
