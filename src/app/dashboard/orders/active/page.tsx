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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  Eye,
  MapPin,
  User,
  Store,
  Phone,
  Search,
  Filter,
  RefreshCw,
  Navigation,
  Truck,
  ChevronDown,
  ChevronUp,
  MoreVertical,
  MessageCircle,
  ExternalLink,
  Package
} from "lucide-react"
import { Label } from "@/components/ui/label"

export default function ActiveOrdersPage() {
  const [expandedOrders, setExpandedOrders] = useState<string[]>([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [orderModalOpen, setOrderModalOpen] = useState(false)

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simular chamada de API
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsRefreshing(false)
  }

  const handleContact = (order: any, type: 'customer' | 'store' | 'driver') => {
    let phone = ''
    let name = ''
    
    switch (type) {
      case 'customer':
        phone = order.customerPhone
        name = order.customer
        break
      case 'store':
        phone = order.storePhone
        name = order.store
        break
      case 'driver':
        phone = order.driverPhone
        name = order.driver
        break
    }
    
    if (phone && phone !== 'N/A') {
      // Abrir WhatsApp ou fazer chamada
      const whatsappUrl = `https://wa.me/${phone.replace(/\D/g, '')}`
      window.open(whatsappUrl, '_blank')
    } else {
      alert(`Contato não disponível para ${name}`)
    }
  }

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order)
    setOrderModalOpen(true)
  }

  const activeOrders = [
    { 
      id: "#1234", 
      customer: "João Silva", 
      customerPhone: "(11) 99999-1111",
      store: "Padaria Central", 
      storePhone: "(11) 99999-0001",
      value: "R$ 25,90", 
      status: "Em entrega", 
      time: "há 5 min",
      driver: "Roberto Silva",
      driverPhone: "(11) 99999-4444",
      pickup: "Rua das Flores, 123",
      delivery: "Av. Principal, 456",
      distance: "2.3 km",
      estimatedTime: "12 min",
      items: ["Pão francês (2kg)", "Leite integral (1L)", "Café (500g)"]
    },
    { 
      id: "#1235", 
      customer: "Maria Santos", 
      customerPhone: "(11) 99999-2222",
      store: "Farmácia Saúde", 
      storePhone: "(11) 99999-0002",
      value: "R$ 45,50", 
      status: "Preparando", 
      time: "há 12 min",
      driver: "Aguardando",
      driverPhone: "N/A",
      pickup: "Av. Central, 456",
      delivery: "Rua do Sol, 789",
      distance: "1.8 km",
      estimatedTime: "Aguardando",
      items: ["Dipirona (1 caixa)", "Vitamina C (60 caps)", "Protetor solar"]
    },
    { 
      id: "#1236", 
      customer: "Pedro Costa", 
      customerPhone: "(11) 99999-3333",
      store: "Mercado Bom Preço", 
      storePhone: "(11) 99999-0003",
      value: "R$ 78,30", 
      status: "A caminho do cliente", 
      time: "há 18 min",
      driver: "Marcos Pereira",
      driverPhone: "(11) 99999-5555",
      pickup: "Rua do Comércio, 789",
      delivery: "Praça da Liberdade, 321",
      distance: "3.1 km",
      estimatedTime: "15 min",
      items: ["Arroz (5kg)", "Feijão (2kg)", "Óleo de soja", "Açúcar (2kg)"]
    },
    { 
      id: "#1237", 
      customer: "Ana Oliveira", 
      customerPhone: "(11) 99999-4444",
      store: "Lanchonete do Bairro", 
      storePhone: "(11) 99999-0004",
      value: "R$ 32,00", 
      status: "Confirmado", 
      time: "há 25 min",
      driver: "Aguardando",
      driverPhone: "N/A",
      pickup: "Praça da Paz, 321",
      delivery: "Rua Nova, 654",
      distance: "1.5 km",
      estimatedTime: "Aguardando",
      items: ["X-Burger", "Batata frita", "Refrigerante 350ml"]
    },
    { 
      id: "#1238", 
      customer: "Carlos Lima", 
      customerPhone: "(11) 99999-5555",
      store: "Pizzaria Italiana", 
      storePhone: "(11) 99999-0005",
      value: "R$ 67,80", 
      status: "Saiu para entrega", 
      time: "há 8 min",
      driver: "Lucas Ferreira",
      driverPhone: "(11) 99999-6666",
      pickup: "Av. Italia, 987",
      delivery: "Rua dos Pinheiros, 159",
      distance: "4.2 km",
      estimatedTime: "18 min",
      items: ["Pizza Margherita G", "Pizza Calabresa M", "Refrigerante 2L"]
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Em entrega":
      case "A caminho do cliente":
      case "Saiu para entrega":
        return <Truck className="w-4 h-4 text-blue-500" />
      case "Preparando":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "Confirmado":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em entrega":
      case "A caminho do cliente":
      case "Saiu para entrega":
        return <Badge variant="default">Em Entrega</Badge>
      case "Preparando":
        return <Badge variant="secondary">Preparando</Badge>
      case "Confirmado":
        return <Badge variant="outline">Confirmado</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const preparingOrders = activeOrders.filter(order => order.status === "Preparando" || order.status === "Confirmado").length
  const inDeliveryOrders = activeOrders.filter(order => 
    order.status === "Em entrega" || order.status === "A caminho do cliente" || order.status === "Saiu para entrega"
  ).length

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
                  <BreadcrumbPage>Em Andamento</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Pedidos em Andamento</h1>
              <p className="text-muted-foreground">
                Monitore todos os pedidos que estão sendo preparados ou em entrega
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar pedidos..." className="pl-8 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button 
                variant="outline" 
                onClick={handleRefresh}
                disabled={isRefreshing}
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Atualizando...' : 'Atualizar'}
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total em Andamento</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeOrders.length}</div>
                <p className="text-xs text-muted-foreground">
                  pedidos ativos
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Preparando</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{preparingOrders}</div>
                <p className="text-xs text-muted-foreground">
                  aguardando entregador
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Entrega</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{inDeliveryOrders}</div>
                <p className="text-xs text-muted-foreground">
                  a caminho do cliente
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                <Navigation className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">15 min</div>
                <p className="text-xs text-muted-foreground">
                  estimativa de entrega
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Active Orders List */}
          <div className="space-y-3">
            {activeOrders.map((order) => {
              const isExpanded = expandedOrders.includes(order.id)
              
              return (
                <Collapsible key={order.id} open={isExpanded} onOpenChange={() => toggleOrderExpansion(order.id)}>
                  <Card className="overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <div className="bg-gray-50/50 dark:bg-gray-900/50 p-4 cursor-pointer hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors border-l-4 border-gray-300 dark:border-gray-600">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm border border-gray-200 dark:border-gray-700">
                              {getStatusIcon(order.status)}
                            </div>
                            <div>
                              <div className="flex items-center space-x-3">
                                <span className="font-bold text-lg">{order.id}</span>
                                {getStatusBadge(order.status)}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {order.customer} • {order.store} • {order.time}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="text-right">
                              <p className="font-bold text-xl text-gray-900 dark:text-gray-100">{order.value}</p>
                              <p className="text-xs text-muted-foreground">{order.distance} • {order.estimatedTime}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              {/* Dropdown de Ações */}
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    <MoreVertical className="w-4 h-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation()
                                    handleViewDetails(order)
                                  }}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    Ver Detalhes
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation()
                                    handleContact(order, 'customer')
                                  }}>
                                    <MessageCircle className="w-4 h-4 mr-2" />
                                    Contatar Cliente
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={(e) => {
                                    e.stopPropagation()
                                    handleContact(order, 'store')
                                  }}>
                                    <Store className="w-4 h-4 mr-2" />
                                    Contatar Loja
                                  </DropdownMenuItem>
                                  {order.driver !== "Aguardando" && (
                                    <DropdownMenuItem onClick={(e) => {
                                      e.stopPropagation()
                                      handleContact(order, 'driver')
                                    }}>
                                      <Truck className="w-4 h-4 mr-2" />
                                      Contatar Entregador
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
                              
                              {/* Botão de Expandir/Colapsar */}
                              <Button variant="ghost" size="sm">
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4" />
                                ) : (
                                  <ChevronDown className="w-4 h-4" />
                                )}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <CardContent className="p-6 border-t bg-white dark:bg-gray-950">
                        {/* People Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-200">Cliente</h4>
                              <p className="text-sm font-medium">{order.customer}</p>
                              <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-2"
                                onClick={() => handleContact(order, 'customer')}
                              >
                                <Phone className="w-3 h-3 mr-1" />
                                Contatar
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                              <Store className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-200">Loja</h4>
                              <p className="text-sm font-medium">{order.store}</p>
                              <p className="text-xs text-muted-foreground">{order.storePhone}</p>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="mt-2"
                                onClick={() => handleContact(order, 'store')}
                              >
                                <Phone className="w-3 h-3 mr-1" />
                                Contatar
                              </Button>
                            </div>
                          </div>
                          
                          <div className="flex items-start space-x-3">
                            <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                              <Truck className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-gray-200">Entregador</h4>
                              <p className="text-sm font-medium">{order.driver}</p>
                              <p className="text-xs text-muted-foreground">{order.driverPhone}</p>
                              {order.driver !== "Aguardando" && (
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="mt-2"
                                  onClick={() => handleContact(order, 'driver')}
                                >
                                  <Phone className="w-3 h-3 mr-1" />
                                  Contatar
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Route Section */}
                        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <Navigation className="w-4 h-4 mr-2" />
                            Rota de Entrega
                          </h4>
                          <div className="space-y-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">Origem</p>
                                <p className="text-xs text-muted-foreground">{order.pickup}</p>
                              </div>
                            </div>
                            <div className="ml-1.5 border-l-2 border-dashed border-gray-300 dark:border-gray-600 h-4"></div>
                            <div className="flex items-center space-x-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <div className="flex-1">
                                <p className="text-sm font-medium">Destino</p>
                                <p className="text-xs text-muted-foreground">{order.delivery}</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Items Section */}
                        <div className="border rounded-lg p-4">
                          <h4 className="font-semibold mb-3 flex items-center">
                            <ShoppingBag className="w-4 h-4 mr-2" />
                            Itens do Pedido ({order.items.length})
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {order.items.map((item, index) => (
                              <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-gray-800 rounded">
                                <div className="w-2 h-2 bg-primary rounded-full"></div>
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end space-x-2 mt-6 pt-4 border-t">
                          <Button 
                            variant="outline"
                            onClick={() => handleViewDetails(order)}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Ver Detalhes Completos
                          </Button>
                        </div>
                      </CardContent>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              )
            })}
          </div>
        </div>
      </SidebarInset>

      {/* Modal de Detalhes do Pedido */}
      <Dialog open={orderModalOpen} onOpenChange={setOrderModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Detalhes do Pedido {selectedOrder?.id}</span>
            </DialogTitle>
            <DialogDescription>
              Informações completas do pedido em andamento
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              {/* Status e Informações Básicas */}
              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-3">
                  {selectedOrder.status === "Em entrega" || selectedOrder.status === "A caminho do cliente" || selectedOrder.status === "Saiu para entrega" ? (
                    <Truck className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                  ) : selectedOrder.status === "Preparando" ? (
                    <Clock className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                  ) : (
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                  )}
                  <div>
                    <p className="font-medium text-blue-800 dark:text-blue-200">{selectedOrder.status}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      Pedido realizado {selectedOrder.time}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{selectedOrder.value}</p>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    {selectedOrder.estimatedTime !== "Aguardando" ? `ETA: ${selectedOrder.estimatedTime}` : "Aguardando entregador"}
                  </p>
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
                    <div>
                      <Label className="text-sm font-medium flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>Telefone</span>
                      </Label>
                      <p className="text-sm">{selectedOrder.customerPhone}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => handleContact(selectedOrder, 'customer')}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Contatar
                    </Button>
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
                    <div>
                      <Label className="text-sm font-medium flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>Telefone</span>
                      </Label>
                      <p className="text-sm">{selectedOrder.storePhone}</p>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full mt-2"
                      onClick={() => handleContact(selectedOrder, 'store')}
                    >
                      <Phone className="w-3 h-3 mr-1" />
                      Contatar
                    </Button>
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
                    {selectedOrder.driverPhone !== "N/A" && (
                      <div>
                        <Label className="text-sm font-medium flex items-center space-x-1">
                          <Phone className="w-3 h-3" />
                          <span>Telefone</span>
                        </Label>
                        <p className="text-sm">{selectedOrder.driverPhone}</p>
                      </div>
                    )}
                    {selectedOrder.driver !== "Aguardando" && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={() => handleContact(selectedOrder, 'driver')}
                      >
                        <Phone className="w-3 h-3 mr-1" />
                        Contatar
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Rota de Entrega */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Navigation className="w-4 h-4" />
                    <span>Rota de Entrega</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800 dark:text-green-200">Origem</p>
                        <p className="text-sm text-green-600 dark:text-green-400">{selectedOrder.pickup}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="border-l-2 border-dashed border-gray-300 dark:border-gray-600 h-6"></div>
                    </div>
                    
                    <div className="flex items-center space-x-3 p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-red-800 dark:text-red-200">Destino</p>
                        <p className="text-sm text-red-600 dark:text-red-400">{selectedOrder.delivery}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

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
                  <CardTitle className="text-lg">Informações da Entrega</CardTitle>
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
                      <p className="text-xs text-muted-foreground">Tempo Estimado</p>
                      <p className="font-semibold">{selectedOrder.estimatedTime}</p>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <Truck className="w-5 h-5 mx-auto mb-1 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">Status</p>
                      <p className="font-semibold">{selectedOrder.status}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline do Pedido */}
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
                      <div className={`w-3 h-3 rounded-full ${
                        selectedOrder.status === "Confirmado" || 
                        selectedOrder.status === "Preparando" || 
                        selectedOrder.status === "Em entrega" || 
                        selectedOrder.status === "A caminho do cliente" || 
                        selectedOrder.status === "Saiu para entrega" 
                        ? "bg-green-500" : "bg-gray-300"
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium">Pedido confirmado</p>
                        <p className="text-xs text-muted-foreground">Loja confirmou o pedido</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2">
                      <div className={`w-3 h-3 rounded-full ${
                        selectedOrder.status === "Preparando" || 
                        selectedOrder.status === "Em entrega" || 
                        selectedOrder.status === "A caminho do cliente" || 
                        selectedOrder.status === "Saiu para entrega" 
                        ? "bg-green-500" : "bg-gray-300"
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium">Preparando pedido</p>
                        <p className="text-xs text-muted-foreground">Loja está preparando os itens</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2">
                      <div className={`w-3 h-3 rounded-full ${
                        selectedOrder.status === "Em entrega" || 
                        selectedOrder.status === "A caminho do cliente" || 
                        selectedOrder.status === "Saiu para entrega" 
                        ? "bg-green-500" : "bg-gray-300"
                      }`}></div>
                      <div>
                        <p className="text-sm font-medium">Saiu para entrega</p>
                        <p className="text-xs text-muted-foreground">
                          {selectedOrder.driver !== "Aguardando" ? `Entregador: ${selectedOrder.driver}` : "Aguardando entregador"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 p-2">
                      <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Pedido entregue</p>
                        <p className="text-xs text-muted-foreground">Aguardando entrega</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Botões de Ação */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => handleContact(selectedOrder, 'customer')}
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Contatar Cliente
                </Button>
                {selectedOrder.driver !== "Aguardando" && (
                  <Button 
                    variant="outline"
                    onClick={() => handleContact(selectedOrder, 'driver')}
                  >
                    <Truck className="w-4 h-4 mr-2" />
                    Contatar Entregador
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}