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
  Mail
} from "lucide-react"

export default function StoresPage() {
  const stores = [
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
  ]

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Lojas Ativas</h1>
              <p className="text-muted-foreground">
                Gerencie todas as lojas cadastradas na plataforma
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova Loja
            </Button>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar lojas..." className="pl-8" />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
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
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button size="sm" variant="outline">
                      Ver Detalhes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}