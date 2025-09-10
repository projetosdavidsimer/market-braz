"use client"

import Link from "next/link"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  FileText,
  Download,
  Calendar,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  DollarSign,
  Users,
  ShoppingBag,
  Store,
  Truck,
  CreditCard,
  Eye,
  RefreshCw,
  Bell,
  Package
} from "lucide-react"

export default function ReportsPage() {
  const [periodModalOpen, setPeriodModalOpen] = useState(false)
  const [viewModalOpen, setViewModalOpen] = useState(false)
  const [generateReportModalOpen, setGenerateReportModalOpen] = useState(false)
  const [scheduleReportModalOpen, setScheduleReportModalOpen] = useState(false)
  const [batchDownloadModalOpen, setBatchDownloadModalOpen] = useState(false)
  const [executiveReportModalOpen, setExecutiveReportModalOpen] = useState(false)
  const [alertsModalOpen, setAlertsModalOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handlePeriodSelect = () => {
    setPeriodModalOpen(true)
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simular carregamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsRefreshing(false)
    alert('Relatórios atualizados!')
  }

  const handleView = (report: any) => {
    setSelectedReport(report)
    setViewModalOpen(true)
  }

  const handleDownload = (report: any) => {
    // Simular download
    const link = document.createElement('a')
    link.href = '#'
    link.download = `${report.name.replace(/\s+/g, '_')}.${report.format.toLowerCase()}`
    link.click()
    alert(`Download iniciado: ${report.name}`)
  }

  const handleGenerateReport = () => {
    setGenerateReportModalOpen(true)
  }

  const handleScheduleReport = () => {
    setScheduleReportModalOpen(true)
  }

  const handleBatchDownload = () => {
    setBatchDownloadModalOpen(true)
  }

  const handleExecutiveReport = () => {
    setExecutiveReportModalOpen(true)
  }

  const handleConfigureAlerts = () => {
    setAlertsModalOpen(true)
  }

  const handleBatchDownloadExecute = (selectedReports: string[]) => {
    // Simular download em lote
    const zip = selectedReports.join(', ')
    alert(`Download em lote iniciado para: ${zip}`)
    setBatchDownloadModalOpen(false)
  }
  const availableReports = [
    {
      id: 1,
      name: "Relatório Financeiro Mensal",
      description: "Resumo completo das receitas, comissões e taxas do mês",
      category: "Financeiro",
      frequency: "Mensal",
      lastGenerated: "2024-04-01",
      size: "2.3 MB",
      format: "PDF",
      status: "Disponível",
      icon: DollarSign
    },
    {
      id: 2,
      name: "Análise de Performance das Lojas",
      description: "Ranking e métricas detalhadas de todas as lojas parceiras",
      category: "Operacional",
      frequency: "Semanal",
      lastGenerated: "2024-04-08",
      size: "1.8 MB",
      format: "Excel",
      status: "Disponível",
      icon: Store
    },
    {
      id: 3,
      name: "Relatório de Entregas",
      description: "Estatísticas de entregas, tempos médios e performance dos entregadores",
      category: "Logística",
      frequency: "Diário",
      lastGenerated: "2024-04-15",
      size: "945 KB",
      format: "PDF",
      status: "Disponível",
      icon: Truck
    },
    {
      id: 4,
      name: "Análise de Usuários",
      description: "Comportamento dos usuários, retenção e análise de churn",
      category: "Marketing",
      frequency: "Mensal",
      lastGenerated: "2024-04-01",
      size: "1.2 MB",
      format: "PDF",
      status: "Disponível",
      icon: Users
    },
    {
      id: 5,
      name: "Relatório de Transações",
      description: "Detalhamento de todas as transações e métodos de pagamento",
      category: "Financeiro",
      frequency: "Diário",
      lastGenerated: "2024-04-15",
      size: "3.1 MB",
      format: "Excel",
      status: "Processando",
      icon: CreditCard
    },
    {
      id: 6,
      name: "Dashboard Executivo",
      description: "KPIs principais e métricas estratégicas para tomada de decisão",
      category: "Executivo",
      frequency: "Semanal",
      lastGenerated: "2024-04-08",
      size: "856 KB",
      format: "PDF",
      status: "Disponível",
      icon: BarChart3
    }
  ]

  const reportCategories = [
    { name: "Financeiro", count: 2, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
    { name: "Operacional", count: 1, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200" },
    { name: "Logística", count: 1, color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200" },
    { name: "Marketing", count: 1, color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200" },
    { name: "Executivo", count: 1, color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" }
  ]

  const quickMetrics = [
    {
      title: "Receita Total",
      value: "R$ 58.760,40",
      change: "+20.1%",
      period: "Abril 2024",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Pedidos Processados",
      value: "1.678",
      change: "+15.3%",
      period: "Abril 2024",
      icon: ShoppingBag,
      color: "text-blue-600"
    },
    {
      title: "Lojas Ativas",
      value: "52",
      change: "+10.6%",
      period: "Abril 2024",
      icon: Store,
      color: "text-purple-600"
    },
    {
      title: "Taxa de Conversão",
      value: "3.2%",
      change: "+0.8%",
      period: "Abril 2024",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Disponível":
        return <Badge variant="default" className="bg-green-500">Disponível</Badge>
      case "Processando":
        return <Badge variant="secondary">Processando</Badge>
      case "Erro":
        return <Badge variant="destructive">Erro</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryBadge = (category: string) => {
    const categoryInfo = reportCategories.find(cat => cat.name === category)
    return (
      <Badge className={categoryInfo?.color || "bg-gray-100 text-gray-800"}>
        {category}
      </Badge>
    )
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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard/financial">
                    Financeiro
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Relatórios</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Relatórios Financeiros</h1>
              <p className="text-muted-foreground">
                Acesse relatórios detalhados e análises da plataforma
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar relatórios..." className="pl-8 w-64" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" onClick={handlePeriodSelect}>
                <Calendar className="w-4 h-4 mr-2" />
                Período
              </Button>
              <Button onClick={handleRefresh} disabled={isRefreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                {isRefreshing ? 'Atualizando...' : 'Atualizar'}
              </Button>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            {quickMetrics.map((metric, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                  <metric.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${metric.color}`}>{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    <span className="text-green-600">{metric.change}</span> vs mês anterior
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Report Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Categorias de Relatórios</CardTitle>
              <CardDescription>
                Organize seus relatórios por categoria para fácil acesso
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {reportCategories.map((category, index) => (
                  <div key={index} className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                    <div className={`w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center ${category.color}`}>
                      <FileText className="w-6 h-6" />
                    </div>
                    <h3 className="font-medium">{category.name}</h3>
                    <p className="text-sm text-muted-foreground">{category.count} relatórios</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Available Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Relatórios Disponíveis</CardTitle>
              <CardDescription>
                Lista completa de relatórios gerados e disponíveis para download
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {availableReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <report.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-lg">{report.name}</h3>
                          {getCategoryBadge(report.category)}
                          {getStatusBadge(report.status)}
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{report.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                          <span>Frequência: {report.frequency}</span>
                          <span>Formato: {report.format}</span>
                          <span>Tamanho: {report.size}</span>
                          <span>Gerado em: {new Date(report.lastGenerated).toLocaleDateString('pt-BR')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        disabled={report.status !== "Disponível"}
                        onClick={() => handleView(report)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        Visualizar
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        disabled={report.status !== "Disponível"}
                        onClick={() => handleDownload(report)}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Custom Reports */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Relatórios Personalizados</CardTitle>
                <CardDescription>
                  Crie relatórios customizados com métricas específicas
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Período</label>
                  <div className="flex space-x-2">
                    <Input type="date" className="flex-1" />
                    <Input type="date" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Métricas</label>
                  <div className="grid grid-cols-2 gap-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Receitas</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" defaultChecked />
                      <span className="text-sm">Pedidos</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Comissões</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Entregas</span>
                    </label>
                  </div>
                </div>
                <Button className="w-full" onClick={handleGenerateReport}>
                  <FileText className="w-4 h-4 mr-2" />
                  Gerar Relatório
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Agendamento de Relatórios</CardTitle>
                <CardDescription>
                  Configure relatórios automáticos por email
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tipo de Relatório</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Relatório Financeiro Mensal</option>
                    <option>Dashboard Executivo</option>
                    <option>Análise de Performance</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Frequência</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>Diário</option>
                    <option>Semanal</option>
                    <option>Mensal</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="admin@marketbraz.com" />
                </div>
                <Button className="w-full" variant="outline" onClick={handleScheduleReport}>
                  <Calendar className="w-4 h-4 mr-2" />
                  Agendar Relatório
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="w-5 h-5" />
                  <span>Estatísticas de Uso</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm">Relatórios gerados:</span>
                  <span className="font-bold">24</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Downloads este mês:</span>
                  <span className="font-bold">156</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Relatório mais acessado:</span>
                  <span className="font-bold text-sm">Dashboard Executivo</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status dos Relatórios</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Disponíveis:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-green-500" style={{ width: "83%" }}></div>
                    </div>
                    <span className="font-bold">5</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Processando:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-blue-500" style={{ width: "17%" }}></div>
                    </div>
                    <span className="font-bold">1</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Com erro:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-gray-200 rounded-full h-2">
                      <div className="h-2 rounded-full bg-red-500" style={{ width: "0%" }}></div>
                    </div>
                    <span className="font-bold">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações Rápidas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" variant="outline" onClick={handleBatchDownload}>
                  <Download className="w-4 h-4 mr-2" />
                  Download em Lote
                </Button>
                <Button className="w-full" variant="outline" onClick={handleExecutiveReport}>
                  <FileText className="w-4 h-4 mr-2" />
                  Relatório Executivo
                </Button>
                <Button className="w-full" variant="outline" onClick={handleConfigureAlerts}>
                  <Bell className="w-4 h-4 mr-2" />
                  Configurar Alertas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>

      {/* Modal de Seleção de Período */}
      <Dialog open={periodModalOpen} onOpenChange={setPeriodModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Selecionar Período</span>
            </DialogTitle>
            <DialogDescription>
              Escolha o período para filtrar os relatórios
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Período Predefinido</Label>
              <Select defaultValue="last-month">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o período" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Hoje</SelectItem>
                  <SelectItem value="yesterday">Ontem</SelectItem>
                  <SelectItem value="last-7-days">Últimos 7 dias</SelectItem>
                  <SelectItem value="last-30-days">Últimos 30 dias</SelectItem>
                  <SelectItem value="last-month">Mês passado</SelectItem>
                  <SelectItem value="last-quarter">Último trimestre</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data Inicial</Label>
                <Input type="date" />
              </div>
              <div className="space-y-2">
                <Label>Data Final</Label>
                <Input type="date" />
              </div>
            </div>
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setPeriodModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                alert('Período aplicado!')
                setPeriodModalOpen(false)
              }}>
                Aplicar Filtro
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Visualização */}
      <Dialog open={viewModalOpen} onOpenChange={setViewModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5" />
              <span>Visualizar Relatório</span>
            </DialogTitle>
            <DialogDescription>
              {selectedReport?.name}
            </DialogDescription>
          </DialogHeader>
          
          {selectedReport && (
            <div className="flex-1 overflow-y-auto pr-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Relatório</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Nome</Label>
                      <p className="text-sm">{selectedReport.name}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Categoria</Label>
                      <p className="text-sm">{selectedReport.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Formato</Label>
                      <p className="text-sm">{selectedReport.format}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Tamanho</Label>
                      <p className="text-sm">{selectedReport.size}</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Descrição</Label>
                    <p className="text-sm">{selectedReport.description}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview do Conteúdo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg min-h-[300px] flex items-center justify-center">
                    <div className="text-center">
                      <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-gray-500">Preview do relatório seria exibido aqui</p>
                      <p className="text-sm text-gray-400 mt-2">
                        Formato: {selectedReport.format} • Tamanho: {selectedReport.size}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => handleDownload(selectedReport)}>
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button onClick={() => setViewModalOpen(false)}>
                  Fechar
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Modal de Gerar Relatório */}
      <Dialog open={generateReportModalOpen} onOpenChange={setGenerateReportModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <FileText className="w-5 h-5" />
              <span>Gerar Relatório Personalizado</span>
            </DialogTitle>
            <DialogDescription>
              Configure as opções para gerar um novo relatório
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label>Nome do Relatório</Label>
              <Input placeholder="Ex: Relatório Financeiro Personalizado" />
            </div>
            
            <div className="space-y-2">
              <Label>Período</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input type="date" />
                <Input type="date" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Métricas Incluídas</Label>
              <div className="grid grid-cols-2 gap-3">
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Receitas Totais</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" defaultChecked />
                  <span className="text-sm">Número de Pedidos</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Comissões</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Taxas de Entrega</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Performance das Lojas</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-sm">Análise de Usuários</span>
                </label>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Formato de Saída</Label>
              <Select defaultValue="pdf">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="excel">Excel</SelectItem>
                  <SelectItem value="csv">CSV</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setGenerateReportModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                alert('Relatório sendo gerado! Você será notificado quando estiver pronto.')
                setGenerateReportModalOpen(false)
              }}>
                Gerar Relatório
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Agendar Relatório */}
      <Dialog open={scheduleReportModalOpen} onOpenChange={setScheduleReportModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Calendar className="w-5 h-5" />
              <span>Agendar Relatório</span>
            </DialogTitle>
            <DialogDescription>
              Configure o envio automático de relatórios por email
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label>Tipo de Relatório</Label>
              <Select defaultValue="financial">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Relatório Financeiro</SelectItem>
                  <SelectItem value="executive">Dashboard Executivo</SelectItem>
                  <SelectItem value="performance">Análise de Performance</SelectItem>
                  <SelectItem value="delivery">Relatório de Entregas</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Frequência</Label>
              <Select defaultValue="monthly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="monthly">Mensal</SelectItem>
                  <SelectItem value="quarterly">Trimestral</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Horário de Envio</Label>
              <Input type="time" defaultValue="09:00" />
            </div>

            <div className="space-y-2">
              <Label>Emails para Envio</Label>
              <Input type="email" placeholder="admin@marketbraz.com" />
              <Input type="email" placeholder="financeiro@marketbraz.com" />
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setScheduleReportModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                alert('Agendamento configurado com sucesso!')
                setScheduleReportModalOpen(false)
              }}>
                Agendar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Download em Lote */}
      <Dialog open={batchDownloadModalOpen} onOpenChange={setBatchDownloadModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>Download em Lote</span>
            </DialogTitle>
            <DialogDescription>
              Selecione múltiplos relatórios para download
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {availableReports.filter(r => r.status === "Disponível").map((report) => (
                <label key={report.id} className="flex items-center space-x-3 p-2 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  <input type="checkbox" className="rounded" />
                  <report.icon className="w-5 h-5 text-primary" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{report.name}</p>
                    <p className="text-xs text-muted-foreground">{report.format} • {report.size}</p>
                  </div>
                </label>
              ))}
            </div>
            
            <div className="space-y-2">
              <Label>Formato do Arquivo Compactado</Label>
              <Select defaultValue="zip">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="zip">ZIP</SelectItem>
                  <SelectItem value="rar">RAR</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setBatchDownloadModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => handleBatchDownloadExecute(['Relatório 1', 'Relatório 2'])}>
                <Download className="w-4 h-4 mr-2" />
                Download Selecionados
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Relatório Executivo */}
      <Dialog open={executiveReportModalOpen} onOpenChange={setExecutiveReportModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle className="flex items-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>Relatório Executivo</span>
            </DialogTitle>
            <DialogDescription>
              Dashboard com KPIs principais e métricas estratégicas
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* KPIs Principais */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {quickMetrics.map((metric, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                        <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                      </div>
                      <metric.icon className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      <span className="text-green-600">{metric.change}</span> vs período anterior
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Resumo Financeiro */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo Financeiro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Receita Bruta</span>
                    <span className="font-bold text-green-600">R$ 58.760,40</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Comissões Pagas</span>
                    <span className="font-bold text-blue-600">R$ 12.450,80</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg">
                    <span className="font-medium">Custos Operacionais</span>
                    <span className="font-bold text-orange-600">R$ 8.320,15</span>
                  </div>
                  <div className="flex justify-between items-center p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
                    <span className="font-medium">Lucro Líquido</span>
                    <span className="font-bold text-green-600">R$ 37.989,45</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => handleDownload({name: 'Relatório Executivo', format: 'PDF'})}>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </Button>
              <Button onClick={() => setExecutiveReportModalOpen(false)}>
                Fechar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Configurar Alertas */}
      <Dialog open={alertsModalOpen} onOpenChange={setAlertsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5" />
              <span>Configurar Alertas</span>
            </DialogTitle>
            <DialogDescription>
              Configure notificações automáticas para eventos importantes
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 mt-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Relatório Falhou</p>
                  <p className="text-sm text-muted-foreground">Notificar quando um relatório falha ao ser gerado</p>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Relatório Pronto</p>
                  <p className="text-sm text-muted-foreground">Notificar quando um relatório está disponível</p>
                </div>
                <input type="checkbox" className="rounded" defaultChecked />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Limite de Receita</p>
                  <p className="text-sm text-muted-foreground">Alertar quando receita mensal exceder limite</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
              
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Queda de Performance</p>
                  <p className="text-sm text-muted-foreground">Alertar sobre quedas significativas nas métricas</p>
                </div>
                <input type="checkbox" className="rounded" />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Email para Alertas</Label>
              <Input type="email" placeholder="admin@marketbraz.com" />
            </div>

            <div className="space-y-2">
              <Label>Frequência de Verificação</Label>
              <Select defaultValue="hourly">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realtime">Tempo Real</SelectItem>
                  <SelectItem value="hourly">A cada hora</SelectItem>
                  <SelectItem value="daily">Diário</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setAlertsModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                alert('Alertas configurados com sucesso!')
                setAlertsModalOpen(false)
              }}>
                Salvar Configurações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}