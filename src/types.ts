/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import type {StaticImageData} from 'next/image';

export interface Project {
  id: string;
  title: string;
  description: string;
  category: 'cozinhas' | 'salas' | 'dormitorios' | 'office';
  categoryLabel: string;
  // `null` = slot sem foto correspondente (aguardando novas imagens do cliente).
  image: StaticImageData | null;
  specs: {
    materials: string[];
    finishes: string[];
    location: string;
  };
}

export interface MaterialInfo {
  id: string;
  name: string;
  description: string;
  texture: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface PortfolioVideo {
  id: string;
  /** URL pública do .mp4 (a partir de /public). */
  src: string;
  /** URL pública do pôster (primeiro quadro) exibido antes do play. */
  poster: string;
  title: string;
  categoryLabel: string;
  description: string;
  /** Duração formatada (ex.: "0:38"), apenas exibição. */
  duration: string;
}
