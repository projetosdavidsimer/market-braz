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
  Percent,
  TrendingUp,
  Calendar,
  Search,
  Filter,
  Download,
  Store,
  Truck,
  Users,
  BarChart3,
  CheckCircle,
  Clock
} from "lucide-react"

export default function CommissionsPage() {
  const commissionData = [
    {
      store: "Padaria Central",
      owner: "Carlos Oliveira",
      category: "Padaria",
      revenue: "R$ 12.450,80",
      commissionRate: "8%",
      commissionAmount: "R$ 996,06",
      orders: 456,
      status: "Pago",
      paymentDate: "2024-04-05",
      period: "Março 2024"
    },
    {
      store: "Mercado Bom Preço",
      owner: "José Santos",
      category: "Supermercado",
      revenue: "R$ 11.890,50",
      commissionRate: "6%",
      commissionAmount: "R$ 713,43",
      orders: 389,
      status: "Pago",
      paymentDate: "2024-04-05",
      period: "Março 2024"
    },
    {
      store: "Farmácia Saúde",
      owner: "Ana Lima",
      category: "Farmácia",
      revenue: "R$ 9.670,30",
      commissionRate: "10%",
      commissionAmount: "R$ 967,03",
      orders: 234,
      status: "Pendente",
      paymentDate: "2024-04-15",
      period: "Março 2024"
    },
    {
      store: "Pizzaria Italiana",
      owner: "Marco Rossi",
      category: "Restaurante",
      revenue: "R$ 8.340,90",
      commissionRate: "12%",
      commissionAmount: "R$ 1.000,91",
      orders: 198,
      status: "Pago",
      paymentDate: "2024-04-05",
      period: "Março 2024"
    },
    {
      store: "Lanchonete do Bairro",
      owner: "Maria Silva",
      category: "Lanchonete",
      revenue: "R$ 6.780,40",
      commissionRate: "10%",
      commissionAmount: "R$ 678,04",
      orders: 167,
      status: "Processando",
      paymentDate: "2024-04-10",
      period: "Março 2024"
    },
    {
      store: "Pet Shop Amigo",
      owner: "Lucia Ferreira",
      category: "Pet Shop",
      revenue: "R$ 5.450,60",
      commissionRate: "8%",
      commissionAmount: "R$ 436,05",
      orders: 123,
      status: "Pago",
      paymentDate: "2024-04-05",
      period: "Março 2024"
    }
  ]

  const deliveryCommissions = [
    {
      driver: "Roberto Silva",
      deliveries: 156,
      totalDistance: "1.245 km",
      commissionRate: "R$ 3,50",
      totalCommission: "R$ 546,00",
      status: "Pago",
      paymentDate: "2024-04-05"
    },
    {
      driver: "Marcos Pereira",
      deliveries: 134,
      totalDistance: "1.089 km",
      commissionRate: "R$ 3,50",
      totalCommission: "R$ 469,00",
      status: "Pago",
      paymentDate: "2024-04-05"
    },
    {
      driver: "Lucas Ferreira",
      deliveries: 98,
      totalDistance: "567 km",
      commissionRate: "R$ 3,50",
      totalCommission: "R$ 343,00",
      status: "Pendente",
      paymentDate: "2024-04-15"
    },
    {
      driver: "Carlos Oliveira",
      deliveries: 87,
      totalDistance: "445 km",
      commissionRate: "R$ 3,50",
      totalCommission: "R$ 304,50",
      status: "Processando",
      paymentDate: "2024-04-10"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Pago":
        return <Badge variant="default" className="bg-green-500">Pago</Badge>
      case "Pendente":
        return <Badge variant="secondary">Pendente</Badge>
      case "Processando":
        return <Badge variant="outline">Processando</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalStoreCommissions = commissionData.reduce((acc, item) => 
    acc + parseFloat(item.commissionAmount.replace("R$ ", "").replace(".", "").replace(",", ".")), 0
  )

  const totalDeliveryCommissions = deliveryCommissions.reduce((acc, item) => 
    acc + parseFloat(item.totalCommission.replace("R$ ", "").replace(".", "").replace(",", ".")), 0
  )

  const totalCommissions = totalStoreCommissions + totalDeliveryCommissions

  const paidCommissions = [
    ...commissionData.filter(item => item.status === "Pago"),
    ...deliveryCommissions.filter(item => item.status === "Pago")
  ].length

  const pendingCommissions = [
    ...commissionData.filter(item => item.status === "Pendente"),
    ...deliveryCommissions.filter(item => item.status === "Pendente")
  ].length

  // Cálculo da comissão da plataforma (R$ 1,00 por entrega)
  const totalDeliveries = deliveryCommissions.reduce((acc, item) => acc + item.deliveries, 0)
  const platformCommissionPerDelivery = 1.00
  const totalPlatformCommission = totalDeliveries * platformCommissionPerDelivery
  const paidDeliveries = deliveryCommissions.filter(item => item.status === "Pago").reduce((acc, item) => acc + item.deliveries, 0)
  const paidPlatformCommission = paidDeliveries * platformCommissionPerDelivery
  const pendingPlatformCommission = totalPlatformCommission - paidPlatformCommission

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
                  <BreadcrumbPage>Comissões</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Comissões</h1>
              <p className="text-muted-foreground">
                Gerencie as comissões de lojas e entregadores da plataforma
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar comissões..." className="pl-8 w-64" />
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

          {/* Platform Commission - Sua Parte */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-foreground">
                <TrendingUp className="w-6 h-6 text-primary" />
                <span>Sua Receita da Plataforma</span>
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                R$ 1,00 por entrega realizada • Comissão do Market Braz
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 bg-muted rounded-lg border border-border shadow-sm">
                  <p className="text-sm text-muted-foreground mb-1">Total de Entregas</p>
                  <p className="text-2xl font-bold text-foreground">{totalDeliveries}</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg border border-border shadow-sm">
                  <p className="text-sm text-muted-foreground mb-1">Por Entrega</p>
                  <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">R$ {platformCommissionPerDelivery.toFixed(2).replace(".", ",")}</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg border border-border shadow-sm">
                  <p className="text-sm text-muted-foreground mb-1">Já Recebido</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">R$ {paidPlatformCommission.toFixed(2).replace(".", ",")}</p>
                </div>
                <div className="text-center p-4 bg-primary/10 dark:bg-muted rounded-lg border-2 border-primary shadow-sm">
                  <p className="text-sm text-primary/80 dark:text-muted-foreground mb-1 font-medium">Sua Receita Total</p>
                  <p className="text-3xl font-bold text-primary">R$ {totalPlatformCommission.toFixed(2).replace(".", ",")}</p>
                </div>
              </div>
              
              {pendingPlatformCommission > 0 && (
                <div className="mt-4 p-3 bg-muted rounded-lg border border-border shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pendente de recebimento:</span>
                    <span className="font-bold text-lg text-amber-600 dark:text-amber-400">
                      R$ {pendingPlatformCommission.toFixed(2).replace(".", ",")}
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Comissões</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">R$ {totalCommissions.toFixed(2).replace(".", ",")}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comissões Pagas</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{paidCommissions}</div>
                <p className="text-xs text-muted-foreground">
                  pagamentos realizados
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{pendingCommissions}</div>
                <p className="text-xs text-muted-foreground">
                  aguardando pagamento
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa Média</CardTitle>
                <Percent className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">8.7%</div>
                <p className="text-xs text-muted-foreground">
                  comissão média das lojas
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Store Commissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Store className="w-5 h-5 text-green-600" />
                <span>Receitas das Lojas</span>
                <Badge variant="outline" className="text-green-600 border-green-600">Você Recebe</Badge>
              </CardTitle>
              <CardDescription>
                Percentual que você recebe sobre o faturamento de cada loja parceira
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {commissionData.map((commission, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                          <Store className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{commission.store}</h3>
                          <p className="text-xs text-muted-foreground truncate">{commission.owner}</p>
                        </div>
                      </div>
                      {getStatusBadge(commission.status)}
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-center p-2 bg-card rounded border border-border">
                        <p className="text-xs text-muted-foreground">Receita</p>
                        <p className="font-bold text-sm text-green-600 dark:text-green-400">{commission.revenue}</p>
                      </div>
                      <div className="text-center p-2 bg-card rounded border border-border">
                        <p className="text-xs text-muted-foreground">Taxa</p>
                        <p className="font-bold text-sm text-blue-600 dark:text-blue-400">{commission.commissionRate}</p>
                      </div>
                    </div>

                    {/* Commission Amount - Destaque */}
                    <div className="text-center p-3 bg-blue-50 dark:bg-card rounded-lg border border-blue-200 dark:border-border mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Comissão</p>
                      <p className="font-bold text-lg text-blue-600 dark:text-blue-400">{commission.commissionAmount}</p>
                    </div>

                    {/* Footer Info */}
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <BarChart3 className="w-3 h-3 mr-1" />
                        {commission.orders} pedidos
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(commission.paymentDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Commissions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-red-600" />
                <span>Pagamentos aos Entregadores</span>
                <Badge variant="outline" className="text-red-600 border-red-600">Você Paga</Badge>
              </CardTitle>
              <CardDescription>
                Valor que você paga para cada entregador por entrega realizada
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {deliveryCommissions.map((commission, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
                          <Truck className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-sm truncate">{commission.driver}</h3>
                          <p className="text-xs text-muted-foreground">Entregador</p>
                        </div>
                      </div>
                      {getStatusBadge(commission.status)}
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div className="text-center p-2 bg-card rounded border border-border">
                        <p className="text-xs text-muted-foreground">Entregas</p>
                        <p className="font-bold text-sm text-blue-600 dark:text-blue-400">{commission.deliveries}</p>
                      </div>
                      <div className="text-center p-2 bg-card rounded border border-border">
                        <p className="text-xs text-muted-foreground">Distância</p>
                        <p className="font-bold text-sm text-green-600 dark:text-green-400">{commission.totalDistance}</p>
                      </div>
                    </div>

                    {/* Commission Amount - Destaque */}
                    <div className="text-center p-3 bg-orange-50 dark:bg-card rounded-lg border border-orange-200 dark:border-border mb-3">
                      <p className="text-xs text-muted-foreground mb-1">Comissão Total</p>
                      <p className="font-bold text-lg text-orange-600 dark:text-orange-400">{commission.totalCommission}</p>
                    </div>

                    {/* Footer Info */}
                    <div className="flex justify-between items-center text-xs text-muted-foreground">
                      <span className="flex items-center">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {commission.commissionRate}/entrega
                      </span>
                      <span className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(commission.paymentDate).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Resumo Financeiro</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Receitas das Lojas:
                  </span>
                  <span className="font-bold text-green-600">+R$ {totalStoreCommissions.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center">
                    <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                    Pagamentos Entregadores:
                  </span>
                  <span className="font-bold text-red-600">-R$ {totalDeliveryCommissions.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium">Saldo Líquido:</span>
                  <span className="font-bold text-lg text-primary">R$ {(totalStoreCommissions - totalDeliveryCommissions).toFixed(2).replace(".", ",")}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status dos Pagamentos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pagos:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(paidCommissions / (paidCommissions + pendingCommissions + 2)) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{paidCommissions}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pendentes:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-yellow-500"
                        style={{ width: `${(pendingCommissions / (paidCommissions + pendingCommissions + 2)) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{pendingCommissions}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Processando:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(2 / (paidCommissions + pendingCommissions + 2)) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">2</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Processar Pagamentos
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Relatório de Comissões
                </Button>
                <Button className="w-full" variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  Configurar Taxas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}