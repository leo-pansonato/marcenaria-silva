/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

// Prefixo de caminho quando publicado sob um subdiretório (ex.: GitHub Pages
// em /marcenaria-renovo). O Next prefixa automaticamente imports estáticos,
// <Image> e <Link>, mas NÃO strings soltas em /public (vídeos, posters). Este
// helper cuida disso. Vazio no dev/local => caminhos na raiz continuam válidos.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** Prefixa um caminho de /public com o basePath de publicação, quando houver. */
export function asset(path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${BASE_PATH}${clean}`;
}

// Contato de conversão (mesmo número usado em toda a landing).
export const WHATSAPP_PHONE = '5511998765432';

/** Monta o link do WhatsApp com uma mensagem opcional já codificada. */
export function buildWhatsAppLink(customMsg?: string): string {
  const defaultText =
    'Olá! Gostaria de solicitar um orçamento e bater um papo sobre meu projeto de móveis sob medida de alto padrão.';
  const text = encodeURIComponent(customMsg || defaultText);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

export interface NavItem {
  label: string;
  /** Sempre absoluto a partir da home para funcionar de qualquer página. */
  href: string;
}

// Navegação compartilhada entre a home e a página de portfólio.
export const navItems: NavItem[] = [
  { label: 'Início', href: '/#início' },
  { label: 'Projetos', href: '/#projetos' },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Qualidade', href: '/#qualidade' },
  { label: 'Processo', href: '/#processo' },
  { label: 'Sobre', href: '/#sobre' },
  { label: 'Contato', href: '/#contato' },
];
