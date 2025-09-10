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
  ShoppingBag, 
  CheckCircle, 
  Eye,
  MapPin,
  User,
  Store,
  Search,
  Filter,
  Calendar,
  Star,
  Clock,
  Download,
  Truck,
  ChevronDown,
  ChevronUp,
  Package,
  Phone
} from "lucide-react"
import { Label } from "@/components/ui/label"

export default function OrderHistoryPage() {
  const [expandedOrders, setExpandedOrders] = useState<Set<string>>(new Set())
  const [selectedPeriod, setSelectedPeriod] = useState("Últimos 7 dias")
  const [periodModalOpen, setPeriodModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [orderModalOpen, setOrderModalOpen] = useState(false)

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

  const handleExport = () => {
    // Simular exportação de dados
    const csvContent = [
      "ID,Cliente,Loja,Valor,Data,Tempo de Entrega,Avaliação",
      ...completedOrders.map(order => 
        `${order.id},"${order.customer}","${order.store}","${order.value}","${order.completedAt}","${order.deliveryTime}",${order.rating}`
      )
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `historico-pedidos-${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
    setOrderModalOpen(true)
  }

  const handleDownloadReceipt = (order: any) => {
    // Simular download do comprovante
    const receiptContent = `
COMPROVANTE DE ENTREGA
Market Braz

Pedido: ${order.id}
Cliente: ${order.customer}
Loja: ${order.store}
Valor: ${order.value}
Data: ${new Date(order.completedAt).toLocaleString('pt-BR')}
Tempo de Entrega: ${order.deliveryTime}
Entregador: ${order.driver}
Avaliação: ${order.rating}/5 estrelas

Itens:
${order.items.map((item: string) => `- ${item}`).join('\n')}

Feedback: "${order.feedback}"

Obrigado por usar o Market Braz!
    `.trim()
    
    const blob = new Blob([receiptContent], { type: 'text/plain;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `comprovante-${order.id.replace('#', '')}.txt`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const completedOrders = [
    { 
      id: "#1220", 
      customer: "João Silva", 
      store: "Padaria Central", 
      value: "R$ 25,90", 
      completedAt: "2024-04-15 14:32",
      deliveryTime: "18 min",
      driver: "Roberto Silva",
      rating: 5,
      feedback: "Entrega rápida e produto fresco!",
      items: ["Pão francês (2kg)", "Leite integral (1L)"],
      distance: "2.1 km"
    },
    { 
      id: "#1219", 
      customer: "Maria Santos", 
      store: "Farmácia Saúde", 
      value: "R$ 45,50", 
      completedAt: "2024-04-15 13:45",
      deliveryTime: "22 min",
      driver: "Marcos Pereira",
      rating: 4,
      feedback: "Tudo certo, obrigada!",
      items: ["Dipirona (1 caixa)", "Vitamina C (60 caps)"],
      distance: "1.8 km"
    },
    { 
      id: "#1218", 
      customer: "Pedro Costa", 
      store: "Mercado Bom Preço", 
      value: "R$ 78,30", 
      completedAt: "2024-04-15 12:15",
      deliveryTime: "35 min",
      driver: "Lucas Ferreira",
      rating: 5,
      feedback: "Excelente serviço, produtos bem embalados.",
      items: ["Arroz (5kg)", "Feijão (2kg)", "Óleo de soja"],
      distance: "3.5 km"
    },
    { 
      id: "#1217", 
      customer: "Ana Oliveira", 
      store: "Lanchonete do Bairro", 
      value: "R$ 32,00", 
      completedAt: "2024-04-15 11:30",
      deliveryTime: "25 min",
      driver: "Carlos Oliveira",
      rating: 4,
      feedback: "Lanche chegou quentinho!",
      items: ["X-Burger", "Batata frita", "Refrigerante"],
      distance: "1.2 km"
    },
    { 
      id: "#1216", 
      customer: "Carlos Lima", 
      store: "Pizzaria Italiana", 
      value: "R$ 67,80", 
      completedAt: "2024-04-14 20:45",
      deliveryTime: "40 min",
      driver: "Ana Lima",
      rating: 5,
      feedback: "Pizza deliciosa e entrega pontual!",
      items: ["Pizza Margherita G", "Pizza Calabresa M"],
      distance: "4.2 km"
    },
    { 
      id: "#1215", 
      customer: "Lucia Ferreira", 
      store: "Pet Shop Amigo", 
      value: "R$ 89,90", 
      completedAt: "2024-04-14 16:20",
      deliveryTime: "28 min",
      driver: "José Santos",
      rating: 3,
      feedback: "Demorou um pouco, mas chegou bem.",
      items: ["Ração Premium (3kg)", "Brinquedo para cães"],
      distance: "2.8 km"
    },
    { 
      id: "#1214", 
      customer: "Roberto Alves", 
      store: "Açaí da Praia", 
      value: "R$ 24,50", 
      completedAt: "2024-04-14 15:10",
      deliveryTime: "15 min",
      driver: "Roberto Silva",
      rating: 5,
      feedback: "Açaí chegou geladinho, perfeito!",
      items: ["Açaí 500ml", "Granola", "Leite condensado"],
      distance: "0.8 km"
    },
    { 
      id: "#1213", 
      customer: "Fernanda Costa", 
      store: "Padaria Central", 
      value: "R$ 18,70", 
      completedAt: "2024-04-14 08:30",
      deliveryTime: "12 min",
      driver: "Marcos Pereira",
      rating: 4,
      feedback: "Pães fresquinhos, como sempre!",
      items: ["Pão francês (1kg)", "Café (250g)"],
      distance: "1.5 km"
    }
  ]

  const getRatingStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`w-3 h-3 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  const totalRevenue = completedOrders.reduce((acc, order) => 
    acc + parseFloat(order.value.replace("R$ ", "").replace(",", ".")), 0
  )

  const averageRating = completedOrders.reduce((acc, order) => acc + order.rating, 0) / completedOrders.length

  const averageDeliveryTime = Math.round(
    completedOrders.reduce((acc, order) => acc + parseInt(order.deliveryTime), 0) / completedOrders.length
  )

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
                  <BreadcrumbPage>Histórico</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Histórico de Pedidos</h1>
              <p className="text-muted-foreground">
                Visualize todos os pedidos que foram entregues com sucesso
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar no histórico..." className="pl-8 w-64" />
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
                <CardTitle className="text-sm font-medium">Pedidos Entregues</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedOrders.length}</div>
                <p className="text-xs text-muted-foreground">
                  últimos 7 dias
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ {totalRevenue.toFixed(2).replace(".", ",")}</div>
                <p className="text-xs text-muted-foreground">
                  pedidos concluídos
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
                <p className="text-xs text-muted-foreground">
                  satisfação dos clientes
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageDeliveryTime} min</div>
                <p className="text-xs text-muted-foreground">
                  tempo de entrega
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Completed Orders List */}
          <div className="space-y-3">
            {completedOrders.map((order) => {
              const isExpanded = expandedOrders.has(order.id)
              
              return (
                <Card key={order.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    {/* Compact Header - Always Visible */}
                    <div 
                      className="bg-gray-50/50 dark:bg-gray-900/50 p-4 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors border-l-4 border-gray-300 dark:border-gray-600"
                      onClick={() => toggleOrderExpansion(order.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700">
                            <CheckCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-3">
                              <span className="font-bold text-lg">{order.id}</span>
                              <Badge variant="secondary" className="bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300">Entregue</Badge>
                              <div className="flex items-center space-x-1">
                                {getRatingStars(order.rating)}
                              </div>
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
                                {order.deliveryTime}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-bold text-xl text-gray-900 dark:text-gray-100">{order.value}</p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(order.completedAt).toLocaleDateString('pt-BR')}
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
                              <Truck className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-200">Entregador</h4>
                              <p className="text-sm font-medium">{order.driver}</p>
                            </div>
                          </div>
                        </div>

                        {/* Content Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

                          {/* Rating Section */}
                          <div className="bg-yellow-50 dark:bg-yellow-950 rounded-lg p-4">
                            <h4 className="font-semibold mb-3 flex items-center">
                              <Star className="w-4 h-4 mr-2 text-yellow-600 dark:text-yellow-400" />
                              Avaliação do Cliente
                            </h4>
                            <div className="space-y-3">
                              <div className="flex items-center space-x-3">
                                <div className="flex items-center space-x-1">
                                  {getRatingStars(order.rating)}
                                </div>
                                <span className="text-lg font-bold text-yellow-700 dark:text-yellow-300">{order.rating}/5</span>
                              </div>
                              {order.feedback && (
                                <div className="bg-white dark:bg-gray-800 rounded p-3">
                                  <p className="text-sm italic text-gray-700 dark:text-gray-300">&ldquo;{order.feedback}&rdquo;</p>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Performance Metrics */}
                        <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <MapPin className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                            <p className="text-xs text-muted-foreground">Distância</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{order.distance}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <Clock className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                            <p className="text-xs text-muted-foreground">Tempo</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{order.deliveryTime}</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <Star className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                            <p className="text-xs text-muted-foreground">Avaliação</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{order.rating}/5</p>
                          </div>
                          <div className="text-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                            <CheckCircle className="w-5 h-5 mx-auto mb-1 text-gray-600 dark:text-gray-400" />
                            <p className="text-xs text-muted-foreground">Status</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">Concluído</p>
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
                            onClick={() => handleDownloadReceipt(order)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Baixar Comprovante
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
              Escolha o período para visualizar o histórico de pedidos
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

      {/* Modal de Detalhes do Pedido */}
      <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Detalhes do Pedido {selectedOrder?.id}</span>
            </DialogTitle>
            <DialogDescription>
              Informações completas do pedido entregue
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              {/* Status e Informações Básicas */}
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-950 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">Pedido Entregue</p>
                    <p className="text-sm text-green-600 dark:text-green-400">
                      Entregue em {new Date(selectedOrder.completedAt).toLocaleDateString('pt-BR')} às {new Date(selectedOrder.completedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-800 dark:text-green-200">{selectedOrder.value}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">Tempo: {selectedOrder.deliveryTime}</p>
                </div>
              </div>

              {/* Avaliação do Cliente */}
              <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-yellow-800 dark:text-yellow-200 flex items-center">
                    <Star className="w-4 h-4 mr-2" />
                    Avaliação do Cliente
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      {getRatingStars(selectedOrder.rating)}
                    </div>
                    <span className="font-bold text-yellow-700 dark:text-yellow-300">{selectedOrder.rating}/5</span>
                  </div>
                </div>
                {selectedOrder.feedback && (
                  <div className="bg-white dark:bg-gray-800 rounded p-3 border">
                    <p className="text-sm italic text-gray-700 dark:text-gray-300">&ldquo;{selectedOrder.feedback}&rdquo;</p>
                  </div>
                )}
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
                      <Truck className="w-4 h-4" />
                      <span>Entregador</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <Label className="text-sm font-medium">Nome</Label>
                      <p className="text-sm">{selectedOrder.driver}</p>
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

              {/* Métricas de Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Métricas da Entrega</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <MapPin className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Distância</p>
                      <p className="font-semibold">{selectedOrder.distance}</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <Clock className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Tempo</p>
                      <p className="font-semibold">{selectedOrder.deliveryTime}</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <Star className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Avaliação</p>
                      <p className="font-semibold">{selectedOrder.rating}/5</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline da Entrega */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Timeline da Entrega</span>
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
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Pedido confirmado</p>
                        <p className="text-xs text-muted-foreground">Loja confirmou o pedido</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Preparando pedido</p>
                        <p className="text-xs text-muted-foreground">Loja preparou os itens</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Saiu para entrega</p>
                        <p className="text-xs text-muted-foreground">Entregador: {selectedOrder.driver}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-green-600">Pedido entregue</p>
                        <p className="text-xs text-muted-foreground">
                          Entregue em {new Date(selectedOrder.completedAt).toLocaleString('pt-BR')}
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
                  onClick={() => handleDownloadReceipt(selectedOrder)}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Baixar Comprovante
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}