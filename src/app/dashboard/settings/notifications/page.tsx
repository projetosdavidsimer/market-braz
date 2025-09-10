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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "sonner"
import { 
  Bell, 
  Save,
  Plus,
  Edit,
  Trash2,
  Send,
  Mail,
  Smartphone,
  Users,
  Settings,
  Clock,
  CheckCircle,
  AlertCircle,
  Info,
  MessageSquare,
  Volume2,
  Eye,
  EyeOff
} from "lucide-react"

interface Notification {
  id: number
  title: string
  message: string
  type: "info" | "success" | "warning" | "error"
  recipient: "all" | "customers" | "merchants" | "drivers" | "admins"
  channel: "push" | "email" | "sms" | "inApp"
  status: "sent" | "scheduled" | "draft" | "failed"
  sentAt: string
  scheduledFor?: string
  readCount: number
  totalRecipients: number
}

interface NotificationSettings {
  pushEnabled: boolean
  emailEnabled: boolean
  smsEnabled: boolean
  inAppEnabled: boolean
  quietHours: {
    enabled: boolean
    start: string
    end: string
  }
  frequency: "immediate" | "batched" | "daily"
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      title: "Nova Promoção Disponível",
      message: "Aproveite 20% de desconto em todos os restaurantes até domingo!",
      type: "info",
      recipient: "customers",
      channel: "push",
      status: "sent",
      sentAt: "2024-01-15T10:30:00",
      readCount: 1247,
      totalRecipients: 2850
    },
    {
      id: 2,
      title: "Sistema em Manutenção",
      message: "O sistema ficará indisponível das 02:00 às 04:00 para manutenção programada.",
      type: "warning",
      recipient: "all",
      channel: "email",
      status: "scheduled",
      sentAt: "2024-01-16T02:00:00",
      scheduledFor: "2024-01-16T02:00:00",
      readCount: 0,
      totalRecipients: 5420
    },
    {
      id: 3,
      title: "Novo Pedido Recebido",
      message: "Você tem um novo pedido aguardando confirmação. #12345",
      type: "success",
      recipient: "merchants",
      channel: "push",
      status: "sent",
      sentAt: "2024-01-15T14:22:00",
      readCount: 89,
      totalRecipients: 127
    },
    {
      id: 4,
      title: "Falha no Pagamento",
      message: "Houve um problema no processamento do pagamento. Verifique os dados.",
      type: "error",
      recipient: "customers",
      channel: "sms",
      status: "failed",
      sentAt: "2024-01-15T16:45:00",
      readCount: 0,
      totalRecipients: 23
    },
    {
      id: 5,
      title: "Relatório Semanal",
      message: "Seu relatório semanal de vendas está disponível para download.",
      type: "info",
      recipient: "merchants",
      channel: "email",
      status: "draft",
      sentAt: "",
      readCount: 0,
      totalRecipients: 127
    }
  ])

  const [settings, setSettings] = useState<NotificationSettings>({
    pushEnabled: true,
    emailEnabled: true,
    smsEnabled: false,
    inAppEnabled: true,
    quietHours: {
      enabled: true,
      start: "22:00",
      end: "08:00"
    },
    frequency: "immediate"
  })

  const [editingNotification, setEditingNotification] = useState<Notification | null>(null)
  const [isNewNotificationOpen, setIsNewNotificationOpen] = useState(false)

  // Funções para templates
  const handleEditTemplate = (templateName: string) => {
    toast.info(`Editando template: ${templateName}`)
    // Aqui você pode abrir um modal de edição de template
  }

  const handleUseTemplate = (template: { name: string, template: string, type: string }) => {
    // Preenche o formulário de nova notificação com o template
    setIsNewNotificationOpen(true)
    toast.success(`Template "${template.name}" carregado para nova notificação`)
  }

  const handleSaveSettings = () => {
    toast.success("Configurações de notificação salvas com sucesso!")
  }

  const handleNewNotification = (newNotification: Omit<Notification, 'id' | 'readCount' | 'sentAt'>) => {
    const id = Math.max(...notifications.map(n => n.id)) + 1
    const notification: Notification = {
      ...newNotification,
      id,
      readCount: 0,
      sentAt: newNotification.status === "sent" ? new Date().toISOString() : ""
    }
    setNotifications([notification, ...notifications])
    setIsNewNotificationOpen(false)
    toast.success("Notificação criada com sucesso!")
  }

  const handleEditNotification = (notification: Notification) => {
    setEditingNotification(notification)
  }

  const handleUpdateNotification = (updatedNotification: Notification) => {
    setNotifications(notifications.map(n => n.id === updatedNotification.id ? updatedNotification : n))
    setEditingNotification(null)
    toast.success("Notificação atualizada com sucesso!")
  }

  const handleDeleteNotification = (notificationId: number) => {
    setNotifications(notifications.filter(n => n.id !== notificationId))
    toast.success("Notificação removida com sucesso!")
  }

  const handleSendNotification = (notificationId: number) => {
    setNotifications(notifications.map(n => 
      n.id === notificationId 
        ? { ...n, status: "sent" as const, sentAt: new Date().toISOString() }
        : n
    ))
    toast.success("Notificação enviada com sucesso!")
  }

  const getStatusBadge = (status: Notification['status']) => {
    const variants = {
      sent: { variant: "default" as const, label: "Enviada", icon: <CheckCircle className="w-3 h-3" /> },
      scheduled: { variant: "secondary" as const, label: "Agendada", icon: <Clock className="w-3 h-3" /> },
      draft: { variant: "outline" as const, label: "Rascunho", icon: <Edit className="w-3 h-3" /> },
      failed: { variant: "destructive" as const, label: "Falhou", icon: <AlertCircle className="w-3 h-3" /> }
    }
    return variants[status]
  }

  const getTypeIcon = (type: Notification['type']) => {
    const icons = {
      info: <Info className="w-4 h-4 text-blue-500" />,
      success: <CheckCircle className="w-4 h-4 text-green-500" />,
      warning: <AlertCircle className="w-4 h-4 text-yellow-500" />,
      error: <AlertCircle className="w-4 h-4 text-red-500" />
    }
    return icons[type]
  }

  const getChannelIcon = (channel: Notification['channel']) => {
    const icons = {
      push: <Smartphone className="w-4 h-4" />,
      email: <Mail className="w-4 h-4" />,
      sms: <MessageSquare className="w-4 h-4" />,
      inApp: <Bell className="w-4 h-4" />
    }
    return icons[channel]
  }

  const getRecipientLabel = (recipient: Notification['recipient']) => {
    const labels = {
      all: "Todos",
      customers: "Clientes",
      merchants: "Comerciantes",
      drivers: "Entregadores",
      admins: "Administradores"
    }
    return labels[recipient]
  }

  const stats = {
    totalSent: notifications.filter(n => n.status === "sent").length,
    totalScheduled: notifications.filter(n => n.status === "scheduled").length,
    totalDrafts: notifications.filter(n => n.status === "draft").length,
    avgReadRate: "68.5%"
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
                  <BreadcrumbPage>Notificações</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Notificações</h1>
              <p className="text-muted-foreground">
                Gerencie notificações push, email, SMS e configurações de comunicação
              </p>
            </div>
            <div className="flex gap-2">
              <Dialog open={isNewNotificationOpen} onOpenChange={setIsNewNotificationOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Nova Notificação
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Nova Notificação</DialogTitle>
                    <DialogDescription>
                      Crie uma nova notificação para enviar aos usuários
                    </DialogDescription>
                  </DialogHeader>
                  <NewNotificationForm onSubmit={handleNewNotification} />
                </DialogContent>
              </Dialog>
              <Button onClick={handleSaveSettings}>
                <Save className="w-4 h-4 mr-2" />
                Salvar Configurações
              </Button>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Notificações Enviadas
                </CardTitle>
                <Send className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalSent}</div>
                <p className="text-xs text-muted-foreground">
                  Entregues com sucesso
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Agendadas
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalScheduled}</div>
                <p className="text-xs text-muted-foreground">
                  Aguardando envio
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Rascunhos
                </CardTitle>
                <Edit className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalDrafts}</div>
                <p className="text-xs text-muted-foreground">
                  Não enviadas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Taxa de Leitura
                </CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.avgReadRate}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">+5.2%</span> vs mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="settings">Configurações</TabsTrigger>
              <TabsTrigger value="templates">Modelos</TabsTrigger>
            </TabsList>

            <TabsContent value="notifications" className="space-y-4">
              {/* Lista de Notificações */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Histórico de Notificações</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie todas as notificações enviadas e agendadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((notification) => {
                      const statusBadge = getStatusBadge(notification.status)
                      const typeIcon = getTypeIcon(notification.type)
                      const channelIcon = getChannelIcon(notification.channel)
                      
                      return (
                        <div key={notification.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-muted rounded-lg">
                              {typeIcon}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center space-x-2">
                                <h4 className="font-medium">{notification.title}</h4>
                                {channelIcon}
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">
                                {notification.message}
                              </p>
                              <div className="flex items-center space-x-4 mt-2">
                                <span className="text-xs text-muted-foreground">
                                  Para: {getRecipientLabel(notification.recipient)}
                                </span>
                                {notification.sentAt && (
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(notification.sentAt).toLocaleString('pt-BR')}
                                  </span>
                                )}
                                {notification.status === "sent" && (
                                  <span className="text-xs text-muted-foreground flex items-center">
                                    <Eye className="w-3 h-3 mr-1" />
                                    {notification.readCount}/{notification.totalRecipients} lidas
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <Badge variant={statusBadge.variant} className="flex items-center space-x-1">
                              {statusBadge.icon}
                              <span>{statusBadge.label}</span>
                            </Badge>
                            
                            <div className="flex space-x-1">
                              {notification.status === "draft" && (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleSendNotification(notification.id)}
                                >
                                  <Send className="w-4 h-4" />
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleEditNotification(notification)}
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                onClick={() => handleDeleteNotification(notification.id)}
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
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              {/* Configurações de Canais */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="w-5 h-5" />
                    <span>Canais de Notificação</span>
                  </CardTitle>
                  <CardDescription>
                    Configure os canais de comunicação disponíveis
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <Smartphone className="w-4 h-4" />
                          <Label>Notificações Push</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Notificações instantâneas no aplicativo
                        </p>
                      </div>
                      <Switch 
                        checked={settings.pushEnabled}
                        onCheckedChange={(checked) => setSettings({...settings, pushEnabled: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4" />
                          <Label>Email</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Notificações por email
                        </p>
                      </div>
                      <Switch 
                        checked={settings.emailEnabled}
                        onCheckedChange={(checked) => setSettings({...settings, emailEnabled: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <MessageSquare className="w-4 h-4" />
                          <Label>SMS</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Mensagens de texto
                        </p>
                      </div>
                      <Switch 
                        checked={settings.smsEnabled}
                        onCheckedChange={(checked) => setSettings({...settings, smsEnabled: checked})}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <div className="flex items-center space-x-2">
                          <Bell className="w-4 h-4" />
                          <Label>In-App</Label>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Notificações dentro do aplicativo
                        </p>
                      </div>
                      <Switch 
                        checked={settings.inAppEnabled}
                        onCheckedChange={(checked) => setSettings({...settings, inAppEnabled: checked})}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Configurações Avançadas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Volume2 className="w-5 h-5" />
                    <span>Configurações Avançadas</span>
                  </CardTitle>
                  <CardDescription>
                    Configure horários e frequência das notificações
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Horário Silencioso</Label>
                        <p className="text-sm text-muted-foreground">
                          Não enviar notificações em horários específicos
                        </p>
                      </div>
                      <Switch 
                        checked={settings.quietHours.enabled}
                        onCheckedChange={(checked) => setSettings({
                          ...settings, 
                          quietHours: {...settings.quietHours, enabled: checked}
                        })}
                      />
                    </div>

                    {settings.quietHours.enabled && (
                      <div className="grid gap-4 md:grid-cols-2 ml-6">
                        <div className="space-y-2">
                          <Label htmlFor="quiet-start">Início</Label>
                          <Input
                            id="quiet-start"
                            type="time"
                            value={settings.quietHours.start}
                            onChange={(e) => setSettings({
                              ...settings,
                              quietHours: {...settings.quietHours, start: e.target.value}
                            })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quiet-end">Fim</Label>
                          <Input
                            id="quiet-end"
                            type="time"
                            value={settings.quietHours.end}
                            onChange={(e) => setSettings({
                              ...settings,
                              quietHours: {...settings.quietHours, end: e.target.value}
                            })}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequência de Envio</Label>
                    <Select 
                      value={settings.frequency} 
                      onValueChange={(value: NotificationSettings['frequency']) => 
                        setSettings({...settings, frequency: value})
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="immediate">Imediato</SelectItem>
                        <SelectItem value="batched">Agrupado (a cada hora)</SelectItem>
                        <SelectItem value="daily">Diário (resumo)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="space-y-4">
              {/* Modelos de Notificação */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="w-5 h-5" />
                    <span>Modelos de Notificação</span>
                  </CardTitle>
                  <CardDescription>
                    Modelos pré-definidos para diferentes tipos de notificação
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    {[
                      {
                        name: "Novo Pedido",
                        description: "Notificação para comerciantes sobre novos pedidos",
                        template: "Você tem um novo pedido #{orderId} de {customerName}",
                        type: "success"
                      },
                      {
                        name: "Pedido Confirmado",
                        description: "Confirmação de pedido para clientes",
                        template: "Seu pedido #{orderId} foi confirmado e está sendo preparado",
                        type: "info"
                      },
                      {
                        name: "Entrega a Caminho",
                        description: "Notificação de entrega em andamento",
                        template: "Seu pedido #{orderId} saiu para entrega. Tempo estimado: {estimatedTime}",
                        type: "info"
                      },
                      {
                        name: "Promoção Especial",
                        description: "Notificação de ofertas e promoções",
                        template: "🎉 Oferta especial! {discount} de desconto em {category}",
                        type: "success"
                      },
                      {
                        name: "Pagamento Falhou",
                        description: "Notificação de falha no pagamento",
                        template: "Houve um problema com o pagamento do pedido #{orderId}. Tente novamente.",
                        type: "error"
                      },
                      {
                        name: "Avaliação Pendente",
                        description: "Solicitação de avaliação após entrega",
                        template: "Como foi sua experiência? Avalie seu pedido #{orderId}",
                        type: "info"
                      }
                    ].map((template, index) => (
                      <Card key={index} className="p-4">
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium">{template.name}</h4>
                            <Badge variant={
                              template.type === "success" ? "default" :
                              template.type === "error" ? "destructive" : "secondary"
                            }>
                              {template.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {template.description}
                          </p>
                          <div className="p-3 bg-muted rounded-lg">
                            <code className="text-sm">{template.template}</code>
                          </div>
                          <div className="flex space-x-2">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEditTemplate(template.name)}
                            >
                              <Edit className="w-4 h-4 mr-1" />
                              Editar
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleUseTemplate(template)}
                            >
                              <Send className="w-4 h-4 mr-1" />
                              Usar
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SidebarInset>
      
      {/* Dialog para edição de notificação */}
      <EditNotificationDialog 
        notification={editingNotification} 
        onUpdate={handleUpdateNotification} 
        onClose={() => setEditingNotification(null)} 
      />
    </SidebarProvider>
  )
}

// Componente para formulário de nova notificação
function NewNotificationForm({ onSubmit }: { onSubmit: (notification: Omit<Notification, 'id' | 'readCount' | 'sentAt'>) => void }) {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    type: "info" as Notification['type'],
    recipient: "all" as Notification['recipient'],
    channel: "push" as Notification['channel'],
    status: "draft" as Notification['status'],
    scheduledFor: "",
    totalRecipients: 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.message) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    onSubmit(formData)
    setFormData({
      title: "",
      message: "",
      type: "info",
      recipient: "all",
      channel: "push",
      status: "draft",
      scheduledFor: "",
      totalRecipients: 0
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-title">Título</Label>
          <Input
            id="new-title"
            placeholder="Ex: Nova promoção disponível"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-type">Tipo</Label>
          <Select value={formData.type} onValueChange={(value: Notification['type']) => setFormData({...formData, type: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="info">Informação</SelectItem>
              <SelectItem value="success">Sucesso</SelectItem>
              <SelectItem value="warning">Aviso</SelectItem>
              <SelectItem value="error">Erro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="new-message">Mensagem</Label>
        <Textarea
          id="new-message"
          placeholder="Digite a mensagem da notificação..."
          value={formData.message}
          onChange={(e) => setFormData({...formData, message: e.target.value})}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-recipient">Destinatários</Label>
          <Select value={formData.recipient} onValueChange={(value: Notification['recipient']) => setFormData({...formData, recipient: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="customers">Clientes</SelectItem>
              <SelectItem value="merchants">Comerciantes</SelectItem>
              <SelectItem value="drivers">Entregadores</SelectItem>
              <SelectItem value="admins">Administradores</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="new-channel">Canal</Label>
          <Select value={formData.channel} onValueChange={(value: Notification['channel']) => setFormData({...formData, channel: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="push">Push</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="inApp">In-App</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="new-status">Status</Label>
          <Select value={formData.status} onValueChange={(value: Notification['status']) => setFormData({...formData, status: value})}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Rascunho</SelectItem>
              <SelectItem value="scheduled">Agendar</SelectItem>
              <SelectItem value="sent">Enviar Agora</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.status === "scheduled" && (
          <div className="space-y-2">
            <Label htmlFor="new-scheduled">Agendar Para</Label>
            <Input
              id="new-scheduled"
              type="datetime-local"
              value={formData.scheduledFor}
              onChange={(e) => setFormData({...formData, scheduledFor: e.target.value})}
            />
          </div>
        )}
      </div>

      <DialogFooter>
        <Button type="submit">
          <Plus className="w-4 h-4 mr-2" />
          Criar Notificação
        </Button>
      </DialogFooter>
    </form>
  )
}

// Componente para edição de notificação
function EditNotificationDialog({ notification, onUpdate, onClose }: { notification: Notification | null, onUpdate: (notification: Notification) => void, onClose: () => void }) {
  const [formData, setFormData] = useState({
    id: notification?.id || 0,
    title: notification?.title || "",
    message: notification?.message || "",
    type: notification?.type || "info" as Notification['type'],
    recipient: notification?.recipient || "all" as Notification['recipient'],
    channel: notification?.channel || "push" as Notification['channel'],
    status: notification?.status || "draft" as Notification['status'],
    sentAt: notification?.sentAt || "",
    scheduledFor: notification?.scheduledFor || "",
    readCount: notification?.readCount || 0,
    totalRecipients: notification?.totalRecipients || 0
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.message) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    onUpdate(formData)
  }

  if (!notification) return null

  return (
    <Dialog open={!!notification} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Notificação</DialogTitle>
          <DialogDescription>
            Modifique as informações da notificação
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Título</Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Tipo</Label>
              <Select value={formData.type} onValueChange={(value: Notification['type']) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="info">Informação</SelectItem>
                  <SelectItem value="success">Sucesso</SelectItem>
                  <SelectItem value="warning">Aviso</SelectItem>
                  <SelectItem value="error">Erro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-message">Mensagem</Label>
            <Textarea
              id="edit-message"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="edit-recipient">Destinatários</Label>
              <Select value={formData.recipient} onValueChange={(value: Notification['recipient']) => setFormData({...formData, recipient: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="customers">Clientes</SelectItem>
                  <SelectItem value="merchants">Comerciantes</SelectItem>
                  <SelectItem value="drivers">Entregadores</SelectItem>
                  <SelectItem value="admins">Administradores</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-channel">Canal</Label>
              <Select value={formData.channel} onValueChange={(value: Notification['channel']) => setFormData({...formData, channel: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="push">Push</SelectItem>
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="inApp">In-App</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-status">Status</Label>
            <Select value={formData.status} onValueChange={(value: Notification['status']) => setFormData({...formData, status: value})}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Rascunho</SelectItem>
                <SelectItem value="scheduled">Agendada</SelectItem>
                <SelectItem value="sent">Enviada</SelectItem>
                <SelectItem value="failed">Falhou</SelectItem>
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