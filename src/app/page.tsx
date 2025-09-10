import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import { 
  Truck, 
  Store, 
  Users, 
  MapPin, 
  Clock, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Truck className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold">Market Braz</span>
          </div>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="#features" className="text-muted-foreground hover:text-foreground">
              Recursos
            </Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-foreground">
              Preços
            </Link>
            <Link href="#contact" className="text-muted-foreground hover:text-foreground">
              Contato
            </Link>
          </nav>
          <div className="flex items-center space-x-2">
            <ModeToggle />
            <Button variant="ghost" asChild>
              <Link href="/login">Entrar</Link>
            </Button>
            <Button asChild>
              <Link href="/register">Cadastrar</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <Badge variant="secondary" className="mb-4">
            Plataforma Multi-tenant
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 max-w-4xl mx-auto">
            Conecte sua comunidade com entregas rápidas e serviços locais
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Plataforma completa para moradores, comerciantes, profissionais e entregadores. 
            Transforme seu bairro em um marketplace inteligente.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/register">
                Começar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="/dashboard">Ver Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Tudo que você precisa em uma plataforma
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conectamos toda a cadeia de delivery e serviços locais em uma solução integrada
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border border-primary/30 shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Store className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Para Comerciantes</CardTitle>
                <CardDescription>
                  Gerencie sua loja, produtos e vendas em tempo real
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                    Cadastro de produtos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                    Gestão de pedidos
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                    Relatórios de vendas
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-primary/30 shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Para Moradores</CardTitle>
                <CardDescription>
                  Peça comida, produtos e serviços do seu bairro
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                    Delivery rápido
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                    Pagamento Pix/Cartão
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                    Programa de fidelidade
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border border-primary/30 shadow-lg hover:shadow-xl hover:border-primary/50 transition-all duration-300">
              <CardHeader>
                <Truck className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Para Entregadores</CardTitle>
                <CardDescription>
                  Ganhe dinheiro fazendo entregas na sua região
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                    Corridas próximas
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                    Pagamento imediato
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-orange-500 mr-2" />
                    Histórico completo
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">R$ 1,50</div>
              <div className="text-muted-foreground">por km + R$ 1,00 taxa</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                <Clock className="h-8 w-8 inline mr-2" />
                30min
              </div>
              <div className="text-muted-foreground">tempo médio de entrega</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                <Shield className="h-8 w-8 inline mr-2" />
                100%
              </div>
              <div className="text-muted-foreground">seguro e confiável</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">
                <Star className="h-8 w-8 inline mr-2" />
                4.9
              </div>
              <div className="text-muted-foreground">avaliação média</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-muted">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            Pronto para começar?
          </h2>
          <p className="text-xl mb-8 text-black dark:text-white max-w-2xl mx-auto">
            Junte-se à revolução do delivery local. Cadastre-se agora e comece a usar hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link href="/register">
                Cadastrar Agora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8" asChild>
              <Link href="#contact">Falar com Vendas</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Truck className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">Market Braz</span>
              </div>
              <p className="text-muted-foreground">
                Conectando comunidades através de entregas rápidas e serviços locais.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Produto</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#features" className="hover:text-foreground">Recursos</Link></li>
                <li><Link href="#pricing" className="hover:text-foreground">Preços</Link></li>
                <li><Link href="/dashboard" className="hover:text-foreground">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Sobre</Link></li>
                <li><Link href="#contact" className="hover:text-foreground">Contato</Link></li>
                <li><Link href="#" className="hover:text-foreground">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link href="#" className="hover:text-foreground">Central de Ajuda</Link></li>
                <li><Link href="#" className="hover:text-foreground">Termos de Uso</Link></li>
                <li><Link href="#" className="hover:text-foreground">Privacidade</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 Market Braz. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
