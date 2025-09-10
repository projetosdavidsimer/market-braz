import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Truck, ArrowLeft, Users, Store, User, MapPin } from "lucide-react";

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground mb-4">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar ao início</span>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Truck className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Market Braz</span>
          </div>
          <h1 className="text-3xl font-bold">Criar sua conta</h1>
          <p className="text-muted-foreground">
            Escolha seu perfil e comece a usar nossa plataforma
          </p>
        </div>

        {/* Profile Selection */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
            <CardHeader className="text-center">
              <Users className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Morador</CardTitle>
              <CardDescription>
                Peça comida e produtos do seu bairro
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Delivery rápido</li>
                <li>• Pagamento fácil</li>
                <li>• Programa de fidelidade</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
            <CardHeader className="text-center">
              <Store className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Comerciante</CardTitle>
              <CardDescription>
                Venda seus produtos online
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Gestão de loja</li>
                <li>• Relatórios de vendas</li>
                <li>• Controle de estoque</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
            <CardHeader className="text-center">
              <Truck className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Entregador</CardTitle>
              <CardDescription>
                Ganhe dinheiro fazendo entregas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Corridas próximas</li>
                <li>• Pagamento imediato</li>
                <li>• Flexibilidade de horário</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-primary">
            <CardHeader className="text-center">
              <User className="h-12 w-12 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Profissional</CardTitle>
              <CardDescription>
                Ofereça seus serviços locais
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Agenda flexível</li>
                <li>• Chat com clientes</li>
                <li>• Gestão de serviços</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Registration Form */}
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
              <CardDescription>
                Preencha seus dados para criar sua conta
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">Nome</Label>
                  <Input
                    id="firstName"
                    placeholder="João"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Sobrenome</Label>
                  <Input
                    id="lastName"
                    placeholder="Silva"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="joao@email.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input
                  id="address"
                  placeholder="Rua das Flores, 123"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  className="rounded border-gray-300"
                  required
                />
                <Label htmlFor="terms" className="text-sm">
                  Aceito os{" "}
                  <Link href="/terms" className="text-primary hover:underline">
                    termos de uso
                  </Link>{" "}
                  e{" "}
                  <Link href="/privacy" className="text-primary hover:underline">
                    política de privacidade
                  </Link>
                </Label>
              </div>

              <Button className="w-full" asChild>
                <Link href="/dashboard">Criar Conta</Link>
              </Button>

              <Separator />

              <div className="text-center">
                <p className="text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link href="/login" className="text-primary hover:underline">
                    Faça login
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Benefits */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-6">Por que escolher o Market Braz?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <MapPin className="w-4 h-4 mr-2" />
                Local
              </Badge>
              <p className="text-sm text-muted-foreground">
                Conectamos você com o comércio do seu bairro
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Truck className="w-4 h-4 mr-2" />
                Rápido
              </Badge>
              <p className="text-sm text-muted-foreground">
                Entregas em até 30 minutos na sua região
              </p>
            </div>
            <div className="space-y-2">
              <Badge variant="secondary" className="text-lg px-4 py-2">
                <Users className="w-4 h-4 mr-2" />
                Confiável
              </Badge>
              <p className="text-sm text-muted-foreground">
                Plataforma segura com avaliações reais
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}