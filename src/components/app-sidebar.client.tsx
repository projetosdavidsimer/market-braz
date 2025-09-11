"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"

const data = {
  user: {
    name: "Admin Market Braz",
    email: "admin@marketbraz.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    { name: "Market Braz", logo: undefined, plan: "Admin" },
  ],
  navMain: [],
  projects: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams as any} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={[]} />
        <NavProjects projects={[]} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user as any} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
