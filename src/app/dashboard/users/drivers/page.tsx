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
  Truck,
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
  Navigation,
  User,
  Activity,
  Ban,
  MessageSquare,
  Gift,
  History,
  Trash2,
  CheckCircle,
  XCircle,
  Route
} from "lucide-react"

export default function DriversPage() {
  const [newDriverModalOpen, setNewDriverModalOpen] = useState(false)
  const [viewDriverModalOpen, setViewDriverModalOpen] = useState(false)
  const [editDriverModalOpen, setEditDriverModalOpen] = useState(false)
  const [selectedDriver, setSelectedDriver] = useState<any>(null)
  const [newDriverData, setNewDriverData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    vehicle: "",
    licensePlate: ""
  })

  const handleNewDriver = () => {
    setNewDriverModalOpen(true)
  }

  const handleViewDriver = (driver: any) => {
    setSelectedDriver(driver)
    setViewDriverModalOpen(true)
  }

  const handleEditDriver = (driver: any) => {
    setSelectedDriver(driver)
    setEditDriverModalOpen(true)
  }

  const handleSaveNewDriver = () => {
    console.log("Novo entregador:", newDriverData)
    alert(`Entregador "${newDriverData.name}" cadastrado com sucesso!`)
    setNewDriverModalOpen(false)
    setNewDriverData({
      name: "",
      email: "",
      phone: "",
      address: "",
      vehicle: "",
      licensePlate: ""
    })
  }

  const handleSaveEditDriver = () => {
    console.log("Editando entregador:", selectedDriver)
    alert(`Dados do entregador "${selectedDriver?.name}" atualizados com sucesso!`)
    setEditDriverModalOpen(false)
    setSelectedDriver(null)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "comunicado":
        alert("Comunicado enviado para todos os entregadores ativos!")
        break
      case "rotas":
        alert("Sistema de otimização de rotas ativado!")
        break
      case "incentivos":
        alert("Programa de incentivos iniciado para entregadores!")
        break
      default:
        break
    }
  }

  const handleDropdownAction = (action: string, driver: any) => {
    switch (action) {
      case "message":
        alert(`Enviando mensagem para ${driver.name}`)
        break
      case "activate":
        alert(`Entregador ${driver.name} foi ativado`)
        break
      case "suspend":
        alert(`Entregador ${driver.name} foi suspenso`)
        break
      case "bonus":
        alert(`Enviando bônus para ${driver.name}`)
        break
      case "history":
        alert(`Visualizando histórico de ${driver.name}`)
        break
      case "route":
        alert(`Otimizando rota para ${driver.name}`)
        break
      case "delete":
        if (confirm(`Tem certeza que deseja excluir ${driver.name}?`)) {
          alert(`Entregador ${driver.name} foi removido`)
        }
        break
      default:
        break
    }
  }
  const drivers = [
    {
      id: 1,
      name: "Roberto Silva",
      email: "roberto.silva@email.com",
      phone: "(11) 99999-1111",
      address: "Rua das Palmeiras, 456 - Zona Norte",
      joinDate: "15/10/2023",
      status: "Online",
      isActive: true,
      vehicle: "Moto Honda CG 160",
      licensePlate: "ABC-1234",
      totalDeliveries: 456,
      monthlyEarnings: "R$ 3.240,80",
      rating: 4.9,
      completionRate: 98,
      avgDeliveryTime: "22 min",
      totalDistance: "1.245 km",
      currentLocation: "Zona Norte"
    },
    {
      id: 2,
      name: "Marcos Pereira",
      email: "marcos.pereira@email.com",
      phone: "(11) 99999-2222",
      address: "Av. Central, 789 - Centro",
      joinDate: "22/11/2023",
      status: "Em entrega",
      isActive: true,
      vehicle: "Moto Yamaha Factor",
      licensePlate: "DEF-5678",
      totalDeliveries: 389,
      monthlyEarnings: "R$ 2.890,50",
      rating: 4.8,
      completionRate: 96,
      avgDeliveryTime: "25 min",
      totalDistance: "1.089 km",
      currentLocation: "Centro"
    },
    {
      id: 3,
      name: "Lucas Ferreira",
      email: "lucas.ferreira@email.com",
      phone: "(11) 99999-3333",
      address: "Rua do Comércio, 321 - Zona Sul",
      joinDate: "08/12/2023",
      status: "Offline",
      isActive: true,
      vehicle: "Bicicleta Elétrica",
      licensePlate: "N/A",
      totalDeliveries: 234,
      monthlyEarnings: "R$ 1.890,30",
      rating: 4.7,
      completionRate: 94,
      avgDeliveryTime: "28 min",
      totalDistance: "567 km",
      currentLocation: "Zona Sul"
    },
    {
      id: 4,
      name: "Carlos Oliveira",
      email: "carlos.oliveira@email.com",
      phone: "(11) 99999-4444",
      address: "Praça da Paz, 654 - Zona Norte",
      joinDate: "30/01/2024",
      status: "Online",
      isActive: true,
      vehicle: "Moto Honda Biz",
      licensePlate: "GHI-9012",
      totalDeliveries: 167,
      monthlyEarnings: "R$ 2.340,70",
      rating: 4.6,
      completionRate: 92,
      avgDeliveryTime: "30 min",
      totalDistance: "445 km",
      currentLocation: "Zona Norte"
    },
    {
      id: 5,
      name: "Ana Lima",
      email: "ana.lima@email.com",
      phone: "(11) 99999-5555",
      address: "Rua Nova, 987 - Centro",
      joinDate: "12/02/2024",
      status: "Pausado",
      isActive: true,
      vehicle: "Carro Fiat Uno",
      licensePlate: "JKL-3456",
      totalDeliveries: 89,
      monthlyEarnings: "R$ 1.560,40",
      rating: 4.5,
      completionRate: 90,
      avgDeliveryTime: "35 min",
      totalDistance: "234 km",
      currentLocation: "Centro"
    },
    {
      id: 6,
      name: "José Santos",
      email: "jose.santos@email.com",
      phone: "(11) 99999-6666",
      address: "Av. Beira Mar, 147 - Zona Sul",
      joinDate: "25/03/2024",
      status: "Suspenso",
      isActive: false,
      vehicle: "Moto Yamaha XTZ",
      licensePlate: "MNO-7890",
      totalDeliveries: 45,
      monthlyEarnings: "R$ 890,20",
      rating: 3.8,
      completionRate: 78,
      avgDeliveryTime: "45 min",
      totalDistance: "123 km",
      currentLocation: "Zona Sul"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Online":
        return <Badge variant="success">Online</Badge>
      case "Em entrega":
        return <Badge variant="info">Em entrega</Badge>
      case "Offline":
        return <Badge variant="outline">Offline</Badge>
      case "Pausado":
        return <Badge variant="secondary">Pausado</Badge>
      case "Suspenso":
        return <Badge variant="destructive">Suspenso</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getVehicleIcon = (vehicle: string) => {
    if (vehicle.includes("Bicicleta")) return <Truck className="w-6 h-6 text-blue-500" />
    if (vehicle.includes("Carro")) return <Truck className="w-6 h-6 text-green-500" />
    return <Truck className="w-6 h-6 text-orange-500" />
  }

  const onlineDrivers = drivers.filter(d => d.status === "Online").length
  const activeDrivers = drivers.filter(d => d.isActive).length
  const inDelivery = drivers.filter(d => d.status === "Em entrega").length

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
                  <BreadcrumbPage>Entregadores</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Entregadores</h1>
              <p className="text-muted-foreground">
                Gerencie todos os entregadores cadastrados na plataforma
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar entregadores..." className="pl-8 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button onClick={handleNewDriver}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Entregador
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Entregadores</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{drivers.length}</div>
                <p className="text-xs text-muted-foreground">
                  +2 novos este mês
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Online Agora</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{onlineDrivers}</div>
                <p className="text-xs text-muted-foreground">
                  {inDelivery} em entrega
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ganhos Totais</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 12.802</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+18%</span> vs mês anterior
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
                  dos entregadores ativos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Drivers List */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Entregadores</CardTitle>
              <CardDescription>
                Todos os entregadores cadastrados na plataforma com suas informações detalhadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {drivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        {getVehicleIcon(driver.vehicle)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-lg">{driver.name}</p>
                          {getStatusBadge(driver.status)}
                          {driver.completionRate >= 95 && (
                            <Badge variant="warning">Top Performer</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{driver.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{driver.phone}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{driver.currentLocation}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <span>{driver.vehicle}</span>
                          {driver.licensePlate !== "N/A" && (
                            <span>Placa: {driver.licensePlate}</span>
                          )}
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span>Desde {driver.joinDate}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Entregas</p>
                        <p className="font-bold">{driver.totalDeliveries}</p>
                        <p className="text-xs text-muted-foreground">{driver.completionRate}% conclusão</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Ganhos Mensais</p>
                        <p className="font-bold text-lg text-green-600">{driver.monthlyEarnings}</p>
                        <p className="text-xs text-muted-foreground">{driver.totalDistance} percorridos</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Performance</p>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-bold">{driver.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{driver.avgDeliveryTime}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewDriver(driver)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditDriver(driver)}>
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
                            <DropdownMenuItem onClick={() => handleDropdownAction("message", driver)}>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Enviar Mensagem
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDropdownAction("route", driver)}>
                              <Route className="w-4 h-4 mr-2" />
                              Otimizar Rota
                            </DropdownMenuItem>
                            {!driver.isActive && (
                              <DropdownMenuItem onClick={() => handleDropdownAction("activate", driver)}>
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Ativar Entregador
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDropdownAction("bonus", driver)}>
                              <Gift className="w-4 h-4 mr-2" />
                              Enviar Bônus
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDropdownAction("history", driver)}>
                              <History className="w-4 h-4 mr-2" />
                              Ver Histórico
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDropdownAction("suspend", driver)}>
                              <Ban className="w-4 h-4 mr-2" />
                              Suspender
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDropdownAction("delete", driver)}
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
                  <span className="text-sm">Total de Entregas:</span>
                  <span className="font-bold">{drivers.reduce((acc, d) => acc + d.totalDeliveries, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Distância Total:</span>
                  <span className="font-bold">{drivers.reduce((acc, d) => acc + parseInt(d.totalDistance), 0)} km</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Taxa de Conclusão:</span>
                  <span className="font-bold">{Math.round(drivers.reduce((acc, d) => acc + d.completionRate, 0) / drivers.length)}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status dos Entregadores</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Online:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-green-500"
                        style={{ width: `${(onlineDrivers / drivers.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{onlineDrivers}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Em Entrega:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(inDelivery / drivers.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{inDelivery}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Ativos:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-purple-500"
                        style={{ width: `${(activeDrivers / drivers.length) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-bold">{activeDrivers}</span>
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
                <Button className="w-full" variant="outline" onClick={() => handleQuickAction("rotas")}>
                  <Navigation className="w-4 h-4 mr-2" />
                  Otimizar Rotas
                </Button>
                <Button className="w-full" variant="outline" onClick={() => handleQuickAction("incentivos")}>
                  <User className="w-4 h-4 mr-2" />
                  Programa Incentivos
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>

      {/* Modal Novo Entregador */}
      <Dialog open={newDriverModalOpen} onOpenChange={setNewDriverModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Novo Entregador</span>
            </DialogTitle>
            <DialogDescription>
              Cadastre um novo entregador na plataforma
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Digite o nome completo"
                value={newDriverData.name}
                onChange={(e) => setNewDriverData({...newDriverData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite o e-mail"
                value={newDriverData.email}
                onChange={(e) => setNewDriverData({...newDriverData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                value={newDriverData.phone}
                onChange={(e) => setNewDriverData({...newDriverData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vehicle">Veículo</Label>
              <Select value={newDriverData.vehicle} onValueChange={(value) => setNewDriverData({...newDriverData, vehicle: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o veículo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Moto Honda CG 160">Moto Honda CG 160</SelectItem>
                  <SelectItem value="Moto Yamaha Factor">Moto Yamaha Factor</SelectItem>
                  <SelectItem value="Moto Honda Biz">Moto Honda Biz</SelectItem>
                  <SelectItem value="Bicicleta Elétrica">Bicicleta Elétrica</SelectItem>
                  <SelectItem value="Carro Fiat Uno">Carro Fiat Uno</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Endereço</Label>
              <Textarea
                id="address"
                placeholder="Digite o endereço completo"
                value={newDriverData.address}
                onChange={(e) => setNewDriverData({...newDriverData, address: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="licensePlate">Placa do Veículo</Label>
              <Input
                id="licensePlate"
                placeholder="ABC-1234 (opcional)"
                value={newDriverData.licensePlate}
                onChange={(e) => setNewDriverData({...newDriverData, licensePlate: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewDriverModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveNewDriver} disabled={!newDriverData.name || !newDriverData.email || !newDriverData.vehicle}>
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Visualizar Entregador */}
      <Dialog open={viewDriverModalOpen} onOpenChange={setViewDriverModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Detalhes do Entregador</span>
            </DialogTitle>
            <DialogDescription>
              Informações completas do entregador
            </DialogDescription>
          </DialogHeader>
          {selectedDriver && (
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  {getVehicleIcon(selectedDriver.vehicle)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold">{selectedDriver.name}</h3>
                    {getStatusBadge(selectedDriver.status)}
                    {selectedDriver.completionRate >= 95 && (
                      <Badge variant="warning">Top Performer</Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Veículo: </span>
                      <span className="font-medium">{selectedDriver.vehicle}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Localização: </span>
                      <span className="font-medium">{selectedDriver.currentLocation}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedDriver.totalDeliveries}</div>
                  <div className="text-sm text-muted-foreground">Total de Entregas</div>
                  <div className="text-xs text-muted-foreground mt-1">{selectedDriver.completionRate}% conclusão</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedDriver.monthlyEarnings}</div>
                  <div className="text-sm text-muted-foreground">Ganhos Mensais</div>
                  <div className="text-xs text-muted-foreground mt-1">{selectedDriver.totalDistance} percorridos</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center space-x-1">
                    <Star className="w-6 h-6 fill-current" />
                    <span>{selectedDriver.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Avaliação</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{selectedDriver.avgDeliveryTime}</div>
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
                      <span className="text-sm">{selectedDriver.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedDriver.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedDriver.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Desde {selectedDriver.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Informações do Veículo</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Veículo:</span>
                      <span className="text-sm font-medium">{selectedDriver.vehicle}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Placa:</span>
                      <span className="text-sm font-medium">{selectedDriver.licensePlate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className="text-sm font-medium">{selectedDriver.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Ativo:</span>
                      <span className="text-sm font-medium">{selectedDriver.isActive ? "Sim" : "Não"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDriverModalOpen(false)}>
              Fechar
            </Button>
            <Button onClick={() => {
              setViewDriverModalOpen(false)
              handleEditDriver(selectedDriver)
            }}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Entregador */}
      <Dialog open={editDriverModalOpen} onOpenChange={setEditDriverModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="w-5 h-5" />
              <span>Editar Entregador</span>
            </DialogTitle>
            <DialogDescription>
              Atualize as informações do entregador
            </DialogDescription>
          </DialogHeader>
          {selectedDriver && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome Completo</Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedDriver.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">E-mail</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedDriver.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Telefone</Label>
                <Input
                  id="edit-phone"
                  defaultValue={selectedDriver.phone}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-vehicle">Veículo</Label>
                <Select defaultValue={selectedDriver.vehicle}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Moto Honda CG 160">Moto Honda CG 160</SelectItem>
                    <SelectItem value="Moto Yamaha Factor">Moto Yamaha Factor</SelectItem>
                    <SelectItem value="Moto Honda Biz">Moto Honda Biz</SelectItem>
                    <SelectItem value="Bicicleta Elétrica">Bicicleta Elétrica</SelectItem>
                    <SelectItem value="Carro Fiat Uno">Carro Fiat Uno</SelectItem>
                    <SelectItem value="Outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-address">Endereço</Label>
                <Textarea
                  id="edit-address"
                  defaultValue={selectedDriver.address}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-licensePlate">Placa do Veículo</Label>
                <Input
                  id="edit-licensePlate"
                  defaultValue={selectedDriver.licensePlate}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDriverModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEditDriver}>
              <Edit className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}