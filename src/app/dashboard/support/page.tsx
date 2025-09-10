"use client"

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
import { useState } from "react"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function SupportPage() {
  const [tickets, setTickets] = useState([
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
      description: "Não consigo fazer login no aplicativo",
      status: "Aberto",
      priority: "Média",
      category: "Técnico",
      createdAt: "2024-04-15 09:20",
      lastUpdate: "há 3 horas"
    }
  ])

  const [faqs, setFaqs] = useState([
    {
      id: 1,
      question: "Como rastrear meu pedido?",
      answer: "Você pode rastrear seu pedido através do aplicativo ou site, na seção 'Meus Pedidos'.",
      category: "Pedidos"
    },
    {
      id: 2,
      question: "Qual o tempo de entrega?",
      answer: "O tempo médio de entrega é de 30-45 minutos, dependendo da distância e disponibilidade.",
      category: "Entrega"
    },
    {
      id: 3,
      question: "Como cancelar um pedido?",
      answer: "Pedidos podem ser cancelados até 5 minutos após a confirmação, através do app.",
      category: "Pedidos"
    },
    {
      id: 4,
      question: "Formas de pagamento aceitas",
      answer: "Aceitamos PIX, cartão de crédito, débito e dinheiro na entrega.",
      category: "Pagamento"
    }
  ])

  const [selectedTicket, setSelectedTicket] = useState<any>(null)
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false)
  const [isNewFaqOpen, setIsNewFaqOpen] = useState(false)
  const [editingFaq, setEditingFaq] = useState<any>(null)
  const [chatMessage, setChatMessage] = useState("")
  const [isRespondModalOpen, setIsRespondModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [respondingTicket, setRespondingTicket] = useState<any>(null)
  const [viewingTicket, setViewingTicket] = useState<any>(null)

  // Funções para tickets
  const handleNewTicket = (ticketData: any) => {
    const newTicket = {
      ...ticketData,
      id: `#SUP-${String(tickets.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toLocaleString('pt-BR'),
      lastUpdate: "agora"
    }
    setTickets([newTicket, ...tickets])
    setIsNewTicketOpen(false)
    toast.success("Ticket criado com sucesso!")
  }

  const handleRespondTicket = (ticket: any) => {
    setRespondingTicket(ticket)
    setIsRespondModalOpen(true)
  }

  const handleSendResponse = (responseData: any) => {
    // Atualizar status do ticket para "Em andamento"
    setTickets(tickets.map(ticket => 
      ticket.id === respondingTicket.id 
        ? { ...ticket, status: "Em andamento", lastUpdate: "agora" }
        : ticket
    ))
    
    setIsRespondModalOpen(false)
    setRespondingTicket(null)
    toast.success(`Resposta enviada para ${respondingTicket.customer}!`)
  }

  const handleCallCustomer = (ticket: any) => {
    toast.info(`Ligando para ${ticket.customer}`, {
      description: `Número: ${ticket.phone}`
    })
    
    if (navigator.userAgent.includes('Mobile')) {
      window.location.href = `tel:${ticket.phone}`
    } else {
      navigator.clipboard.writeText(ticket.phone).then(() => {
        toast.success("Número copiado para área de transferência!")
      })
    }
  }

  const handleViewTicketDetails = (ticket: any) => {
    setViewingTicket(ticket)
    setIsDetailsModalOpen(true)
  }

  const handleUpdateTicketStatus = (ticketId: string, newStatus: string) => {
    setTickets(tickets.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, status: newStatus, lastUpdate: "agora" }
        : ticket
    ))
    toast.success(`Status do ticket ${ticketId} atualizado para ${newStatus}`)
  }

  // Funções para FAQ
  const handleAddFaq = (faqData: any) => {
    const newFaq = {
      ...faqData,
      id: Math.max(...faqs.map(f => f.id)) + 1
    }
    setFaqs([...faqs, newFaq])
    setIsNewFaqOpen(false)
    toast.success("FAQ adicionado com sucesso!")
  }

  const handleEditFaq = (faq: any) => {
    setEditingFaq(faq)
  }

  const handleUpdateFaq = (updatedFaq: any) => {
    setFaqs(faqs.map(faq => 
      faq.id === updatedFaq.id ? updatedFaq : faq
    ))
    setEditingFaq(null)
    toast.success("FAQ atualizado com sucesso!")
  }

  const handleDeleteFaq = (faqId: number) => {
    setFaqs(faqs.filter(faq => faq.id !== faqId))
    toast.success("FAQ removido com sucesso!")
  }

  // Função para chat
  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      toast.success("Mensagem enviada!")
      setChatMessage("")
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Aberto":
        return <Badge variant="destructive">Aberto</Badge>
      case "Em andamento":
        return <Badge variant="warning">Em andamento</Badge>
      case "Resolvido":
        return <Badge variant="success">Resolvido</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "Alta":
        return <Badge variant="destructive">Alta</Badge>
      case "Média":
        return <Badge variant="warning">Média</Badge>
      case "Baixa":
        return <Badge variant="info">Baixa</Badge>
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
            <Dialog open={isNewTicketOpen} onOpenChange={setIsNewTicketOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Novo Ticket
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Novo Ticket de Suporte</DialogTitle>
                  <DialogDescription>
                    Crie um novo ticket de suporte para um cliente
                  </DialogDescription>
                </DialogHeader>
                <NewTicketForm onSubmit={handleNewTicket} />
              </DialogContent>
            </Dialog>
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
                        <Button 
                          size="sm"
                          onClick={() => handleRespondTicket(ticket)}
                        >
                          <MessageCircle className="w-3 h-3 mr-1" />
                          Responder
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCallCustomer(ticket)}
                        >
                          <Phone className="w-3 h-3 mr-1" />
                          Ligar
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleViewTicketDetails(ticket)}
                        >
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
                      <Input 
                        placeholder="Digite sua mensagem..." 
                        className="flex-1"
                        value={chatMessage}
                        onChange={(e) => setChatMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <Button onClick={handleSendMessage}>
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
                          <Dialog open={editingFaq?.id === faq.id} onOpenChange={(open) => !open && setEditingFaq(null)}>
                            <DialogTrigger asChild>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleEditFaq(faq)}
                              >
                                Editar
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Editar FAQ</DialogTitle>
                                <DialogDescription>
                                  Edite a pergunta frequente
                                </DialogDescription>
                              </DialogHeader>
                              <FaqForm onSubmit={handleUpdateFaq} initialData={editingFaq} />
                            </DialogContent>
                          </Dialog>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteFaq(faq.id)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t">
                    <Dialog open={isNewFaqOpen} onOpenChange={setIsNewFaqOpen}>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="w-4 h-4 mr-2" />
                          Adicionar FAQ
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Novo FAQ</DialogTitle>
                          <DialogDescription>
                            Adicione uma nova pergunta frequente
                          </DialogDescription>
                        </DialogHeader>
                        <FaqForm onSubmit={handleAddFaq} />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Modal de Resposta */}
          <Dialog open={isRespondModalOpen} onOpenChange={setIsRespondModalOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Responder Ticket {respondingTicket?.id}</DialogTitle>
                <DialogDescription>
                  Envie uma resposta para {respondingTicket?.customer}
                </DialogDescription>
              </DialogHeader>
              {respondingTicket && (
                <ResponseForm 
                  ticket={respondingTicket} 
                  onSubmit={handleSendResponse} 
                />
              )}
            </DialogContent>
          </Dialog>

          {/* Modal de Detalhes */}
          <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Detalhes do Ticket {viewingTicket?.id}</DialogTitle>
                <DialogDescription>
                  Informações completas e histórico do ticket
                </DialogDescription>
              </DialogHeader>
              {viewingTicket && (
                <TicketDetails 
                  ticket={viewingTicket} 
                  onStatusUpdate={handleUpdateTicketStatus}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

// Componente para formulário de novo ticket
function NewTicketForm({ onSubmit }: { onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    customer: "",
    email: "",
    phone: "",
    subject: "",
    description: "",
    priority: "Média",
    category: "Geral"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      ...formData,
      status: "Aberto"
    })
    setFormData({
      customer: "",
      email: "",
      phone: "",
      subject: "",
      description: "",
      priority: "Média",
      category: "Geral"
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="customer">Nome do Cliente</Label>
          <Input
            id="customer"
            value={formData.customer}
            onChange={(e) => setFormData({...formData, customer: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            required
          />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Telefone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({...formData, phone: e.target.value})}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="priority">Prioridade</Label>
          <Select value={formData.priority} onValueChange={(value) => setFormData({...formData, priority: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Baixa">Baixa</SelectItem>
              <SelectItem value="Média">Média</SelectItem>
              <SelectItem value="Alta">Alta</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Geral">Geral</SelectItem>
            <SelectItem value="Entrega">Entrega</SelectItem>
            <SelectItem value="Financeiro">Financeiro</SelectItem>
            <SelectItem value="Produto">Produto</SelectItem>
            <SelectItem value="Técnico">Técnico</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subject">Assunto</Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) => setFormData({...formData, subject: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          rows={4}
          required
        />
      </div>

      <DialogFooter>
        <Button type="submit">Criar Ticket</Button>
      </DialogFooter>
    </form>
  )
}

// Componente para formulário de FAQ
function FaqForm({ onSubmit, initialData }: { onSubmit: (data: any) => void, initialData?: any }) {
  const [formData, setFormData] = useState({
    question: initialData?.question || "",
    answer: initialData?.answer || "",
    category: initialData?.category || "Geral"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(initialData ? { ...initialData, ...formData } : formData)
    if (!initialData) {
      setFormData({
        question: "",
        answer: "",
        category: "Geral"
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="question">Pergunta</Label>
        <Input
          id="question"
          value={formData.question}
          onChange={(e) => setFormData({...formData, question: e.target.value})}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="category">Categoria</Label>
        <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Geral">Geral</SelectItem>
            <SelectItem value="Pedidos">Pedidos</SelectItem>
            <SelectItem value="Entrega">Entrega</SelectItem>
            <SelectItem value="Pagamento">Pagamento</SelectItem>
            <SelectItem value="Produto">Produto</SelectItem>
            <SelectItem value="Técnico">Técnico</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="answer">Resposta</Label>
        <Textarea
          id="answer"
          value={formData.answer}
          onChange={(e) => setFormData({...formData, answer: e.target.value})}
          rows={4}
          required
        />
      </div>

      <DialogFooter>
        <Button type="submit">
          {initialData ? "Atualizar" : "Adicionar"} FAQ
        </Button>
      </DialogFooter>
    </form>
  )
}

// Componente para formulário de resposta
function ResponseForm({ ticket, onSubmit }: { ticket: any, onSubmit: (data: any) => void }) {
  const [formData, setFormData] = useState({
    message: "",
    responseType: "email",
    newStatus: "Em andamento"
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({
      message: "",
      responseType: "email",
      newStatus: "Em andamento"
    })
  }

  return (
    <div className="space-y-4">
      {/* Informações do Ticket */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium">Cliente:</span> {ticket.customer}
          </div>
          <div>
            <span className="font-medium">Email:</span> {ticket.email}
          </div>
          <div>
            <span className="font-medium">Telefone:</span> {ticket.phone}
          </div>
          <div>
            <span className="font-medium">Prioridade:</span> {ticket.priority}
          </div>
        </div>
        <div className="mt-3">
          <span className="font-medium">Problema:</span>
          <p className="text-sm mt-1">{ticket.description}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="responseType">Tipo de Resposta</Label>
            <Select value={formData.responseType} onValueChange={(value) => setFormData({...formData, responseType: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Telefone</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="newStatus">Novo Status</Label>
            <Select value={formData.newStatus} onValueChange={(value) => setFormData({...formData, newStatus: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Em andamento">Em andamento</SelectItem>
                <SelectItem value="Aguardando cliente">Aguardando cliente</SelectItem>
                <SelectItem value="Resolvido">Resolvido</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Mensagem de Resposta</Label>
          <Textarea
            id="message"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            rows={6}
            placeholder="Digite sua resposta para o cliente..."
            required
          />
        </div>

        <DialogFooter>
          <Button type="submit">
            <Send className="w-4 h-4 mr-2" />
            Enviar Resposta
          </Button>
        </DialogFooter>
      </form>
    </div>
  )
}

// Componente para detalhes do ticket
function TicketDetails({ ticket, onStatusUpdate }: { ticket: any, onStatusUpdate: (ticketId: string, newStatus: string) => void }) {
  const [newStatus, setNewStatus] = useState("Aberto")

  const handleStatusUpdate = () => {
    if (newStatus !== ticket.status) {
      onStatusUpdate(ticket.id, newStatus)
    }
  }

  const handleRespond = () => {
    toast.info(`Abrindo resposta para ${ticket.customer}`, {
      description: `Ticket: ${ticket.id}`
    })
  }

  const handleCall = () => {
    toast.info(`Ligando para ${ticket.customer}`, {
      description: `Número: ${ticket.phone}`
    })
    
    if (navigator.userAgent.includes('Mobile')) {
      window.location.href = `tel:${ticket.phone}`
    } else {
      navigator.clipboard.writeText(ticket.phone).then(() => {
        toast.success("Número copiado para área de transferência!")
      })
    }
  }

  const handleEmail = () => {
    const subject = encodeURIComponent(`Re: ${ticket.subject} - Ticket ${ticket.id}`)
    const body = encodeURIComponent(`Olá ${ticket.customer},\n\nEm resposta ao seu ticket ${ticket.id} sobre "${ticket.subject}".\n\n`)
    const mailtoLink = `mailto:${ticket.email}?subject=${subject}&body=${body}`
    
    window.location.href = mailtoLink
    toast.success("Cliente de email aberto!")
  }

  return (
    <div className="space-y-4">
      {/* Informações Resumidas */}
      <div className="p-4 bg-muted rounded-lg">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="font-medium">Cliente:</span>
            <p>{ticket.customer}</p>
            <p className="text-muted-foreground">{ticket.email}</p>
          </div>
          <div>
            <span className="font-medium">Contato:</span>
            <p>{ticket.phone}</p>
            <p className="text-muted-foreground">{ticket.category}</p>
          </div>
          <div>
            <span className="font-medium">Status:</span>
            <div className="flex items-center space-x-2 mt-1">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-32 text-left">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Aberto">Aberto</SelectItem>
                  <SelectItem value="Em andamento">Em andamento</SelectItem>
                  <SelectItem value="Aguardando cliente">Aguardando cliente</SelectItem>
                  <SelectItem value="Resolvido">Resolvido</SelectItem>
                </SelectContent>
              </Select>
              {newStatus !== ticket.status && (
                <Button size="sm" onClick={handleStatusUpdate}>
                  Salvar
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Problema */}
      <div className="space-y-2">
        <h4 className="font-medium">Descrição do Problema</h4>
        <div className="p-3 bg-muted rounded-lg">
          <p className="font-medium text-sm">{ticket.subject}</p>
          <p className="text-sm mt-1">{ticket.description}</p>
        </div>
      </div>

      {/* Histórico Compacto */}
      <div className="space-y-2">
        <h4 className="font-medium">Histórico</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          <div className="flex items-center justify-between p-2 bg-muted rounded text-sm">
            <span>Ticket criado</span>
            <span className="text-muted-foreground">{ticket.createdAt}</span>
          </div>
          <div className="flex items-center justify-between p-2 bg-muted rounded text-sm">
            <span>Última atualização</span>
            <span className="text-muted-foreground">{ticket.lastUpdate}</span>
          </div>
        </div>
      </div>

      {/* Ações */}
      <div className="flex items-center space-x-2 pt-2 border-t">
        <Button size="sm" onClick={handleRespond}>
          <MessageCircle className="w-4 h-4 mr-1" />
          Responder
        </Button>
        <Button size="sm" variant="outline" onClick={handleCall}>
          <Phone className="w-4 h-4 mr-1" />
          Ligar
        </Button>
        <Button size="sm" variant="outline" onClick={handleEmail}>
          <Mail className="w-4 h-4 mr-1" />
          Email
        </Button>
      </div>
    </div>
  )
}