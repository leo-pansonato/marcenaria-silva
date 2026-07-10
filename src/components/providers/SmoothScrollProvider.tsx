'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger } from '../../lib/gsap';

const LenisContext = createContext<Lenis | null>(null);

/** Instância do Lenis para navegação programática (âncoras do header etc.). */
export function useLenis(): Lenis | null {
  return useContext(LenisContext);
}

/**
 * Scroll suave global: Lenis dirigido pelo ticker do GSAP (um único relógio,
 * sem RAFs concorrentes) e sincronizado com o ScrollTrigger.
 * Com `prefers-reduced-motion`, o Lenis nem é criado — scroll nativo.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    instance.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenis(instance);

    // Âncoras internas passam pelo Lenis (o salto nativo dessincroniza o scroll).
    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!anchor) return;
      const target = document.querySelector<HTMLElement>(anchor.getAttribute('href') ?? '');
      if (!target) return;
      e.preventDefault();
      instance.scrollTo(target, { offset: -72, duration: 1.4 });
    };
    document.addEventListener('click', onAnchorClick);

    return () => {
      document.removeEventListener('click', onAnchorClick);
      gsap.ticker.remove(tick);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
