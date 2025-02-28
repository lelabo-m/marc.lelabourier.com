import {
  BriefcaseBusiness,
  Contact,
  GraduationCap,
  Home,
  MessageSquareText,
} from "lucide-react";

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
import Link from "next/link";
import { ScrollToTopLink } from "./client";

// Menu items.
const items = [
  {
    title: "Contact Information",
    url: "#contact",
    icon: Contact,
  },
  {
    title: "Summary",
    url: "#summary",
    icon: MessageSquareText,
  },
  {
    title: "Professional Experience",
    url: "#experiences",
    icon: BriefcaseBusiness,
  },
  {
    title: "Education",
    url: "#education",
    icon: GraduationCap,
  },
];

export function AppSidebar() {
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
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      {item.title}
                    </Link>
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
