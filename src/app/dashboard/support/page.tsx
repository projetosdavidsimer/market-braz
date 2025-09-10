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
import { Textarea } from "@/components/ui/textarea"
import { ModeToggle } from "@/components/mode-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  MessageSquare, 
  Plus,
  Search,
  Filter,
  Clock,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  Mail,
  MessageCircle,
  Send
} from "lucide-react"

export default function SupportPage() {
  const tickets = [
    {
      id: "#SUP-001",
      customer: "João Silva",
      email: "joao@email.com",
      phone: "(11) 99999-1111",
      subject: "Problema com entrega",
      description: "Meu pedido não chegou no horário previsto",
      status: "Aberto",
      priority: "Alta",
      category: "Entrega",
      createdAt: "2024-04-15 14:30",
      lastUpdate: "há 2 horas"
    },
    {
      id: "#SUP-002",
      customer: "Maria Santos",
      email: "maria@email.com",
      phone: "(11) 99999-2222",
      subject: "Cobrança incorreta",
      description: "Fui cobrada duas vezes pelo mesmo pedido",
      status: "Em andamento",
      priority: "Média",
      category: "Financeiro",
      createdAt: "2024-04-15 10:15",
      lastUpdate: "há 1 hora"
    },
    {
      id: "#SUP-003",
      customer: "Pedro Costa",
      email: "pedro@email.com",
      phone: "(11) 99999-3333",
      subject: "Produto com defeito",
      description: "Recebi um produto danificado da farmácia",
      status: "Resolvido",
      priority: "Baixa",
      category: "Produto",
      createdAt: "2024-04-14 16:45",
      lastUpdate: "há 1 dia"
    },
    {
      id: "#SUP-004",
      customer: "Ana Oliveira",
      email: "ana@email.com",
      phone: "(11) 99999-4444",
      subject: "Dificuldade no app",
      description: "N��o consigo fazer login no aplicativo",
      status: "Aberto",
      priority: "Média",
      category: "Técnico",
      createdAt: "2024-04-15 09:20",
      lastUpdate: "há 3 horas"
    }
  ]

  const faqs = [
    {
      question: "Como rastrear meu pedido?",
      answer: "Você pode rastrear seu pedido através do aplicativo ou site, na seção 'Meus Pedidos'.",
      category: "Pedidos"
    },
    {
      question: "Qual o tempo de entrega?",
      answer: "O tempo médio de entrega é de 30-45 minutos, dependendo da distância e disponibilidade.",
      category: "Entrega"
    },
    {
      question: "Como cancelar um pedido?",
      answer: "Pedidos podem ser cancelados até 5 minutos após a confirmação, através do app.",
      category: "Pedidos"
    },
    {
      question: "Formas de pagamento aceitas",
      answer: "Aceitamos PIX, cartão de crédito, débito e dinheiro na entrega.",
      category: "Pagamento"
    }
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aberto":
        return <Badge variant="destructive">Aberto</Badge>
      case "Em andamento":
        return <Badge variant="secondary">Em andamento</Badge>
      case "Resolvido":
        return <Badge variant="default" className="bg-green-500">Resolvido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Alta":
        return <Badge variant="destructive">Alta</Badge>
      case "Média":
        return <Badge variant="secondary">Média</Badge>
      case "Baixa":
        return <Badge variant="outline">Baixa</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Aberto":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "Em andamento":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "Resolvido":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />
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
                  <BreadcrumbPage>Suporte ao Cliente</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Suporte ao Cliente</h1>
              <p className="text-muted-foreground">
                Gerencie tickets de suporte e atendimento ao cliente
              </p>
            </div>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Novo Ticket
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tickets Abertos</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tickets.filter(t => t.status === "Aberto").length}</div>
                <p className="text-xs text-muted-foreground">
                  aguardando atendimento
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Andamento</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tickets.filter(t => t.status === "Em andamento").length}</div>
                <p className="text-xs text-muted-foreground">
                  sendo atendidos
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Resolvidos Hoje</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{tickets.filter(t => t.status === "Resolvido").length}</div>
                <p className="text-xs text-muted-foreground">
                  tickets fechados
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Médio</CardTitle>
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2.5h</div>
                <p className="text-xs text-muted-foreground">
                  tempo de resolução
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="tickets" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tickets">Tickets</TabsTrigger>
              <TabsTrigger value="chat">Chat ao Vivo</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>

            <TabsContent value="tickets" className="space-y-4">
              {/* Search and Filter */}
              <div className="flex items-center space-x-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar tickets..." className="pl-8" />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
              </div>

              {/* Tickets List */}
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <Card key={ticket.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(ticket.status)}
                          <div>
                            <CardTitle className="text-lg">{ticket.id}</CardTitle>
                            <CardDescription>{ticket.subject}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getPriorityBadge(ticket.priority)}
                          {getStatusBadge(ticket.status)}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Customer Info */}
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="w-3 h-3 text-muted-foreground" />
                          <span>{ticket.customer}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{ticket.email}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          <span className="text-muted-foreground">{ticket.phone}</span>
                        </div>
                      </div>

                      {/* Description */}
                      <div className="p-3 bg-muted rounded-lg">
                        <p className="text-sm">{ticket.description}</p>
                      </div>

                      {/* Metadata */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-4">
                          <span>Categoria: {ticket.category}</span>
                          <span>Criado: {ticket.createdAt}</span>
                        </div>
                        <span>Atualizado: {ticket.lastUpdate}</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 pt-2 border-t">
                        <Button size="sm">
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Responder
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-3 h-3 mr-1" />
                          Ligar
                        </Button>
                        <Button size="sm" variant="outline">
                          Ver Detalhes
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Chat ao Vivo</CardTitle>
                  <CardDescription>
                    Atendimento em tempo real com os clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="h-96 border rounded-lg p-4 bg-muted/20">
                      <div className="text-center text-muted-foreground">
                        <MessageSquare className="w-12 h-12 mx-auto mb-2" />
                        <p>Nenhuma conversa ativa no momento</p>
                        <p className="text-sm">Os chats aparecerão aqui quando iniciados</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input placeholder="Digite sua mensagem..." className="flex-1" />
                      <Button>
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="faq" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Perguntas Frequentes</CardTitle>
                  <CardDescription>
                    Gerencie as perguntas mais comuns dos clientes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-medium">{faq.question}</h4>
                          <Badge variant="outline">{faq.category}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        <div className="flex items-center space-x-2 mt-3">
                          <Button size="sm" variant="outline">Editar</Button>
                          <Button size="sm" variant="outline">Excluir</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar FAQ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}