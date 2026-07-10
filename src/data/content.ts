import { Stat } from '../types';

interface HeadlineLine {
  text: string;
  /** Linha com tratamento serifado itálico em caramelo. */
  accent?: boolean;
}

/** Copy do hero — separada do JSX para edição sem tocar em componente. */
export const heroContent: {
  eyebrow: string;
  headline: HeadlineLine[];
  subtitle: string;
  cta: string;
  ctaMessage: string;
  scrollHint: string;
} = {
  eyebrow: 'Marcenaria de alto padrão',
  headline: [
    { text: 'Móveis com alma,' },
    { text: 'medida por medida.', accent: true },
  ],
  subtitle:
    'Projetamos e executamos marcenaria planejada de alto padrão, do primeiro risco ao último encaixe, com desenho autoral e obra limpa.',
  cta: 'Iniciar meu projeto',
  ctaMessage: 'Olá! Quero um orçamento de móveis planejados com a Marcenaria Silva.',
  scrollHint: 'Deslize para explorar',
};

/**
 * EDITAR AQUI ➜ números reais da empresa (aparecem no hero e no manifesto).
 */
export const stats: Stat[] = [
  { value: 250, suffix: '+', label: 'Ambientes entregues' },
  { value: 14, label: 'Anos de oficina' },
  { value: 100, suffix: '%', label: 'Sob medida' },
];

/** Manifesto — linhas reveladas conforme o scroll dá foco a cada uma. */
export const manifesto = {
  eyebrow: 'Manifesto',
  lines: [
    'Não fabricamos móveis em série.',
    'Escutamos casas, medimos gestos',
    'e desenhamos o que ainda não existe;',
    'depois construímos, à mão e à máquina,',
    'até o encaixe ficar invisível.',
  ],
  support:
    'A Marcenaria Silva nasceu de oficina, não de vitrine. Cada projeto sai daqui com nome, medida e destino, e uma obsessão silenciosa: o acabamento que só aparece quando você passa a mão.',
  imageCaption: 'Identidade aplicada na recepção com assinatura Silva',
} as const;

/** Chamada final de conversão. */
export const contactContent = {
  eyebrow: 'Vamos conversar?',
  headline: ['O próximo projeto', 'tem o seu nome.'],
  subtitle:
    'Conte o que você imagina e respondemos no mesmo dia útil, com os próximos passos e uma estimativa honesta.',
  cta: 'Chamar no WhatsApp',
  ctaMessage: 'Olá! Quero começar meu projeto de móveis planejados com a Marcenaria Silva.',
} as const;
