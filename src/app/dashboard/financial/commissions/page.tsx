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
import { Label } from "@/components/ui/label"
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
  Clock,
  FileText,
  Package,
  Settings,
  CreditCard
} from "lucide-react"

export default function CommissionsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Março 2024")
  const [periodModalOpen, setPeriodModalOpen] = useState(false)
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [processPaymentModalOpen, setProcessPaymentModalOpen] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [configRatesModalOpen, setConfigRatesModalOpen] = useState(false)

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
      storeCommissions: commissionData,
      deliveryCommissions: deliveryCommissions,
      totalCommissions: totalCommissions,
      platformCommission: totalPlatformCommission
    }
    
    const dataStr = format === 'json' ? JSON.stringify(data, null, 2) : 
                   format === 'csv' ? convertToCSV(data) : 
                   JSON.stringify(data, null, 2)
    
    const dataBlob = new Blob([dataStr], { type: format === 'csv' ? 'text/csv' : 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `comissoes_${selectedPeriod.toLowerCase().replace(/\s+/g, '_')}.${format}`
    link.click()
    URL.revokeObjectURL(url)
    setExportModalOpen(false)
  }

  const convertToCSV = (data: any) => {
    const headers = ['Loja', 'Proprietário', 'Receita', 'Taxa', 'Comissão', 'Status']
    const rows = data.storeCommissions.map((item: any) => [
      item.store,
      item.owner,
      item.revenue,
      item.commissionRate,
      item.commissionAmount,
      item.status
    ])
    
    return [headers, ...rows].map(row => row.join(',')).join('\n')
  }

  const handleProcessPayments = () => {
    setProcessPaymentModalOpen(true)
  }

  const handleGenerateReport = () => {
    setReportModalOpen(true)
  }

  const handleConfigureRates = () => {
    setConfigRatesModalOpen(true)
  }

  const processSelectedPayments = () => {
    // Simular processamento de pagamentos
    alert('Pagamentos processados com sucesso!')
    setProcessPaymentModalOpen(false)
  }
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

          {/* Suas Receitas Totais */}
          <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-800 dark:text-green-200">
                <TrendingUp className="w-6 h-6 text-green-600" />
                <span>Suas Receitas Totais - Market Braz</span>
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                Todas as fontes de receita da sua plataforma
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">
                  <p className="text-sm text-muted-foreground mb-1">Taxa por Entrega</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">R$ 1,00</p>
                  <p className="text-xs text-muted-foreground">{totalDeliveries} entregas</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">
                  <p className="text-sm text-muted-foreground mb-1">Comissões das Lojas</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">R$ {totalStoreCommissions.toFixed(2).replace(".", ",")}</p>
                  <p className="text-xs text-muted-foreground">6 lojas ativas</p>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-900 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">
                  <p className="text-sm text-muted-foreground mb-1">Mensalidades</p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">R$ 1.200,00</p>
                  <p className="text-xs text-muted-foreground">R$ 200/loja</p>
                </div>
                <div className="text-center p-4 bg-green-100 dark:bg-green-900 rounded-lg border-2 border-green-300 dark:border-green-700 shadow-sm">
                  <p className="text-sm text-green-700 dark:text-green-300 mb-1 font-medium">RECEITA TOTAL</p>
                  <p className="text-3xl font-bold text-green-700 dark:text-green-300">R$ {(totalPlatformCommission + totalStoreCommissions + 1200).toFixed(2).replace(".", ",")}</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-white dark:bg-gray-900 rounded-lg border border-green-200 dark:border-green-800 shadow-sm">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Detalhamento das Receitas:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                  <div className="flex items-center">
                    <span className="text-muted-foreground">Taxa por Entrega:</span>
                    <span className="font-bold text-green-600 ml-2">+R$ {totalPlatformCommission.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground">Comissões das Lojas:</span>
                    <span className="font-bold text-green-600 ml-2">+R$ {totalStoreCommissions.toFixed(2).replace(".", ",")}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-muted-foreground">Mensalidades:</span>
                    <span className="font-bold text-green-600 ml-2">+R$ 1.200,00</span>
                  </div>
                </div>
              </div>
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
                <Truck className="w-5 h-5 text-blue-600" />
                <span>Pagamentos aos Entregadores</span>
                <Badge variant="outline" className="text-blue-600 border-blue-600">R$ 3,50/entrega</Badge>
              </CardTitle>
              <CardDescription>
                Cliente paga R$ 4,50 • Entregador recebe R$ 3,50 • Você recebe R$ 1,00 automaticamente
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
                    Comissões das Lojas:
                  </span>
                  <span className="font-bold text-green-600">+R$ {totalStoreCommissions.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Taxa por Entrega:
                  </span>
                  <span className="font-bold text-green-600">+R$ {totalPlatformCommission.toFixed(2).replace(".", ",")}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Mensalidades:
                  </span>
                  <span className="font-bold text-green-600">+R$ 1.200,00</span>
                </div>
                <div className="flex justify-between border-t pt-2">
                  <span className="text-sm font-medium">RECEITA TOTAL:</span>
                  <span className="font-bold text-lg text-green-600">R$ {(totalStoreCommissions + totalPlatformCommission + 1200).toFixed(2).replace(".", ",")}</span>
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
                <Button className="w-full" variant="outline" onClick={handleProcessPayments}>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Processar Pagamentos
                </Button>
                <Button className="w-full" variant="outline" onClick={handleGenerateReport}>
                  <Download className="w-4 h-4 mr-2" />
                  Relatório de Comissões
                </Button>
                <Button className="w-full" variant="outline" onClick={handleConfigureRates}>
                  <Settings className="w-4 h-4 mr-2" />
                  Configurar Taxas
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
              Escolha o período para visualizar as comissões
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-2 mt-4">
            <Button
              variant={selectedPeriod === "Janeiro 2024" ? "default" : "outline"}
              className="justify-start"
              onClick={() => handlePeriodSelect("Janeiro 2024")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Janeiro 2024
            </Button>
            <Button
              variant={selectedPeriod === "Fevereiro 2024" ? "default" : "outline"}
              className="justify-start"
              onClick={() => handlePeriodSelect("Fevereiro 2024")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Fevereiro 2024
            </Button>
            <Button
              variant={selectedPeriod === "Março 2024" ? "default" : "outline"}
              className="justify-start"
              onClick={() => handlePeriodSelect("Março 2024")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Março 2024
            </Button>
            <Button
              variant={selectedPeriod === "Abril 2024" ? "default" : "outline"}
              className="justify-start"
              onClick={() => handlePeriodSelect("Abril 2024")}
            >
              <Calendar className="w-4 h-4 mr-2" />
              Abril 2024
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
              <span>Exportar Dados de Comissões</span>
            </DialogTitle>
            <DialogDescription>
              Escolha o formato para exportar os dados de comissões do período: {selectedPeriod}
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

      {/* Modal de Processamento de Pagamentos */}
      <Dialog open={processPaymentModalOpen} onOpenChange={setProcessPaymentModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Processar Pagamentos</span>
            </DialogTitle>
            <DialogDescription>
              Gerencie pagamentos que você deve fazer e recebimentos pendentes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            {/* Pagamentos aos Entregadores (VOCÊ PAGA) */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center">
                <Truck className="w-4 h-4 mr-2 text-red-600" />
                Pagamentos aos Entregadores (Você Paga)
              </h4>
              <div className="space-y-3">
                {deliveryCommissions.filter(item => item.status === "Pendente").map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <div>
                        <p className="font-medium">{item.driver}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.deliveries} entregas × R$ 3,50 = {item.totalCommission}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-red-100 text-red-800">Pagar</Badge>
                  </div>
                ))}
              </div>
            </div>

            {/* Recebimentos das Lojas (VOCÊ RECEBE) */}
            <div className="border rounded-lg p-4">
              <h4 className="font-semibold mb-3 flex items-center">
                <Store className="w-4 h-4 mr-2 text-green-600" />
                Recebimentos das Lojas (Você Recebe)
              </h4>
              <div className="space-y-3">
                {commissionData.filter(item => item.status === "Pendente").map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <div>
                        <p className="font-medium">{item.store}</p>
                        <p className="text-sm text-muted-foreground">
                          Comissão {item.commissionRate}: {item.commissionAmount}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">Receber</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setProcessPaymentModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={processSelectedPayments}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Processar Selecionados
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Relatório */}
      <Dialog open={reportModalOpen} onOpenChange={setReportModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Relatório de Comissões</span>
            </DialogTitle>
            <DialogDescription>
              Relatório detalhado das comissões no período: {selectedPeriod}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Resumo Executivo */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resumo Executivo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Suas Receitas */}
                <div>
                  <h4 className="font-semibold text-green-700 mb-3 flex items-center">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Suas Receitas (Você Recebe)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                      <Label className="text-sm font-medium text-green-700">Taxa por Entrega</Label>
                      <p className="text-xl font-bold text-green-600">R$ {totalPlatformCommission.toFixed(2).replace(".", ",")}</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                      <Label className="text-sm font-medium text-green-700">Comissões das Lojas</Label>
                      <p className="text-xl font-bold text-green-600">R$ {totalStoreCommissions.toFixed(2).replace(".", ",")}</p>
                    </div>
                    <div className="p-3 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                      <Label className="text-sm font-medium text-green-700">Mensalidades</Label>
                      <p className="text-xl font-bold text-green-600">R$ 1.200,00</p>
                    </div>
                  </div>
                  <div className="mt-3 p-3 bg-green-100 dark:bg-green-900 rounded-lg border-2 border-green-300 dark:border-green-700">
                    <Label className="text-sm font-medium text-green-800">RECEITA TOTAL</Label>
                    <p className="text-2xl font-bold text-green-700">R$ {(totalPlatformCommission + totalStoreCommissions + 1200).toFixed(2).replace(".", ",")}</p>
                  </div>
                </div>

                {/* Seus Pagamentos */}
                <div>
                  <h4 className="font-semibold text-red-700 mb-3 flex items-center">
                    <Truck className="w-4 h-4 mr-2" />
                    Seus Pagamentos (Você Paga)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                      <Label className="text-sm font-medium text-red-700">Pagamentos aos Entregadores</Label>
                      <p className="text-xl font-bold text-red-600">R$ {totalDeliveryCommissions.toFixed(2).replace(".", ",")}</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                      <Label className="text-sm font-medium text-blue-700">LUCRO LÍQUIDO</Label>
                      <p className="text-xl font-bold text-blue-600">R$ {(totalPlatformCommission + totalStoreCommissions + 1200 - totalDeliveryCommissions).toFixed(2).replace(".", ",")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detalhamento por Loja */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Comissões por Loja</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {commissionData.map((commission, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Store className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium">{commission.store}</p>
                          <p className="text-sm text-muted-foreground">{commission.owner}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-blue-600">{commission.commissionAmount}</p>
                        <p className="text-sm text-muted-foreground">{commission.commissionRate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Detalhamento por Entregador */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pagamentos aos Entregadores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {deliveryCommissions.map((commission, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Truck className="w-5 h-5 text-orange-600" />
                        <div>
                          <p className="font-medium">{commission.driver}</p>
                          <p className="text-sm text-muted-foreground">{commission.deliveries} entregas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-600">{commission.totalCommission}</p>
                        <p className="text-sm text-muted-foreground">{commission.commissionRate}/entrega</p>
                      </div>
                    </div>
                  ))}
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
                Fechar Relatório
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Configuração de Taxas */}
      <Dialog open={configRatesModalOpen} onOpenChange={setConfigRatesModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Configurar Taxas de Comissão</span>
            </DialogTitle>
            <DialogDescription>
              Configure as taxas de comissão por categoria de estabelecimento
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="padaria">Padaria</Label>
                <div className="flex items-center space-x-2">
                  <Input id="padaria" type="number" defaultValue="8" className="w-20" />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="supermercado">Supermercado</Label>
                <div className="flex items-center space-x-2">
                  <Input id="supermercado" type="number" defaultValue="6" className="w-20" />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmacia">Farmácia</Label>
                <div className="flex items-center space-x-2">
                  <Input id="farmacia" type="number" defaultValue="10" className="w-20" />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="restaurante">Restaurante</Label>
                <div className="flex items-center space-x-2">
                  <Input id="restaurante" type="number" defaultValue="12" className="w-20" />
                  <span className="text-sm text-muted-foreground">%</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="entregador">Taxa por Entrega (Entregadores)</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">R$</span>
                  <Input id="entregador" type="number" step="0.50" defaultValue="3.50" className="w-20" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="plataforma">Comissão da Plataforma (por entrega)</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm">R$</span>
                  <Input id="plataforma" type="number" step="0.10" defaultValue="1.00" className="w-20" />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setConfigRatesModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                alert('Configurações salvas com sucesso!')
                setConfigRatesModalOpen(false)
              }}>
                <Settings className="w-4 h-4 mr-2" />
                Salvar Configurações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}