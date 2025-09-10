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
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CreditCard,
  Banknote,
  Download,
  Calendar,
  Store,
  Truck,
  FileText,
  Filter
} from "lucide-react"

export default function FinancialPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("Este Mês")
  const [exportModalOpen, setExportModalOpen] = useState(false)
  const [selectedReportType, setSelectedReportType] = useState("")
  const [periodModalOpen, setPeriodModalOpen] = useState(false)

  // Funções para os botões
  const handlePeriodChange = () => {
    setPeriodModalOpen(true)
  }

  const handleExport = () => {
    setExportModalOpen(true)
  }

  const handlePeriodSelect = (period: string) => {
    setSelectedPeriod(period)
    setPeriodModalOpen(false)
    // Aqui você implementaria a lógica para filtrar os dados por período
    console.log(`Período selecionado: ${period}`)
  }

  const handleReportExport = () => {
    if (selectedReportType) {
      // Simular download do relatório
      const reportData = generateReportData(selectedReportType)
      downloadReport(reportData, selectedReportType)
      setExportModalOpen(false)
      setSelectedReportType("")
    }
  }

  const generateReportData = (reportType: string) => {
    // Simular geração de dados do relatório
    const currentDate = new Date().toLocaleDateString('pt-BR')
    
    switch (reportType) {
      case "receitas":
        return {
          title: "Relatório Mensal de Receitas",
          period: selectedPeriod,
          data: revenueData,
          total: "R$ 207.561",
          generated: currentDate
        }
      case "comissoes":
        return {
          title: "Relatório de Comissões por Loja",
          period: selectedPeriod,
          data: commissionData,
          total: "R$ 994",
          generated: currentDate
        }
      case "taxas":
        return {
          title: "Relatório de Taxas de Entrega",
          period: selectedPeriod,
          data: deliveryFees,
          total: "R$ 415,50",
          generated: currentDate
        }
      case "completo":
        return {
          title: "Demonstrativo Financeiro Completo",
          period: selectedPeriod,
          receitas: "R$ 61.200",
          comissoes: "R$ 6.120",
          taxas: "R$ 1.580",
          lucro: "R$ 4.540",
          generated: currentDate
        }
      default:
        return {}
    }
  }

  const downloadReport = (data: any, type: string) => {
    // Simular download do arquivo
    const fileName = `relatorio_${type}_${selectedPeriod.toLowerCase().replace(' ', '_')}_${new Date().getTime()}.pdf`
    
    // Em uma implementação real, você geraria um PDF ou CSV aqui
    console.log(`Baixando relatório: ${fileName}`, data)
    
    // Simular download com alert
    alert(`Relatório "${data.title}" foi gerado com sucesso!\nArquivo: ${fileName}`)
  }

  const handleIndividualReportDownload = (reportType: string) => {
    const reportData = generateReportData(reportType)
    downloadReport(reportData, reportType)
  }
  const revenueData = [
    { period: "Janeiro", revenue: 45231, commission: 4523, fees: 1200 },
    { period: "Fevereiro", revenue: 52180, commission: 5218, fees: 1350 },
    { period: "Março", revenue: 48950, commission: 4895, fees: 1280 },
    { period: "Abril", revenue: 61200, commission: 6120, fees: 1580 },
  ]

  const commissionData = [
    { store: "Padaria Central", orders: 45, revenue: "R$ 2.250", commission: "R$ 225", rate: "10%" },
    { store: "Farmácia Saúde", orders: 32, revenue: "R$ 1.890", commission: "R$ 189", rate: "10%" },
    { store: "Mercado Bom Preço", orders: 28, revenue: "R$ 3.120", commission: "R$ 312", rate: "10%" },
    { store: "Pizzaria Italiana", orders: 38, revenue: "R$ 2.680", commission: "R$ 268", rate: "10%" },
  ]

  const deliveryFees = [
    { driver: "Roberto Silva", deliveries: 45, distance: "112 km", fees: "R$ 168", bonus: "R$ 45" },
    { driver: "Marcos Pereira", deliveries: 32, distance: "89 km", fees: "R$ 133,50", bonus: "R$ 32" },
    { driver: "Lucas Ferreira", deliveries: 28, distance: "76 km", fees: "R$ 114", bonus: "R$ 28" },
  ]

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
                  <BreadcrumbPage>Financeiro</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Gestão Financeira</h1>
              <p className="text-muted-foreground">
                Acompanhe receitas, comissões e taxas da plataforma
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handlePeriodChange}>
                <Calendar className="w-4 h-4 mr-2" />
                {selectedPeriod}
              </Button>
              <Button onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 61.200</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  +25% vs mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comissões</CardTitle>
                <CreditCard className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 6.120</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  +18% vs mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxas de Entrega</CardTitle>
                <Banknote className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 1.580</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  +12% vs mês anterior
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Lucro Líquido</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">R$ 4.540</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
                  +32% vs mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="revenue" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="revenue">Receitas</TabsTrigger>
              <TabsTrigger value="commissions">Comissões</TabsTrigger>
              <TabsTrigger value="fees">Taxas</TabsTrigger>
              <TabsTrigger value="reports">Relatórios</TabsTrigger>
            </TabsList>

            <TabsContent value="revenue" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Evolução da Receita</CardTitle>
                    <CardDescription>
                      Receita mensal dos últimos 4 meses
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {revenueData.map((data, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                          <div>
                            <p className="font-medium">{data.period}</p>
                            <p className="text-sm text-muted-foreground">
                              Comissão: R$ {data.commission.toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg">R$ {data.revenue.toLocaleString()}</p>
                            <p className="text-sm text-muted-foreground">
                              Taxas: R$ {data.fees.toLocaleString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Métodos de Pagamento</CardTitle>
                    <CardDescription>
                      Distribuição por forma de pagamento
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Banknote className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium">PIX</p>
                            <p className="text-sm text-muted-foreground">Instantâneo</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">65%</p>
                          <p className="text-sm text-muted-foreground">R$ 39.780</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">Cartão de Crédito</p>
                            <p className="text-sm text-muted-foreground">Parcelado</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">25%</p>
                          <p className="text-sm text-muted-foreground">R$ 15.300</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                            <CreditCard className="w-4 h-4 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium">Cartão de Débito</p>
                            <p className="text-sm text-muted-foreground">À vista</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">10%</p>
                          <p className="text-sm text-muted-foreground">R$ 6.120</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="commissions" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Comissões por Loja</CardTitle>
                  <CardDescription>
                    Detalhamento das comissões cobradas de cada estabelecimento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {commissionData.map((store, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Store className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{store.store}</p>
                            <p className="text-sm text-muted-foreground">{store.orders} pedidos</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Receita</p>
                            <p className="font-medium">{store.revenue}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Taxa</p>
                            <p className="font-medium">{store.rate}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Comissão</p>
                            <p className="font-bold text-lg">{store.commission}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="fees" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Taxas de Entrega</CardTitle>
                  <CardDescription>
                    Detalhamento das taxas pagas aos entregadores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deliveryFees.map((driver, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <Truck className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{driver.driver}</p>
                            <p className="text-sm text-muted-foreground">{driver.deliveries} entregas</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Distância</p>
                            <p className="font-medium">{driver.distance}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Taxa Base</p>
                            <p className="font-medium">{driver.fees}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-muted-foreground">Bônus</p>
                            <p className="font-bold text-lg">{driver.bonus}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Relatórios Disponíveis</CardTitle>
                    <CardDescription>
                      Gere relatórios detalhados para análise
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleIndividualReportDownload("receitas")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Relatório Mensal de Receitas
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleIndividualReportDownload("comissoes")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Relatório de Comissões por Loja
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleIndividualReportDownload("taxas")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Relatório de Taxas de Entrega
                    </Button>
                    <Button 
                      className="w-full justify-start" 
                      variant="outline"
                      onClick={() => handleIndividualReportDownload("completo")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Demonstrativo Financeiro Completo
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Resumo Financeiro</CardTitle>
                    <CardDescription>
                      Principais indicadores do mês
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">Receita Bruta:</span>
                      <span className="font-bold">R$ 61.200</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">(-) Comissões Pagas:</span>
                      <span className="font-medium text-red-600">R$ 6.120</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">(-) Taxas de Entrega:</span>
                      <span className="font-medium text-red-600">R$ 1.580</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">(-) Custos Operacionais:</span>
                      <span className="font-medium text-red-600">R$ 48.960</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                      <span className="font-medium">Lucro Líquido:</span>
                      <span className="font-bold text-lg text-green-600">R$ 4.540</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>

      {/* Modal de Seleção de Período */}
      <Dialog open={periodModalOpen} onOpenChange={setPeriodModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Selecionar Período</DialogTitle>
            <DialogDescription>
              Escolha o período para visualizar os dados financeiros
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Button 
                variant={selectedPeriod === "Este Mês" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Este Mês")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Este Mês
              </Button>
              <Button 
                variant={selectedPeriod === "Mês Passado" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Mês Passado")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Mês Passado
              </Button>
              <Button 
                variant={selectedPeriod === "Últimos 3 Meses" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Últimos 3 Meses")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Últimos 3 Meses
              </Button>
              <Button 
                variant={selectedPeriod === "Últimos 6 Meses" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Últimos 6 Meses")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Últimos 6 Meses
              </Button>
              <Button 
                variant={selectedPeriod === "Este Ano" ? "default" : "outline"}
                className="justify-start"
                onClick={() => handlePeriodSelect("Este Ano")}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Este Ano
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPeriodModalOpen(false)}>
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Exportação */}
      <Dialog open={exportModalOpen} onOpenChange={setExportModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Exportar Relatório</DialogTitle>
            <DialogDescription>
              Selecione o tipo de relatório que deseja exportar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de Relatório</label>
              <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um relatório" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="receitas">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Relatório de Receitas
                    </div>
                  </SelectItem>
                  <SelectItem value="comissoes">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Relatório de Comissões
                    </div>
                  </SelectItem>
                  <SelectItem value="taxas">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Relatório de Taxas
                    </div>
                  </SelectItem>
                  <SelectItem value="completo">
                    <div className="flex items-center">
                      <FileText className="w-4 h-4 mr-2" />
                      Demonstrativo Completo
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-3 bg-muted rounded-lg">
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4" />
                <span>Período: {selectedPeriod}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm mt-1">
                <Download className="w-4 h-4" />
                <span>Formato: PDF</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setExportModalOpen(false)
              setSelectedReportType("")
            }}>
              Cancelar
            </Button>
            <Button onClick={handleReportExport} disabled={!selectedReportType}>
              <Download className="w-4 h-4 mr-2" />
              Exportar Relatório
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}