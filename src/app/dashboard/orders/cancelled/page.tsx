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
  XCircle, 
  Eye,
  User,
  Store,
  Search,
  Filter,
  Calendar,
  AlertTriangle,
  TrendingDown,
  Clock,
  DollarSign,
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  Package,
  BarChart3,
  FileText,
  TrendingUp
} from "lucide-react"
import { Label } from "@/components/ui/label"

export default function CancelledOrdersPage() {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())
  const [selectedPeriod, setSelectedPeriod] = useState("Últimos 7 dias")
  const [periodModalOpen, setPeriodModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [orderModalOpen, setOrderModalOpen] = useState(false)
  const [analysisModalOpen, setAnalysisModalOpen] = useState(false)

  const toggleOrderExpansion = (orderId: string) => {
    const newExpanded = new Set(expandedOrders)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrders(newExpanded)
  }

  const handlePeriodChange = () => {
    setPeriodModalOpen(true)
  }

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period)
    setPeriodModalOpen(false)
    
    // Simular filtro por período
    console.log(`Período selecionado: ${period}`)
    // Aqui você implementaria a lógica para filtrar os dados por período
  }

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
    setOrderModalOpen(true)
  }

  const handleAnalyzeCause = (order: any) => {
    setSelectedOrder(order)
    setAnalysisModalOpen(true)
  }
  const cancelledOrders = [
    { 
      id: "#1240", 
      customer: "João Silva", 
      store: "Padaria Central", 
      value: "R$ 25,90", 
      cancelledAt: "2024-04-15 15:45",
      reason: "Cliente cancelou",
      reasonDetail: "Mudou de ideia sobre o pedido",
      cancelledBy: "Cliente",
      timeBeforeCancel: "5 min",
      items: ["Pão francês (2kg)", "Leite integral (1L)"],
      refundStatus: "Processado",
      refundAmount: "R$ 25,90"
    },
    { 
      id: "#1239", 
      customer: "Maria Santos", 
      store: "Farmácia Saúde", 
      value: "R$ 45,50", 
      cancelledAt: "2024-04-15 14:20",
      reason: "Produto indisponível",
      reasonDetail: "Medicamento em falta no estoque",
      cancelledBy: "Loja",
      timeBeforeCancel: "15 min",
      items: ["Dipirona (1 caixa)", "Vitamina C (60 caps)"],
      refundStatus: "Processado",
      refundAmount: "R$ 45,50"
    },
    { 
      id: "#1238", 
      customer: "Pedro Costa", 
      store: "Mercado Bom Preço", 
      value: "R$ 78,30", 
      cancelledAt: "2024-04-15 13:10",
      reason: "Entregador indisponível",
      reasonDetail: "Nenhum entregador disponível na região",
      cancelledBy: "Sistema",
      timeBeforeCancel: "45 min",
      items: ["Arroz (5kg)", "Feijão (2kg)", "Óleo de soja"],
      refundStatus: "Processado",
      refundAmount: "R$ 78,30"
    },
    { 
      id: "#1237", 
      customer: "Ana Oliveira", 
      store: "Lanchonete do Bairro", 
      value: "R$ 32,00", 
      cancelledAt: "2024-04-14 19:30",
      reason: "Loja fechada",
      reasonDetail: "Estabelecimento fechou mais cedo",
      cancelledBy: "Sistema",
      timeBeforeCancel: "20 min",
      items: ["X-Burger", "Batata frita", "Refrigerante"],
      refundStatus: "Processado",
      refundAmount: "R$ 32,00"
    },
    { 
      id: "#1236", 
      customer: "Carlos Lima", 
      store: "Pizzaria Italiana", 
      value: "R$ 67,80", 
      cancelledAt: "2024-04-14 18:15",
      reason: "Problema no pagamento",
      reasonDetail: "Cartão de crédito recusado",
      cancelledBy: "Sistema",
      timeBeforeCancel: "2 min",
      items: ["Pizza Margherita G", "Pizza Calabresa M"],
      refundStatus: "N/A",
      refundAmount: "R$ 0,00"
    },
    { 
      id: "#1235", 
      customer: "Lucia Ferreira", 
      store: "Pet Shop Amigo", 
      value: "R$ 89,90", 
      cancelledAt: "2024-04-14 16:45",
      reason: "Cliente cancelou",
      reasonDetail: "Endereço de entrega incorreto",
      cancelledBy: "Cliente",
      timeBeforeCancel: "30 min",
      items: ["Ração Premium (3kg)", "Brinquedo para cães"],
      refundStatus: "Processado",
      refundAmount: "R$ 89,90"
    }
  ]

  const getCancelReasonBadge = (reason: string) => {
    switch (reason) {
      case "Cliente cancelou":
        return <Badge variant="secondary">Cliente</Badge>
      case "Produto indisponível":
        return <Badge variant="destructive">Produto</Badge>
      case "Entregador indisponível":
        return <Badge variant="outline">Entregador</Badge>
      case "Loja fechada":
        return <Badge variant="destructive">Loja</Badge>
      case "Problema no pagamento":
        return <Badge variant="secondary">Pagamento</Badge>
      default:
        return <Badge variant="outline">{reason}</Badge>
    }
  }

  const getRefundBadge = (status: string) => {
    switch (status) {
      case "Processado":
        return <Badge variant="default" className="bg-green-500">Processado</Badge>
      case "Pendente":
        return <Badge variant="secondary">Pendente</Badge>
      case "N/A":
        return <Badge variant="outline">N/A</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const totalCancelledValue = cancelledOrders.reduce((acc, order) => 
    acc + parseFloat(order.value.replace("R$ ", "").replace(",", ".")), 0
  )

  const totalRefunded = cancelledOrders.reduce((acc, order) => 
    acc + parseFloat(order.refundAmount.replace("R$ ", "").replace(",", ".")), 0
  )

  const clientCancellations = cancelledOrders.filter(order => order.cancelledBy === "Cliente").length
  const storeCancellations = cancelledOrders.filter(order => order.cancelledBy === "Loja").length
  const systemCancellations = cancelledOrders.filter(order => order.cancelledBy === "Sistema").length

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
                  <BreadcrumbLink href="/dashboard/orders">
                    Pedidos
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Cancelados</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Pedidos Cancelados</h1>
              <p className="text-muted-foreground">
                Analise os pedidos cancelados e identifique oportunidades de melhoria
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar cancelamentos..." className="pl-8 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" onClick={handlePeriodChange}>
                <Calendar className="w-4 h-4 mr-2" />
                {selectedPeriod}
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Cancelados</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cancelledOrders.length}</div>
                <p className="text-xs text-muted-foreground">
                  últimos 7 dias
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Valor Perdido</CardTitle>
                <TrendingDown className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalCancelledValue.toFixed(2).replace(".", ",")}</div>
                <p className="text-xs text-muted-foreground">
                  receita não realizada
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reembolsos</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalRefunded.toFixed(2).replace(".", ",")}</div>
                <p className="text-xs text-muted-foreground">
                  valor reembolsado
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Cancelamento</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3.2%</div>
                <p className="text-xs text-muted-foreground">
                  do total de pedidos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Analysis Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Motivos de Cancelamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Cliente cancelou:</span>
                  <span className="font-bold">{clientCancellations}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Problemas da loja:</span>
                  <span className="font-bold">{storeCancellations}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Problemas do sistema:</span>
                  <span className="font-bold">{systemCancellations}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tempo Médio até Cancelamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">0-10 min:</span>
                  <span className="font-bold">2 pedidos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">10-30 min:</span>
                  <span className="font-bold">3 pedidos</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">30+ min:</span>
                  <span className="font-bold">1 pedido</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status dos Reembolsos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Processados:</span>
                  <span className="font-bold text-green-600">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pendentes:</span>
                  <span className="font-bold text-yellow-600">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Não aplicável:</span>
                  <span className="font-bold text-gray-600">1</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Cancelled Orders List */}
          <div className="space-y-3">
            {cancelledOrders.map((order) => {
              const isExpanded = expandedOrders.has(order.id)
              
              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Compact Header - Always Visible */}
                    <div 
                      className="bg-gray-50/50 dark:bg-gray-900/50 p-4 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors border-l-4 border-red-300 dark:border-red-600"
                      onClick={() => toggleOrderExpansion(order.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700">
                            <XCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-lg">{order.id}</span>
                              <Badge variant="secondary" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">Cancelado</Badge>
                              <Badge variant="outline" className="text-xs">{order.reason}</Badge>
                            </div>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center">
                                <User className="w-3 h-3 mr-1" />
                                {order.customer}
                              </span>
                              <span className="flex items-center">
                                <Store className="w-3 h-3 mr-1" />
                                {order.store}
                              </span>
                              <span className="flex items-center">
                                <Clock className="w-3 h-3 mr-1" />
                                {order.timeBeforeCancel}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-bold text-xl text-gray-900 dark:text-gray-100">{order.value}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.cancelledAt).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                          <Button variant="ghost" size="sm" className="p-2">
                            {isExpanded ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded Content - Only Visible When Expanded */}
                    {isExpanded && (
                      <div className="p-6 border-t bg-white dark:bg-gray-950">
                        {/* People Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-200">Cliente</h4>
                              <p className="text-sm font-medium">{order.customer}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                              <Store className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-200">Loja</h4>
                              <p className="text-sm font-medium">{order.store}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                              <AlertTriangle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-200">Cancelado por</h4>
                              <p className="text-sm font-medium">{order.cancelledBy}</p>
                            </div>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          {/* Cancellation Reason Section */}
                          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <AlertTriangle className="w-4 h-4 mr-2" />
                              Motivo do Cancelamento
                            </h4>
                            <div className="space-y-3">
                              <div className="bg-white dark:bg-gray-800 rounded p-3">
                                <p className="font-medium text-gray-900 dark:text-gray-100">{order.reason}</p>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{order.reasonDetail}</p>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">Tempo até cancelamento:</span>
                                <span className="font-medium text-gray-900 dark:text-gray-100">{order.timeBeforeCancel}</span>
                              </div>
                            </div>
                          </div>

                          {/* Items Section */}
                          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <ShoppingBag className="w-4 h-4 mr-2" />
                              Itens do Pedido ({order.items.length})
                            </h4>
                            <div className="space-y-2">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center space-x-2 p-2 bg-white dark:bg-gray-800 rounded">
                                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Refund Section */}
                        <div className="mt-6 bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <DollarSign className="w-4 h-4 mr-2" />
                            Informações de Reembolso
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Status</p>
                              {getRefundBadge(order.refundStatus)}
                            </div>
                            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Valor do Reembolso</p>
                              <p className="font-semibold text-gray-900 dark:text-gray-100">{order.refundAmount}</p>
                            </div>
                            <div className="text-center p-3 bg-white dark:bg-gray-800 rounded-lg">
                              <p className="text-xs text-muted-foreground mb-1">Valor Original</p>
                              <p className="font-semibold text-gray-900 dark:text-gray-100">{order.value}</p>
                            </div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <XCircle className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                            <p className="text-xs text-muted-foreground">Status</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">Cancelado</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                            <p className="text-xs text-muted-foreground">Tempo</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{order.timeBeforeCancel}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <AlertTriangle className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                            <p className="text-xs text-muted-foreground">Cancelado por</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{order.cancelledBy}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <DollarSign className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                            <p className="text-xs text-muted-foreground">Reembolso</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{order.refundStatus}</p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="mt-6 flex justify-end space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(order)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            Ver Detalhes
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAnalyzeCause(order)}
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Analisar Causa
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
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
              Escolha o período para visualizar os pedidos cancelados
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
        </DialogContent>
      </Dialog>

      {/* Modal de Detalhes do Pedido Cancelado */}
      <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Detalhes do Pedido {selectedOrder?.id}</span>
            </DialogTitle>
            <DialogDescription>
              Informações completas do pedido cancelado
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              {/* Status e Informações Básicas */}
              <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center space-x-3">
                  <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                  <div>
                    <p className="font-medium text-red-800 dark:text-red-200">Pedido Cancelado</p>
                    <p className="text-sm text-red-600 dark:text-red-400">
                      Cancelado em {new Date(selectedOrder.cancelledAt).toLocaleDateString('pt-BR')} às {new Date(selectedOrder.cancelledAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-red-800 dark:text-red-200">{selectedOrder.value}</p>
                  <p className="text-sm text-red-600 dark:text-red-400">Cancelado por: {selectedOrder.cancelledBy}</p>
                </div>
              </div>

              {/* Motivo do Cancelamento */}
              <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-orange-800 dark:text-orange-200 flex items-center">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Motivo do Cancelamento
                  </h3>
                  <Badge variant="outline" className="text-orange-700 border-orange-300">
                    {selectedOrder.timeBeforeCancel}
                  </Badge>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded p-3 border">
                  <p className="font-medium text-gray-900 dark:text-gray-100">{selectedOrder.reason}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{selectedOrder.reasonDetail}</p>
                </div>
              </div>

              {/* Informações das Pessoas */}
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <User className="w-4 h-4" />
                      <span>Cliente</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Nome</Label>
                      <p className="text-sm">{selectedOrder.customer}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <Store className="w-4 h-4" />
                      <span>Loja</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Nome</Label>
                      <p className="text-sm">{selectedOrder.store}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span>Cancelamento</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Cancelado por</Label>
                      <p className="text-sm">{selectedOrder.cancelledBy}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Tempo até cancelamento</Label>
                      <p className="text-sm">{selectedOrder.timeBeforeCancel}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Itens do Pedido */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <ShoppingBag className="w-4 h-4" />
                    <span>Itens do Pedido ({selectedOrder.items.length})</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Package className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{item}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Informações de Reembolso */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <DollarSign className="w-4 h-4" />
                    <span>Informações de Reembolso</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Status do Reembolso</p>
                      {getRefundBadge(selectedOrder.refundStatus)}
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Valor Reembolsado</p>
                      <p className="font-semibold">{selectedOrder.refundAmount}</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Valor Original</p>
                      <p className="font-semibold">{selectedOrder.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline do Cancelamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Timeline do Pedido</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Pedido realizado</p>
                        <p className="text-xs text-muted-foreground">Cliente fez o pedido</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-red-600">Pedido cancelado</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedOrder.reason} - {selectedOrder.reasonDetail}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cancelado em {new Date(selectedOrder.cancelledAt).toLocaleString('pt-BR')}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Botões de Ação */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => handleAnalyzeCause(selectedOrder)}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analisar Causa
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Análise de Causa */}
      <Dialog open={analysisModalOpen} onOpenChange={setAnalysisModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Análise de Causa - Pedido {selectedOrder?.id}</span>
            </DialogTitle>
            <DialogDescription>
              Análise detalhada do cancelamento e recomendações para prevenção
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              {/* Resumo do Cancelamento */}
              <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                <h3 className="font-semibold text-red-800 dark:text-red-200 mb-3 flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Resumo do Cancelamento
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400">Motivo:</p>
                    <p className="font-medium text-red-800 dark:text-red-200">{selectedOrder.reason}</p>
                  </div>
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400">Tempo até cancelamento:</p>
                    <p className="font-medium text-red-800 dark:text-red-200">{selectedOrder.timeBeforeCancel}</p>
                  </div>
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400">Cancelado por:</p>
                    <p className="font-medium text-red-800 dark:text-red-200">{selectedOrder.cancelledBy}</p>
                  </div>
                  <div>
                    <p className="text-sm text-red-600 dark:text-red-400">Valor perdido:</p>
                    <p className="font-medium text-red-800 dark:text-red-200">{selectedOrder.value}</p>
                  </div>
                </div>
              </div>

              {/* Análise por Categoria */}
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <TrendingDown className="w-4 h-4" />
                      <span>Impacto do Cancelamento</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Receita perdida:</span>
                      <span className="font-bold text-red-600">{selectedOrder.value}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Reembolso processado:</span>
                      <span className="font-bold">{selectedOrder.refundAmount}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Tempo investido:</span>
                      <span className="font-bold">{selectedOrder.timeBeforeCancel}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center space-x-2">
                      <FileText className="w-4 h-4" />
                      <span>Categoria do Problema</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">{selectedOrder.reason}</p>
                      <p className="text-sm text-muted-foreground mt-1">{selectedOrder.reasonDetail}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Responsabilidade:</span>
                      <Badge variant={selectedOrder.cancelledBy === "Cliente" ? "secondary" : "destructive"}>
                        {selectedOrder.cancelledBy}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recomendações */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>Recomendações para Prevenção</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.reason === "Cliente cancelou" && (
                      <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Ações Recomendadas:</h4>
                        <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                          <li>• Implementar confirmação dupla para pedidos</li>
                          <li>• Melhorar descrição dos produtos</li>
                          <li>• Oferecer chat de suporte durante o pedido</li>
                          <li>• Implementar política de cancelamento mais restritiva</li>
                        </ul>
                      </div>
                    )}
                    
                    {selectedOrder.reason === "Produto indisponível" && (
                      <div className="p-4 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800">
                        <h4 className="font-semibold text-orange-800 dark:text-orange-200 mb-2">Ações Recomendadas:</h4>
                        <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-300">
                          <li>• Melhorar controle de estoque em tempo real</li>
                          <li>• Implementar notificações automáticas de estoque baixo</li>
                          <li>• Treinar lojistas sobre gestão de inventário</li>
                          <li>• Criar sistema de produtos alternativos</li>
                        </ul>
                      </div>
                    )}
                    
                    {selectedOrder.reason === "Entregador indisponível" && (
                      <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Ações Recomendadas:</h4>
                        <ul className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                          <li>• Expandir rede de entregadores na região</li>
                          <li>• Implementar sistema de reserva de entregadores</li>
                          <li>• Melhorar algoritmo de distribuição de pedidos</li>
                          <li>• Oferecer incentivos para entregadores em horários de pico</li>
                        </ul>
                      </div>
                    )}

                    {selectedOrder.reason === "Loja fechada" && (
                      <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg border border-red-200 dark:border-red-800">
                        <h4 className="font-semibold text-red-800 dark:text-red-200 mb-2">Ações Recomendadas:</h4>
                        <ul className="space-y-1 text-sm text-red-700 dark:text-red-300">
                          <li>• Implementar sistema de horário de funcionamento em tempo real</li>
                          <li>• Criar notificações automáticas de fechamento</li>
                          <li>• Melhorar comunicação com lojistas sobre horários</li>
                          <li>• Implementar penalidades por fechamento não comunicado</li>
                        </ul>
                      </div>
                    )}

                    {selectedOrder.reason === "Problema no pagamento" && (
                      <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">Ações Recomendadas:</h4>
                        <ul className="space-y-1 text-sm text-yellow-700 dark:text-yellow-300">
                          <li>• Implementar múltiplas opções de pagamento</li>
                          <li>• Melhorar validação de cartões antes da confirmação</li>
                          <li>• Oferecer pagamento na entrega como alternativa</li>
                          <li>• Implementar sistema de retry automático para pagamentos</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Métricas Comparativas */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <BarChart3 className="w-4 h-4" />
                    <span>Contexto e Comparações</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Taxa de Cancelamento</p>
                      <p className="font-semibold">3.2%</p>
                      <p className="text-xs text-green-600">↓ 0.5% vs mês anterior</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Tempo Médio até Cancelamento</p>
                      <p className="font-semibold">22 min</p>
                      <p className="text-xs text-red-600">↑ 3 min vs média</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Valor Médio Cancelado</p>
                      <p className="font-semibold">R$ 48,90</p>
                      <p className="text-xs text-muted-foreground">Média geral</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}