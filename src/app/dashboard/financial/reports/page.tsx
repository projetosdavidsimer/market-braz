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
  RefreshCw
} from "lucide-react"

export default function ReportsPage() {
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
              <Button variant="outline">
                <Calendar className="w-4 h-4 mr-2" />
                Período
              </Button>
              <Button>
                <RefreshCw className="w-4 h-4 mr-2" />
                Atualizar
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
                      <Button variant="ghost" size="sm" disabled={report.status !== "Disponível"}>
                        <Eye className="w-4 h-4 mr-1" />
                        Visualizar
                      </Button>
                      <Button variant="outline" size="sm" disabled={report.status !== "Disponível"}>
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
                <Button className="w-full">
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
                <Button className="w-full" variant="outline">
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
                <Button className="w-full" variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Download em Lote
                </Button>
                <Button className="w-full" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Relatório Executivo
                </Button>
                <Button className="w-full" variant="outline">
                  <Calendar className="w-4 h-4 mr-2" />
                  Configurar Alertas
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}