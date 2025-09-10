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
  Settings,
  Building2,
  Globe,
  Clock,
  Bell,
  Shield,
  Palette,
  Database,
  Mail,
  Phone,
  MapPin,
  Save,
  RefreshCw,
  Upload,
  Eye,
  EyeOff,
  Check,
  X
} from "lucide-react"

export default function GeneralSettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [logoModalOpen, setLogoModalOpen] = useState(false)
  const [backupModalOpen, setBackupModalOpen] = useState(false)
  const [showApiKey, setShowApiKey] = useState(false)
  const [unsavedChanges, setUnsavedChanges] = useState(false)

  // Estados para os formulários
  const [companyInfo, setCompanyInfo] = useState({
    name: "Market Braz",
    description: "Plataforma de delivery que conecta restaurantes, entregadores e clientes",
    email: "admin@marketbraz.com",
    phone: "+55 11 99999-9999",
    address: "Av. Paulista, 1000 - São Paulo, SP",
    cnpj: "12.345.678/0001-90",
    website: "https://marketbraz.com"
  })

  const [systemSettings, setSystemSettings] = useState({
    timezone: "America/Sao_Paulo",
    language: "pt-BR",
    currency: "BRL",
    dateFormat: "DD/MM/YYYY",
    theme: "system"
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    marketingEmails: false
  })

  const handleSave = async () => {
    setIsLoading(true)
    // Simular salvamento
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
    setUnsavedChanges(false)
    alert('Configurações salvas com sucesso!')
  }

  const handleInputChange = (section: string, field: string, value: any) => {
    setUnsavedChanges(true)
    if (section === 'company') {
      setCompanyInfo(prev => ({ ...prev, [field]: value }))
    } else if (section === 'system') {
      setSystemSettings(prev => ({ ...prev, [field]: value }))
    } else if (section === 'notifications') {
      setNotificationSettings(prev => ({ ...prev, [field]: value }))
    }
  }

  const handleLogoUpload = () => {
    setLogoModalOpen(true)
  }

  const handleBackup = () => {
    setBackupModalOpen(true)
  }

  const systemStats = [
    {
      title: "Uptime do Sistema",
      value: "99.9%",
      description: "Últimos 30 dias",
      status: "success"
    },
    {
      title: "Última Atualização",
      value: "15/04/2024",
      description: "Versão 2.1.3",
      status: "info"
    },
    {
      title: "Backup Automático",
      value: "Ativo",
      description: "Diário às 02:00",
      status: "success"
    },
    {
      title: "Usuários Ativos",
      value: "1.247",
      description: "Últimas 24h",
      status: "info"
    }
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
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/dashboard/settings">
                    Configurações
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Geral</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Configurações Gerais</h1>
              <p className="text-muted-foreground">
                Gerencie as configurações básicas da plataforma Market Braz
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {unsavedChanges && (
                <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                  Alterações não salvas
                </Badge>
              )}
              <Button variant="outline" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Recarregar
              </Button>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </div>

          {/* Status do Sistema */}
          <div className="grid gap-4 md:grid-cols-4">
            {systemStats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <div className={`w-2 h-2 rounded-full ${
                    stat.status === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Informações da Empresa */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>Informações da Empresa</span>
                </CardTitle>
                <CardDescription>
                  Dados básicos da sua empresa e plataforma
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nome da Empresa</Label>
                  <Input
                    id="company-name"
                    value={companyInfo.name}
                    onChange={(e) => handleInputChange('company', 'name', e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company-description">Descrição</Label>
                  <Textarea
                    id="company-description"
                    value={companyInfo.description}
                    onChange={(e) => handleInputChange('company', 'description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-email">Email</Label>
                    <Input
                      id="company-email"
                      type="email"
                      value={companyInfo.email}
                      onChange={(e) => handleInputChange('company', 'email', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-phone">Telefone</Label>
                    <Input
                      id="company-phone"
                      value={companyInfo.phone}
                      onChange={(e) => handleInputChange('company', 'phone', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company-address">Endereço</Label>
                  <Input
                    id="company-address"
                    value={companyInfo.address}
                    onChange={(e) => handleInputChange('company', 'address', e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-cnpj">CNPJ</Label>
                    <Input
                      id="company-cnpj"
                      value={companyInfo.cnpj}
                      onChange={(e) => handleInputChange('company', 'cnpj', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-website">Website</Label>
                    <Input
                      id="company-website"
                      value={companyInfo.website}
                      onChange={(e) => handleInputChange('company', 'website', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Configurações do Sistema */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-5 h-5" />
                  <span>Configurações do Sistema</span>
                </CardTitle>
                <CardDescription>
                  Configurações regionais e de sistema
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Fuso Horário</Label>
                  <Select 
                    value={systemSettings.timezone}
                    onValueChange={(value) => handleInputChange('system', 'timezone', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/Sao_Paulo">São Paulo (GMT-3)</SelectItem>
                      <SelectItem value="America/Rio_Branco">Rio Branco (GMT-5)</SelectItem>
                      <SelectItem value="America/Manaus">Manaus (GMT-4)</SelectItem>
                      <SelectItem value="America/Recife">Recife (GMT-3)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Idioma</Label>
                  <Select 
                    value={systemSettings.language}
                    onValueChange={(value) => handleInputChange('system', 'language', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pt-BR">Português (Brasil)</SelectItem>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="es-ES">Español</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Moeda</Label>
                  <Select 
                    value={systemSettings.currency}
                    onValueChange={(value) => handleInputChange('system', 'currency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                      <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Formato de Data</Label>
                  <Select 
                    value={systemSettings.dateFormat}
                    onValueChange={(value) => handleInputChange('system', 'dateFormat', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Tema</Label>
                  <Select 
                    value={systemSettings.theme}
                    onValueChange={(value) => handleInputChange('system', 'theme', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="dark">Escuro</SelectItem>
                      <SelectItem value="system">Sistema</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notificações e Segurança */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Configurações de Notificação */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bell className="w-5 h-5" />
                  <span>Notificações</span>
                </CardTitle>
                <CardDescription>
                  Configure como você deseja receber notificações
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Notificações por Email</Label>
                    <p className="text-sm text-muted-foreground">Receber alertas importantes por email</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => handleInputChange('notifications', 'emailNotifications', e.target.checked)}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Notificações SMS</Label>
                    <p className="text-sm text-muted-foreground">Receber alertas críticos por SMS</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.smsNotifications}
                    onChange={(e) => handleInputChange('notifications', 'smsNotifications', e.target.checked)}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Notificações no navegador</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.pushNotifications}
                    onChange={(e) => handleInputChange('notifications', 'pushNotifications', e.target.checked)}
                    className="rounded"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Emails de Marketing</Label>
                    <p className="text-sm text-muted-foreground">Novidades e promoções</p>
                  </div>
                  <input
                    type="checkbox"
                    checked={notificationSettings.marketingEmails}
                    onChange={(e) => handleInputChange('notifications', 'marketingEmails', e.target.checked)}
                    className="rounded"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Segurança e API */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Segurança & API</span>
                </CardTitle>
                <CardDescription>
                  Configurações de segurança e acesso à API
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Chave da API</Label>
                  <div className="flex space-x-2">
                    <Input
                      type={showApiKey ? "text" : "password"}
                      value="mkb_live_sk_1234567890abcdef"
                      readOnly
                      className="font-mono text-sm"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Use esta chave para integrar com a API do Market Braz
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Sessão Ativa</Label>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">Admin - São Paulo</p>
                      <p className="text-xs text-muted-foreground">IP: 192.168.1.100 • Última atividade: agora</p>
                    </div>
                    <Badge variant="default" className="bg-green-500">Ativo</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Autenticação de Dois Fatores</Label>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="text-sm font-medium">2FA Habilitado</p>
                      <p className="text-xs text-muted-foreground">Proteção adicional para sua conta</p>
                    </div>
                    <Badge variant="default" className="bg-green-500">
                      <Check className="w-3 h-3 mr-1" />
                      Ativo
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Ações do Sistema */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Database className="w-5 h-5" />
                <span>Ações do Sistema</span>
              </CardTitle>
              <CardDescription>
                Operações de manutenção e gerenciamento do sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <h4 className="font-medium">Logo da Empresa</h4>
                  <p className="text-sm text-muted-foreground">Atualize o logo da plataforma</p>
                  <Button variant="outline" onClick={handleLogoUpload} className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Logo
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Backup do Sistema</h4>
                  <p className="text-sm text-muted-foreground">Criar backup manual dos dados</p>
                  <Button variant="outline" onClick={handleBackup} className="w-full">
                    <Database className="w-4 h-4 mr-2" />
                    Criar Backup
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-medium">Cache do Sistema</h4>
                  <p className="text-sm text-muted-foreground">Limpar cache para melhor performance</p>
                  <Button variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Limpar Cache
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </SidebarInset>

      {/* Modal de Upload de Logo */}
      <Dialog open={logoModalOpen} onOpenChange={setLogoModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Upload className="w-5 h-5" />
              <span>Upload de Logo</span>
            </DialogTitle>
            <DialogDescription>
              Faça upload do novo logo da empresa (PNG, JPG ou SVG)
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-sm text-gray-600">Arraste e solte o arquivo aqui ou clique para selecionar</p>
              <p className="text-xs text-gray-400 mt-2">Tamanho máximo: 2MB • Formatos: PNG, JPG, SVG</p>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setLogoModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                alert('Logo atualizado com sucesso!')
                setLogoModalOpen(false)
              }}>
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal de Backup */}
      <Dialog open={backupModalOpen} onOpenChange={setBackupModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Database className="w-5 h-5" />
              <span>Backup do Sistema</span>
            </DialogTitle>
            <DialogDescription>
              Criar um backup completo dos dados da plataforma
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-3">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Dados de usuários</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Dados financeiros</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span className="text-sm">Configurações do sistema</span>
              </label>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm">Logs do sistema</span>
              </label>
            </div>
            <div className="flex justify-end space-x-2 pt-4 border-t">
              <Button variant="outline" onClick={() => setBackupModalOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => {
                alert('Backup iniciado! Você será notificado quando estiver pronto.')
                setBackupModalOpen(false)
              }}>
                Criar Backup
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  )
}