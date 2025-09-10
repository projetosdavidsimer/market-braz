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
  CreditCard,
  Truck,
  Calendar,
  Search,
  Filter,
  Download,
  Settings,
  TrendingUp,
  MapPin,
  Clock,
  Percent,
  Edit
} from "lucide-react"

export default function FeesPage() {
  const deliveryFees = [
    {
      zone: "Zona Norte",
      baseRate: "R$ 4,50",
      perKm: "R$ 1,20",
      minOrder: "R$ 15,00",
      freeDeliveryMin: "R$ 50,00",
      avgDistance: "2.3 km",
      avgFee: "R$ 7,26",
      orders: 456,
      revenue: "R$ 3.310,56"
    },
    {
      zone: "Centro",
      baseRate: "R$ 3,50",
      perKm: "R$ 1,00",
      minOrder: "R$ 12,00",
      freeDeliveryMin: "R$ 40,00",
      avgDistance: "1.8 km",
      avgFee: "R$ 5,30",
      orders: 678,
      revenue: "R$ 3.593,40"
    },
    {
      zone: "Zona Sul",
      baseRate: "R$ 5,00",
      perKm: "R$ 1,50",
      minOrder: "R$ 18,00",
      freeDeliveryMin: "R$ 60,00",
      avgDistance: "3.1 km",
      avgFee: "R$ 9,65",
      orders: 234,
      revenue: "R$ 2.258,10"
    },
    {
      zone: "Zona Oeste",
      baseRate: "R$ 4,00",
      perKm: "R$ 1,30",
      minOrder: "R$ 15,00",
      freeDeliveryMin: "R$ 45,00",
      avgDistance: "2.7 km",
      avgFee: "R$ 7,51",
      orders: 189,
      revenue: "R$ 1.419,39"
    }
  ]

  const paymentFees = [
    {
      method: "Cartão de Crédito",
      rate: "3.49%",
      fixedFee: "R$ 0,39",
      transactions: 1234,
      volume: "R$ 45.680,90",
      totalFees: "R$ 2.075,46",
      provider: "PagSeguro"
    },
    {
      method: "Cartão de Débito",
      rate: "2.99%",
      fixedFee: "R$ 0,39",
      transactions: 567,
      volume: "R$ 18.920,50",
      totalFees: "R$ 787,23",
      provider: "PagSeguro"
    },
    {
      method: "PIX",
      rate: "0.99%",
      fixedFee: "R$ 0,00",
      transactions: 890,
      volume: "R$ 28.340,80",
      totalFees: "R$ 280,57",
      provider: "PagSeguro"
    },
    {
      method: "Dinheiro",
      rate: "0%",
      fixedFee: "R$ 0,00",
      transactions: 123,
      volume: "R$ 3.450,60",
      totalFees: "R$ 0,00",
      provider: "N/A"
    }
  ]

  const serviceFees = [
    {
      service: "Taxa de Plataforma",
      description: "Taxa cobrada das lojas por uso da plataforma",
      type: "Percentual",
      value: "2.5%",
      appliedTo: "Faturamento da loja",
      revenue: "R$ 2.410,45",
      active: true
    },
    {
      service: "Taxa de Cancelamento",
      description: "Taxa aplicada em cancelamentos após preparo",
      type: "Fixa",
      value: "R$ 2,00",
      appliedTo: "Pedidos cancelados",
      revenue: "R$ 156,00",
      active: true
    },
    {
      service: "Taxa de Atraso",
      description: "Taxa aplicada quando entrega excede tempo estimado",
      type: "Fixa",
      value: "R$ 1,50",
      appliedTo: "Entregas atrasadas",
      revenue: "R$ 67,50",
      active: false
    },
    {
      service: "Taxa de Promoção",
      description: "Taxa para destacar loja na plataforma",
      type: "Mensal",
      value: "R$ 49,90",
      appliedTo: "Lojas participantes",
      revenue: "R$ 1.497,00",
      active: true
    }
  ]

  const totalDeliveryRevenue = deliveryFees.reduce((acc, fee) => 
    acc + parseFloat(fee.revenue.replace("R$ ", "").replace(".", "").replace(",", ".")), 0
  )

  const totalPaymentFees = paymentFees.reduce((acc, fee) => 
    acc + parseFloat(fee.totalFees.replace("R$ ", "").replace(".", "").replace(",", ".")), 0
  )

  const totalServiceRevenue = serviceFees.reduce((acc, fee) => 
    acc + parseFloat(fee.revenue.replace("R$ ", "").replace(".", "").replace(",", ".")), 0
  )

  const totalFeesRevenue = totalDeliveryRevenue + totalPaymentFees + totalServiceRevenue

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
                  <BreadcrumbPage>Taxas</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Taxas e Tarifas</h1>
              <p className="text-muted-foreground">
                Gerencie todas as taxas de entrega, pagamento e serviços da plataforma
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar taxas..." className="pl-8 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline">
                <Settings className="w-4 h-4 mr-2" />
                Configurar
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
                <div className="text-2xl font-bold text-green-600">R$ {totalFeesRevenue.toFixed(2).replace(".", ",")}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8.5%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Entrega</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalDeliveryRevenue.toFixed(2).replace(".", ",")}</div>
                <p className="text-xs text-muted-foreground">
                  {deliveryFees.reduce((acc, fee) => acc + fee.orders, 0)} entregas
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Pagamento</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalPaymentFees.toFixed(2).replace(".", ",")}</div>
                <p className="text-xs text-muted-foreground">
                  {paymentFees.reduce((acc, fee) => acc + fee.transactions, 0)} transações
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxas de Serviço</CardTitle>
                <Settings className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalServiceRevenue.toFixed(2).replace(".", ",")}</div>
                <p className="text-xs text-muted-foreground">
                  {serviceFees.filter(fee => fee.active).length} serviços ativos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Delivery Fees */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Truck className="w-5 h-5" />
                <span>Taxas de Entrega por Região</span>
              </CardTitle>
              <CardDescription>
                Configuração de taxas de entrega baseadas na localização
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryFees.map((fee, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{fee.zone}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Base: {fee.baseRate}</span>
                          <span>Por km: {fee.perKm}</span>
                          <span>Pedido mín: {fee.minOrder}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          Frete grátis acima de {fee.freeDeliveryMin}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Distância Média</p>
                          <p className="font-medium">{fee.avgDistance}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Taxa Média</p>
                          <p className="font-medium">{fee.avgFee}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Pedidos</p>
                          <p className="font-bold">{fee.orders}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Receita</p>
                          <p className="font-bold text-blue-600 dark:text-blue-400">{fee.revenue}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Editar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Fees */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Taxas de Pagamento</span>
              </CardTitle>
              <CardDescription>
                Custos de processamento por método de pagamento
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentFees.map((fee, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                        <CreditCard className="w-6 h-6 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{fee.method}</h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Taxa: {fee.rate}</span>
                          <span>Taxa fixa: {fee.fixedFee}</span>
                          <span>Provedor: {fee.provider}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Transações</p>
                          <p className="font-bold">{fee.transactions}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Volume</p>
                          <p className="font-medium">{fee.volume}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Custo Total</p>
                          <p className="font-bold text-green-600 dark:text-green-400">{fee.totalFees}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Service Fees */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Taxas de Serviço</span>
              </CardTitle>
              <CardDescription>
                Taxas adicionais e serviços premium da plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceFees.map((fee, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        fee.active ? 'bg-purple-100 dark:bg-purple-900' : 'bg-gray-100 dark:bg-gray-800'
                      }`}>
                        <Settings className={`w-6 h-6 ${
                          fee.active ? 'text-purple-600 dark:text-purple-400' : 'text-gray-400'
                        }`} />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-lg">{fee.service}</h3>
                          <Badge variant={fee.active ? "default" : "secondary"}>
                            {fee.active ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{fee.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                          <span>Tipo: {fee.type}</span>
                          <span>Aplicado em: {fee.appliedTo}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Valor</p>
                          <p className="font-bold text-lg">{fee.value}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground">Receita</p>
                          <p className="font-bold text-purple-600 dark:text-purple-400">{fee.revenue}</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Configurar
                      </Button>
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
                  <TrendingUp className="w-5 h-5" />
                  <span>Resumo por Categoria</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Entrega:</span>
                  <span className="font-bold text-blue-600">R$ {totalDeliveryRevenue.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Pagamento:</span>
                  <span className="font-bold text-green-600">R$ {totalPaymentFees.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Serviços:</span>
                  <span className="font-bold text-purple-600">R$ {totalServiceRevenue.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium">Total:</span>
                  <span className="font-bold text-lg">R$ {totalFeesRevenue.toFixed(2).replace(".", ",")}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Métricas de Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Taxa média entrega:</span>
                  <span className="font-bold">R$ 7,43</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Custo médio pagamento:</span>
                  <span className="font-bold">2.8%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Margem de serviços:</span>
                  <span className="font-bold text-green-600">85%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  Configurar Taxas
                </Button>
                <Button className="w-full" variant="outline">
                  <Percent className="w-4 h-4 mr-2" />
                  Ajustar Comissões
                </Button>
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Relatório Completo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}