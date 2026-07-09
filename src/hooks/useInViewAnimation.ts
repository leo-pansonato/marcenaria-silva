'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Scroll-trigger de animação de entrada.
 *
 * Usa IntersectionObserver (threshold 0.1) e dispara UMA única vez, quando o
 * elemento entra na viewport. Retorna a `ref` para o elemento e o booleano
 * `inView`. Combine com as classes CSS `animate-fade-in-up` / `opacity-0`:
 *
 *   const { ref, inView } = useInViewAnimation();
 *   <div ref={ref} className={inView ? 'animate-fade-in-up' : 'opacity-0'} />
 *
 * Respeita `prefers-reduced-motion`: nesse caso o conteúdo aparece de imediato.
 */
export function useInViewAnimation<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.1,
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Acessibilidade: quem prefere menos movimento vê o conteúdo direto.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.disconnect(); // dispara apenas uma vez
          }
        });
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}
