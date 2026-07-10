import type { StaticImageData } from 'next/image';

export type ProjectCategory = 'cozinhas' | 'residencial' | 'comercial';

export interface ProjectImage {
  src: StaticImageData;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  category: ProjectCategory;
  categoryLabel: string;
  description: string;
  /** A primeira imagem é a capa; as demais entram no crossfade automático. */
  images: ProjectImage[];
  materials: string[];
  /** Mensagem pré-preenchida do CTA de WhatsApp deste projeto. */
  whatsappMessage: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  description: string;
  /** Nome do ícone Lucide, resolvido na seção de serviços. */
  icon: string;
  /** Card em destaque ocupa célula maior no grid assimétrico. */
  featured?: boolean;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  project: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}
