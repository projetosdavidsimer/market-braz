"use client"

import { useState } from "react"
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Store,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Star,
  TrendingUp,
  Clock,
  Package,
  Users,
  Ban,
  MessageSquare,
  Gift,
  History,
  Trash2,
  CheckCircle,
  XCircle
} from "lucide-react"

export default function MerchantsPage() {
  const [newMerchantModalOpen, setNewMerchantModalOpen] = useState(false)
  const [viewMerchantModalOpen, setViewMerchantModalOpen] = useState(false)
  const [editMerchantModalOpen, setEditMerchantModalOpen] = useState(false)
  const [selectedMerchant, setSelectedMerchant] = useState<any>(null)
  const [newMerchantData, setNewMerchantData] = useState({
    storeName: "",
    ownerName: "",
    email: "",
    phone: "",
    address: "",
    category: "",
    openTime: "",
    closeTime: ""
  })

  const handleNewMerchant = () => {
    setNewMerchantModalOpen(true)
  }

  const handleViewMerchant = (merchant: any) => {
    setSelectedMerchant(merchant)
    setViewMerchantModalOpen(true)
  }

  const handleEditMerchant = (merchant: any) => {
    setSelectedMerchant(merchant)
    setEditMerchantModalOpen(true)
  }

  const handleSaveNewMerchant = () => {
    console.log("Novo comerciante:", newMerchantData)
    alert(`Loja "${newMerchantData.storeName}" cadastrada com sucesso!`)
    setNewMerchantModalOpen(false)
    setNewMerchantData({
      storeName: "",
      ownerName: "",
      email: "",
      phone: "",
      address: "",
      category: "",
      openTime: "",
      closeTime: ""
    })
  }

  const handleSaveEditMerchant = () => {
    console.log("Editando comerciante:", selectedMerchant)
    alert(`Dados da loja "${selectedMerchant?.storeName}" atualizados com sucesso!`)
    setEditMerchantModalOpen(false)
    setSelectedMerchant(null)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "comunicado":
        alert("Comunicado enviado para todos os comerciantes ativos!")
        break
      case "aprovar":
        alert("Processo de aprovação iniciado para lojas pendentes!")
        break
      case "parceiros":
        alert("Convites para programa de parceiros enviados!")
        break
      default:
        break
    }
  }

  const handleDropdownAction = (action: string, merchant: any) => {
    switch (action) {
      case "message":
        alert(`Enviando mensagem para ${merchant.storeName}`)
        break
      case "approve":
        alert(`Loja ${merchant.storeName} foi aprovada`)
        break
      case "suspend":
        alert(`Loja ${merchant.storeName} foi suspensa`)
        break
      case "gift":
        alert(`Enviando promoção para ${merchant.storeName}`)
        break
      case "history":
        alert(`Visualizando histórico de ${merchant.storeName}`)
        break
      case "delete":
        if (confirm(`Tem certeza que deseja excluir ${merchant.storeName}?`)) {
          alert(`Loja ${merchant.storeName} foi removida`)
        }
        break
      default:
        break
    }
  }
  const merchants = [
    {
      id: 1,
      storeName: "Padaria Central",
      ownerName: "Carlos Oliveira",
      email: "carlos@padariacentral.com",
      phone: "(11) 99999-1111",
      address: "Rua das Flores, 123 - Zona Norte",
      category: "Padaria",
      joinDate: "10/11/2023",
      status: "Ativo",
      isOpen: true,
      openTime: "06:00",
      closeTime: "20:00",
      totalOrders: 234,
      monthlyRevenue: "R$ 15.680,90",
      commission: "R$ 1.568,09",
      rating: 4.8,
      products: 45,
      avgDeliveryTime: "18 min"
    },
    {
      id: 2,
      storeName: "Farmácia Saúde",
      ownerName: "Ana Lima",
      email: "ana@farmaciasaude.com",
      phone: "(11) 99999-2222",
      address: "Av. Central, 456 - Centro",
      category: "Farmácia",
      joinDate: "05/12/2023",
      status: "Ativo",
      isOpen: true,
      openTime: "07:00",
      closeTime: "22:00",
      totalOrders: 189,
      monthlyRevenue: "R$ 12.450,30",
      commission: "R$ 1.245,03",
      rating: 4.9,
      products: 156,
      avgDeliveryTime: "25 min"
    },
    {
      id: 3,
      storeName: "Mercado Bom Preço",
      ownerName: "José Santos",
      email: "jose@mercadobompreco.com",
      phone: "(11) 99999-3333",
      address: "Rua do Comércio, 789 - Zona Sul",
      category: "Supermercado",
      joinDate: "20/01/2024",
      status: "Ativo",
      isOpen: false,
      openTime: "08:00",
      closeTime: "18:00",
      totalOrders: 156,
      monthlyRevenue: "R$ 18.920,50",
      commission: "R$ 1.892,05",
      rating: 4.6,
      products: 289,
      avgDeliveryTime: "35 min"
    },
    {
      id: 4,
      storeName: "Pizzaria Italiana",
      ownerName: "Marco Rossi",
      email: "marco@pizzariaitaliana.com",
      phone: "(11) 99999-4444",
      address: "Praça da Paz, 321 - Zona Norte",
      category: "Restaurante",
      joinDate: "15/10/2023",
      status: "Ativo",
      isOpen: true,
      openTime: "18:00",
      closeTime: "23:00",
      totalOrders: 198,
      monthlyRevenue: "R$ 22.340,80",
      commission: "R$ 2.234,08",
      rating: 4.7,
      products: 32,
      avgDeliveryTime: "40 min"
    },
    {
      id: 5,
      storeName: "Lanchonete do Bairro",
      ownerName: "Maria Silva",
      email: "maria@lanchonetedobairro.com",
      phone: "(11) 99999-5555",
      address: "Rua Nova, 654 - Centro",
      category: "Lanchonete",
      joinDate: "08/02/2024",
      status: "Pendente",
      isOpen: false,
      openTime: "10:00",
      closeTime: "22:00",
      totalOrders: 0,
      monthlyRevenue: "R$ 0,00",
      commission: "R$ 0,00",
      rating: 0,
      products: 0,
      avgDeliveryTime: "N/A"
    },
    {
      id: 6,
      storeName: "Pet Shop Amigo",
      ownerName: "Lucia Ferreira",
      email: "lucia@petshopamigo.com",
      phone: "(11) 99999-6666",
      address: "Av. Beira Mar, 987 - Zona Sul",
      category: "Pet Shop",
      joinDate: "25/03/2024",
      status: "Suspenso",
      isOpen: false,
      openTime: "09:00",
      closeTime: "19:00",
      totalOrders: 23,
      monthlyRevenue: "R$ 1.890,40",
      commission: "R$ 189,04",
      rating: 3.8,
      products: 67,
      avgDeliveryTime: "30 min"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge variant="default">Ativo</Badge>
      case "Pendente":
        return <Badge variant="secondary">Pendente</Badge>
      case "Suspenso":
        return <Badge variant="destructive">Suspenso</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Padaria": "bg-orange-100 text-orange-800",
      "Farmácia": "bg-green-100 text-green-800",
      "Supermercado": "bg-blue-100 text-blue-800",
      "Restaurante": "bg-red-100 text-red-800",
      "Lanchonete": "bg-yellow-100 text-yellow-800",
      "Pet Shop": "bg-purple-100 text-purple-800"
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const activeMerchants = merchants.filter(m => m.status === "Ativo").length
  const pendingMerchants = merchants.filter(m => m.status === "Pendente").length
  const openStores = merchants.filter(m => m.isOpen).length

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
                  <BreadcrumbLink href="/dashboard/users">
                    Gestão de Usuários
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Comerciantes</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Comerciantes</h1>
              <p className="text-muted-foreground">
                Gerencie todos os comerciantes e suas lojas na plataforma
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar comerciantes..." className="pl-8 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button onClick={handleNewMerchant}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Comerciante
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Lojas</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{merchants.length}</div>
                <p className="text-xs text-muted-foreground">
                  +3 novas este mês
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lojas Abertas</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{openStores}</div>
                <p className="text-xs text-muted-foreground">
                  de {activeMerchants} ativas
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 71.282</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+15%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6</div>
                <p className="text-xs text-muted-foreground">
                  das lojas ativas
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Merchants List */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Comerciantes</CardTitle>
              <CardDescription>
                Todos os comerciantes cadastrados na plataforma com suas informações detalhadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {merchants.map((merchant) => (
                  <div key={merchant.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Store className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-lg">{merchant.storeName}</p>
                          <Badge className={`text-xs ${getCategoryColor(merchant.category)}`}>
                            {merchant.category}
                          </Badge>
                          {getStatusBadge(merchant.status)}
                          {merchant.isOpen && merchant.status === "Ativo" && (
                            <Badge variant="default" className="bg-green-500">Aberta</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span>Proprietário: {merchant.ownerName}</span>
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{merchant.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{merchant.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{merchant.address}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{merchant.openTime} - {merchant.closeTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Desde {merchant.joinDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Pedidos</p>
                        <p className="font-bold">{merchant.totalOrders}</p>
                        <p className="text-xs text-muted-foreground">{merchant.products} produtos</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Receita Mensal</p>
                        <p className="font-bold text-lg text-green-600">{merchant.monthlyRevenue}</p>
                        <p className="text-xs text-muted-foreground">Comissão: {merchant.commission}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Performance</p>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-bold">{merchant.rating || "N/A"}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{merchant.avgDeliveryTime}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewMerchant(merchant)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditMerchant(merchant)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Ações</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDropdownAction("message", merchant)}>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Enviar Mensagem
                            </DropdownMenuItem>
                            {merchant.status === "Pendente" && (
                              <DropdownMenuItem onClick={() => handleDropdownAction("approve", merchant)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Aprovar Loja
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDropdownAction("gift", merchant)}>
                              <Gift className="w-4 h-4 mr-2" />
                              Enviar Promoção
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDropdownAction("history", merchant)}>
                              <History className="w-4 h-4 mr-2" />
                              Ver Histórico
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDropdownAction("suspend", merchant)}>
                              <Ban className="w-4 h-4 mr-2" />
                              Suspender
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDropdownAction("delete", merchant)}
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
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
                  <span>Performance Geral</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total de Pedidos:</span>
                  <span className="font-bold">{merchants.reduce((acc, m) => acc + m.totalOrders, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Receita Total:</span>
                  <span className="font-bold text-green-600">R$ 71.282,90</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Comissão Total:</span>
                  <span className="font-bold">R$ 7.128,29</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status das Lojas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ativas:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(activeMerchants / merchants.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{activeMerchants}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Pendentes:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-yellow-500"
                        style={{ width: `${(pendingMerchants / merchants.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{pendingMerchants}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Abertas Agora:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(openStores / merchants.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{openStores}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline" onClick={() => handleQuickAction("comunicado")}>
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Comunicado
                </Button>
                <Button className="w-full" variant="outline" onClick={() => handleQuickAction("aprovar")}>
                  <Package className="w-4 h-4 mr-2" />
                  Aprovar Pendentes
                </Button>
                <Button className="w-full" variant="outline" onClick={() => handleQuickAction("parceiros")}>
                  <Users className="w-4 h-4 mr-2" />
                  Programa Parceiros
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>

      {/* Modal Novo Comerciante */}
      <Dialog open={newMerchantModalOpen} onOpenChange={setNewMerchantModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Novo Comerciante</span>
            </DialogTitle>
            <DialogDescription>
              Cadastre uma nova loja na plataforma
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="storeName">Nome da Loja</Label>
              <Input
                id="storeName"
                placeholder="Digite o nome da loja"
                value={newMerchantData.storeName}
                onChange={(e) => setNewMerchantData({...newMerchantData, storeName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ownerName">Nome do Proprietário</Label>
              <Input
                id="ownerName"
                placeholder="Digite o nome do proprietário"
                value={newMerchantData.ownerName}
                onChange={(e) => setNewMerchantData({...newMerchantData, ownerName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite o e-mail"
                value={newMerchantData.email}
                onChange={(e) => setNewMerchantData({...newMerchantData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                value={newMerchantData.phone}
                onChange={(e) => setNewMerchantData({...newMerchantData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Endereço</Label>
              <Textarea
                id="address"
                placeholder="Digite o endereço completo"
                value={newMerchantData.address}
                onChange={(e) => setNewMerchantData({...newMerchantData, address: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={newMerchantData.category} onValueChange={(value) => setNewMerchantData({...newMerchantData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Padaria">Padaria</SelectItem>
                  <SelectItem value="Farmácia">Farmácia</SelectItem>
                  <SelectItem value="Supermercado">Supermercado</SelectItem>
                  <SelectItem value="Restaurante">Restaurante</SelectItem>
                  <SelectItem value="Lanchonete">Lanchonete</SelectItem>
                  <SelectItem value="Pet Shop">Pet Shop</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Horário de Funcionamento</Label>
              <div className="flex space-x-2">
                <Input
                  type="time"
                  placeholder="Abertura"
                  value={newMerchantData.openTime}
                  onChange={(e) => setNewMerchantData({...newMerchantData, openTime: e.target.value})}
                />
                <Input
                  type="time"
                  placeholder="Fechamento"
                  value={newMerchantData.closeTime}
                  onChange={(e) => setNewMerchantData({...newMerchantData, closeTime: e.target.value})}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewMerchantModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveNewMerchant} disabled={!newMerchantData.storeName || !newMerchantData.ownerName || !newMerchantData.email}>
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Visualizar Comerciante */}
      <Dialog open={viewMerchantModalOpen} onOpenChange={setViewMerchantModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Detalhes da Loja</span>
            </DialogTitle>
            <DialogDescription>
              Informações completas do comerciante
            </DialogDescription>
          </DialogHeader>
          {selectedMerchant && (
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold">{selectedMerchant.storeName}</h3>
                    <Badge className={`text-xs ${getCategoryColor(selectedMerchant.category)}`}>
                      {selectedMerchant.category}
                    </Badge>
                    {getStatusBadge(selectedMerchant.status)}
                    {selectedMerchant.isOpen && selectedMerchant.status === "Ativo" && (
                      <Badge variant="default" className="bg-green-500">Aberta</Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Proprietário: </span>
                      <span className="font-medium">{selectedMerchant.ownerName}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedMerchant.openTime} - {selectedMerchant.closeTime}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedMerchant.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">Total de Pedidos</div>
                  <div className="text-xs text-muted-foreground mt-1">{selectedMerchant.products} produtos</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedMerchant.monthlyRevenue}</div>
                  <div className="text-sm text-muted-foreground">Receita Mensal</div>
                  <div className="text-xs text-muted-foreground mt-1">Comissão: {selectedMerchant.commission}</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center space-x-1">
                    <Star className="w-6 h-6 fill-current" />
                    <span>{selectedMerchant.rating || "N/A"}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Avaliação</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{selectedMerchant.avgDeliveryTime}</div>
                  <div className="text-sm text-muted-foreground">Tempo Médio</div>
                  <div className="text-xs text-muted-foreground mt-1">de entrega</div>
                </div>
              </div>

              {/* Informações de Contato */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Informações de Contato</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedMerchant.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedMerchant.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedMerchant.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Desde {selectedMerchant.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className="text-sm font-medium">{selectedMerchant.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Categoria:</span>
                      <span className="text-sm font-medium">{selectedMerchant.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Funcionamento:</span>
                      <span className="text-sm font-medium">{selectedMerchant.isOpen ? "Aberta" : "Fechada"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewMerchantModalOpen(false)}>
              Fechar
            </Button>
            <Button onClick={() => {
              setViewMerchantModalOpen(false)
              handleEditMerchant(selectedMerchant)
            }}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Comerciante */}
      <Dialog open={editMerchantModalOpen} onOpenChange={setEditMerchantModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="w-5 h-5" />
              <span>Editar Comerciante</span>
            </DialogTitle>
            <DialogDescription>
              Atualize as informações da loja
            </DialogDescription>
          </DialogHeader>
          {selectedMerchant && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-storeName">Nome da Loja</Label>
                <Input
                  id="edit-storeName"
                  defaultValue={selectedMerchant.storeName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-ownerName">Nome do Proprietário</Label>
                <Input
                  id="edit-ownerName"
                  defaultValue={selectedMerchant.ownerName}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">E-mail</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedMerchant.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Telefone</Label>
                <Input
                  id="edit-phone"
                  defaultValue={selectedMerchant.phone}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-address">Endereço</Label>
                <Textarea
                  id="edit-address"
                  defaultValue={selectedMerchant.address}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Categoria</Label>
                <Select defaultValue={selectedMerchant.category}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Padaria">Padaria</SelectItem>
                    <SelectItem value="Farmácia">Farmácia</SelectItem>
                    <SelectItem value="Supermercado">Supermercado</SelectItem>
                    <SelectItem value="Restaurante">Restaurante</SelectItem>
                    <SelectItem value="Lanchonete">Lanchonete</SelectItem>
                    <SelectItem value="Pet Shop">Pet Shop</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Horário de Funcionamento</Label>
                <div className="flex space-x-2">
                  <Input
                    type="time"
                    defaultValue={selectedMerchant.openTime}
                  />
                  <Input
                    type="time"
                    defaultValue={selectedMerchant.closeTime}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMerchantModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEditMerchant}>
              <Edit className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}