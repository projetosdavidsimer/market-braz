"use client"

import { Badge, type BadgeProps } from "./badge"

/**
 * Componente de transição para migrar badges antigos
 * Mapeia automaticamente variants antigos para o novo sistema
 */

interface StatusBadgeProps extends Omit<BadgeProps, 'variant'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info'
  status?: string
}

export function StatusBadge({ variant, status, children, ...props }: StatusBadgeProps) {
  // Se um status específico for fornecido, use-o
  if (status) {
    return <Badge status={status} {...props}>{children}</Badge>
  }

  // Mapeia variants antigos para o novo sistema
  const variantMap = {
    'default': 'default',
    'secondary': 'secondary', 
    'destructive': 'destructive',
    'outline': 'outline',
    'success': 'success',
    'warning': 'warning',
    'info': 'info'
  } as const

  const mappedVariant = variant ? variantMap[variant] : 'default'

  return <Badge variant={mappedVariant} {...props}>{children}</Badge>
}

/**
 * Função helper para migração automática de badges baseados em texto
 */
export function getStatusFromText(text: string): string | undefined {
  const textLower = text.toLowerCase().trim()
  
  // Mapeamentos comuns baseados no texto do badge
  const textToStatus: Record<string, string> = {
    'ativo': 'ativo',
    'inativo': 'inativo',
    'pendente': 'pendente',
    'suspenso': 'suspenso',
    'cancelado': 'cancelado',
    'online': 'online',
    'offline': 'offline',
    'aberta': 'aberta',
    'fechada': 'fechada',
    'disponível': 'disponivel',
    'ocupado': 'ocupado',
    'entregue': 'entregue',
    'em trânsito': 'em-transito',
    'coletando': 'coletando',
    'entregando': 'entregando',
    'preparando': 'preparando',
    'pago': 'pago',
    'processando': 'processando',
    'alta': 'alta',
    'média': 'media',
    'baixa': 'baixa',
    'resolvido': 'resolvido',
    'em andamento': 'em-andamento',
    'aberto': 'aberto'
  }

  return textToStatus[textLower]
}

/**
 * Badge inteligente que detecta automaticamente o status baseado no texto
 */
export function SmartBadge({ children, variant, ...props }: StatusBadgeProps) {
  const text = typeof children === 'string' ? children : ''
  const autoStatus = getStatusFromText(text)
  
  if (autoStatus) {
    return <Badge status={autoStatus} {...props}>{children}</Badge>
  }
  
  return <StatusBadge variant={variant} {...props}>{children}</StatusBadge>
}