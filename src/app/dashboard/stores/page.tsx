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
import { Textarea } from "@/components/ui/textarea"
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
import { ModeToggle } from "@/components/mode-toggle"
import { toast } from "sonner"
import { 
  Store, 
  Plus,
  Search,
  Filter,
  MapPin,
  Clock,
  Star,
  ShoppingBag,
  Eye,
  Edit,
  MoreHorizontal,
  Phone,
  Mail,
  Save,
  Trash2,
  Ban,
  CheckCircle,
  AlertCircle
} from "lucide-react"

interface StoreData {
  id: number
  name: string
  owner: string
  category: string
  address: string
  phone: string
  email: string
  status: string
  rating: number
  orders: number
  revenue: string
  openTime: string
}

export default function StoresPage() {
  const [stores, setStores] = useState<StoreData[]>([
    {
      id: 1,
      name: "Padaria Central",
      owner: "Carlos Oliveira",
      category: "Padaria",
      address: "Rua das Flores, 123",
      phone: "(11) 99999-1111",
      email: "carlos@padaria.com",
      status: "Aberta",
      rating: 4.8,
      orders: 156,
      revenue: "R$ 8.230",
      openTime: "06:00 - 22:00"
    },
    {
      id: 2,
      name: "Farmácia Saúde",
      owner: "Ana Lima",
      category: "Farmácia",
      address: "Av. Central, 456",
      phone: "(11) 99999-2222",
      email: "ana@farmacia.com",
      status: "Aberta",
      rating: 4.9,
      orders: 89,
      revenue: "R$ 5.670",
      openTime: "07:00 - 23:00"
    },
    {
      id: 3,
      name: "Mercado Bom Preço",
      owner: "José Santos",
      category: "Supermercado",
      address: "Rua do Comércio, 789",
      phone: "(11) 99999-3333",
      email: "jose@mercado.com",
      status: "Fechada",
      rating: 4.6,
      orders: 234,
      revenue: "R$ 12.450",
      openTime: "08:00 - 20:00"
    },
    {
      id: 4,
      name: "Pizzaria Italiana",
      owner: "Marco Rossi",
      category: "Restaurante",
      address: "Praça da Paz, 321",
      phone: "(11) 99999-4444",
      email: "marco@pizzaria.com",
      status: "Aberta",
      rating: 4.7,
      orders: 98,
      revenue: "R$ 6.890",
      openTime: "18:00 - 02:00"
    },
    {
      id: 5,
      name: "Lanchonete do Bairro",
      owner: "Maria Silva",
      category: "Lanchonete",
      address: "Rua Nova, 654",
      phone: "(11) 99999-5555",
      email: "maria@lanchonete.com",
      status: "Aberta",
      rating: 4.5,
      orders: 67,
      revenue: "R$ 3.420",
      openTime: "10:00 - 22:00"
    },
    {
      id: 6,
      name: "Pet Shop Amigo",
      owner: "Lucia Ferreira",
      category: "Pet Shop",
      address: "Av. dos Animais, 987",
      phone: "(11) 99999-6666",
      email: "lucia@petshop.com",
      status: "Pendente",
      rating: 4.4,
      orders: 23,
      revenue: "R$ 1.230",
      openTime: "09:00 - 18:00"
    }
  ])

  const [editingStore, setEditingStore] = useState<StoreData | null>(null)
  const [viewingStore, setViewingStore] = useState<StoreData | null>(null)
  const [isNewStoreOpen, setIsNewStoreOpen] = useState(false)

  // Funções para manipular as lojas
  const handleNewStore = (newStore: Omit<StoreData, 'id'>) => {
    const id = Math.max(...stores.map(s => s.id)) + 1
    setStores([...stores, { ...newStore, id }])
    setIsNewStoreOpen(false)
    toast.success("Nova loja cadastrada com sucesso!")
  }

  const handleEditStore = (store: StoreData) => {
    setEditingStore(store)
  }

  const handleUpdateStore = (updatedStore: StoreData) => {
    setStores(stores.map(s => s.id === updatedStore.id ? updatedStore : s))
    setEditingStore(null)
    toast.success("Loja atualizada com sucesso!")
  }

  const handleViewStore = (store: StoreData) => {
    setViewingStore(store)
  }

  const handleDeleteStore = (storeId: number) => {
    setStores(stores.filter(s => s.id !== storeId))
    toast.success("Loja removida com sucesso!")
  }

  const handleSuspendStore = (storeId: number) => {
    setStores(stores.map(s => 
      s.id === storeId 
        ? { ...s, status: s.status === "Suspensa" ? "Aberta" : "Suspensa" }
        : s
    ))
    toast.success("Status da loja alterado!")
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aberta":
        return <Badge variant="default" className="bg-green-500">Aberta</Badge>
      case "Fechada":
        return <Badge variant="secondary">Fechada</Badge>
      case "Pendente":
        return <Badge variant="outline">Pendente</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    return <Store className="w-5 h-5 text-primary" />
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
                  <BreadcrumbPage>Lojas Ativas</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="px-4">
            <ModeToggle />
          </div>
        </header>
        
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div>
            <h1 className="text-3xl font-bold">Lojas Ativas</h1>
            <p className="text-muted-foreground">
              Gerencie todas as lojas cadastradas na plataforma
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative max-w-sm">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar lojas..." className="pl-8" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </div>
            
            <Dialog open={isNewStoreOpen} onOpenChange={setIsNewStoreOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nova Loja
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Nova Loja</DialogTitle>
                  <DialogDescription>
                    Cadastre uma nova loja na plataforma
                  </DialogDescription>
                </DialogHeader>
                <NewStoreForm onSubmit={handleNewStore} />
              </DialogContent>
            </Dialog>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Lojas</CardTitle>
                <Store className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stores.length}</div>
                <p className="text-xs text-muted-foreground">
                  cadastradas na plataforma
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lojas Abertas</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stores.filter(s => s.status === "Aberta").length}</div>
                <p className="text-xs text-muted-foreground">
                  funcionando agora
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avaliação Média</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.7</div>
                <p className="text-xs text-muted-foreground">
                  média geral das lojas
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pedidos Hoje</CardTitle>
                <ShoppingBag className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stores.reduce((acc, store) => acc + store.orders, 0)}</div>
                <p className="text-xs text-muted-foreground">
                  total de pedidos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Stores Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <Card key={store.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        {getCategoryIcon(store.category)}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{store.name}</CardTitle>
                        <CardDescription>{store.category}</CardDescription>
                      </div>
                    </div>
                    {getStatusBadge(store.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Owner Info */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Proprietário: {store.owner}</p>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Phone className="w-3 h-3" />
                      <span>{store.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Mail className="w-3 h-3" />
                      <span>{store.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{store.openTime}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-1">
                        <Star className="w-3 h-3 text-yellow-500" />
                        <span className="font-bold text-sm">{store.rating}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Avaliação</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-sm">{store.orders}</div>
                      <p className="text-xs text-muted-foreground">Pedidos</p>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-sm">{store.revenue}</div>
                      <p className="text-xs text-muted-foreground">Receita</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditStore(store)}
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
                          <DropdownMenuItem onClick={() => handleViewStore(store)}>
                            <Eye className="w-4 h-4 mr-2" />
                            Visualizar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditStore(store)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleSuspendStore(store.id)}>
                            <Ban className="w-4 h-4 mr-2" />
                            {store.status === "Suspensa" ? "Reativar" : "Suspender"}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteStore(store.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleViewStore(store)}
                    >
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
      
      {/* Dialogs */}
      <EditStoreDialog 
        store={editingStore} 
        onUpdate={handleUpdateStore} 
        onClose={() => setEditingStore(null)} 
      />
      
      <ViewStoreDialog 
        store={viewingStore} 
        onClose={() => setViewingStore(null)} 
      />
    </SidebarProvider>
  )
}

// Componente para formulário de nova loja
function NewStoreForm({ onSubmit }: { onSubmit: (store: Omit<StoreData, 'id'>) => void }) {
  const [formData, setFormData] = useState({
    name: "",
    owner: "",
    category: "",
    address: "",
    phone: "",
    email: "",
    status: "Pendente",
    rating: 0,
    orders: 0,
    revenue: "R$ 0,00",
    openTime: ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.owner || !formData.category || !formData.address) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    onSubmit(formData)
    setFormData({
      name: "",
      owner: "",
      category: "",
      address: "",
      phone: "",
      email: "",
      status: "Pendente",
      rating: 0,
      orders: 0,
      revenue: "R$ 0,00",
      openTime: ""
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-name">Nome da Loja</Label>
          <Input
            id="new-name"
            placeholder="Ex: Padaria Central"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-owner">Proprietário</Label>
          <Input
            id="new-owner"
            placeholder="Ex: João Silva"
            value={formData.owner}
            onChange={(e) => setFormData({...formData, owner: e.target.value})}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-category">Categoria</Label>
          <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
            <SelectTrigger>
              <SelectValue placeholder="Selecione uma categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Restaurante">Restaurante</SelectItem>
              <SelectItem value="Padaria">Padaria</SelectItem>
              <SelectItem value="Farmácia">Farmácia</SelectItem>
              <SelectItem value="Supermercado">Supermercado</SelectItem>
              <SelectItem value="Lanchonete">Lanchonete</SelectItem>
              <SelectItem value="Pet Shop">Pet Shop</SelectItem>
              <SelectItem value="Outros">Outros</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-phone">Telefone</Label>
          <Input
            id="new-phone"
            placeholder="(11) 99999-9999"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-email">Email</Label>
        <Input
          id="new-email"
          type="email"
          placeholder="contato@loja.com"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-address">Endereço</Label>
        <Textarea
          id="new-address"
          placeholder="Rua, número, bairro, cidade"
          value={formData.address}
          onChange={(e) => setFormData({...formData, address: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-openTime">Horário de Funcionamento</Label>
        <Input
          id="new-openTime"
          placeholder="Ex: 08:00 - 18:00"
          value={formData.openTime}
          onChange={(e) => setFormData({...formData, openTime: e.target.value})}
        />
      </div>

      <DialogFooter>
        <Button type="submit">
          <Plus className="w-4 h-4 mr-2" />
          Cadastrar Loja
        </Button>
      </DialogFooter>
    </form>
  )
}

// Componente para edição de loja
function EditStoreDialog({ store, onUpdate, onClose }: { store: StoreData | null, onUpdate: (store: StoreData) => void, onClose: () => void }) {
  const [formData, setFormData] = useState({
    id: store?.id || 0,
    name: store?.name || "",
    owner: store?.owner || "",
    category: store?.category || "",
    address: store?.address || "",
    phone: store?.phone || "",
    email: store?.email || "",
    status: store?.status || "Pendente",
    rating: store?.rating || 0,
    orders: store?.orders || 0,
    revenue: store?.revenue || "R$ 0,00",
    openTime: store?.openTime || ""
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.owner || !formData.category || !formData.address) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    onUpdate(formData)
  }

  if (!store) return null

  return (
    <Dialog open={!!store} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Loja</DialogTitle>
          <DialogDescription>
            Modifique as informações da loja {store.name}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-name">Nome da Loja</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-owner">Proprietário</Label>
              <Input
                id="edit-owner"
                value={formData.owner}
                onChange={(e) => setFormData({...formData, owner: e.target.value})}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-category">Categoria</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Restaurante">Restaurante</SelectItem>
                  <SelectItem value="Padaria">Padaria</SelectItem>
                  <SelectItem value="Farmácia">Farmácia</SelectItem>
                  <SelectItem value="Supermercado">Supermercado</SelectItem>
                  <SelectItem value="Lanchonete">Lanchonete</SelectItem>
                  <SelectItem value="Pet Shop">Pet Shop</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-phone">Telefone</Label>
              <Input
                id="edit-phone"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input
              id="edit-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-address">Endereço</Label>
            <Textarea
              id="edit-address"
              value={formData.address}
              onChange={(e) => setFormData({...formData, address: e.target.value})}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-openTime">Horário de Funcionamento</Label>
              <Input
                id="edit-openTime"
                value={formData.openTime}
                onChange={(e) => setFormData({...formData, openTime: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aberta">Aberta</SelectItem>
                  <SelectItem value="Fechada">Fechada</SelectItem>
                  <SelectItem value="Pendente">Pendente</SelectItem>
                  <SelectItem value="Suspensa">Suspensa</SelectItem>
                </SelectContent>
              </Select>
            </div>
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

// Componente para visualização de loja
function ViewStoreDialog({ store, onClose }: { store: StoreData | null, onClose: () => void }) {
  if (!store) return null

  return (
    <Dialog open={!!store} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Store className="w-5 h-5" />
            <span>{store.name}</span>
          </DialogTitle>
          <DialogDescription>
            Informações detalhadas da loja
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Informações Básicas */}
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Informações Básicas</h4>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Nome da Loja</Label>
                <p className="text-sm">{store.name}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Proprietário</Label>
                <p className="text-sm">{store.owner}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Categoria</Label>
                <p className="text-sm">{store.category}</p>
              </div>
              <div>
                <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                <div className="mt-1">
                  {getStatusBadge(store.status)}
                </div>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{store.phone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{store.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{store.address}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{store.openTime}</span>
              </div>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Estatísticas</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center p-4 border rounded-lg bg-muted/30 dark:bg-[#19191c]">
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="font-bold text-lg">{store.rating}</span>
                </div>
                <p className="text-sm text-muted-foreground">Avaliação</p>
              </div>
              <div className="text-center p-4 border rounded-lg bg-muted/30 dark:bg-[#19191c]">
                <div className="font-bold text-lg mb-2">{store.orders}</div>
                <p className="text-sm text-muted-foreground">Pedidos</p>
              </div>
              <div className="text-center p-4 border rounded-lg bg-muted/30 dark:bg-[#19191c]">
                <div className="font-bold text-lg mb-2">{store.revenue}</div>
                <p className="text-sm text-muted-foreground">Receita</p>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  function getStatusBadge(status: string) {
    switch (status) {
      case "Aberta":
        return <Badge variant="default" className="bg-green-500">Aberta</Badge>
      case "Fechada":
        return <Badge variant="secondary">Fechada</Badge>
      case "Pendente":
        return <Badge variant="outline">Pendente</Badge>
      case "Suspensa":
        return <Badge variant="destructive">Suspensa</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }
}