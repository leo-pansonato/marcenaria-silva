'use client';

import { createElement, useLayoutEffect, useRef } from 'react';
import { gsap, SplitText, EASE, MOTION_OK } from '../../lib/gsap';

interface SplitTextRevealProps {
  children: string;
  /** Tag semântica renderizada (h1, h2, p...). */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  /** Atraso extra (s) — útil na coreografia do hero. */
  delay?: number;
  /** Início do ScrollTrigger (default: quando o topo atinge 85% da viewport). */
  start?: string;
}

/**
 * Revela texto palavra a palavra, subindo de dentro de uma máscara por linha.
 * Com `prefers-reduced-motion`, o texto renderiza estático (sem split).
 */
export function SplitTextReveal({
  children,
  as = 'p',
  className,
  delay = 0,
  start = 'top 85%',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      let split: SplitText | undefined;
      let tween: gsap.core.Tween | undefined;
      let cancelled = false;

      // Espera as fontes para medir linhas corretas (evita quebra errada do split).
      const run = () => {
        if (cancelled || !ref.current) return;
        split = new SplitText(el, { type: 'lines,words', mask: 'lines' });
        tween = gsap.from(split.words, {
          yPercent: 115,
          duration: 1.15,
          ease: EASE.reveal,
          stagger: 0.05,
          delay,
          scrollTrigger: { trigger: el, start, once: true },
        });
      };

      if (document.fonts?.status === 'loaded') run();
      else document.fonts?.ready.then(run);

      return () => {
        cancelled = true;
        tween?.scrollTrigger?.kill();
        tween?.kill();
        split?.revert();
      };
    });

    return () => mm.revert();
  }, [children, delay, start]);

  return createElement(as, { ref, className }, children);
}
