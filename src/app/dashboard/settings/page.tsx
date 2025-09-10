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
import { ModeToggle } from "@/components/mode-toggle"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Settings2, 
  Save,
  Bell,
  Truck,
  DollarSign,
  Users,
  Shield,
  Globe,
  Smartphone
} from "lucide-react"

export default function SettingsPage() {
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
                  <BreadcrumbPage>Configurações</BreadcrumbPage>
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
              <h1 className="text-3xl font-bold">Configurações</h1>
              <p className="text-muted-foreground">
                Gerencie as configurações da plataforma
              </p>
            </div>
            <Button>
              <Save className="w-4 h-4 mr-2" />
              Salvar Alterações
            </Button>
          </div>

          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="delivery">Entrega</TabsTrigger>
              <TabsTrigger value="payments">Pagamentos</TabsTrigger>
              <TabsTrigger value="notifications">Notificações</TabsTrigger>
              <TabsTrigger value="security">Segurança</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings2 className="w-5 h-5" />
                    <span>Configurações Gerais</span>
                  </CardTitle>
                  <CardDescription>
                    Configurações básicas da plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="platform-name">Nome da Plataforma</Label>
                      <Input id="platform-name" defaultValue="Market Braz" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platform-email">Email de Contato</Label>
                      <Input id="platform-email" defaultValue="contato@marketbraz.com" />
                    </div>
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="platform-phone">Telefone de Suporte</Label>
                      <Input id="platform-phone" defaultValue="(11) 99999-0000" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="platform-address">Endereço da Empresa</Label>
                      <Input id="platform-address" defaultValue="Rua Principal, 123 - São Paulo, SP" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Configurações de Funcionamento</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Plataforma Ativa</Label>
                          <p className="text-sm text-muted-foreground">
                            Permite que usuários façam pedidos
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Modo Manutenção</Label>
                          <p className="text-sm text-muted-foreground">
                            Desativa temporariamente a plataforma
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Novos Cadastros</Label>
                          <p className="text-sm text-muted-foreground">
                            Permite novos usuários se cadastrarem
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="delivery" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="w-5 h-5" />
                    <span>Configurações de Entrega</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie taxas e configurações de entrega
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="delivery-fee">Taxa de Entrega Padrão</Label>
                      <Input id="delivery-fee" defaultValue="R$ 5,00" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="free-delivery">Pedido Mínimo para Frete Grátis</Label>
                      <Input id="free-delivery" defaultValue="R$ 50,00" />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="delivery-time">Tempo Médio de Entrega</Label>
                      <Input id="delivery-time" defaultValue="30 minutos" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="delivery-radius">Raio de Entrega (km)</Label>
                      <Input id="delivery-radius" defaultValue="10" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Configurações Avançadas</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Entrega Expressa</Label>
                          <p className="text-sm text-muted-foreground">
                            Permite entregas em até 15 minutos
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Agendamento de Entrega</Label>
                          <p className="text-sm text-muted-foreground">
                            Permite agendar entregas para horários específicos
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Rastreamento em Tempo Real</Label>
                          <p className="text-sm text-muted-foreground">
                            Mostra localização do entregador
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="w-5 h-5" />
                    <span>Configurações de Pagamento</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie métodos de pagamento e taxas
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Métodos de Pagamento</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>PIX</Label>
                          <p className="text-sm text-muted-foreground">
                            Pagamento instantâneo via PIX
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Cartão de Crédito</Label>
                          <p className="text-sm text-muted-foreground">
                            Aceitar pagamentos com cartão de crédito
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Cartão de Débito</Label>
                          <p className="text-sm text-muted-foreground">
                            Aceitar pagamentos com cartão de débito
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Dinheiro na Entrega</Label>
                          <p className="text-sm text-muted-foreground">
                            Pagamento em dinheiro na entrega
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="commission-rate">Taxa de Comissão (%)</Label>
                      <Input id="commission-rate" defaultValue="10" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="payment-fee">Taxa de Processamento (%)</Label>
                      <Input id="payment-fee" defaultValue="2.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="w-5 h-5" />
                    <span>Configurações de Notificações</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie notificações para usuários e administradores
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Notificações para Clientes</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Confirmação de Pedido</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifica quando o pedido é confirmado
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Pedido em Preparo</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifica quando o pedido está sendo preparado
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Saiu para Entrega</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifica quando o pedido sai para entrega
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Pedido Entregue</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifica quando o pedido é entregue
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Notificações Administrativas</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Novos Pedidos</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifica sobre novos pedidos recebidos
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Problemas de Entrega</Label>
                          <p className="text-sm text-muted-foreground">
                            Notifica sobre problemas nas entregas
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Relatórios Diários</Label>
                          <p className="text-sm text-muted-foreground">
                            Envia relatório diário por email
                          </p>
                        </div>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Configurações de Segurança</span>
                  </CardTitle>
                  <CardDescription>
                    Gerencie configurações de segurança e privacidade
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Autenticação</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Autenticação de Dois Fatores</Label>
                          <p className="text-sm text-muted-foreground">
                            Requer verificação adicional no login
                          </p>
                        </div>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Login com Biometria</Label>
                          <p className="text-sm text-muted-foreground">
                            Permite login com impressão digital
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Sessão Automática</Label>
                          <p className="text-sm text-muted-foreground">
                            Encerra sessão após inatividade
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="session-timeout">Timeout de Sessão (minutos)</Label>
                      <Input id="session-timeout" defaultValue="30" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-attempts">Máximo de Tentativas de Login</Label>
                      <Input id="max-attempts" defaultValue="5" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Privacidade</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Coleta de Dados Analíticos</Label>
                          <p className="text-sm text-muted-foreground">
                            Coleta dados para melhorar a experiência
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Compartilhamento de Localização</Label>
                          <p className="text-sm text-muted-foreground">
                            Permite compartilhar localização para entregas
                          </p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
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