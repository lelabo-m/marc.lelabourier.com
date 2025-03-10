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
import { getTranslations } from "next-intl/server";
import { sections } from "./config";

export async function AppSidebar() {
  const t = await getTranslations("home");

  return (
    <Sidebar>
      <SidebarContent>
        {sections.map((subsection) => (
          <SidebarGroup key={subsection.key}>
            <SidebarGroupLabel>
              {t(`sidebar.${subsection.key}`)}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {subsection.sections.map(
                  ({ key, icon: IconComponent }, index) => (
                    <SidebarMenuItem key={index}>
                      <SidebarMenuButton asChild>
                        <InternalLink href={`#${key}`}>
                          <IconComponent />
                          {t(`${key}.title`)}
                        </InternalLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ),
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  );
}
