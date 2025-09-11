/**
 * Sistema de cores profissional para badges
 * Baseado em design systems de grandes plataformas (GitHub, Linear, Notion)
 * Cores suaves que funcionam em modo claro e escuro
 */

export const badgeColors = {
  // Neutro - para status padrão
  neutral: {
    light: {
      bg: 'hsl(210 40% 96%)',
      text: 'hsl(210 40% 30%)',
      border: 'hsl(210 40% 88%)'
    },
    dark: {
      bg: 'hsl(210 40% 12%)',
      text: 'hsl(210 40% 85%)',
      border: 'hsl(210 40% 20%)'
    }
  },

  // Default - alias para neutral
  default: {
    light: {
      bg: 'hsl(210 40% 96%)',
      text: 'hsl(210 40% 30%)',
      border: 'hsl(210 40% 88%)'
    },
    dark: {
      bg: 'hsl(210 40% 12%)',
      text: 'hsl(210 40% 85%)',
      border: 'hsl(210 40% 20%)'
    }
  },

  // Destructive - alias para error
  destructive: {
    light: {
      bg: 'hsl(0 84% 96%)',
      text: 'hsl(0 84% 35%)',
      border: 'hsl(0 84% 88%)'
    },
    dark: {
      bg: 'hsl(0 84% 10%)',
      text: 'hsl(0 84% 80%)',
      border: 'hsl(0 84% 18%)'
    }
  },

  // Outline - versão com borda
  outline: {
    light: {
      bg: 'transparent',
      text: 'hsl(210 40% 30%)',
      border: 'hsl(210 40% 60%)'
    },
    dark: {
      bg: 'transparent',
      text: 'hsl(210 40% 85%)',
      border: 'hsl(210 40% 50%)'
    }
  },

  // Sucesso - verde suave
  success: {
    light: {
      bg: 'hsl(142 76% 96%)',
      text: 'hsl(142 76% 25%)',
      border: 'hsl(142 76% 88%)'
    },
    dark: {
      bg: 'hsl(142 76% 8%)',
      text: 'hsl(142 76% 75%)',
      border: 'hsl(142 76% 16%)'
    }
  },

  // Aviso - amarelo/laranja suave
  warning: {
    light: {
      bg: 'hsl(45 93% 95%)',
      text: 'hsl(45 93% 30%)',
      border: 'hsl(45 93% 85%)'
    },
    dark: {
      bg: 'hsl(45 93% 10%)',
      text: 'hsl(45 93% 80%)',
      border: 'hsl(45 93% 18%)'
    }
  },

  // Erro - vermelho suave
  error: {
    light: {
      bg: 'hsl(0 84% 96%)',
      text: 'hsl(0 84% 35%)',
      border: 'hsl(0 84% 88%)'
    },
    dark: {
      bg: 'hsl(0 84% 10%)',
      text: 'hsl(0 84% 80%)',
      border: 'hsl(0 84% 18%)'
    }
  },

  // Info - azul suave
  info: {
    light: {
      bg: 'hsl(214 95% 96%)',
      text: 'hsl(214 95% 30%)',
      border: 'hsl(214 95% 88%)'
    },
    dark: {
      bg: 'hsl(214 95% 8%)',
      text: 'hsl(214 95% 80%)',
      border: 'hsl(214 95% 16%)'
    }
  },

  // Secundário - cinza azulado suave
  secondary: {
    light: {
      bg: 'hsl(220 14% 96%)',
      text: 'hsl(220 14% 35%)',
      border: 'hsl(220 14% 88%)'
    },
    dark: {
      bg: 'hsl(220 14% 12%)',
      text: 'hsl(220 14% 80%)',
      border: 'hsl(220 14% 20%)'
    }
  },

  // Roxo suave - para features especiais
  purple: {
    light: {
      bg: 'hsl(262 83% 96%)',
      text: 'hsl(262 83% 30%)',
      border: 'hsl(262 83% 88%)'
    },
    dark: {
      bg: 'hsl(262 83% 8%)',
      text: 'hsl(262 83% 80%)',
      border: 'hsl(262 83% 16%)'
    }
  },

  // Rosa suave - para categorias especiais
  pink: {
    light: {
      bg: 'hsl(322 85% 96%)',
      text: 'hsl(322 85% 30%)',
      border: 'hsl(322 85% 88%)'
    },
    dark: {
      bg: 'hsl(322 85% 8%)',
      text: 'hsl(322 85% 80%)',
      border: 'hsl(322 85% 16%)'
    }
  }
} as const

export type BadgeColorVariant = keyof typeof badgeColors

/**
 * Função para obter cores CSS customizadas baseadas no tema
 */
export function getBadgeColors(variant: BadgeColorVariant, isDark: boolean = false) {
  const colors = badgeColors[variant]
  const theme = isDark ? colors.dark : colors.light
  
  return {
    backgroundColor: theme.bg,
    color: theme.text,
    borderColor: theme.border
  }
}

/**
 * Mapeamento de status para cores
 */
export const statusColorMap = {
  // Status gerais
  'ativo': 'success',
  'inativo': 'secondary',
  'pendente': 'warning',
  'suspenso': 'error',
  'cancelado': 'error',
  'online': 'success',
  'offline': 'secondary',
  'pausado': 'secondary',
  
  // Status de entrega
  'entregue': 'success',
  'em-transito': 'info',
  'em-entrega': 'info',
  'coletando': 'warning',
  'entregando': 'success',
  'preparando': 'warning',
  'confirmado': 'info',
  'saiu-para-entrega': 'info',
  
  // Status de loja
  'aberta': 'success',
  'fechada': 'secondary',
  'ocupado': 'warning',
  'disponivel': 'success',
  
  // Status de pagamento
  'pago': 'success',
  'pendente-pagamento': 'warning',
  'cancelado-pagamento': 'error',
  'processando': 'warning',
  'processado': 'success',
  
  // Status de suporte
  'aberto': 'error',
  'em-andamento': 'warning',
  'resolvido': 'success',
  
  // Prioridades
  'alta': 'error',
  'media': 'warning',
  'baixa': 'info',
  'normal': 'secondary',
  
  // Outros status específicos
  'top-performer': 'warning',
  'cliente': 'secondary',
  'produto': 'error',
  'loja': 'error',
  'pagamento': 'secondary',
  'entregador': 'error',
  'erro': 'error',
  'n-a': 'secondary',
  'na': 'secondary'
} as const

export function getStatusColor(status: string): BadgeColorVariant {
  if (!status || typeof status !== 'string') {
    return 'neutral'
  }
  
  const normalizedStatus = status.toLowerCase().replace(/\s+/g, '-')
  const mappedColor = statusColorMap[normalizedStatus as keyof typeof statusColorMap]
  
  // Verifica se a cor mapeada existe no badgeColors
  if (mappedColor && badgeColors[mappedColor]) {
    return mappedColor
  }
  
  return 'neutral'
}