'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, EASE, MOTION_OK } from '../lib/gsap';

interface RevealOptions {
  /** Início do trigger (default: topo da seção a 78% da viewport). */
  start?: string;
  /** Intervalo entre elementos (s). */
  stagger?: number;
}

/**
 * Reveal padrão da casa: todos os descendentes com [data-reveal] sobem e
 * aparecem em sequência quando a seção entra na viewport. Um hook, zero cópia
 * de lógica entre seções. Com reduced-motion, nada é animado.
 */
export function useRevealGroup<T extends HTMLElement>(options: RevealOptions = {}) {
  const { start = 'top 78%', stagger = 0.12 } = options;
  const ref = useRef<T>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const items = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]'));
      if (items.length === 0) return;

      const tween = gsap.from(items, {
        y: 48,
        autoAlpha: 0,
        duration: 1.05,
        ease: EASE.soft,
        stagger,
        scrollTrigger: { trigger: root, start, once: true },
        // Libera os transforms inline ao terminar — hovers CSS voltam a valer.
        onComplete: () => gsap.set(items, { clearProps: 'all' }),
      });

      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [start, stagger]);

  return ref;
}
