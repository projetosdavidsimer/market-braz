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
import { toast } from "sonner"
import { 
  Truck, 
  Save,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Clock,
  DollarSign,
  Calculator,
  Settings,
  CheckCircle
} from "lucide-react"

interface Region {
  id: number
  region: string
  fee: string
  distance: string
  orders: number
  status: string
}

interface SimulationResult {
  baseFee: string
  distanceFee: string
  timeFee: string
  vipDiscount: string
  totalFee: string
  isFree: boolean
}

interface SimulationData {
  region: string
  distance: string
  value: string
  time: string
}

export default function DeliveryFeesPage() {
  const [regions, setRegions] = useState<Region[]>([
    { id: 1, region: "Centro", fee: "R$ 3,50", distance: "0-3 km", orders: 245, status: "Ativa" },
    { id: 2, region: "Zona Norte", fee: "R$ 4,50", distance: "3-8 km", orders: 189, status: "Ativa" },
    { id: 3, region: "Zona Sul", fee: "R$ 5,00", distance: "5-10 km", orders: 156, status: "Ativa" },
    { id: 4, region: "Zona Leste", fee: "R$ 6,00", distance: "8-12 km", orders: 98, status: "Ativa" },
    { id: 5, region: "Zona Oeste", fee: "R$ 7,50", distance: "10-15 km", orders: 67, status: "Limitada" },
  ])

  const [editingRegion, setEditingRegion] = useState<Region | null>(null)
  const [isNewRegionOpen, setIsNewRegionOpen] = useState(false)
  const [simulationResult, setSimulationResult] = useState<SimulationResult | null>(null)
  const [simulationData, setSimulationData] = useState<SimulationData>({
    region: "",
    distance: "",
    value: "",
    time: ""
  })

  const handleSaveChanges = () => {
    toast.success("Alterações salvas com sucesso!")
  }

  const handleNewRegion = (newRegion: Omit<Region, 'id' | 'orders'>) => {
    const id = Math.max(...regions.map(r => r.id)) + 1
    setRegions([...regions, { ...newRegion, id, orders: 0 }])
    setIsNewRegionOpen(false)
    toast.success("Nova região adicionada com sucesso!")
  }

  const handleEditRegion = (region: Region) => {
    setEditingRegion(region)
  }

  const handleUpdateRegion = (updatedRegion: Region) => {
    setRegions(regions.map(r => r.id === updatedRegion.id ? updatedRegion : r))
    setEditingRegion(null)
    toast.success("Região atualizada com sucesso!")
  }

  const handleDeleteRegion = (regionId: number) => {
    setRegions(regions.filter(r => r.id !== regionId))
    toast.success("Região removida com sucesso!")
  }

  const calculateDeliveryFee = () => {
    if (!simulationData.region || !simulationData.distance || !simulationData.value) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }

    const baseFee = 4.50
    const distance = parseFloat(simulationData.distance)
    const orderValue = parseFloat(simulationData.value.replace("R$", "").replace(",", "."))
    const time = simulationData.time

    const distanceFee = distance * 0.5
    let timeFee = 0
    let vipDiscount = 0

    // Verificar horário de pico
    if (time) {
      const hour = parseInt(time.split(":")[0])
      if ((hour >= 11 && hour <= 14) || (hour >= 18 && hour <= 21)) {
        timeFee = 2.00
      } else if (hour >= 0 && hour <= 6) {
        timeFee = -1.00
      }
    }

    // Desconto VIP (simulado)
    if (orderValue > 100) {
      vipDiscount = 0.50
    }

    // Frete grátis
    const totalFee = orderValue >= 60 ? 0 : Math.max(0, baseFee + distanceFee + timeFee - vipDiscount)

    setSimulationResult({
      baseFee: baseFee.toFixed(2),
      distanceFee: distanceFee.toFixed(2),
      timeFee: timeFee.toFixed(2),
      vipDiscount: vipDiscount.toFixed(2),
      totalFee: totalFee.toFixed(2),
      isFree: orderValue >= 60
    })

    toast.success("Taxa calculada com sucesso!")
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
                  <BreadcrumbPage>Taxas de Entrega</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Taxas de Entrega</h1>
              <p className="text-muted-foreground">
                Configure taxas de entrega por região, distância e tipo de pedido
              </p>
            </div>
            <div className="flex gap-2">
              <Dialog open={isNewRegionOpen} onOpenChange={setIsNewRegionOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Taxa
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Nova Taxa de Entrega</DialogTitle>
                    <DialogDescription>
                      Adicione uma nova região com sua respectiva taxa de entrega
                    </DialogDescription>
                  </DialogHeader>
                  <NewRegionForm onSubmit={handleNewRegion} />
                </DialogContent>
              </Dialog>
              <Button onClick={handleSaveChanges}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Alterações
              </Button>
            </div>
          </div>

          {/* Configurações Gerais */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                <span>Configurações Gerais</span>
              </CardTitle>
              <CardDescription>
                Configurações básicas para cálculo de taxas de entrega
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="base-fee">Taxa Base de Entrega</Label>
                  <Input id="base-fee" defaultValue="R$ 4,50" />
                  <p className="text-xs text-muted-foreground">
                    Taxa mínima aplicada a todas as entregas
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="free-delivery-min">Pedido Mínimo para Frete Grátis</Label>
                  <Input id="free-delivery-min" defaultValue="R$ 60,00" />
                  <p className="text-xs text-muted-foreground">
                    Valor mínimo para isenção da taxa
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="max-distance">Distância Máxima (km)</Label>
                  <Input id="max-distance" defaultValue="15" />
                  <p className="text-xs text-muted-foreground">
                    Raio máximo de entrega
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Configurações Avançadas</h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Taxa Dinâmica por Demanda</Label>
                      <p className="text-sm text-muted-foreground">
                        Ajusta taxa automaticamente em horários de pico
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Taxa por Peso do Pedido</Label>
                      <p className="text-sm text-muted-foreground">
                        Adiciona taxa baseada no peso total
                      </p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Taxa de Urgência</Label>
                      <p className="text-sm text-muted-foreground">
                        Taxa adicional para entregas expressas
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Desconto para Clientes VIP</Label>
                      <p className="text-sm text-muted-foreground">
                        Aplica desconto para clientes premium
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Taxas por Região */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="w-5 h-5" />
                <span>Taxas por Região</span>
              </CardTitle>
              <CardDescription>
                Configure taxas específicas para diferentes regiões da cidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {regions.map((region) => (
                  <div key={region.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h4 className="font-medium">{region.region}</h4>
                        <p className="text-sm text-muted-foreground">
                          Distância: {region.distance}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-center">
                        <p className="font-medium">{region.fee}</p>
                        <p className="text-xs text-muted-foreground">Taxa</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{region.orders}</p>
                        <p className="text-xs text-muted-foreground">Pedidos/mês</p>
                      </div>
                      <Badge variant={region.status === "Ativa" ? "default" : "secondary"}>
                        {region.status}
                      </Badge>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="outline" onClick={() => handleEditRegion(region)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleDeleteRegion(region.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Taxas por Horário */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5" />
                <span>Taxas por Horário</span>
              </CardTitle>
              <CardDescription>
                Configure taxas diferenciadas para horários específicos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <h4 className="font-medium">Horários de Pico</h4>
                  <div className="space-y-3">
                    {[
                      { period: "Almoço", time: "11:30 - 14:00", multiplier: "1.5x", fee: "+R$ 2,00" },
                      { period: "Jantar", time: "18:00 - 21:30", multiplier: "1.3x", fee: "+R$ 1,50" },
                      { period: "Fim de Semana", time: "Sáb/Dom", multiplier: "1.2x", fee: "+R$ 1,00" },
                    ].map((period, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{period.period}</p>
                          <p className="text-sm text-muted-foreground">{period.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{period.fee}</p>
                          <p className="text-sm text-muted-foreground">{period.multiplier}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Horários Promocionais</h4>
                  <div className="space-y-3">
                    {[
                      { period: "Madrugada", time: "00:00 - 06:00", multiplier: "0.8x", fee: "-R$ 1,00" },
                      { period: "Meio da Tarde", time: "14:00 - 17:00", multiplier: "0.9x", fee: "-R$ 0,50" },
                      { period: "Terça-feira", time: "Dia todo", multiplier: "0.7x", fee: "-R$ 1,50" },
                    ].map((period, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{period.period}</p>
                          <p className="text-sm text-muted-foreground">{period.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">{period.fee}</p>
                          <p className="text-sm text-muted-foreground">{period.multiplier}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Calculadora de Taxa */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calculator className="w-5 h-5" />
                <span>Simulador de Taxa</span>
              </CardTitle>
              <CardDescription>
                Simule o cálculo de taxa para diferentes cenários
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sim-region">Região</Label>
                      <Select value={simulationData.region} onValueChange={(value) => setSimulationData({...simulationData, region: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma região" />
                        </SelectTrigger>
                        <SelectContent>
                          {regions.map((region) => (
                            <SelectItem key={region.id} value={region.region}>
                              {region.region}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sim-distance">Distância (km)</Label>
                      <Input 
                        id="sim-distance" 
                        placeholder="Ex: 5.2" 
                        value={simulationData.distance}
                        onChange={(e) => setSimulationData({...simulationData, distance: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="sim-value">Valor do Pedido</Label>
                      <Input 
                        id="sim-value" 
                        placeholder="Ex: 45.00" 
                        value={simulationData.value}
                        onChange={(e) => setSimulationData({...simulationData, value: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="sim-time">Horário</Label>
                      <Input 
                        id="sim-time" 
                        placeholder="Ex: 12:30" 
                        value={simulationData.time}
                        onChange={(e) => setSimulationData({...simulationData, time: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button className="w-full" onClick={calculateDeliveryFee}>
                    <Calculator className="w-4 h-4 mr-2" />
                    Calcular Taxa
                  </Button>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Resultado da Simulação</h4>
                  <div className="p-4 border rounded-lg bg-muted/50">
                    {simulationResult ? (
                      <div className="space-y-3">
                        {simulationResult.isFree ? (
                          <div className="text-center">
                            <p className="text-2xl font-bold text-green-600">FRETE GRÁTIS!</p>
                            <p className="text-sm text-muted-foreground">
                              Pedido acima de R$ 60,00
                            </p>
                          </div>
                        ) : (
                          <>
                            <div className="flex justify-between">
                              <span>Taxa Base:</span>
                              <span>R$ {simulationResult.baseFee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Taxa por Distância:</span>
                              <span>R$ {simulationResult.distanceFee}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Taxa de Horário:</span>
                              <span className={parseFloat(simulationResult.timeFee) >= 0 ? "text-orange-600" : "text-green-600"}>
                                {parseFloat(simulationResult.timeFee) >= 0 ? "+" : ""}R$ {simulationResult.timeFee}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span>Desconto VIP:</span>
                              <span className="text-green-600">-R$ {simulationResult.vipDiscount}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between font-bold text-lg">
                              <span>Taxa Total:</span>
                              <span>R$ {simulationResult.totalFee}</span>
                            </div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span>Taxa Base:</span>
                          <span>R$ 4,50</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxa por Distância:</span>
                          <span>R$ --</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Taxa de Horário:</span>
                          <span>R$ --</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Desconto VIP:</span>
                          <span>R$ --</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                          <span>Taxa Total:</span>
                          <span>R$ --</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>
                      {simulationResult ? "Taxa calculada com sucesso" : "Preencha os campos e clique em 'Calcular Taxa'"}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Estatísticas */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa Média Mensal
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 5,80</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">-5%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Entregas Gratuitas
                </CardTitle>
                <Truck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32%</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+8%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Receita com Taxas
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 8.450</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+12%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
      
      {/* Dialog para edição de região */}
      <EditRegionDialog 
        region={editingRegion} 
        onUpdate={handleUpdateRegion} 
        onClose={() => setEditingRegion(null)} 
      />
    </SidebarProvider>
  )
}

// Componente para formulário de nova região
function NewRegionForm({ onSubmit }: { onSubmit: (region: Omit<Region, 'id' | 'orders'>) => void }) {
  const [formData, setFormData] = useState({
    region: "",
    fee: "",
    distance: "",
    status: "Ativa"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.region || !formData.fee || !formData.distance) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    onSubmit(formData)
    setFormData({ region: "", fee: "", distance: "", status: "Ativa" })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-region">Nome da Região</Label>
          <Input
            id="new-region"
            placeholder="Ex: Zona Central"
            value={formData.region}
            onChange={(e) => setFormData({...formData, region: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-fee">Taxa de Entrega</Label>
          <Input
            id="new-fee"
            placeholder="Ex: R$ 5,00"
            value={formData.fee}
            onChange={(e) => setFormData({...formData, fee: e.target.value})}
          />
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-distance">Faixa de Distância</Label>
          <Input
            id="new-distance"
            placeholder="Ex: 5-8 km"
            value={formData.distance}
            onChange={(e) => setFormData({...formData, distance: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Ativa">Ativa</SelectItem>
              <SelectItem value="Limitada">Limitada</SelectItem>
              <SelectItem value="Inativa">Inativa</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type="submit">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Região
        </Button>
      </DialogFooter>
    </form>
  )
}

// Componente para edição de região
function EditRegionDialog({ region, onUpdate, onClose }: { region: Region | null, onUpdate: (region: Region) => void, onClose: () => void }) {
  const [formData, setFormData] = useState({
    id: region?.id || 0,
    region: region?.region || "",
    fee: region?.fee || "",
    distance: region?.distance || "",
    status: region?.status || "Ativa",
    orders: region?.orders || 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.region || !formData.fee || !formData.distance) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    onUpdate(formData)
  }

  if (!region) return null

  return (
    <Dialog open={!!region} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Região</DialogTitle>
          <DialogDescription>
            Modifique as informações da região {region.region}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-region">Nome da Região</Label>
              <Input
                id="edit-region"
                value={formData.region}
                onChange={(e) => setFormData({...formData, region: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-fee">Taxa de Entrega</Label>
              <Input
                id="edit-fee"
                value={formData.fee}
                onChange={(e) => setFormData({...formData, fee: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-distance">Faixa de Distância</Label>
              <Input
                id="edit-distance"
                value={formData.distance}
                onChange={(e) => setFormData({...formData, distance: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Ativa">Ativa</SelectItem>
                  <SelectItem value="Limitada">Limitada</SelectItem>
                  <SelectItem value="Inativa">Inativa</SelectItem>
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