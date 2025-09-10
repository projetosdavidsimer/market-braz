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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  XCircle,
  Eye,
  MapPin,
  User,
  Store,
  Phone,
  Calendar,
  Package
} from "lucide-react"

export default function OrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [orderModalOpen, setOrderModalOpen] = useState(false)

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setOrderModalOpen(true)
  }
  const allOrders = [
    { 
      id: "#1234", 
      customer: "João Silva", 
      customerPhone: "(11) 99999-1111",
      store: "Padaria Central", 
      storePhone: "(11) 3333-4444",
      value: "R$ 25,90", 
      status: "Em entrega", 
      time: "há 5 min",
      orderTime: "14:30",
      driver: "Roberto Silva",
      driverPhone: "(11) 99999-5555",
      address: "Rua das Flores, 123 - São Paulo, SP",
      items: [
        { name: "Pão Francês", quantity: 10, price: "R$ 15,00" },
        { name: "Croissant", quantity: 2, price: "R$ 8,00" },
        { name: "Taxa de entrega", quantity: 1, price: "R$ 2,90" }
      ],
      paymentMethod: "PIX",
      observations: "Entregar no portão principal"
    },
    { 
      id: "#1235", 
      customer: "Maria Santos", 
      customerPhone: "(11) 99999-2222",
      store: "Farmácia Saúde", 
      storePhone: "(11) 3333-5555",
      value: "R$ 45,50", 
      status: "Preparando", 
      time: "há 12 min",
      orderTime: "14:18",
      driver: "Aguardando",
      driverPhone: "N/A",
      address: "Av. Central, 456 - São Paulo, SP",
      items: [
        { name: "Dipirona 500mg", quantity: 1, price: "R$ 12,50" },
        { name: "Vitamina C", quantity: 2, price: "R$ 28,00" },
        { name: "Taxa de entrega", quantity: 1, price: "R$ 5,00" }
      ],
      paymentMethod: "Cartão de Crédito",
      observations: "Receita médica anexada"
    },
    { 
      id: "#1236", 
      customer: "Pedro Costa", 
      customerPhone: "(11) 99999-3333",
      store: "Mercado Bom Preço", 
      storePhone: "(11) 3333-6666",
      value: "R$ 78,30", 
      status: "Entregue", 
      time: "há 18 min",
      orderTime: "14:12",
      driver: "Marcos Pereira",
      driverPhone: "(11) 99999-7777",
      address: "Rua do Comércio, 789 - São Paulo, SP",
      items: [
        { name: "Arroz 5kg", quantity: 1, price: "R$ 25,00" },
        { name: "Feijão 1kg", quantity: 2, price: "R$ 18,00" },
        { name: "Óleo de Soja", quantity: 3, price: "R$ 30,00" },
        { name: "Taxa de entrega", quantity: 1, price: "R$ 5,30" }
      ],
      paymentMethod: "Cartão de Débito",
      observations: "Deixar na portaria se não estiver"
    },
    { 
      id: "#1237", 
      customer: "Ana Oliveira", 
      customerPhone: "(11) 99999-4444",
      store: "Lanchonete do Bairro", 
      storePhone: "(11) 3333-7777",
      value: "R$ 32,00", 
      status: "Confirmado", 
      time: "há 25 min",
      orderTime: "14:05",
      driver: "Aguardando",
      driverPhone: "N/A",
      address: "Praça da Paz, 321 - São Paulo, SP",
      items: [
        { name: "X-Burger", quantity: 1, price: "R$ 18,00" },
        { name: "Batata Frita", quantity: 1, price: "R$ 8,00" },
        { name: "Refrigerante", quantity: 1, price: "R$ 4,00" },
        { name: "Taxa de entrega", quantity: 1, price: "R$ 2,00" }
      ],
      paymentMethod: "Dinheiro",
      observations: "Sem cebola no hambúrguer"
    },
    { 
      id: "#1238", 
      customer: "Carlos Lima", 
      customerPhone: "(11) 99999-5555",
      store: "Pizzaria Italiana", 
      storePhone: "(11) 3333-8888",
      value: "R$ 67,80", 
      status: "Cancelado", 
      time: "há 1h",
      orderTime: "13:30",
      driver: "N/A",
      driverPhone: "N/A",
      address: "Rua Nova, 654 - São Paulo, SP",
      items: [
        { name: "Pizza Margherita G", quantity: 1, price: "R$ 45,00" },
        { name: "Pizza Calabresa M", quantity: 1, price: "R$ 35,00" },
        { name: "Taxa de entrega", quantity: 1, price: "R$ 7,80" }
      ],
      paymentMethod: "PIX",
      observations: "Cancelado pelo cliente - demora na entrega"
    },
  ]

  const activeOrders = allOrders.filter(order => 
    order.status === "Em entrega" || order.status === "Preparando" || order.status === "Confirmado"
  )
  
  const completedOrders = allOrders.filter(order => order.status === "Entregue")
  const cancelledOrders = allOrders.filter(order => order.status === "Cancelado")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Entregue":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "Em entrega":
        return <Clock className="w-4 h-4 text-blue-500" />
      case "Preparando":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "Confirmado":
        return <Clock className="w-4 h-4 text-yellow-500" />
      case "Cancelado":
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Entregue":
        return (
          <Badge variant="success">
            <CheckCircle className="w-3 h-3 mr-1" />
            Entregue
          </Badge>
        )
      case "Em entrega":
        return (
          <Badge variant="info">
            <Clock className="w-3 h-3 mr-1" />
            Em entrega
          </Badge>
        )
      case "Preparando":
        return (
          <Badge variant="warning">
            <Package className="w-3 h-3 mr-1" />
            Preparando
          </Badge>
        )
      case "Confirmado":
        return (
          <Badge variant="secondary">
            <CheckCircle className="w-3 h-3 mr-1" />
            Confirmado
          </Badge>
        )
      case "Cancelado":
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            Cancelado
          </Badge>
        )
      default:
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        )
    }
  }

  const OrderCard = ({ order }: { order: any }) => (
    <div className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
      <div className="flex items-center space-x-4">
        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
          {getStatusIcon(order.status)}
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <p className="font-medium">{order.id}</p>
            {getStatusBadge(order.status)}
          </div>
          <div className="flex items-center space-x-4 mt-1">
            <div className="flex items-center space-x-1">
              <User className="w-3 h-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{order.customer}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Store className="w-3 h-3 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">{order.store}</p>
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <MapPin className="w-3 h-3 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{order.address}</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right">
          <p className="font-bold text-lg">{order.value}</p>
          <p className="text-sm text-muted-foreground">Entregador: {order.driver}</p>
          <p className="text-xs text-muted-foreground">{order.time}</p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order)}>
          <Eye className="w-4 h-4" />
        </Button>
      </div>
    </div>
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
                <BreadcrumbItem>
                  <BreadcrumbPage>Pedidos</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Gestão de Pedidos</h1>
              <p className="text-muted-foreground">
                Monitore e gerencie todos os pedidos da plataforma
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="info" className="text-sm px-3 py-1">
                <ShoppingBag className="w-4 h-4 mr-1" />
                {allOrders.length} pedidos hoje
              </Badge>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Pedidos</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{allOrders.length}</div>
                <p className="text-xs text-muted-foreground">hoje</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeOrders.length}</div>
                <p className="text-xs text-muted-foreground">pedidos ativos</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entregues</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedOrders.length}</div>
                <p className="text-xs text-muted-foreground">concluídos</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cancelados</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{cancelledOrders.length}</div>
                <p className="text-xs text-muted-foreground">cancelamentos</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">Todos ({allOrders.length})</TabsTrigger>
              <TabsTrigger value="active">Em Andamento ({activeOrders.length})</TabsTrigger>
              <TabsTrigger value="completed">Entregues ({completedOrders.length})</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelados ({cancelledOrders.length})</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Todos os Pedidos</CardTitle>
                  <CardDescription>
                    Lista completa de pedidos realizados hoje
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {allOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="active" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos em Andamento</CardTitle>
                  <CardDescription>
                    Pedidos que estão sendo preparados ou em entrega
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activeOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="completed" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Entregues</CardTitle>
                  <CardDescription>
                    Pedidos que foram entregues com sucesso
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {completedOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pedidos Cancelados</CardTitle>
                  <CardDescription>
                    Pedidos que foram cancelados pelo cliente ou loja
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cancelledOrders.map((order) => (
                      <OrderCard key={order.id} order={order} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
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
              Informações completas do pedido
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="flex-1 overflow-y-auto pr-2 space-y-6">
              {/* Status e Informações Básicas */}
              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(selectedOrder.status)}
                  <div>
                    <p className="font-medium">Status: {selectedOrder.status}</p>
                    <p className="text-sm text-muted-foreground">Pedido realizado {selectedOrder.time} às {selectedOrder.orderTime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">{selectedOrder.value}</p>
                  <p className="text-sm text-muted-foreground">Pagamento: {selectedOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Informações do Cliente */}
              <div className="grid gap-4 md:grid-cols-2">
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
                    <div>
                      <Label className="text-sm font-medium flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>Endereço</span>
                      </Label>
                      <p className="text-sm">{selectedOrder.address}</p>
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
                    <div>
                      <Label className="text-sm font-medium flex items-center space-x-1">
                        <Phone className="w-3 h-3" />
                        <span>Telefone</span>
                      </Label>
                      <p className="text-sm">{selectedOrder.storePhone}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Entregador</Label>
                      <p className="text-sm">{selectedOrder.driver}</p>
                      {selectedOrder.driverPhone !== "N/A" && (
                        <p className="text-xs text-muted-foreground">{selectedOrder.driverPhone}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Itens do Pedido */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Itens do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                            <Package className="w-4 h-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">{item.price}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Observações */}
              {selectedOrder.observations && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Observações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm p-3 bg-muted rounded-lg">{selectedOrder.observations}</p>
                  </CardContent>
                </Card>
              )}

              {/* Timeline do Pedido */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Timeline do Pedido</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium">Pedido realizado</p>
                        <p className="text-xs text-muted-foreground">{selectedOrder.orderTime}</p>
                      </div>
                    </div>
                    
                    {selectedOrder.status !== "Cancelado" && (
                      <>
                        <div className="flex items-center space-x-3 p-2">
                          <div className={`w-2 h-2 rounded-full ${
                            selectedOrder.status === "Confirmado" || 
                            selectedOrder.status === "Preparando" || 
                            selectedOrder.status === "Em entrega" || 
                            selectedOrder.status === "Entregue" 
                            ? "bg-green-500" : "bg-gray-300"
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium">Pedido confirmado</p>
                            <p className="text-xs text-muted-foreground">Loja confirmou o pedido</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-2">
                          <div className={`w-2 h-2 rounded-full ${
                            selectedOrder.status === "Preparando" || 
                            selectedOrder.status === "Em entrega" || 
                            selectedOrder.status === "Entregue" 
                            ? "bg-green-500" : "bg-gray-300"
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium">Preparando pedido</p>
                            <p className="text-xs text-muted-foreground">Loja está preparando os itens</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 p-2">
                          <div className={`w-2 h-2 rounded-full ${
                            selectedOrder.status === "Em entrega" || 
                            selectedOrder.status === "Entregue" 
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
                          <div className={`w-2 h-2 rounded-full ${
                            selectedOrder.status === "Entregue" ? "bg-green-500" : "bg-gray-300"
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium">Pedido entregue</p>
                            <p className="text-xs text-muted-foreground">
                              {selectedOrder.status === "Entregue" ? "Entrega concluída" : "Aguardando entrega"}
                            </p>
                          </div>
                        </div>
                      </>
                    )}

                    {selectedOrder.status === "Cancelado" && (
                      <div className="flex items-center space-x-3 p-2">
                        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                        <div>
                          <p className="text-sm font-medium text-red-600">Pedido cancelado</p>
                          <p className="text-xs text-muted-foreground">Pedido foi cancelado</p>
                        </div>
                      </div>
                    )}
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