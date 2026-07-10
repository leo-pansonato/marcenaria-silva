'use client';

/**
 * Ponto único de registro do GSAP — importe `gsap`/`ScrollTrigger`/`SplitText`
 * sempre daqui para garantir que os plugins estejam registrados uma única vez.
 */
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, SplitText);
}

/** Curvas da casa — timing cinematográfico compartilhado por todas as seções. */
export const EASE = {
  /** Saída expressiva para reveals de texto e máscaras. */
  reveal: 'expo.out',
  /** Movimento contínuo (parallax, tracks) — nunca linear. */
  glide: 'power2.out',
  /** Micro-interações e retornos. */
  soft: 'power3.out',
} as const;

/** Media query usada para ligar animações apenas quando o usuário permite. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
/** Desktop com ponteiro fino e movimento permitido (efeitos pesados). */
export const DESKTOP_MOTION = `(min-width: 1024px) and ${MOTION_OK}`;

export { gsap, ScrollTrigger, SplitText };
