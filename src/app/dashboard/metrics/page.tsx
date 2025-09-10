"use client"

import { useState } from "react"
import Link from "next/link"
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  TrendingUp, 
  TrendingDown,
  Users, 
  Store, 
  Truck, 
  DollarSign, 
  ShoppingBag,
  Clock,
  Star,
  Target,
  Activity,
  Calendar,
  Filter
} from "lucide-react"

export default function MetricsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Últimos 30 dias")
  const [periodModalOpen, setPeriodModalOpen] = useState(false)

  const handlePeriodChange = () => {
    setPeriodModalOpen(true)
  }

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period)
    setPeriodModalOpen(false)
    // Aqui você implementaria a lógica para filtrar os dados por período
    console.log(`Período selecionado: ${period}`)
    // Simular atualização dos dados
    alert(`Métricas atualizadas para: ${period}`)
  }
  const kpiData = [
    { 
      title: "Taxa de Crescimento de Usuários", 
      value: "+23.5%", 
      change: "+2.1%", 
      trend: "up",
      description: "vs mês anterior"
    },
    { 
      title: "Taxa de Retenção", 
      value: "87.2%", 
      change: "+5.3%", 
      trend: "up",
      description: "usuários ativos"
    },
    { 
      title: "Tempo Médio de Entrega", 
      value: "28 min", 
      change: "-3 min", 
      trend: "up",
      description: "melhoria contínua"
    },
    { 
      title: "Taxa de Conversão", 
      value: "68.4%", 
      change: "-1.2%", 
      trend: "down",
      description: "visitantes → pedidos"
    },
  ]

  const performanceMetrics = [
    { metric: "Pedidos por Hora", current: "12.3", target: "15.0", percentage: 82 },
    { metric: "Satisfação do Cliente", current: "4.8", target: "4.9", percentage: 98 },
    { metric: "Tempo de Resposta", current: "2.1s", target: "2.0s", percentage: 95 },
    { metric: "Uptime do Sistema", current: "99.9%", target: "99.9%", percentage: 100 },
  ]

  const regionalMetrics = [
    { region: "Zona Norte", orders: 145, revenue: "R$ 8.230", growth: "+15%" },
    { region: "Centro", orders: 98, revenue: "R$ 6.890", growth: "+8%" },
    { region: "Zona Sul", orders: 87, revenue: "R$ 5.120", growth: "+12%" },
    { region: "Zona Oeste", orders: 76, revenue: "R$ 4.560", growth: "+5%" },
  ]

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 flex-1">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Market Braz
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Métricas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-4">
            <ModeToggle />
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Métricas de Performance</h1>
              <p className="text-muted-foreground">
                Acompanhe os principais indicadores de desempenho da plataforma
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handlePeriodChange}>
                <Calendar className="w-4 h-4 mr-2" />
                {selectedPeriod}
              </Button>
              <Badge variant="secondary" className="text-sm">
                <Activity className="w-4 h-4 mr-1" />
                Atualizado agora
              </Badge>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {kpiData.map((kpi, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{kpi.value}</div>
                  <p className={`text-xs flex items-center ${
                    kpi.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {kpi.change} {kpi.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Performance vs Target */}
          <Card>
            <CardHeader>
              <CardTitle>Performance vs Meta</CardTitle>
              <CardDescription>
                Comparação entre performance atual e metas estabelecidas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{metric.metric}</p>
                        <p className="text-sm text-muted-foreground">
                          Atual: {metric.current} | Meta: {metric.target}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            metric.percentage >= 95 ? 'bg-green-500' : 
                            metric.percentage >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${metric.percentage}%` }}
                        ></div>
                      </div>
                      <span className="font-bold text-lg">{metric.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Regional Performance */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Performance por Região</CardTitle>
                <CardDescription>
                  Métricas de pedidos e receita por área de cobertura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionalMetrics.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{region.region}</p>
                        <p className="text-sm text-muted-foreground">{region.orders} pedidos</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{region.revenue}</p>
                        <p className={`text-sm ${
                          region.growth.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {region.growth}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas Operacionais</CardTitle>
                <CardDescription>
                  Indicadores operacionais em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">Usuários Online</span>
                  </div>
                  <span className="font-bold">1,247</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Store className="h-5 w-5 text-green-500" />
                    <span className="text-sm">Lojas Abertas</span>
                  </div>
                  <span className="font-bold">89/127</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Truck className="h-5 w-5 text-orange-500" />
                    <span className="text-sm">Entregadores Ativos</span>
                  </div>
                  <span className="font-bold">42</span>
                </div>
                
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <ShoppingBag className="h-5 w-5 text-purple-500" />
                    <span className="text-sm">Pedidos na Fila</span>
                  </div>
                  <span className="font-bold">23</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-yellow-500" />
                    <span className="text-sm">Tempo Médio Preparo</span>
                  </div>
                  <span className="font-bold">18 min</span>
                </div>

                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Star className="h-5 w-5 text-pink-500" />
                    <span className="text-sm">Avaliação Média Hoje</span>
                  </div>
                  <span className="font-bold">4.7</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>

      {/* Modal de Seleção de Período */}
      <Dialog open={periodModalOpen} onOpenChange={setPeriodModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Selecionar Período</span>
            </DialogTitle>
            <DialogDescription>
              Escolha o período para visualizar as métricas de performance
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Button 
                variant={selectedPeriod === "Hoje" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Hoje")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Hoje
              </Button>
              <Button 
                variant={selectedPeriod === "Últimos 7 dias" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Últimos 7 dias")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Últimos 7 dias
              </Button>
              <Button 
                variant={selectedPeriod === "Últimos 30 dias" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Últimos 30 dias")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Últimos 30 dias
              </Button>
              <Button 
                variant={selectedPeriod === "Últimos 3 meses" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Últimos 3 meses")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Últimos 3 meses
              </Button>
              <Button 
                variant={selectedPeriod === "Últimos 6 meses" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Últimos 6 meses")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Últimos 6 meses
              </Button>
              <Button 
                variant={selectedPeriod === "Este ano" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Este ano")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Este ano
              </Button>
              <Button 
                variant={selectedPeriod === "Ano passado" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Ano passado")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Ano passado
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPeriodModalOpen(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}