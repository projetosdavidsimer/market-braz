"use client"

import { useState } from "react"
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
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Users,
  ShoppingBag,
  Clock,
  Star,
  MapPin,
  Calendar,
  Download,
  ArrowUp,
  ArrowDown,
  FileText
} from "lucide-react"

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Últimos 30 dias")
  const [periodModalOpen, setPeriodModalOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [selectedExportType, setSelectedExportType] = useState("")

  const handlePeriodChange = () => {
    setPeriodModalOpen(true)
  }

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period)
    setPeriodModalOpen(false)
    // Simular atualização dos dados
    console.log(`Período selecionado: ${period}`)
    alert(`Analytics atualizados para: ${period}`)
  }

  const handleExport = () => {
    setExportModalOpen(true)
  }

  const handleExportConfirm = () => {
    if (selectedExportType) {
      // Simular exportação
      const fileName = `analytics_${selectedExportType}_${selectedPeriod.toLowerCase().replace(' ', '_')}_${new Date().getTime()}`
      console.log(`Exportando: ${fileName}`)
      
      // Simular download
      alert(`Relatório "${selectedExportType}" exportado com sucesso!\nPeríodo: ${selectedPeriod}\nArquivo: ${fileName}.${selectedExportType === 'PDF' ? 'pdf' : 'csv'}`)
      
      setExportModalOpen(false)
      setSelectedExportType("")
    }
  }
  const userGrowth = [
    { month: "Jan", users: 1200, growth: "+12%" },
    { month: "Fev", users: 1450, growth: "+21%" },
    { month: "Mar", users: 1680, growth: "+16%" },
    { month: "Abr", users: 2100, growth: "+25%" },
  ]

  const orderAnalytics = [
    { category: "Alimentação", orders: 1250, percentage: 45, revenue: "R$ 28.500" },
    { category: "Farmácia", orders: 680, percentage: 25, revenue: "R$ 15.200" },
    { category: "Supermercado", orders: 520, percentage: 19, revenue: "R$ 12.800" },
    { category: "Outros", orders: 300, percentage: 11, revenue: "R$ 6.900" },
  ]

  const timeAnalytics = [
    { hour: "08:00", orders: 45 },
    { hour: "12:00", orders: 120 },
    { hour: "18:00", orders: 180 },
    { hour: "20:00", orders: 150 },
    { hour: "22:00", orders: 80 },
  ]

  const regionAnalytics = [
    { region: "Zona Norte", orders: 450, users: 1200, avgOrder: "R$ 35,50" },
    { region: "Centro", orders: 320, users: 850, avgOrder: "R$ 42,80" },
    { region: "Zona Sul", orders: 280, users: 720, avgOrder: "R$ 38,90" },
    { region: "Zona Oeste", orders: 200, users: 580, avgOrder: "R$ 33,20" },
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
                  <BreadcrumbPage>Analytics</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Analytics</h1>
              <p className="text-muted-foreground">
                Análise detalhada dos dados da plataforma
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handlePeriodChange}>
                <Calendar className="w-4 h-4 mr-2" />
                {selectedPeriod}
              </Button>
              <Button onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Exportar Dados
              </Button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Crescimento</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">+25%</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-green-600">+5%</span>
                  <span className="ml-1">vs mês anterior</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Retenção</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-green-600">+3%</span>
                  <span className="ml-1">vs mês anterior</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 37,80</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUp className="w-3 h-3 mr-1 text-green-500" />
                  <span className="text-green-600">+8%</span>
                  <span className="ml-1">vs mês anterior</span>
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28 min</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowDown className="w-3 h-3 mr-1 text-red-500" />
                  <span className="text-red-600">-2 min</span>
                  <span className="ml-1">vs mês anterior</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* User Growth */}
            <Card>
              <CardHeader>
                <CardTitle>Crescimento de Usuários</CardTitle>
                <CardDescription>
                  Evolução mensal da base de usuários
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userGrowth.map((data, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{data.month}</p>
                          <p className="text-sm text-muted-foreground">{data.users} usuários</p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="text-green-600">
                        {data.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Order Categories */}
            <Card>
              <CardHeader>
                <CardTitle>Pedidos por Categoria</CardTitle>
                <CardDescription>
                  Distribuição de pedidos por tipo de estabelecimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orderAnalytics.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{category.category}</span>
                        <span className="text-sm text-muted-foreground">{category.orders} pedidos</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${category.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{category.percentage}%</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sm text-muted-foreground">{category.revenue}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Time and Region Analytics */}
          <div className="grid gap-4 md:grid-cols-2">
            {/* Peak Hours */}
            <Card>
              <CardHeader>
                <CardTitle>Horários de Pico</CardTitle>
                <CardDescription>
                  Distribuição de pedidos por horário
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {timeAnalytics.map((time, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-primary" />
                        </div>
                        <span className="font-medium">{time.hour}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${(time.orders / 180) * 100}%` }}
                          ></div>
                        </div>
                        <span className="font-bold">{time.orders}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Regional Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Regional</CardTitle>
                <CardDescription>
                  Análise por região de cobertura
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {regionAnalytics.map((region, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          <span className="font-medium">{region.region}</span>
                        </div>
                        <span className="text-sm text-muted-foreground">{region.avgOrder}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Pedidos</p>
                          <p className="font-bold">{region.orders}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Usuários</p>
                          <p className="font-bold">{region.users}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Customer Satisfaction */}
          <Card>
            <CardHeader>
              <CardTitle>Satisfação do Cliente</CardTitle>
              <CardDescription>
                Métricas de satisfação e feedback dos usuários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="text-center p-4 border rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-8 h-8 text-yellow-500" />
                  </div>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-sm text-muted-foreground">Avaliação Média</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                  <div className="text-2xl font-bold">92%</div>
                  <p className="text-sm text-muted-foreground">Taxa de Satisfação</p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="flex items-center justify-center mb-2">
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                  </div>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-sm text-muted-foreground">Avaliações Recebidas</p>
                </div>
              </div>
            </CardContent>
          </Card>
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
              Escolha o período para visualizar os dados de analytics
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

      {/* Modal de Exportação */}
      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Exportar Dados</span>
            </DialogTitle>
            <DialogDescription>
              Selecione o formato para exportar os dados de analytics
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="text-sm font-medium">Período selecionado:</div>
              <div className="p-3 bg-muted rounded-lg text-sm">
                {selectedPeriod}
              </div>
            </div>
            <div className="space-y-3">
              <div className="text-sm font-medium">Formato de exportação:</div>
              <div className="grid gap-2">
                <Button 
                  variant={selectedExportType === "PDF" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedExportType("PDF")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  PDF - Relatório completo
                </Button>
                <Button 
                  variant={selectedExportType === "CSV" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedExportType("CSV")}
                >
                  <Download className="w-4 h-4 mr-2" />
                  CSV - Dados tabulares
                </Button>
                <Button 
                  variant={selectedExportType === "Excel" ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedExportType("Excel")}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Excel - Planilha com gráficos
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setExportModalOpen(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleExportConfirm}
              disabled={!selectedExportType}
            >
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}