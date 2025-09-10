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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { ModeToggle } from "@/components/mode-toggle"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { 
  Gift, 
  Save,
  Plus,
  Edit,
  Trash2,
  Percent,
  Calendar,
  DollarSign,
  Target,
  Users,
  TrendingUp,
  Clock,
  Star,
  Tag
} from "lucide-react"

interface Promotion {
  id: number
  name: string
  type: "percentage" | "fixed" | "freeShipping" | "buyXGetY"
  value: string
  description: string
  startDate: string
  endDate: string
  status: "active" | "scheduled" | "expired" | "paused"
  usageCount: number
  usageLimit: number
  minOrderValue: string
  categories: string[]
}

interface PromotionStats {
  totalPromotions: number
  activePromotions: number
  totalSavings: string
  conversionRate: string
}

export default function PromotionsPage() {
  const [promotions, setPromotions] = useState<Promotion[]>([
    {
      id: 1,
      name: "Desconto de Boas-Vindas",
      type: "percentage",
      value: "15%",
      description: "Desconto especial para novos usuários",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      status: "active",
      usageCount: 1247,
      usageLimit: 5000,
      minOrderValue: "R$ 30,00",
      categories: ["Todos"]
    },
    {
      id: 2,
      name: "Frete Grátis Sexta",
      type: "freeShipping",
      value: "100%",
      description: "Frete grátis todas as sextas-feiras",
      startDate: "2024-01-05",
      endDate: "2024-12-27",
      status: "active",
      usageCount: 892,
      usageLimit: 0,
      minOrderValue: "R$ 25,00",
      categories: ["Todos"]
    },
    {
      id: 3,
      name: "Combo Almoço",
      type: "buyXGetY",
      value: "Compre 2, Leve 3",
      description: "Na compra de 2 pratos, ganhe 1 grátis",
      startDate: "2024-01-15",
      endDate: "2024-02-15",
      status: "scheduled",
      usageCount: 0,
      usageLimit: 1000,
      minOrderValue: "R$ 40,00",
      categories: ["Restaurantes"]
    },
    {
      id: 4,
      name: "Desconto Farmácia",
      type: "fixed",
      value: "R$ 10,00",
      description: "R$ 10 de desconto em medicamentos",
      startDate: "2023-12-01",
      endDate: "2023-12-31",
      status: "expired",
      usageCount: 456,
      usageLimit: 500,
      minOrderValue: "R$ 50,00",
      categories: ["Farmácia"]
    },
    {
      id: 5,
      name: "Black Friday",
      type: "percentage",
      value: "30%",
      description: "Mega desconto Black Friday",
      startDate: "2024-11-29",
      endDate: "2024-12-02",
      status: "paused",
      usageCount: 2341,
      usageLimit: 10000,
      minOrderValue: "R$ 100,00",
      categories: ["Todos"]
    }
  ])

  const [editingPromotion, setEditingPromotion] = useState<Promotion | null>(null)
  const [isNewPromotionOpen, setIsNewPromotionOpen] = useState(false)

  const stats: PromotionStats = {
    totalPromotions: promotions.length,
    activePromotions: promotions.filter(p => p.status === "active").length,
    totalSavings: "R$ 45.230",
    conversionRate: "23.5%"
  }

  const handleSaveChanges = () => {
    toast.success("Alterações salvas com sucesso!")
  }

  const handleNewPromotion = (newPromotion: Omit<Promotion, 'id' | 'usageCount'>) => {
    const id = Math.max(...promotions.map(p => p.id)) + 1
    setPromotions([...promotions, { ...newPromotion, id, usageCount: 0 }])
    setIsNewPromotionOpen(false)
    toast.success("Nova promoção criada com sucesso!")
  }

  const handleEditPromotion = (promotion: Promotion) => {
    setEditingPromotion(promotion)
  }

  const handleUpdatePromotion = (updatedPromotion: Promotion) => {
    setPromotions(promotions.map(p => p.id === updatedPromotion.id ? updatedPromotion : p))
    setEditingPromotion(null)
    toast.success("Promoção atualizada com sucesso!")
  }

  const handleDeletePromotion = (promotionId: number) => {
    setPromotions(promotions.filter(p => p.id !== promotionId))
    toast.success("Promoção removida com sucesso!")
  }

  const handleToggleStatus = (promotionId: number) => {
    setPromotions(promotions.map(p => 
      p.id === promotionId 
        ? { ...p, status: p.status === "active" ? "paused" : "active" as const }
        : p
    ))
    toast.success("Status da promoção alterado!")
  }

  const getStatusBadge = (status: Promotion['status']) => {
    const variants = {
      active: { variant: "default" as const, label: "Ativa" },
      scheduled: { variant: "secondary" as const, label: "Agendada" },
      expired: { variant: "outline" as const, label: "Expirada" },
      paused: { variant: "destructive" as const, label: "Pausada" }
    }
    return variants[status]
  }

  const getTypeIcon = (type: Promotion['type']) => {
    const icons = {
      percentage: <Percent className="w-4 h-4" />,
      fixed: <DollarSign className="w-4 h-4" />,
      freeShipping: <Gift className="w-4 h-4" />,
      buyXGetY: <Tag className="w-4 h-4" />
    }
    return icons[type]
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
                  <BreadcrumbLink href="/dashboard/settings">
                    Configurações
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Promoções</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Promoções e Descontos</h1>
              <p className="text-muted-foreground">
                Gerencie campanhas promocionais, cupons de desconto e ofertas especiais
              </p>
            </div>
            <div className="flex gap-2">
              <Dialog open={isNewPromotionOpen} onOpenChange={setIsNewPromotionOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Promoção
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Nova Promoção</DialogTitle>
                    <DialogDescription>
                      Crie uma nova campanha promocional ou cupom de desconto
                    </DialogDescription>
                  </DialogHeader>
                  <NewPromotionForm onSubmit={handleNewPromotion} />
                </DialogContent>
              </Dialog>
              <Button onClick={handleSaveChanges}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Promoções
                </CardTitle>
                <Gift className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalPromotions}</div>
                <p className="text-xs text-muted-foreground">
                  Campanhas criadas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Promoções Ativas
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activePromotions}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">Funcionando agora</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Economia Total
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSavings}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+18%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa de Conversão
                </CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.conversionRate}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+5.2%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Lista de Promoções */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="w-5 h-5" />
                <span>Campanhas Promocionais</span>
              </CardTitle>
              <CardDescription>
                Gerencie todas as suas promoções, cupons e ofertas especiais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotions.map((promotion) => {
                  const statusBadge = getStatusBadge(promotion.status)
                  const typeIcon = getTypeIcon(promotion.type)
                  
                  return (
                    <div key={promotion.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-muted rounded-lg">
                          {typeIcon}
                        </div>
                        <div>
                          <h4 className="font-medium">{promotion.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {promotion.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {promotion.startDate} - {promotion.endDate}
                            </span>
                            <span className="text-xs text-muted-foreground flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {promotion.usageCount} usos
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <p className="font-bold text-lg">{promotion.value}</p>
                          <p className="text-xs text-muted-foreground">Desconto</p>
                        </div>
                        
                        <div className="text-center">
                          <p className="font-medium">{promotion.minOrderValue}</p>
                          <p className="text-xs text-muted-foreground">Pedido mín.</p>
                        </div>
                        
                        <Badge variant={statusBadge.variant}>
                          {statusBadge.label}
                        </Badge>
                        
                        <div className="flex space-x-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleToggleStatus(promotion.id)}
                          >
                            {promotion.status === "active" ? "Pausar" : "Ativar"}
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleEditPromotion(promotion)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => handleDeletePromotion(promotion.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Configurações Gerais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Star className="w-5 h-5" />
                <span>Configurações de Promoções</span>
              </CardTitle>
              <CardDescription>
                Configure regras gerais para campanhas promocionais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="max-discount">Desconto Máximo Permitido (%)</Label>
                  <Input id="max-discount" defaultValue="50" />
                  <p className="text-xs text-muted-foreground">
                    Limite máximo de desconto por promoção
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-order">Pedido Mínimo Padrão</Label>
                  <Input id="min-order" defaultValue="R$ 25,00" />
                  <p className="text-xs text-muted-foreground">
                    Valor mínimo padrão para aplicar promoções
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-uses">Limite de Uso por Cliente</Label>
                  <Input id="max-uses" defaultValue="3" />
                  <p className="text-xs text-muted-foreground">
                    Máximo de vezes que um cliente pode usar a mesma promoção
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Configurações Avançadas</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Promoções Automáticas</Label>
                      <p className="text-sm text-muted-foreground">
                        Ativa promoções automaticamente baseado em regras
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Notificações de Promoção</Label>
                      <p className="text-sm text-muted-foreground">
                        Envia notificações sobre novas promoções
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Combinação de Promoções</Label>
                      <p className="text-sm text-muted-foreground">
                        Permite usar múltiplas promoções no mesmo pedido
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Análise de Performance</Label>
                      <p className="text-sm text-muted-foreground">
                        Coleta dados de performance das campanhas
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Promoções por Categoria */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="w-5 h-5" />
                  <span>Promoções por Categoria</span>
                </CardTitle>
                <CardDescription>
                  Distribuição de promoções por categoria de produtos
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "Restaurantes", count: 12, percentage: "40%" },
                    { category: "Farmácia", count: 8, percentage: "27%" },
                    { category: "Mercado", count: 6, percentage: "20%" },
                    { category: "Serviços", count: 4, percentage: "13%" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{item.category}</p>
                        <p className="text-sm text-muted-foreground">{item.count} promoções</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{item.percentage}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="w-5 h-5" />
                  <span>Próximas Expirações</span>
                </CardTitle>
                <CardDescription>
                  Promoções que expiram nos próximos dias
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Combo Almoço", expires: "Em 3 dias", status: "warning" },
                    { name: "Desconto Farmácia", expires: "Em 7 dias", status: "info" },
                    { name: "Frete Grátis", expires: "Em 15 dias", status: "success" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.expires}</p>
                      </div>
                      <Badge variant={
                        item.status === "warning" ? "destructive" :
                        item.status === "info" ? "secondary" : "default"
                      }>
                        {item.status === "warning" ? "Urgente" :
                         item.status === "info" ? "Atenção" : "OK"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
      
      {/* Dialog para edição de promoção */}
      <EditPromotionDialog 
        promotion={editingPromotion} 
        onUpdate={handleUpdatePromotion} 
        onClose={() => setEditingPromotion(null)} 
      />
    </SidebarProvider>
  )
}

// Componente para formulário de nova promoção
function NewPromotionForm({ onSubmit }: { onSubmit: (promotion: Omit<Promotion, 'id' | 'usageCount'>) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    type: "percentage" as Promotion['type'],
    value: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "scheduled" as Promotion['status'],
    usageLimit: 0,
    minOrderValue: "",
    categories: ["Todos"]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.value || !formData.startDate || !formData.endDate) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    onSubmit(formData)
    setFormData({
      name: "",
      type: "percentage",
      value: "",
      description: "",
      startDate: "",
      endDate: "",
      status: "scheduled",
      usageLimit: 0,
      minOrderValue: "",
      categories: ["Todos"]
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-name">Nome da Promoção</Label>
          <Input
            id="new-name"
            placeholder="Ex: Desconto de Verão"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-type">Tipo de Promoção</Label>
          <Select value={formData.type} onValueChange={(value: Promotion['type']) => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="percentage">Desconto Percentual</SelectItem>
              <SelectItem value="fixed">Desconto Fixo</SelectItem>
              <SelectItem value="freeShipping">Frete Grátis</SelectItem>
              <SelectItem value="buyXGetY">Compre X Leve Y</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-value">Valor do Desconto</Label>
          <Input
            id="new-value"
            placeholder="Ex: 15% ou R$ 10,00"
            value={formData.value}
            onChange={(e) => setFormData({...formData, value: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-min-order">Pedido Mínimo</Label>
          <Input
            id="new-min-order"
            placeholder="Ex: R$ 30,00"
            value={formData.minOrderValue}
            onChange={(e) => setFormData({...formData, minOrderValue: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-description">Descrição</Label>
        <Textarea
          id="new-description"
          placeholder="Descreva os detalhes da promoção..."
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="new-start-date">Data de Início</Label>
          <Input
            id="new-start-date"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-end-date">Data de Fim</Label>
          <Input
            id="new-end-date"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-usage-limit">Limite de Uso</Label>
          <Input
            id="new-usage-limit"
            type="number"
            placeholder="0 = ilimitado"
            value={formData.usageLimit}
            onChange={(e) => setFormData({...formData, usageLimit: parseInt(e.target.value) || 0})}
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">
          <Plus className="w-4 h-4 mr-2" />
          Criar Promoção
        </Button>
      </DialogFooter>
    </form>
  )
}

// Componente para edição de promoção
function EditPromotionDialog({ promotion, onUpdate, onClose }: { promotion: Promotion | null, onUpdate: (promotion: Promotion) => void, onClose: () => void }) {
  const [formData, setFormData] = useState({
    id: promotion?.id || 0,
    name: promotion?.name || "",
    type: promotion?.type || "percentage" as Promotion['type'],
    value: promotion?.value || "",
    description: promotion?.description || "",
    startDate: promotion?.startDate || "",
    endDate: promotion?.endDate || "",
    status: promotion?.status || "scheduled" as Promotion['status'],
    usageCount: promotion?.usageCount || 0,
    usageLimit: promotion?.usageLimit || 0,
    minOrderValue: promotion?.minOrderValue || "",
    categories: promotion?.categories || ["Todos"]
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.value || !formData.startDate || !formData.endDate) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    onUpdate(formData)
  }

  if (!promotion) return null

  return (
    <Dialog open={!!promotion} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Promoção</DialogTitle>
          <DialogDescription>
            Modifique as informações da promoção {promotion.name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome da Promoção</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Tipo de Promoção</Label>
              <Select value={formData.type} onValueChange={(value: Promotion['type']) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Desconto Percentual</SelectItem>
                  <SelectItem value="fixed">Desconto Fixo</SelectItem>
                  <SelectItem value="freeShipping">Frete Grátis</SelectItem>
                  <SelectItem value="buyXGetY">Compre X Leve Y</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-value">Valor do Desconto</Label>
              <Input
                id="edit-value"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-min-order">Pedido Mínimo</Label>
              <Input
                id="edit-min-order"
                value={formData.minOrderValue}
                onChange={(e) => setFormData({...formData, minOrderValue: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-description">Descrição</Label>
            <Textarea
              id="edit-description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="edit-start-date">Data de Início</Label>
              <Input
                id="edit-start-date"
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-end-date">Data de Fim</Label>
              <Input
                id="edit-end-date"
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-usage-limit">Limite de Uso</Label>
              <Input
                id="edit-usage-limit"
                type="number"
                value={formData.usageLimit}
                onChange={(e) => setFormData({...formData, usageLimit: parseInt(e.target.value) || 0})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
            <Select value={formData.status} onValueChange={(value: Promotion['status']) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Ativa</SelectItem>
                <SelectItem value="scheduled">Agendada</SelectItem>
                <SelectItem value="paused">Pausada</SelectItem>
                <SelectItem value="expired">Expirada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}