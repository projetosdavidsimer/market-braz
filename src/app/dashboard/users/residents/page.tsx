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
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Users,
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
  ShoppingBag,
  Star,
  TrendingUp,
  UserCheck,
  UserX,
  Ban,
  MessageSquare,
  Gift,
  History,
  Trash2
} from "lucide-react"

export default function ResidentsPage() {
  const [newResidentModalOpen, setNewResidentModalOpen] = useState(false)
  const [viewResidentModalOpen, setViewResidentModalOpen] = useState(false)
  const [editResidentModalOpen, setEditResidentModalOpen] = useState(false)
  const [selectedResident, setSelectedResident] = useState<any>(null)
  const [newResidentData, setNewResidentData] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  const handleNewResident = () => {
    setNewResidentModalOpen(true)
  }

  const handleViewResident = (resident: any) => {
    setSelectedResident(resident)
    setViewResidentModalOpen(true)
  }

  const handleEditResident = (resident: any) => {
    setSelectedResident(resident)
    setEditResidentModalOpen(true)
  }

  const handleSaveNewResident = () => {
    console.log("Novo morador:", newResidentData)
    alert(`Morador "${newResidentData.name}" cadastrado com sucesso!`)
    setNewResidentModalOpen(false)
    setNewResidentData({ name: "", email: "", phone: "", address: "" })
  }

  const handleSaveEditResident = () => {
    console.log("Editando morador:", selectedResident)
    alert(`Dados do morador "${selectedResident?.name}" atualizados com sucesso!`)
    setEditResidentModalOpen(false)
    setSelectedResident(null)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "newsletter":
        alert("Newsletter enviada para todos os moradores ativos!")
        break
      case "reactivate":
        alert("Processo de reativação iniciado para moradores inativos!")
        break
      case "vip":
        alert("Convites para programa VIP enviados!")
        break
      default:
        break
    }
  }

  const handleDropdownAction = (action: string, resident: any) => {
    switch (action) {
      case "message":
        alert(`Enviando mensagem para ${resident.name}`)
        break
      case "suspend":
        alert(`Morador ${resident.name} foi suspenso`)
        break
      case "gift":
        alert(`Enviando cupom de desconto para ${resident.name}`)
        break
      case "history":
        alert(`Visualizando histórico de ${resident.name}`)
        break
      case "delete":
        if (confirm(`Tem certeza que deseja excluir ${resident.name}?`)) {
          alert(`Morador ${resident.name} foi removido`)
        }
        break
      default:
        break
    }
  }
  const residents = [
    {
      id: 1,
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "(11) 99999-1111",
      address: "Rua das Flores, 123 - Zona Norte",
      joinDate: "15/01/2024",
      status: "Ativo",
      totalOrders: 45,
      totalSpent: "R$ 1.890,50",
      lastOrder: "há 2 dias",
      rating: 4.8,
      loyaltyPoints: 1250
    },
    {
      id: 2,
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "(11) 99999-2222",
      address: "Av. Central, 456 - Centro",
      joinDate: "22/12/2023",
      status: "Ativo",
      totalOrders: 67,
      totalSpent: "R$ 3.245,80",
      lastOrder: "há 1 dia",
      rating: 4.9,
      loyaltyPoints: 2890
    },
    {
      id: 3,
      name: "Pedro Costa",
      email: "pedro.costa@email.com",
      phone: "(11) 99999-3333",
      address: "Rua do Comércio, 789 - Zona Sul",
      joinDate: "08/03/2024",
      status: "Inativo",
      totalOrders: 12,
      totalSpent: "R$ 456,30",
      lastOrder: "há 15 dias",
      rating: 4.5,
      loyaltyPoints: 340
    },
    {
      id: 4,
      name: "Ana Oliveira",
      email: "ana.oliveira@email.com",
      phone: "(11) 99999-4444",
      address: "Praça da Paz, 321 - Zona Norte",
      joinDate: "30/11/2023",
      status: "Ativo",
      totalOrders: 89,
      totalSpent: "R$ 4.567,90",
      lastOrder: "hoje",
      rating: 4.7,
      loyaltyPoints: 3450
    },
    {
      id: 5,
      name: "Carlos Lima",
      email: "carlos.lima@email.com",
      phone: "(11) 99999-5555",
      address: "Rua Nova, 654 - Centro",
      joinDate: "12/02/2024",
      status: "Ativo",
      totalOrders: 23,
      totalSpent: "R$ 987,60",
      lastOrder: "há 3 dias",
      rating: 4.6,
      loyaltyPoints: 780
    },
    {
      id: 6,
      name: "Lucia Ferreira",
      email: "lucia.ferreira@email.com",
      phone: "(11) 99999-6666",
      address: "Av. Beira Mar, 987 - Zona Sul",
      joinDate: "05/01/2024",
      status: "Suspenso",
      totalOrders: 8,
      totalSpent: "R$ 234,50",
      lastOrder: "há 30 dias",
      rating: 3.2,
      loyaltyPoints: 120
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge variant="default">Ativo</Badge>
      case "Inativo":
        return <Badge variant="secondary">Inativo</Badge>
      case "Suspenso":
        return <Badge variant="destructive">Suspenso</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCustomerTier = (totalSpent: string) => {
    const value = parseFloat(totalSpent.replace("R$ ", "").replace(".", "").replace(",", "."))
    if (value >= 3000) return { tier: "VIP", color: "bg-purple-100 text-purple-800" }
    if (value >= 1500) return { tier: "Premium", color: "bg-blue-100 text-blue-800" }
    return { tier: "Regular", color: "bg-gray-100 text-gray-800" }
  }

  const activeResidents = residents.filter(r => r.status === "Ativo").length
  const inactiveResidents = residents.filter(r => r.status === "Inativo").length
  const suspendedResidents = residents.filter(r => r.status === "Suspenso").length

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
                  <BreadcrumbPage>Moradores</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Moradores</h1>
              <p className="text-muted-foreground">
                Gerencie todos os moradores cadastrados na plataforma
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar moradores..." className="pl-8 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button onClick={handleNewResident}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Morador
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Moradores</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{residents.length}</div>
                <p className="text-xs text-muted-foreground">
                  +12 novos este mês
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ativos</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeResidents}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((activeResidents / residents.length) * 100)}% do total
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 42,30</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> vs mês anterior
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
                  avaliação dos moradores
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Residents List */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Moradores</CardTitle>
              <CardDescription>
                Todos os moradores cadastrados na plataforma com suas informações detalhadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {residents.map((resident) => {
                  const tier = getCustomerTier(resident.totalSpent)
                  return (
                    <div key={resident.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <p className="font-medium text-lg">{resident.name}</p>
                            <Badge className={`text-xs ${tier.color}`}>
                              {tier.tier}
                            </Badge>
                            {getStatusBadge(resident.status)}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Mail className="w-3 h-3" />
                              <span>{resident.email}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Phone className="w-3 h-3" />
                              <span>{resident.phone}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                            <div className="flex items-center space-x-1">
                              <MapPin className="w-3 h-3" />
                              <span>{resident.address}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3" />
                              <span>Desde {resident.joinDate}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Pedidos</p>
                          <p className="font-bold">{resident.totalOrders}</p>
                          <p className="text-xs text-muted-foreground">{resident.lastOrder}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Total Gasto</p>
                          <p className="font-bold text-lg text-green-600">{resident.totalSpent}</p>
                          <p className="text-xs text-muted-foreground">{resident.loyaltyPoints} pontos</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Avaliação</p>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="font-bold">{resident.rating}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewResident(resident)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditResident(resident)}>
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
                              <DropdownMenuItem onClick={() => handleDropdownAction("message", resident)}>
                                <MessageSquare className="w-4 h-4 mr-2" />
                                Enviar Mensagem
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDropdownAction("gift", resident)}>
                                <Gift className="w-4 h-4 mr-2" />
                                Enviar Cupom
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleDropdownAction("history", resident)}>
                                <History className="w-4 h-4 mr-2" />
                                Ver Histórico
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => handleDropdownAction("suspend", resident)}>
                                <Ban className="w-4 h-4 mr-2" />
                                Suspender
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDropdownAction("delete", resident)}
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
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Resumo de Pedidos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Total de Pedidos:</span>
                  <span className="font-bold">{residents.reduce((acc, r) => acc + r.totalOrders, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Pedidos por Morador:</span>
                  <span className="font-bold">{Math.round(residents.reduce((acc, r) => acc + r.totalOrders, 0) / residents.length)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Último Pedido:</span>
                  <span className="font-bold">hoje</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status dos Moradores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ativos:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(activeResidents / residents.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{activeResidents}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Inativos:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-yellow-500"
                        style={{ width: `${(inactiveResidents / residents.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{inactiveResidents}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Suspensos:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-red-500"
                        style={{ width: `${(suspendedResidents / residents.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{suspendedResidents}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline" onClick={() => handleQuickAction("newsletter")}>
                  <Mail className="w-4 h-4 mr-2" />
                  Enviar Newsletter
                </Button>
                <Button className="w-full" variant="outline" onClick={() => handleQuickAction("reactivate")}>
                  <UserX className="w-4 h-4 mr-2" />
                  Reativar Inativos
                </Button>
                <Button className="w-full" variant="outline" onClick={() => handleQuickAction("vip")}>
                  <Star className="w-4 h-4 mr-2" />
                  Programa VIP
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>

      {/* Modal Novo Morador */}
      <Dialog open={newResidentModalOpen} onOpenChange={setNewResidentModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Novo Morador</span>
            </DialogTitle>
            <DialogDescription>
              Cadastre um novo morador na plataforma
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Digite o nome completo"
                value={newResidentData.name}
                onChange={(e) => setNewResidentData({...newResidentData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite o e-mail"
                value={newResidentData.email}
                onChange={(e) => setNewResidentData({...newResidentData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                value={newResidentData.phone}
                onChange={(e) => setNewResidentData({...newResidentData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Endereço</Label>
              <Textarea
                id="address"
                placeholder="Digite o endereço completo"
                value={newResidentData.address}
                onChange={(e) => setNewResidentData({...newResidentData, address: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewResidentModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveNewResident} disabled={!newResidentData.name || !newResidentData.email}>
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Visualizar Morador */}
      <Dialog open={viewResidentModalOpen} onOpenChange={setViewResidentModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Detalhes do Morador</span>
            </DialogTitle>
            <DialogDescription>
              Informações completas do morador
            </DialogDescription>
          </DialogHeader>
          {selectedResident && (
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold">{selectedResident.name}</h3>
                    {getStatusBadge(selectedResident.status)}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedResident.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{selectedResident.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedResident.totalOrders}</div>
                  <div className="text-sm text-muted-foreground">Total de Pedidos</div>
                  <div className="text-xs text-muted-foreground mt-1">{selectedResident.lastOrder}</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedResident.totalSpent}</div>
                  <div className="text-sm text-muted-foreground">Total Gasto</div>
                  <div className="text-xs text-muted-foreground mt-1">{selectedResident.loyaltyPoints} pontos</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center space-x-1">
                    <Star className="w-6 h-6 fill-current" />
                    <span>{selectedResident.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Avaliação</div>
                </div>
              </div>

              {/* Informações Adicionais */}
              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium">Endereço</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{selectedResident.address}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Data de Cadastro</Label>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Desde {selectedResident.joinDate}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewResidentModalOpen(false)}>
              Fechar
            </Button>
            <Button onClick={() => {
              setViewResidentModalOpen(false)
              handleEditResident(selectedResident)
            }}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Morador */}
      <Dialog open={editResidentModalOpen} onOpenChange={setEditResidentModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="w-5 h-5" />
              <span>Editar Morador</span>
            </DialogTitle>
            <DialogDescription>
              Atualize as informações do morador
            </DialogDescription>
          </DialogHeader>
          {selectedResident && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome Completo</Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedResident.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">E-mail</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedResident.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Telefone</Label>
                <Input
                  id="edit-phone"
                  defaultValue={selectedResident.phone}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-address">Endereço</Label>
                <Textarea
                  id="edit-address"
                  defaultValue={selectedResident.address}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditResidentModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEditResident}>
              <Edit className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}