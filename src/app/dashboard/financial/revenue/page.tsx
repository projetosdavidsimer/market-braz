"use client"

import Link from "next/link"
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
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Search,
  Filter,
  Download,
  Store,
  ShoppingBag,
  Users,
  BarChart3,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  PieChart as PieChartIcon,
  LineChart as LineChartIcon,
  Building2,
  Package,
  Target
} from "lucide-react"
import { Label } from "@/components/ui/label"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  LineChart, 
  Line, 
  RadialBarChart, 
  RadialBar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis
} from "recharts"

export default function RevenuePage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Últimos 30 dias")
  const [periodModalOpen, setPeriodModalOpen] = useState(false)
  const [chartModalOpen, setChartModalOpen] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [storeAnalysisModalOpen, setStoreAnalysisModalOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [selectedChartType, setSelectedChartType] = useState<'bar' | 'line' | 'radial' | 'radar'>('bar')
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas')

  const handlePeriodChange = () => {
    setPeriodModalOpen(true)
  }

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period)
    setPeriodModalOpen(false)
  }

  const handleExport = () => {
    setExportModalOpen(true)
  }

  const handleExportData = (format: string) => {
    // Simular download
    const data = {
      period: selectedPeriod,
      totalRevenue: totalRevenue,
      orders: 1678,
      avgTicket: "R$ 35,02",
      stores: 52,
      revenueData,
      storeRevenue,
      categoryRevenue
    }
    
    const dataStr = format === 'json' ? JSON.stringify(data, null, 2) : 
                   format === 'csv' ? convertToCSV(data) : 
                   JSON.stringify(data, null, 2)
    
    const dataBlob = new Blob([dataStr], { type: format === 'csv' ? 'text/csv' : 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `receitas_${selectedPeriod.toLowerCase().replace(/\s+/g, '_')}.${format}`
    link.click()
    URL.revokeObjectURL(url)
    setExportModalOpen(false)
  }

  const convertToCSV = (data: any) => {
    const headers = ['Período', 'Receita Total', 'Crescimento', 'Pedidos', 'Ticket Médio', 'Lojas']
    const rows = data.revenueData.map((item: any) => [
      item.period,
      item.totalRevenue,
      item.growth,
      item.orders,
      item.avgTicket,
      item.stores
    ])
    
    return [headers, ...rows].map(row => row.join(',')).join('\n')
  }

  const handleViewChart = () => {
    setChartModalOpen(true)
  }

  const handleDetailedReport = () => {
    setReportModalOpen(true)
  }

  const handleStoreAnalysis = () => {
    setStoreAnalysisModalOpen(true)
  }

  const revenueData = [
    {
      period: "Janeiro 2024",
      totalRevenue: "R$ 45.680,90",
      growth: "+12.5%",
      isPositive: true,
      orders: 1234,
      avgTicket: "R$ 37,02",
      stores: 45,
      topStore: "Padaria Central",
      topStoreRevenue: "R$ 8.450,30"
    },
    {
      period: "Fevereiro 2024",
      totalRevenue: "R$ 52.340,80",
      growth: "+14.6%",
      isPositive: true,
      orders: 1456,
      avgTicket: "R$ 35,94",
      stores: 48,
      topStore: "Mercado Bom Preço",
      topStoreRevenue: "R$ 9.120,50"
    },
    {
      period: "Março 2024",
      totalRevenue: "R$ 48.920,60",
      growth: "-6.5%",
      isPositive: false,
      orders: 1389,
      avgTicket: "R$ 35,23",
      stores: 47,
      topStore: "Farmácia Saúde",
      topStoreRevenue: "R$ 7.890,40"
    },
    {
      period: "Abril 2024",
      totalRevenue: "R$ 58.760,40",
      growth: "+20.1%",
      isPositive: true,
      orders: 1678,
      avgTicket: "R$ 35,02",
      stores: 52,
      topStore: "Pizzaria Italiana",
      topStoreRevenue: "R$ 10.340,80"
    }
  ]

  const storeRevenue = [
    { name: "Padaria Central", revenue: "R$ 12.450,80", percentage: "18.2%", orders: 456, category: "Padaria" },
    { name: "Mercado Bom Preço", revenue: "R$ 11.890,50", percentage: "17.4%", orders: 389, category: "Supermercado" },
    { name: "Farmácia Saúde", revenue: "R$ 9.670,30", percentage: "14.1%", orders: 234, category: "Farmácia" },
    { name: "Pizzaria Italiana", revenue: "R$ 8.340,90", percentage: "12.2%", orders: 198, category: "Restaurante" },
    { name: "Lanchonete do Bairro", revenue: "R$ 6.780,40", percentage: "9.9%", orders: 167, category: "Lanchonete" },
    { name: "Pet Shop Amigo", revenue: "R$ 5.450,60", percentage: "8.0%", orders: 123, category: "Pet Shop" },
    { name: "Açaí da Praia", revenue: "R$ 4.230,80", percentage: "6.2%", orders: 145, category: "Sorveteria" },
    { name: "Outros", revenue: "R$ 9.944,61", percentage: "14.0%", orders: 432, category: "Diversos" }
  ]

  const categoryRevenue = [
    { category: "Alimentação", revenue: "R$ 28.450,90", percentage: "41.6%", stores: 18 },
    { category: "Supermercado", revenue: "R$ 15.670,30", percentage: "22.9%", stores: 8 },
    { category: "Farmácia", revenue: "R$ 12.340,80", percentage: "18.1%", stores: 6 },
    { category: "Pet Shop", revenue: "R$ 6.780,40", percentage: "9.9%", stores: 4 },
    { category: "Outros", revenue: "R$ 5.117,50", percentage: "7.5%", stores: 16 }
  ]

  const totalRevenue = revenueData[revenueData.length - 1].totalRevenue
  const totalGrowth = revenueData[revenueData.length - 1].growth
  const isGrowthPositive = revenueData[revenueData.length - 1].isPositive

  // Função para filtrar lojas por categoria
  const getFilteredStores = () => {
    if (selectedCategory === 'Todas') {
      return storeRevenue
    }
    
    // Mapear categorias para os nomes corretos nos dados
    const categoryMap: { [key: string]: string[] } = {
      'Alimentação': ['Padaria', 'Restaurante', 'Lanchonete', 'Sorveteria'],
      'Supermercado': ['Supermercado'],
      'Farmácia': ['Farmácia'],
      'Pet Shop': ['Pet Shop']
    }
    
    const categoriesToShow = categoryMap[selectedCategory] || [selectedCategory]
    return storeRevenue.filter(store => categoriesToShow.includes(store.category))
  }

  const filteredStores = getFilteredStores()

  // Função para lidar com a seleção de categoria
  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category)
  }

  // Dados formatados para os gráficos
  const chartData = revenueData.map(item => ({
    month: item.period.split(' ')[0],
    revenue: parseFloat(item.totalRevenue.replace(/[R$\s.,]/g, '')) / 100,
    orders: item.orders,
    avgTicket: parseFloat(item.avgTicket.replace(/[R$\s.,]/g, '')) / 100,
    stores: item.stores
  }))

  const radialData = categoryRevenue.map((item, index) => ({
    category: item.category,
    revenue: parseFloat(item.revenue.replace(/[R$\s.,]/g, '')) / 100,
    percentage: parseFloat(item.percentage.replace('%', '')),
    fill: `var(--chart-${index + 1})`
  }))

  // Dados formatados para o gráfico radar
  const radarData = chartData.map(item => ({
    month: item.month,
    receita: Math.round(item.revenue / 1000), // Simplificar valores para radar
    pedidos: Math.round(item.orders / 100), // Escalar para visualização
    ticketMedio: Math.round(item.avgTicket), 
    lojas: item.stores
  }))

  const chartConfig = {
    revenue: {
      label: "Receita",
      color: "var(--chart-1)",
    },
    orders: {
      label: "Pedidos", 
      color: "var(--chart-2)",
    },
    avgTicket: {
      label: "Ticket Médio",
      color: "var(--chart-3)",
    },
    stores: {
      label: "Lojas",
      color: "var(--chart-4)",
    }
  } satisfies ChartConfig

  const categoryConfig = {
    revenue: {
      label: "Receita",
    },
    alimentacao: {
      label: "Alimentação",
      color: "var(--chart-1)",
    },
    supermercado: {
      label: "Supermercado", 
      color: "var(--chart-2)",
    },
    farmacia: {
      label: "Farmácia",
      color: "var(--chart-3)",
    },
    petshop: {
      label: "Pet Shop",
      color: "var(--chart-4)",
    },
    outros: {
      label: "Outros",
      color: "var(--chart-5)",
    }
  } satisfies ChartConfig

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
                  <BreadcrumbLink href="/dashboard/financial">
                    Financeiro
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Receitas</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Receitas</h1>
              <p className="text-muted-foreground">
                Acompanhe a evolução das receitas da plataforma por período e categoria
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar receitas..." className="pl-8 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" onClick={handlePeriodChange}>
                <Calendar className="w-4 h-4 mr-2" />
                {selectedPeriod}
              </Button>
              <Button onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{totalRevenue}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {isGrowthPositive ? (
                    <ArrowUpRight className="w-3 h-3 text-green-600 mr-1" />
                  ) : (
                    <ArrowDownRight className="w-3 h-3 text-red-600 mr-1" />
                  )}
                  <span className={isGrowthPositive ? "text-green-600" : "text-red-600"}>
                    {totalGrowth}
                  </span>
                  <span className="ml-1">vs mês anterior</span>
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.678</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+21%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 35,02</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-red-600">-0.6%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lojas Ativas</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">52</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+10.6%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Evolution */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Evolução das Receitas</CardTitle>
                  <CardDescription>
                    Histórico mensal de receitas com indicadores de crescimento
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={handleViewChart}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Ver Gráfico
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        data.isPositive ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'
                      }`}>
                        {data.isPositive ? (
                          <TrendingUp className="w-6 h-6 text-green-600 dark:text-green-400" />
                        ) : (
                          <TrendingDown className="w-6 h-6 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{data.period}</h3>
                        <p className="text-sm text-muted-foreground">
                          {data.orders} pedidos • {data.stores} lojas • Top: {data.topStore}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Ticket Médio</p>
                        <p className="font-medium">{data.avgTicket}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-muted-foreground">Crescimento</p>
                        <Badge variant={data.isPositive ? "default" : "destructive"} className={
                          data.isPositive ? "bg-green-500" : "bg-red-500"
                        }>
                          {data.growth}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-2xl text-green-600 dark:text-green-400">{data.totalRevenue}</p>
                        <p className="text-xs text-muted-foreground">Receita Total</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Revenue by Store and Category */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Receita por Loja</CardTitle>
                <CardDescription>
                  Top lojas por faturamento no período atual
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {storeRevenue.map((store, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                          <Store className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{store.name}</p>
                          <p className="text-xs text-muted-foreground">{store.category} • {store.orders} pedidos</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 dark:text-green-400">{store.revenue}</p>
                        <p className="text-xs text-muted-foreground">{store.percentage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Receita por Categoria</CardTitle>
                <CardDescription>
                  Distribuição de receitas por tipo de estabelecimento
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categoryRevenue.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-primary rounded-full"></div>
                          <span className="font-medium">{category.category}</span>
                          <span className="text-sm text-muted-foreground">({category.stores} lojas)</span>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600 dark:text-green-400">{category.revenue}</p>
                          <p className="text-xs text-muted-foreground">{category.percentage}</p>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: category.percentage }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="w-5 h-5" />
                  <span>Performance Mensal</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Melhor mês:</span>
                  <span className="font-bold">Abril 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Maior crescimento:</span>
                  <span className="font-bold text-green-600">+20.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Média mensal:</span>
                  <span className="font-bold">R$ 51.425,68</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Performers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Maior receita:</span>
                  <span className="font-bold">Padaria Central</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Mais pedidos:</span>
                  <span className="font-bold">Padaria Central</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Categoria líder:</span>
                  <span className="font-bold">Alimentação</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline" onClick={handleDetailedReport}>
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Relatório Detalhado
                </Button>
                <Button className="w-full" variant="outline" onClick={handleExport}>
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Dados
                </Button>
                <Button className="w-full" variant="outline" onClick={handleStoreAnalysis}>
                  <Users className="w-4 h-4 mr-2" />
                  Análise por Loja
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>

      {/* Modal de Seleção de Período */}
      <Dialog open={periodModalOpen} onOpenChange={setPeriodModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Selecionar Período</span>
            </DialogTitle>
            <DialogDescription>
              Escolha o período para visualizar as receitas
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-2 mt-4">
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
              variant={selectedPeriod === "Este ano" ? "default" : "outline"}
              className="justify-start"
              onClick={() => handlePeriodSelect("Este ano")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Este ano
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Exportação */}
      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Download className="w-5 h-5" />
              <span>Exportar Dados de Receitas</span>
            </DialogTitle>
            <DialogDescription>
              Escolha o formato para exportar os dados de receitas do período: {selectedPeriod}
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-3 mt-4">
            <Button
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => handleExportData('csv')}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-green-600" />
                <div className="text-left">
                  <p className="font-medium">Exportar como CSV</p>
                  <p className="text-sm text-muted-foreground">Planilha compatível com Excel</p>
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => handleExportData('json')}
            >
              <div className="flex items-center space-x-3">
                <Package className="w-5 h-5 text-blue-600" />
                <div className="text-left">
                  <p className="font-medium">Exportar como JSON</p>
                  <p className="text-sm text-muted-foreground">Dados estruturados para desenvolvimento</p>
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className="justify-start h-auto p-4"
              onClick={() => handleExportData('pdf')}
            >
              <div className="flex items-center space-x-3">
                <FileText className="w-5 h-5 text-red-600" />
                <div className="text-left">
                  <p className="font-medium">Exportar como PDF</p>
                  <p className="text-sm text-muted-foreground">Relatório formatado para impressão</p>
                </div>
              </div>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Gráfico */}
      <Dialog open={chartModalOpen} onOpenChange={setChartModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Gráfico de Evolução das Receitas</span>
            </DialogTitle>
            <DialogDescription>
              Visualização gráfica da evolução das receitas no período: {selectedPeriod}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Gráficos Reais */}
            <Card className="flex flex-col">
              <CardHeader className="items-center pb-0">
                <div className="flex items-center justify-between w-full">
                  <div>
                    <CardTitle>Evolução das Receitas</CardTitle>
                    <CardDescription>
                      {selectedPeriod} - Janeiro a Abril 2024
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      variant={selectedChartType === 'line' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedChartType('line')}
                    >
                      <LineChartIcon className="w-4 h-4 mr-2" />
                      Linha
                    </Button>
                    <Button 
                      variant={selectedChartType === 'bar' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedChartType('bar')}
                    >
                      <BarChart3 className="w-4 h-4 mr-2" />
                      Barras
                    </Button>
                    <Button 
                      variant={selectedChartType === 'radial' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedChartType('radial')}
                    >
                      <PieChartIcon className="w-4 h-4 mr-2" />
                      Radial
                    </Button>
                    <Button 
                      variant={selectedChartType === 'radar' ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setSelectedChartType('radar')}
                    >
                      <Target className="w-4 h-4 mr-2" />
                      Radar
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                {selectedChartType === 'bar' && (
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-[4/3] max-h-[300px] w-full"
                  >
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis 
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        formatter={(value, name) => [
                          `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                          ` ${chartConfig[name as keyof typeof chartConfig]?.label || name}`
                        ]}
                      />
                      <Bar dataKey="revenue" fill="var(--color-revenue)" radius={8} />
                    </BarChart>
                  </ChartContainer>
                )}

                {selectedChartType === 'line' && (
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-[4/3] max-h-[300px] w-full"
                  >
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="month" 
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                      />
                      <YAxis 
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `R$ ${value.toLocaleString()}`}
                      />
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        formatter={(value, name) => [
                          `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                          ` ${chartConfig[name as keyof typeof chartConfig]?.label || name}`
                        ]}
                      />
                      <Line 
                        dataKey="revenue" 
                        stroke="var(--color-revenue)" 
                        strokeWidth={3}
                        dot={{ fill: "var(--color-revenue)", strokeWidth: 2, r: 6 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ChartContainer>
                )}

                {selectedChartType === 'radial' && (
                  <ChartContainer
                    config={categoryConfig}
                    className="mx-auto aspect-square max-h-[280px]"
                  >
                    <RadialBarChart data={radialData} innerRadius={60} outerRadius={140}>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel nameKey="category" />}
                        formatter={(value, name) => [
                          `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                          ` ${name}`
                        ]}
                      />
                      <RadialBar dataKey="revenue" background />
                    </RadialBarChart>
                  </ChartContainer>
                )}

                {selectedChartType === 'radar' && (
                  <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[280px]"
                  >
                    <RadarChart data={radarData}>
                      <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent hideLabel />}
                        formatter={(value, name) => [
                          name === 'receita' ? `R$ ${Number(value * 1000).toLocaleString('pt-BR')} mil` :
                          name === 'pedidos' ? `${Number(value * 100).toLocaleString('pt-BR')} pedidos` :
                          name === 'ticketMedio' ? `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` :
                          name === 'lojas' ? `${Number(value)} lojas` :
                          String(value),
                          name === 'receita' ? ' Receita' :
                          name === 'pedidos' ? ' Pedidos' :
                          name === 'ticketMedio' ? ' Ticket Médio' :
                          name === 'lojas' ? ' Lojas' :
                          ` ${String(name)}`
                        ]}
                      />
                      <PolarGrid gridType="circle" />
                      <PolarAngleAxis dataKey="month" />
                      <Radar
                        dataKey="receita"
                        stroke="var(--color-revenue)"
                        fill="var(--color-revenue)"
                        fillOpacity={0.6}
                        dot={{
                          r: 4,
                          fillOpacity: 1,
                        }}
                      />
                    </RadarChart>
                  </ChartContainer>
                )}
              </CardContent>
              <div className="flex-col gap-2 text-sm p-6 pt-0">
                <div className="flex items-center gap-2 leading-none font-medium">
                  Crescimento de {totalGrowth} este mês <TrendingUp className="h-4 w-4" />
                </div>
                <div className="text-muted-foreground leading-none">
                  Mostrando receitas totais para {selectedPeriod.toLowerCase()}
                </div>
              </div>
            </Card>

            {/* Métricas do Gráfico */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Maior Receita</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-green-600">R$ 58.760,40</p>
                  <p className="text-sm text-muted-foreground">Abril 2024</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Menor Receita</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-red-600">R$ 45.680,90</p>
                  <p className="text-sm text-muted-foreground">Janeiro 2024</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm">Crescimento Médio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-blue-600">+10.2%</p>
                  <p className="text-sm text-muted-foreground">Por mês</p>
                </CardContent>
              </Card>
            </div>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => handleExportData('png')}>
                <Download className="w-4 h-4 mr-2" />
                Salvar Gráfico
              </Button>
              <Button onClick={handleDetailedReport}>
                <FileText className="w-4 h-4 mr-2" />
                Relatório Completo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Relatório Detalhado */}
      <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Relatório Detalhado de Receitas</span>
            </DialogTitle>
            <DialogDescription>
              Análise completa das receitas no período: {selectedPeriod}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Resumo Executivo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo Executivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Receita Total</Label>
                    <p className="text-2xl font-bold text-green-600">{totalRevenue}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Crescimento</Label>
                    <p className={`text-2xl font-bold ${isGrowthPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {totalGrowth}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Total de Pedidos</Label>
                    <p className="text-2xl font-bold">1.678</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Ticket Médio</Label>
                    <p className="text-2xl font-bold">R$ 35,02</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Análise por Período */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Análise por Período</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueData.map((data, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold">{data.period}</h4>
                        <Badge variant={data.isPositive ? "default" : "destructive"}>
                          {data.growth}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Receita</p>
                          <p className="font-medium">{data.totalRevenue}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Pedidos</p>
                          <p className="font-medium">{data.orders}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Ticket Médio</p>
                          <p className="font-medium">{data.avgTicket}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Lojas Ativas</p>
                          <p className="font-medium">{data.stores}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top 5 Lojas por Receita</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {storeRevenue.slice(0, 5).map((store, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                          <span className="text-sm font-bold">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium">{store.name}</p>
                          <p className="text-sm text-muted-foreground">{store.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600">{store.revenue}</p>
                        <p className="text-sm text-muted-foreground">{store.orders} pedidos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recomendações */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Recomendações Estratégicas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <h4 className="font-semibold text-green-800 dark:text-green-200">Oportunidades</h4>
                    <ul className="text-sm text-green-700 dark:text-green-300 mt-2 space-y-1">
                      <li>• Crescimento consistente de 20.1% em Abril</li>
                      <li>• Categoria Alimentação representa 41.6% da receita</li>
                      <li>• 52 lojas ativas, crescimento de 10.6%</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h4 className="font-semibold text-yellow-800 dark:text-yellow-200">Pontos de Atenção</h4>
                    <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-2 space-y-1">
                      <li>• Ticket médio em queda (-0.6%)</li>
                      <li>• Março teve queda de 6.5% na receita</li>
                      <li>• Concentração alta nas top 3 lojas (49.7%)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => handleExportData('pdf')}>
                <Download className="w-4 h-4 mr-2" />
                Exportar PDF
              </Button>
              <Button onClick={() => setReportModalOpen(false)}>
                <FileText className="w-4 h-4 mr-2" />
                Fechar Relatório
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Análise por Loja */}
      <Dialog open={storeAnalysisModalOpen} onOpenChange={setStoreAnalysisModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center space-x-2">
              <Building2 className="w-5 h-5" />
              <span>Análise Detalhada por Loja</span>
            </DialogTitle>
            <DialogDescription>
              Performance individual das lojas no período: {selectedPeriod}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Filtros */}
            <div className="flex space-x-2">
              <Button 
                variant={selectedCategory === 'Todas' ? "default" : "outline"} 
                size="sm"
                onClick={() => handleCategorySelect('Todas')}
              >
                Todas
              </Button>
              <Button 
                variant={selectedCategory === 'Alimentação' ? "default" : "outline"} 
                size="sm"
                onClick={() => handleCategorySelect('Alimentação')}
              >
                Alimentação
              </Button>
              <Button 
                variant={selectedCategory === 'Supermercado' ? "default" : "outline"} 
                size="sm"
                onClick={() => handleCategorySelect('Supermercado')}
              >
                Supermercado
              </Button>
              <Button 
                variant={selectedCategory === 'Farmácia' ? "default" : "outline"} 
                size="sm"
                onClick={() => handleCategorySelect('Farmácia')}
              >
                Farmácia
              </Button>
              <Button 
                variant={selectedCategory === 'Pet Shop' ? "default" : "outline"} 
                size="sm"
                onClick={() => handleCategorySelect('Pet Shop')}
              >
                Pet Shop
              </Button>
            </div>

            {/* Lista Detalhada de Lojas */}
            <div className="space-y-4">
              {filteredStores.map((store, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Store className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{store.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{store.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">{store.revenue}</p>
                        <p className="text-sm text-muted-foreground">{store.percentage} do total</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <ShoppingBag className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Pedidos</p>
                        <p className="font-semibold">{store.orders}</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <DollarSign className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Ticket Médio</p>
                        <p className="font-semibold">
                          R$ {(parseFloat(store.revenue.replace(/[R$\s.,]/g, '')) / store.orders / 100).toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <TrendingUp className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Crescimento</p>
                        <p className="font-semibold text-green-600">+{12 + (index * 3)}%</p>
                      </div>
                      <div className="text-center p-3 bg-muted rounded-lg">
                        <BarChart3 className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">Ranking</p>
                        <p className="font-semibold">#{index + 1}</p>
                      </div>
                    </div>
                    
                    {/* Barra de Performance */}
                    <div className="mt-4">
                      {(() => {
                        const performanceValue = Math.min(Math.floor(Math.random() * 40 + 80), 100);
                        return (
                          <>
                            <div className="flex justify-between text-sm mb-1">
                              <span>Performance vs Meta</span>
                              <span>{performanceValue}%</span>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                              <div 
                                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${performanceValue}%` }}
                              ></div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resumo da Análise */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Insights da Análise</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Top Performers</h4>
                    <ul className="text-sm space-y-1">
                      <li>• <strong>Padaria Central:</strong> Líder em receita e pedidos</li>
                      <li>• <strong>Mercado Bom Preço:</strong> Segundo lugar consistente</li>
                      <li>• <strong>Farmácia Saúde:</strong> Melhor ticket médio</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Oportunidades</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Categoria Pet Shop com potencial de crescimento</li>
                      <li>• Lojas menores podem aumentar frequência</li>
                      <li>• Diversificação de categorias recomendada</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Botões de Ação */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => handleExportData('csv')}>
                <Download className="w-4 h-4 mr-2" />
                Exportar Análise
              </Button>
              <Button onClick={handleDetailedReport}>
                <FileText className="w-4 h-4 mr-2" />
                Relatório Completo
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}