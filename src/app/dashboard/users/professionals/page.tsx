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
  User,
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
  Briefcase,
  Users,
  CheckCircle,
  Ban,
  MessageSquare,
  Gift,
  History,
  Trash2,
  UserCheck,
  XCircle,
  Award
} from "lucide-react"

export default function ProfessionalsPage() {
  const [newProfessionalModalOpen, setNewProfessionalModalOpen] = useState(false)
  const [viewProfessionalModalOpen, setViewProfessionalModalOpen] = useState(false)
  const [editProfessionalModalOpen, setEditProfessionalModalOpen] = useState(false)
  const [selectedProfessional, setSelectedProfessional] = useState<any>(null)
  const [newProfessionalData, setNewProfessionalData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    service: "",
    category: "",
    workingHours: "",
    experience: "",
    specialties: ""
  })

  const handleNewProfessional = () => {
    setNewProfessionalModalOpen(true)
  }

  const handleViewProfessional = (professional: any) => {
    setSelectedProfessional(professional)
    setViewProfessionalModalOpen(true)
  }

  const handleEditProfessional = (professional: any) => {
    setSelectedProfessional(professional)
    setEditProfessionalModalOpen(true)
  }

  const handleSaveNewProfessional = () => {
    console.log("Novo profissional:", newProfessionalData)
    alert(`Profissional "${newProfessionalData.name}" cadastrado com sucesso!`)
    setNewProfessionalModalOpen(false)
    setNewProfessionalData({
      name: "",
      email: "",
      phone: "",
      address: "",
      service: "",
      category: "",
      workingHours: "",
      experience: "",
      specialties: ""
    })
  }

  const handleSaveEditProfessional = () => {
    console.log("Editando profissional:", selectedProfessional)
    alert(`Dados do profissional "${selectedProfessional?.name}" atualizados com sucesso!`)
    setEditProfessionalModalOpen(false)
    setSelectedProfessional(null)
  }

  const handleQuickAction = (action: string) => {
    switch (action) {
      case "newsletter":
        alert("Newsletter enviada para todos os profissionais ativos!")
        break
      case "agendas":
        alert("Sistema de gerenciamento de agendas ativado!")
        break
      case "parceiros":
        alert("Programa de parceiros iniciado para profissionais!")
        break
      default:
        break
    }
  }

  const handleDropdownAction = (action: string, professional: any) => {
    switch (action) {
      case "message":
        alert(`Enviando mensagem para ${professional.name}`)
        break
      case "activate":
        alert(`Profissional ${professional.name} foi ativado`)
        break
      case "suspend":
        alert(`Profissional ${professional.name} foi suspenso`)
        break
      case "bonus":
        alert(`Enviando bônus para ${professional.name}`)
        break
      case "history":
        alert(`Visualizando histórico de ${professional.name}`)
        break
      case "schedule":
        alert(`Gerenciando agenda de ${professional.name}`)
        break
      case "certificate":
        alert(`Verificando certificações de ${professional.name}`)
        break
      case "delete":
        if (confirm(`Tem certeza que deseja excluir ${professional.name}?`)) {
          alert(`Profissional ${professional.name} foi removido`)
        }
        break
      default:
        break
    }
  }
  const professionals = [
    {
      id: 1,
      name: "Dr. Fernando Oliveira",
      email: "fernando@vetclinica.com",
      phone: "(11) 99999-1111",
      address: "Rua das Flores, 123 - Zona Norte",
      service: "Veterinário",
      category: "Saúde Animal",
      joinDate: "20/09/2023",
      status: "Ativo",
      isAvailable: true,
      workingHours: "08:00 - 18:00",
      totalAppointments: 156,
      monthlyEarnings: "R$ 4.680,90",
      rating: 4.9,
      completionRate: 98,
      avgServiceTime: "45 min",
      specialties: ["Clínica Geral", "Cirurgia", "Vacinação"],
      experience: "8 anos"
    },
    {
      id: 2,
      name: "Maria Técnica",
      email: "maria@techsolutions.com",
      phone: "(11) 99999-2222",
      address: "Av. Central, 456 - Centro",
      service: "Técnica em Informática",
      category: "Tecnologia",
      joinDate: "15/11/2023",
      status: "Ativo",
      isAvailable: false,
      workingHours: "09:00 - 17:00",
      totalAppointments: 89,
      monthlyEarnings: "R$ 2.890,50",
      rating: 4.8,
      completionRate: 96,
      avgServiceTime: "60 min",
      specialties: ["Manutenção PC", "Instalação Software", "Redes"],
      experience: "5 anos"
    },
    {
      id: 3,
      name: "João Eletricista",
      email: "joao@eletricaexpress.com",
      phone: "(11) 99999-3333",
      address: "Rua do Comércio, 789 - Zona Sul",
      service: "Eletricista",
      category: "Manutenção",
      joinDate: "08/12/2023",
      status: "Ativo",
      isAvailable: true,
      workingHours: "07:00 - 19:00",
      totalAppointments: 234,
      monthlyEarnings: "R$ 3.450,80",
      rating: 4.7,
      completionRate: 94,
      avgServiceTime: "90 min",
      specialties: ["Instalação Elétrica", "Manutenção", "Emergência"],
      experience: "12 anos"
    },
    {
      id: 4,
      name: "Ana Cabeleireira",
      email: "ana@salaodebeleza.com",
      phone: "(11) 99999-4444",
      address: "Praça da Paz, 321 - Zona Norte",
      service: "Cabeleireira",
      category: "Beleza",
      joinDate: "30/01/2024",
      status: "Ativo",
      isAvailable: true,
      workingHours: "09:00 - 18:00",
      totalAppointments: 167,
      monthlyEarnings: "R$ 2.340,70",
      rating: 4.6,
      completionRate: 92,
      avgServiceTime: "120 min",
      specialties: ["Corte", "Coloração", "Tratamentos"],
      experience: "6 anos"
    },
    {
      id: 5,
      name: "Carlos Encanador",
      email: "carlos@hidraulicaexpress.com",
      phone: "(11) 99999-5555",
      address: "Rua Nova, 654 - Centro",
      service: "Encanador",
      category: "Manutenção",
      joinDate: "12/02/2024",
      status: "Ocupado",
      isAvailable: false,
      workingHours: "08:00 - 17:00",
      totalAppointments: 98,
      monthlyEarnings: "R$ 1.890,40",
      rating: 4.5,
      completionRate: 90,
      avgServiceTime: "75 min",
      specialties: ["Vazamentos", "Instalação", "Desentupimento"],
      experience: "10 anos"
    },
    {
      id: 6,
      name: "Lucia Massagista",
      email: "lucia@massoterapia.com",
      phone: "(11) 99999-6666",
      address: "Av. Beira Mar, 987 - Zona Sul",
      service: "Massagista",
      category: "Bem-estar",
      joinDate: "25/03/2024",
      status: "Inativo",
      isAvailable: false,
      workingHours: "10:00 - 20:00",
      totalAppointments: 45,
      monthlyEarnings: "R$ 1.260,30",
      rating: 4.3,
      completionRate: 88,
      avgServiceTime: "60 min",
      specialties: ["Relaxante", "Terapêutica", "Drenagem"],
      experience: "4 anos"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <Badge variant="default">Ativo</Badge>
      case "Ocupado":
        return <Badge variant="secondary" className="bg-yellow-500 text-white">Ocupado</Badge>
      case "Inativo":
        return <Badge variant="outline">Inativo</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      "Saúde Animal": "bg-green-100 text-green-800",
      "Tecnologia": "bg-blue-100 text-blue-800",
      "Manutenção": "bg-orange-100 text-orange-800",
      "Beleza": "bg-pink-100 text-pink-800",
      "Bem-estar": "bg-purple-100 text-purple-800"
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  const activeProfessionals = professionals.filter(p => p.status === "Ativo").length
  const availableProfessionals = professionals.filter(p => p.isAvailable).length
  const occupiedProfessionals = professionals.filter(p => p.status === "Ocupado").length

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
                  <BreadcrumbPage>Profissionais</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Profissionais</h1>
              <p className="text-muted-foreground">
                Gerencie todos os profissionais de serviços cadastrados na plataforma
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar profissionais..." className="pl-8 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button onClick={handleNewProfessional}>
                <Plus className="w-4 h-4 mr-2" />
                Novo Profissional
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Profissionais</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{professionals.length}</div>
                <p className="text-xs text-muted-foreground">
                  +4 novos este mês
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Disponíveis</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{availableProfessionals}</div>
                <p className="text-xs text-muted-foreground">
                  {occupiedProfessionals} ocupados
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 16.513</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+22%</span> vs mês anterior
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
                  dos profissionais ativos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Professionals List */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Profissionais</CardTitle>
              <CardDescription>
                Todos os profissionais de serviços cadastrados na plataforma com suas informações detalhadas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {professionals.map((professional) => (
                  <div key={professional.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Briefcase className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <p className="font-medium text-lg">{professional.name}</p>
                          <Badge className={`text-xs ${getCategoryColor(professional.category)}`}>
                            {professional.category}
                          </Badge>
                          {getStatusBadge(professional.status)}
                          {professional.isAvailable && professional.status === "Ativo" && (
                            <Badge variant="default" className="bg-green-500">Disponível</Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <span className="font-medium">{professional.service}</span>
                          <div className="flex items-center space-x-1">
                            <Mail className="w-3 h-3" />
                            <span>{professional.email}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Phone className="w-3 h-3" />
                            <span>{professional.phone}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{professional.address}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{professional.workingHours}</span>
                          </div>
                          <span>{professional.experience} de experiência</span>
                        </div>
                        <div className="flex items-center space-x-2 mt-2">
                          {professional.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Agendamentos</p>
                        <p className="font-bold">{professional.totalAppointments}</p>
                        <p className="text-xs text-muted-foreground">{professional.completionRate}% conclusão</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Ganhos Mensais</p>
                        <p className="font-bold text-lg text-green-600">{professional.monthlyEarnings}</p>
                        <p className="text-xs text-muted-foreground">Tempo médio: {professional.avgServiceTime}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Avaliação</p>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-bold">{professional.rating}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {professional.isAvailable ? "Disponível" : "Indisponível"}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleViewProfessional(professional)}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditProfessional(professional)}>
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
                            <DropdownMenuItem onClick={() => handleDropdownAction("message", professional)}>
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Enviar Mensagem
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDropdownAction("schedule", professional)}>
                              <Calendar className="w-4 h-4 mr-2" />
                              Gerenciar Agenda
                            </DropdownMenuItem>
                            {professional.status === "Inativo" && (
                              <DropdownMenuItem onClick={() => handleDropdownAction("activate", professional)}>
                                <UserCheck className="w-4 h-4 mr-2" />
                                Ativar Profissional
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem onClick={() => handleDropdownAction("certificate", professional)}>
                              <Award className="w-4 h-4 mr-2" />
                              Verificar Certificações
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDropdownAction("bonus", professional)}>
                              <Gift className="w-4 h-4 mr-2" />
                              Enviar Bônus
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDropdownAction("history", professional)}>
                              <History className="w-4 h-4 mr-2" />
                              Ver Histórico
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDropdownAction("suspend", professional)}>
                              <Ban className="w-4 h-4 mr-2" />
                              Suspender
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleDropdownAction("delete", professional)}
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
                  <span className="text-sm">Total de Agendamentos:</span>
                  <span className="font-bold">{professionals.reduce((acc, p) => acc + p.totalAppointments, 0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Receita Total:</span>
                  <span className="font-bold text-green-600">R$ 16.513,63</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Taxa de Conclusão:</span>
                  <span className="font-bold">{Math.round(professionals.reduce((acc, p) => acc + p.completionRate, 0) / professionals.length)}%</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Categorias de Serviços</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Manutenção:</span>
                  <span className="font-bold">2</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Saúde Animal:</span>
                  <span className="font-bold">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Tecnologia:</span>
                  <span className="font-bold">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Beleza:</span>
                  <span className="font-bold">1</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Bem-estar:</span>
                  <span className="font-bold">1</span>
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
                <Button className="w-full" variant="outline" onClick={() => handleQuickAction("agendas")}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Gerenciar Agendas
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

      {/* Modal Novo Profissional */}
      <Dialog open={newProfessionalModalOpen} onOpenChange={setNewProfessionalModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Plus className="w-5 h-5" />
              <span>Novo Profissional</span>
            </DialogTitle>
            <DialogDescription>
              Cadastre um novo profissional de serviços na plataforma
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome Completo</Label>
              <Input
                id="name"
                placeholder="Digite o nome completo"
                value={newProfessionalData.name}
                onChange={(e) => setNewProfessionalData({...newProfessionalData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite o e-mail"
                value={newProfessionalData.email}
                onChange={(e) => setNewProfessionalData({...newProfessionalData, email: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Telefone</Label>
              <Input
                id="phone"
                placeholder="(11) 99999-9999"
                value={newProfessionalData.phone}
                onChange={(e) => setNewProfessionalData({...newProfessionalData, phone: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="service">Serviço</Label>
              <Input
                id="service"
                placeholder="Ex: Veterinário, Eletricista"
                value={newProfessionalData.service}
                onChange={(e) => setNewProfessionalData({...newProfessionalData, service: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="category">Categoria</Label>
              <Select value={newProfessionalData.category} onValueChange={(value) => setNewProfessionalData({...newProfessionalData, category: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Saúde Animal">Saúde Animal</SelectItem>
                  <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="Manutenção">Manutenção</SelectItem>
                  <SelectItem value="Beleza">Beleza</SelectItem>
                  <SelectItem value="Bem-estar">Bem-estar</SelectItem>
                  <SelectItem value="Educação">Educação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="workingHours">Horário de Trabalho</Label>
              <Input
                id="workingHours"
                placeholder="Ex: 08:00 - 18:00"
                value={newProfessionalData.workingHours}
                onChange={(e) => setNewProfessionalData({...newProfessionalData, workingHours: e.target.value})}
              />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="address">Endereço</Label>
              <Textarea
                id="address"
                placeholder="Digite o endereço completo"
                value={newProfessionalData.address}
                onChange={(e) => setNewProfessionalData({...newProfessionalData, address: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experiência</Label>
              <Input
                id="experience"
                placeholder="Ex: 5 anos"
                value={newProfessionalData.experience}
                onChange={(e) => setNewProfessionalData({...newProfessionalData, experience: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="specialties">Especialidades</Label>
              <Input
                id="specialties"
                placeholder="Separadas por vírgula"
                value={newProfessionalData.specialties}
                onChange={(e) => setNewProfessionalData({...newProfessionalData, specialties: e.target.value})}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewProfessionalModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveNewProfessional} disabled={!newProfessionalData.name || !newProfessionalData.email || !newProfessionalData.service}>
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Visualizar Profissional */}
      <Dialog open={viewProfessionalModalOpen} onOpenChange={setViewProfessionalModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Detalhes do Profissional</span>
            </DialogTitle>
            <DialogDescription>
              Informações completas do profissional
            </DialogDescription>
          </DialogHeader>
          {selectedProfessional && (
            <div className="space-y-6">
              {/* Informações Básicas */}
              <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-xl font-bold">{selectedProfessional.name}</h3>
                    <Badge className={`text-xs ${getCategoryColor(selectedProfessional.category)}`}>
                      {selectedProfessional.category}
                    </Badge>
                    {getStatusBadge(selectedProfessional.status)}
                    {selectedProfessional.isAvailable && selectedProfessional.status === "Ativo" && (
                      <Badge variant="default" className="bg-green-500">Disponível</Badge>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Serviço: </span>
                      <span className="font-medium">{selectedProfessional.service}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Experiência: </span>
                      <span className="font-medium">{selectedProfessional.experience}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{selectedProfessional.totalAppointments}</div>
                  <div className="text-sm text-muted-foreground">Total de Agendamentos</div>
                  <div className="text-xs text-muted-foreground mt-1">{selectedProfessional.completionRate}% conclusão</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedProfessional.monthlyEarnings}</div>
                  <div className="text-sm text-muted-foreground">Ganhos Mensais</div>
                  <div className="text-xs text-muted-foreground mt-1">Tempo médio: {selectedProfessional.avgServiceTime}</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600 flex items-center justify-center space-x-1">
                    <Star className="w-6 h-6 fill-current" />
                    <span>{selectedProfessional.rating}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">Avaliação</div>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">
                    {selectedProfessional.isAvailable ? "Disponível" : "Indisponível"}
                  </div>
                  <div className="text-sm text-muted-foreground">Status Atual</div>
                  <div className="text-xs text-muted-foreground mt-1">{selectedProfessional.workingHours}</div>
                </div>
              </div>

              {/* Informações Detalhadas */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Informações de Contato</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedProfessional.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedProfessional.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{selectedProfessional.address}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Desde {selectedProfessional.joinDate}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Especialidades</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProfessional.specialties.map((specialty: string, index: number) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  <div className="space-y-3 mt-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Categoria:</span>
                      <span className="text-sm font-medium">{selectedProfessional.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Horário:</span>
                      <span className="text-sm font-medium">{selectedProfessional.workingHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      <span className="text-sm font-medium">{selectedProfessional.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewProfessionalModalOpen(false)}>
              Fechar
            </Button>
            <Button onClick={() => {
              setViewProfessionalModalOpen(false)
              handleEditProfessional(selectedProfessional)
            }}>
              <Edit className="w-4 h-4 mr-2" />
              Editar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal Editar Profissional */}
      <Dialog open={editProfessionalModalOpen} onOpenChange={setEditProfessionalModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Edit className="w-5 h-5" />
              <span>Editar Profissional</span>
            </DialogTitle>
            <DialogDescription>
              Atualize as informações do profissional
            </DialogDescription>
          </DialogHeader>
          {selectedProfessional && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">Nome Completo</Label>
                <Input
                  id="edit-name"
                  defaultValue={selectedProfessional.name}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-email">E-mail</Label>
                <Input
                  id="edit-email"
                  type="email"
                  defaultValue={selectedProfessional.email}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-phone">Telefone</Label>
                <Input
                  id="edit-phone"
                  defaultValue={selectedProfessional.phone}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-service">Serviço</Label>
                <Input
                  id="edit-service"
                  defaultValue={selectedProfessional.service}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Categoria</Label>
                <Select defaultValue={selectedProfessional.category}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Saúde Animal">Saúde Animal</SelectItem>
                    <SelectItem value="Tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="Manutenção">Manutenção</SelectItem>
                    <SelectItem value="Beleza">Beleza</SelectItem>
                    <SelectItem value="Bem-estar">Bem-estar</SelectItem>
                    <SelectItem value="Educação">Educação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-workingHours">Horário de Trabalho</Label>
                <Input
                  id="edit-workingHours"
                  defaultValue={selectedProfessional.workingHours}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="edit-address">Endereço</Label>
                <Textarea
                  id="edit-address"
                  defaultValue={selectedProfessional.address}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-experience">Experiência</Label>
                <Input
                  id="edit-experience"
                  defaultValue={selectedProfessional.experience}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-specialties">Especialidades</Label>
                <Input
                  id="edit-specialties"
                  defaultValue={selectedProfessional.specialties.join(", ")}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProfessionalModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSaveEditProfessional}>
              <Edit className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}