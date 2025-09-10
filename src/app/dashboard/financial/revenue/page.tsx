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
import { Input } from "@/components/ui/input"
import { ModeToggle } from "@/components/mode-toggle"
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
  ArrowDownRight
} from "lucide-react"

export default function RevenuePage() {
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
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Período
              </Button>
              <Button>
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
                <Button variant="outline" size="sm">
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
                <Button className="w-full" variant="outline">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Relatório Detalhado
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Exportar Dados
                </Button>
                <Button className="w-full" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Análise por Loja
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}