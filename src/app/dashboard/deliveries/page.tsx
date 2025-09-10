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
import { 
  Truck, 
  MapPin,
  Clock,
  User,
  Store,
  Navigation,
  Phone,
  Activity,
  CheckCircle,
  AlertCircle
} from "lucide-react"

export default function DeliveriesPage() {
  const activeDeliveries = [
    {
      id: "#1234",
      driver: "Roberto Silva",
      driverPhone: "(11) 99999-1111",
      customer: "João Silva",
      customerPhone: "(11) 99999-2222",
      store: "Padaria Central",
      storeAddress: "Rua das Flores, 123",
      deliveryAddress: "Av. Central, 456",
      status: "Em trânsito",
      estimatedTime: "15 min",
      distance: "2.3 km",
      orderValue: "R$ 25,90",
      startTime: "14:30"
    },
    {
      id: "#1235",
      driver: "Marcos Pereira",
      driverPhone: "(11) 99999-3333",
      customer: "Maria Santos",
      customerPhone: "(11) 99999-4444",
      store: "Farmácia Saúde",
      storeAddress: "Av. Central, 456",
      deliveryAddress: "Rua do Comércio, 789",
      status: "Coletando",
      estimatedTime: "5 min",
      distance: "1.8 km",
      orderValue: "R$ 45,50",
      startTime: "14:45"
    },
    {
      id: "#1236",
      driver: "Lucas Ferreira",
      driverPhone: "(11) 99999-5555",
      customer: "Pedro Costa",
      customerPhone: "(11) 99999-6666",
      store: "Mercado Bom Preço",
      storeAddress: "Rua do Comércio, 789",
      deliveryAddress: "Praça da Paz, 321",
      status: "Entregando",
      estimatedTime: "3 min",
      distance: "0.8 km",
      orderValue: "R$ 78,30",
      startTime: "14:20"
    }
  ]

  const drivers = [
    {
      id: 1,
      name: "Roberto Silva",
      phone: "(11) 99999-1111",
      status: "Em entrega",
      location: "Zona Norte",
      deliveries: 8,
      rating: 4.9,
      vehicle: "Moto"
    },
    {
      id: 2,
      name: "Marcos Pereira",
      phone: "(11) 99999-3333",
      status: "Disponível",
      location: "Centro",
      deliveries: 6,
      rating: 4.8,
      vehicle: "Bicicleta"
    },
    {
      id: 3,
      name: "Lucas Ferreira",
      phone: "(11) 99999-5555",
      status: "Em entrega",
      location: "Zona Sul",
      deliveries: 5,
      rating: 4.7,
      vehicle: "Moto"
    },
    {
      id: 4,
      name: "Carlos Oliveira",
      phone: "(11) 99999-7777",
      status: "Offline",
      location: "Zona Oeste",
      deliveries: 3,
      rating: 4.6,
      vehicle: "Carro"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Em trânsito":
        return <Badge variant="default" className="bg-blue-500">Em trânsito</Badge>
      case "Coletando":
        return <Badge variant="secondary" className="bg-orange-500">Coletando</Badge>
      case "Entregando":
        return <Badge variant="default" className="bg-green-500">Entregando</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getDriverStatusBadge = (status: string) => {
    switch (status) {
      case "Disponível":
        return <Badge variant="default" className="bg-green-500">Disponível</Badge>
      case "Em entrega":
        return <Badge variant="secondary" className="bg-blue-500">Em entrega</Badge>
      case "Offline":
        return <Badge variant="outline">Offline</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Em trânsito":
        return <Navigation className="w-4 h-4 text-blue-500" />
      case "Coletando":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "Entregando":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
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
                  <BreadcrumbPage>Entregas em Tempo Real</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Entregas em Tempo Real</h1>
              <p className="text-muted-foreground">
                Monitore todas as entregas ativas na plataforma
              </p>
            </div>
            <Badge variant="secondary" className="text-sm">
              <Activity className="w-4 h-4 mr-1" />
              {activeDeliveries.length} entregas ativas
            </Badge>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entregas Ativas</CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeDeliveries.length}</div>
                <p className="text-xs text-muted-foreground">
                  em andamento agora
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entregadores Online</CardTitle>
                <User className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{drivers.filter(d => d.status !== "Offline").length}</div>
                <p className="text-xs text-muted-foreground">
                  de {drivers.length} cadastrados
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">28 min</div>
                <p className="text-xs text-muted-foreground">
                  tempo de entrega
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Entregas Hoje</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">156</div>
                <p className="text-xs text-muted-foreground">
                  concluídas
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {/* Active Deliveries */}
            <Card>
              <CardHeader>
                <CardTitle>Entregas Ativas</CardTitle>
                <CardDescription>
                  Acompanhe as entregas em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeDeliveries.map((delivery) => (
                    <div key={delivery.id} className="p-4 border rounded-lg space-y-3">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(delivery.status)}
                          <span className="font-medium">{delivery.id}</span>
                        </div>
                        {getStatusBadge(delivery.status)}
                      </div>

                      {/* Driver Info */}
                      <div className="flex items-center space-x-2 text-sm">
                        <Truck className="w-3 h-3 text-muted-foreground" />
                        <span>{delivery.driver}</span>
                        <span className="text-muted-foreground">•</span>
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{delivery.driverPhone}</span>
                      </div>

                      {/* Customer Info */}
                      <div className="flex items-center space-x-2 text-sm">
                        <User className="w-3 h-3 text-muted-foreground" />
                        <span>{delivery.customer}</span>
                        <span className="text-muted-foreground">•</span>
                        <Phone className="w-3 h-3 text-muted-foreground" />
                        <span className="text-muted-foreground">{delivery.customerPhone}</span>
                      </div>

                      {/* Store Info */}
                      <div className="flex items-center space-x-2 text-sm">
                        <Store className="w-3 h-3 text-muted-foreground" />
                        <span>{delivery.store}</span>
                      </div>

                      {/* Addresses */}
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3 text-green-500" />
                          <span className="text-muted-foreground">De:</span>
                          <span>{delivery.storeAddress}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-3 h-3 text-red-500" />
                          <span className="text-muted-foreground">Para:</span>
                          <span>{delivery.deliveryAddress}</span>
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3 text-muted-foreground" />
                            <span>{delivery.estimatedTime}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Navigation className="w-3 h-3 text-muted-foreground" />
                            <span>{delivery.distance}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold">{delivery.orderValue}</div>
                          <div className="text-xs text-muted-foreground">Início: {delivery.startTime}</div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 pt-2">
                        <Button size="sm" variant="outline">
                          <MapPin className="w-3 h-3 mr-1" />
                          Rastrear
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3 mr-1" />
                          Contatar
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Drivers Status */}
            <Card>
              <CardHeader>
                <CardTitle>Status dos Entregadores</CardTitle>
                <CardDescription>
                  Situação atual de todos os entregadores
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {drivers.map((driver) => (
                    <div key={driver.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <Truck className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{driver.name}</p>
                          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{driver.location}</span>
                            <span>•</span>
                            <span>{driver.vehicle}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        {getDriverStatusBadge(driver.status)}
                        <div className="text-sm text-muted-foreground">
                          {driver.deliveries} entregas • ⭐ {driver.rating}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}