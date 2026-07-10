/**
 * Configuração central do site — contato, navegação e URLs.
 * Tudo que é "dado da empresa" vive aqui, em um único lugar.
 */

// Prefixo de caminho quando publicado sob subdiretório (GitHub Pages de
// projeto). O Next prefixa imports estáticos e <Link> automaticamente, mas NÃO
// strings soltas de /public (vídeos, OG image). Este helper cobre esses casos.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefixa um caminho de /public com o basePath de publicação, quando houver. */
export function asset(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

/**
 * EDITAR AQUI ➜ número oficial do WhatsApp da Marcenaria Silva.
 * Formato internacional, apenas dígitos: 55 + DDD + número.
 * Enquanto for placeholder, os links abrem o WhatsApp sem destinatário válido.
 */
export const WHATSAPP_NUMBER = '55XXXXXXXXXXX';

export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Quero um orçamento de móveis planejados com a Marcenaria Silva.';

/** Monta o link wa.me com mensagem pré-preenchida (URL-encoded). */
export function buildWhatsAppLink(message: string = DEFAULT_WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** EDITAR AQUI ➜ URL pública do site (metadata, Open Graph, JSON-LD, sitemap). */
export const SITE_URL = 'https://leo-pansonato.github.io/marcenaria-silva';

export const BRAND = {
  name: 'Marcenaria Silva',
  tagline: 'Móveis Planejados',
  description:
    'Marcenaria de alto padrão: móveis planejados sob medida com desenho autoral, materiais nobres e instalação impecável, para ambientes residenciais e comerciais.',
  // EDITAR AQUI ➜ dados reais de contato e atuação.
  phoneDisplay: '+55 (XX) XXXXX-XXXX',
  instagramHandle: '@marcenariasilva',
  instagramUrl: 'https://instagram.com/marcenariasilva',
  serviceArea: 'Projetos residenciais e comerciais em todo o estado de São Paulo',
  hours: 'Segunda a sexta, 8h às 18h · Sábado, 9h às 13h',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Projetos', href: '#projetos' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Processo', href: '#processo' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Contato', href: '#contato' },
];
