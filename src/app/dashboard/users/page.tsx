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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ModeToggle } from "@/components/mode-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { 
  Users, 
  Store, 
  Truck, 
  User,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Ban,
  CheckCircle,
  MessageSquare,
  Send
} from "lucide-react"
import { Textarea } from "@/components/ui/textarea"

export default function UsersPage() {
  // Estados para modais
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [newUserModalOpen, setNewUserModalOpen] = useState(false)
  const [messageModalOpen, setMessageModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [userType, setUserType] = useState("")
  const [messageText, setMessageText] = useState("")

  const residents = [
    { 
      id: 1, 
      name: "João Silva", 
      email: "joao@email.com", 
      phone: "(11) 99999-1111", 
      status: "Ativo", 
      orders: 15,
      address: "Rua das Flores, 123 - São Paulo, SP",
      joinDate: "2024-01-15",
      lastOrder: "2024-04-10"
    },
    { 
      id: 2, 
      name: "Maria Santos", 
      email: "maria@email.com", 
      phone: "(11) 99999-2222", 
      status: "Ativo", 
      orders: 8,
      address: "Av. Central, 456 - São Paulo, SP",
      joinDate: "2024-02-20",
      lastOrder: "2024-04-12"
    },
    { 
      id: 3, 
      name: "Pedro Costa", 
      email: "pedro@email.com", 
      phone: "(11) 99999-3333", 
      status: "Inativo", 
      orders: 3,
      address: "Rua do Comércio, 789 - São Paulo, SP",
      joinDate: "2024-03-05",
      lastOrder: "2024-03-20"
    },
  ]

  const merchants = [
    { 
      id: 1, 
      name: "Padaria Central", 
      owner: "Carlos Oliveira", 
      email: "carlos@padaria.com", 
      phone: "(11) 99999-1111",
      status: "Ativo", 
      sales: "R$ 15.230",
      address: "Rua das Flores, 123 - São Paulo, SP",
      category: "Padaria",
      joinDate: "2024-01-10"
    },
    { 
      id: 2, 
      name: "Farmácia Saúde", 
      owner: "Ana Lima", 
      email: "ana@farmacia.com", 
      phone: "(11) 99999-2222",
      status: "Ativo", 
      sales: "R$ 8.450",
      address: "Av. Central, 456 - São Paulo, SP",
      category: "Farmácia",
      joinDate: "2024-01-20"
    },
    { 
      id: 3, 
      name: "Mercado Bom Preço", 
      owner: "José Santos", 
      email: "jose@mercado.com", 
      phone: "(11) 99999-3333",
      status: "Pendente", 
      sales: "R$ 0",
      address: "Rua do Comércio, 789 - São Paulo, SP",
      category: "Supermercado",
      joinDate: "2024-04-01"
    },
  ]

  const drivers = [
    { 
      id: 1, 
      name: "Roberto Silva", 
      email: "roberto@email.com", 
      phone: "(11) 99999-4444", 
      status: "Online", 
      deliveries: 45,
      vehicle: "Moto Honda CG 160",
      license: "ABC-1234",
      rating: 4.8,
      joinDate: "2024-01-05"
    },
    { 
      id: 2, 
      name: "Marcos Pereira", 
      email: "marcos@email.com", 
      phone: "(11) 99999-5555", 
      status: "Offline", 
      deliveries: 32,
      vehicle: "Bicicleta Elétrica",
      license: "N/A",
      rating: 4.6,
      joinDate: "2024-02-10"
    },
    { 
      id: 3, 
      name: "Lucas Ferreira", 
      email: "lucas@email.com", 
      phone: "(11) 99999-6666", 
      status: "Em entrega", 
      deliveries: 28,
      vehicle: "Moto Yamaha Factor",
      license: "XYZ-5678",
      rating: 4.9,
      joinDate: "2024-02-15"
    },
  ]

  const professionals = [
    { 
      id: 1, 
      name: "Dr. Fernando", 
      service: "Veterinário", 
      email: "fernando@vet.com", 
      phone: "(11) 99999-7777",
      status: "Ativo", 
      appointments: 12,
      specialty: "Clínica Geral",
      experience: "10 anos",
      rating: 4.9,
      joinDate: "2024-01-08"
    },
    { 
      id: 2, 
      name: "Maria Técnica", 
      service: "Técnica em Informática", 
      email: "maria@tech.com", 
      phone: "(11) 99999-8888",
      status: "Ativo", 
      appointments: 8,
      specialty: "Reparos e Manutenção",
      experience: "5 anos",
      rating: 4.7,
      joinDate: "2024-02-01"
    },
    { 
      id: 3, 
      name: "João Eletricista", 
      service: "Eletricista", 
      email: "joao@eletrica.com", 
      phone: "(11) 99999-9999",
      status: "Ocupado", 
      appointments: 15,
      specialty: "Instalações Residenciais",
      experience: "8 anos",
      rating: 4.8,
      joinDate: "2024-01-25"
    },
  ]

  // Funções para ações
  const handleView = (user: any, type: string) => {
    setSelectedUser(user)
    setUserType(type)
    setViewModalOpen(true)
  }

  const handleEdit = (user: any, type: string) => {
    setSelectedUser(user)
    setUserType(type)
    setEditModalOpen(true)
  }

  const handleDelete = (user: any, type: string) => {
    setSelectedUser(user)
    setUserType(type)
    setDeleteDialogOpen(true)
  }

  const handleSaveEdit = () => {
    // Aqui você implementaria a lógica para salvar as alterações
    console.log("Salvando alterações para:", selectedUser)
    setEditModalOpen(false)
    setSelectedUser(null)
  }

  const handleConfirmDelete = () => {
    // Aqui você implementaria a lógica para deletar o usuário
    console.log("Deletando usuário:", selectedUser)
    setDeleteDialogOpen(false)
    setSelectedUser(null)
  }

  const handleStatusChange = (user: any, newStatus: string) => {
    // Aqui você implementaria a lógica para alterar o status
    console.log(`Alterando status de ${user.name} para ${newStatus}`)
  }

  const handleNewUser = () => {
    setNewUserModalOpen(true)
  }

  const handleSendMessage = (user: any) => {
    setSelectedUser(user)
    setMessageModalOpen(true)
  }

  const handleSendMessageConfirm = () => {
    if (messageText.trim()) {
      // Aqui você implementaria a lógica real para enviar mensagem
      console.log(`Enviando mensagem para ${selectedUser?.name}: ${messageText}`)
      alert(`Mensagem enviada para ${selectedUser?.name}!`)
      setMessageText("")
      setMessageModalOpen(false)
      setSelectedUser(null)
    }
  }

  const handleCreateUser = () => {
    // Aqui você implementaria a lógica para criar novo usuário
    console.log("Criando novo usuário")
    alert("Funcionalidade de criar usuário será implementada!")
    setNewUserModalOpen(false)
  }

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
                  <BreadcrumbPage>Gestão de Usuários</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Gestão de Usuários</h1>
              <p className="text-muted-foreground">
                Gerencie todos os usuários da plataforma
              </p>
            </div>
            <Button onClick={handleNewUser}>
              <Plus className="w-4 h-4 mr-2" />
              Novo Usuário
            </Button>
          </div>

          <Tabs defaultValue="residents" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="residents" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Moradores
              </TabsTrigger>
              <TabsTrigger value="merchants" className="flex items-center gap-2">
                <Store className="w-4 h-4" />
                Comerciantes
              </TabsTrigger>
              <TabsTrigger value="drivers" className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Entregadores
              </TabsTrigger>
              <TabsTrigger value="professionals" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profissionais
              </TabsTrigger>
            </TabsList>

            <TabsContent value="residents" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Moradores ({residents.length})</CardTitle>
                  <CardDescription>
                    Lista de todos os moradores cadastrados na plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {residents.map((resident) => (
                      <div key={resident.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{resident.name}</p>
                            <p className="text-sm text-muted-foreground">{resident.email}</p>
                            <p className="text-sm text-muted-foreground">{resident.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge variant={resident.status === "Ativo" ? "default" : "secondary"}>
                              {resident.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{resident.orders} pedidos</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleView(resident, "resident")}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(resident, "resident")}
                            >
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
                                <DropdownMenuItem onClick={() => handleSendMessage(resident)}>
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Enviar Mensagem
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(resident, resident.status === "Ativo" ? "Inativo" : "Ativo")}>
                                  {resident.status === "Ativo" ? (
                                    <>
                                      <Ban className="w-4 h-4 mr-2" />
                                      Desativar
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Ativar
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(resident, "resident")}
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
            </TabsContent>

            <TabsContent value="merchants" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Comerciantes ({merchants.length})</CardTitle>
                  <CardDescription>
                    Lista de todos os comerciantes e suas lojas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {merchants.map((merchant) => (
                      <div key={merchant.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Store className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{merchant.name}</p>
                            <p className="text-sm text-muted-foreground">Proprietário: {merchant.owner}</p>
                            <p className="text-sm text-muted-foreground">{merchant.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge variant={merchant.status === "Ativo" ? "default" : merchant.status === "Pendente" ? "secondary" : "outline"}>
                              {merchant.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">Vendas: {merchant.sales}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleView(merchant, "merchant")}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(merchant, "merchant")}
                            >
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
                                <DropdownMenuItem onClick={() => handleSendMessage(merchant)}>
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Enviar Mensagem
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(merchant, merchant.status === "Ativo" ? "Inativo" : "Ativo")}>
                                  {merchant.status === "Ativo" ? (
                                    <>
                                      <Ban className="w-4 h-4 mr-2" />
                                      Desativar
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Ativar
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(merchant, "merchant")}
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
            </TabsContent>

            <TabsContent value="drivers" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Entregadores ({drivers.length})</CardTitle>
                  <CardDescription>
                    Lista de todos os entregadores cadastrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {drivers.map((driver) => (
                      <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Truck className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{driver.name}</p>
                            <p className="text-sm text-muted-foreground">{driver.email}</p>
                            <p className="text-sm text-muted-foreground">{driver.phone}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge variant={
                              driver.status === "Online" ? "default" : 
                              driver.status === "Em entrega" ? "secondary" : 
                              "outline"
                            }>
                              {driver.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{driver.deliveries} entregas</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleView(driver, "driver")}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(driver, "driver")}
                            >
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
                                <DropdownMenuItem onClick={() => handleSendMessage(driver)}>
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Enviar Mensagem
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(driver, driver.status === "Online" ? "Offline" : "Online")}>
                                  {driver.status === "Online" ? (
                                    <>
                                      <Ban className="w-4 h-4 mr-2" />
                                      Colocar Offline
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Colocar Online
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(driver, "driver")}
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
            </TabsContent>

            <TabsContent value="professionals" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Profissionais ({professionals.length})</CardTitle>
                  <CardDescription>
                    Lista de todos os profissionais de serviços
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {professionals.map((professional) => (
                      <div key={professional.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{professional.name}</p>
                            <p className="text-sm text-muted-foreground">{professional.service}</p>
                            <p className="text-sm text-muted-foreground">{professional.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge variant={
                              professional.status === "Ativo" ? "default" : 
                              professional.status === "Ocupado" ? "secondary" : 
                              "outline"
                            }>
                              {professional.status}
                            </Badge>
                            <p className="text-sm text-muted-foreground mt-1">{professional.appointments} agendamentos</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleView(professional, "professional")}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleEdit(professional, "professional")}
                            >
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
                                <DropdownMenuItem onClick={() => handleSendMessage(professional)}>
                                  <MessageSquare className="w-4 h-4 mr-2" />
                                  Enviar Mensagem
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(professional, professional.status === "Ativo" ? "Inativo" : "Ativo")}>
                                  {professional.status === "Ativo" ? (
                                    <>
                                      <Ban className="w-4 h-4 mr-2" />
                                      Desativar
                                    </>
                                  ) : (
                                    <>
                                      <CheckCircle className="w-4 h-4 mr-2" />
                                      Ativar
                                    </>
                                  )}
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(professional, "professional")}
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
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>

      {/* Modal de Visualização */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Detalhes do {userType === "resident" ? "Morador" : userType === "merchant" ? "Comerciante" : userType === "driver" ? "Entregador" : "Profissional"}</DialogTitle>
            <DialogDescription>
              Informações completas do usuário selecionado
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  {userType === "resident" && <Users className="w-8 h-8 text-primary" />}
                  {userType === "merchant" && <Store className="w-8 h-8 text-primary" />}
                  {userType === "driver" && <Truck className="w-8 h-8 text-primary" />}
                  {userType === "professional" && <User className="w-8 h-8 text-primary" />}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{selectedUser.name}</h3>
                  <Badge variant={selectedUser.status === "Ativo" || selectedUser.status === "Online" ? "default" : "secondary"}>
                    {selectedUser.status}
                  </Badge>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Label>
                  <p className="text-sm">{selectedUser.email}</p>
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>Telefone</span>
                  </Label>
                  <p className="text-sm">{selectedUser.phone}</p>
                </div>
                {selectedUser.address && (
                  <div className="space-y-2 md:col-span-2">
                    <Label className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4" />
                      <span>Endereço</span>
                    </Label>
                    <p className="text-sm">{selectedUser.address}</p>
                  </div>
                )}
                <div className="space-y-2">
                  <Label className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Data de Cadastro</span>
                  </Label>
                  <p className="text-sm">{new Date(selectedUser.joinDate).toLocaleDateString('pt-BR')}</p>
                </div>
                
                {/* Campos específicos por tipo */}
                {userType === "resident" && (
                  <>
                    <div className="space-y-2">
                      <Label>Total de Pedidos</Label>
                      <p className="text-sm font-medium">{selectedUser.orders}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Último Pedido</Label>
                      <p className="text-sm">{new Date(selectedUser.lastOrder).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </>
                )}
                
                {userType === "merchant" && (
                  <>
                    <div className="space-y-2">
                      <Label>Proprietário</Label>
                      <p className="text-sm font-medium">{selectedUser.owner}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Categoria</Label>
                      <p className="text-sm">{selectedUser.category}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Vendas Totais</Label>
                      <p className="text-sm font-medium">{selectedUser.sales}</p>
                    </div>
                  </>
                )}
                
                {userType === "driver" && (
                  <>
                    <div className="space-y-2">
                      <Label>Veículo</Label>
                      <p className="text-sm">{selectedUser.vehicle}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Placa</Label>
                      <p className="text-sm">{selectedUser.license}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Total de Entregas</Label>
                      <p className="text-sm font-medium">{selectedUser.deliveries}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Avaliação</Label>
                      <p className="text-sm">⭐ {selectedUser.rating}</p>
                    </div>
                  </>
                )}
                
                {userType === "professional" && (
                  <>
                    <div className="space-y-2">
                      <Label>Serviço</Label>
                      <p className="text-sm">{selectedUser.service}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Especialidade</Label>
                      <p className="text-sm">{selectedUser.specialty}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Experiência</Label>
                      <p className="text-sm">{selectedUser.experience}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Agendamentos</Label>
                      <p className="text-sm font-medium">{selectedUser.appointments}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>Avaliação</Label>
                      <p className="text-sm">⭐ {selectedUser.rating}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Edição */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar {userType === "resident" ? "Morador" : userType === "merchant" ? "Comerciante" : userType === "driver" ? "Entregador" : "Profissional"}</DialogTitle>
            <DialogDescription>
              Altere as informações do usuário
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nome</Label>
                  <Input id="edit-name" defaultValue={selectedUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-email">Email</Label>
                  <Input id="edit-email" defaultValue={selectedUser.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-phone">Telefone</Label>
                  <Input id="edit-phone" defaultValue={selectedUser.phone} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select defaultValue={selectedUser.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                      {userType === "resident" && (
                        <>
                          <SelectItem value="Ativo">Ativo</SelectItem>
                          <SelectItem value="Inativo">Inativo</SelectItem>
                          <SelectItem value="Suspenso">Suspenso</SelectItem>
                        </>
                      )}
                      {userType === "merchant" && (
                        <>
                          <SelectItem value="Ativo">Ativo</SelectItem>
                          <SelectItem value="Inativo">Inativo</SelectItem>
                          <SelectItem value="Pendente">Pendente</SelectItem>
                          <SelectItem value="Suspenso">Suspenso</SelectItem>
                        </>
                      )}
                      {userType === "driver" && (
                        <>
                          <SelectItem value="Online">Online</SelectItem>
                          <SelectItem value="Offline">Offline</SelectItem>
                          <SelectItem value="Em entrega">Em entrega</SelectItem>
                          <SelectItem value="Suspenso">Suspenso</SelectItem>
                        </>
                      )}
                      {userType === "professional" && (
                        <>
                          <SelectItem value="Ativo">Ativo</SelectItem>
                          <SelectItem value="Inativo">Inativo</SelectItem>
                          <SelectItem value="Ocupado">Ocupado</SelectItem>
                          <SelectItem value="Suspenso">Suspenso</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>
                {selectedUser.address && (
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="edit-address">Endereço</Label>
                    <Input id="edit-address" defaultValue={selectedUser.address} />
                  </div>
                )}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEdit}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog de Confirmação de Exclusão */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir {selectedUser?.name}? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete} className="bg-red-600 hover:bg-red-700">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Modal de Novo Usuário */}
      <Dialog open={newUserModalOpen} onOpenChange={setNewUserModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Criar Novo Usuário</DialogTitle>
            <DialogDescription>
              Adicione um novo usuário à plataforma
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="new-user-type">Tipo de Usuário</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo de usuário" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resident">Morador</SelectItem>
                  <SelectItem value="merchant">Comerciante</SelectItem>
                  <SelectItem value="driver">Entregador</SelectItem>
                  <SelectItem value="professional">Profissional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="new-name">Nome</Label>
                <Input id="new-name" placeholder="Digite o nome completo" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-email">Email</Label>
                <Input id="new-email" type="email" placeholder="Digite o email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-phone">Telefone</Label>
                <Input id="new-phone" placeholder="(11) 99999-9999" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-status">Status</Label>
                <Select defaultValue="Ativo">
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Ativo">Ativo</SelectItem>
                    <SelectItem value="Inativo">Inativo</SelectItem>
                    <SelectItem value="Pendente">Pendente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="new-address">Endereço</Label>
                <Input id="new-address" placeholder="Digite o endereço completo" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewUserModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateUser}>
              <Plus className="w-4 h-4 mr-2" />
              Criar Usuário
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Enviar Mensagem */}
      <Dialog open={messageModalOpen} onOpenChange={setMessageModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Enviar Mensagem</DialogTitle>
            <DialogDescription>
              Envie uma mensagem para {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="message-text">Mensagem</Label>
              <Textarea
                id="message-text"
                placeholder="Digite sua mensagem aqui..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                rows={4}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setMessageModalOpen(false)
              setMessageText("")
              setSelectedUser(null)
            }}>
              Cancelar
            </Button>
            <Button onClick={handleSendMessageConfirm} disabled={!messageText.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Enviar Mensagem
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}