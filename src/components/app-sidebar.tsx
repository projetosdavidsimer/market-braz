"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Truck, MapPin, Store, MessageSquare, Home, Users, ShoppingBag, DollarSign, Settings2 } from "lucide-react"

// Dados estáticos usados no sidebar (poderão ser substituídos por props futuramente)
const data = {
  user: {
    name: "Admin Market Braz",
    email: "admin@marketbraz.com",
    avatar: "/avatars/admin.jpg",
  },
  teams: [
    { name: "Market Braz", logo: Truck, plan: "Admin" },
    { name: "Zona Norte", logo: MapPin, plan: "Regional" },
    { name: "Zona Sul", logo: MapPin, plan: "Regional" },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
      items: [
        { title: "Visão Geral", url: "/dashboard" },
        { title: "Métricas", url: "/dashboard/metrics" },
        { title: "Analytics", url: "/dashboard/analytics" },
      ],
    },
    {
      title: "Gestão de Usuários",
      url: "/dashboard/users",
      icon: Users,
      items: [
        { title: "Moradores", url: "/dashboard/users/residents" },
        { title: "Comerciantes", url: "/dashboard/users/merchants" },
        { title: "Entregadores", url: "/dashboard/users/drivers" },
        { title: "Profissionais", url: "/dashboard/users/professionals" },
      ],
    },
    {
      title: "Pedidos",
      url: "/dashboard/orders",
      icon: ShoppingBag,
      items: [
        { title: "Todos os Pedidos", url: "/dashboard/orders" },
        { title: "Em Andamento", url: "/dashboard/orders/active" },
        { title: "Histórico", url: "/dashboard/orders/history" },
        { title: "Cancelados", url: "/dashboard/orders/cancelled" },
      ],
    },
    {
      title: "Financeiro",
      url: "/dashboard/financial",
      icon: DollarSign,
      items: [
        { title: "Receitas", url: "/dashboard/financial/revenue" },
        { title: "Comissões", url: "/dashboard/financial/commissions" },
        { title: "Taxas", url: "/dashboard/financial/fees" },
        { title: "Relatórios", url: "/dashboard/financial/reports" },
      ],
    },
    {
      title: "Configurações",
      url: "/dashboard/settings",
      icon: Settings2,
      items: [
        { title: "Geral", url: "/dashboard/settings/general" },
        { title: "Taxas de Entrega", url: "/dashboard/settings/delivery-fees" },
        { title: "Promoções", url: "/dashboard/settings/promotions" },
        { title: "Notificações", url: "/dashboard/settings/notifications" },
      ],
    },
  ],
  projects: [
    { name: "Lojas Ativas", url: "/dashboard/stores", icon: Store },
    { name: "Entregas em Tempo Real", url: "/dashboard/deliveries", icon: Truck },
    { name: "Suporte ao Cliente", url: "/dashboard/support", icon: MessageSquare },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])

  // Placeholder estável no SSR e primeira render do cliente para evitar mismatch
  if (!mounted) {
    return <div data-slot="sidebar-placeholder" aria-hidden="true" suppressHydrationWarning />
  }

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams as any} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain as any} />
        <NavProjects projects={data.projects as any} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user as any} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
