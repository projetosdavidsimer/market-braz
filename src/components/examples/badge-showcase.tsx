"use client"

import { Badge } from "@/components/ui/badge"

/**
 * Exemplo de como usar o novo sistema de badges
 * Este componente demonstra todas as variações disponíveis
 */
export function BadgeShowcase() {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Status Automático</h3>
        <div className="flex flex-wrap gap-2">
          <Badge status="ativo">Ativo</Badge>
          <Badge status="pendente">Pendente</Badge>
          <Badge status="suspenso">Suspenso</Badge>
          <Badge status="cancelado">Cancelado</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Status de Entrega</h3>
        <div className="flex flex-wrap gap-2">
          <Badge status="entregue">Entregue</Badge>
          <Badge status="em-transito">Em Trânsito</Badge>
          <Badge status="coletando">Coletando</Badge>
          <Badge status="entregando">Entregando</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Status de Loja</h3>
        <div className="flex flex-wrap gap-2">
          <Badge status="aberta">Aberta</Badge>
          <Badge status="fechada">Fechada</Badge>
          <Badge status="ocupado">Ocupado</Badge>
          <Badge status="disponivel">Disponível</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Variantes Manuais</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="success">Sucesso</Badge>
          <Badge variant="warning">Aviso</Badge>
          <Badge variant="info">Informação</Badge>
          <Badge variant="neutral">Neutro</Badge>
          <Badge variant="purple">Especial</Badge>
          <Badge variant="pink">Destaque</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Tamanhos</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Badge size="sm" variant="success">Pequeno</Badge>
          <Badge size="default" variant="info">Padrão</Badge>
          <Badge size="lg" variant="warning">Grande</Badge>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Prioridades</h3>
        <div className="flex flex-wrap gap-2">
          <Badge status="alta">Alta Prioridade</Badge>
          <Badge status="media">Média Prioridade</Badge>
          <Badge status="baixa">Baixa Prioridade</Badge>
          <Badge status="normal">Normal</Badge>
        </div>
      </div>
    </div>
  )
}