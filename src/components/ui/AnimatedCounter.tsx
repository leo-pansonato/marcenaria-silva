'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION_OK } from '../../lib/gsap';

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  className?: string;
}

/**
 * Número que conta de 0 até `value` ao entrar na viewport.
 * Renderiza o valor final no SSR (SEO/reduced-motion corretos).
 */
export function AnimatedCounter({ value, suffix = '', className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const counter = { n: 0 };
      const tween = gsap.to(counter, {
        n: value,
        duration: 2,
        ease: 'power2.out',
        onUpdate: () => {
          el.textContent = `${Math.round(counter.n)}${suffix}`;
        },
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
      return () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    });

    return () => mm.revert();
  }, [value, suffix]);

  return (
    <span ref={ref} className={className}>
      {value}
      {suffix}
    </span>
  );
}
