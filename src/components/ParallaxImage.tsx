'use client';

import { useEffect, useRef } from 'react';

interface ParallaxImageProps {
  src: string;
  alt: string;
  /** Classes extra aplicadas à <img>. */
  className?: string;
  /** Deslocamento máximo em px (padrão 200). */
  maxOffset?: number;
}

/**
 * Imagem com efeito parallax no scroll.
 *
 * Renderiza uma <img> absoluta que cobre o elemento-pai - que DEVE ser
 * `position: relative; overflow: hidden`. O deslocamento é calculado a partir
 * da posição do container na viewport (getBoundingClientRect), limitado a
 * `maxOffset` (padrão 200px). A leitura usa IntersectionObserver (só anima
 * quando visível) + listener de scroll agendado com requestAnimationFrame.
 * Respeita `prefers-reduced-motion`.
 */
export function ParallaxImage({
  src,
  alt,
  className = '',
  maxOffset = 200,
}: ParallaxImageProps) {
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = imgRef.current;
    const parent = img?.parentElement;
    if (!img || !parent) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      img.style.transform = 'translate3d(0, 0, 0) scale(1.05)';
      return;
    }

    let visible = false;
    let ticking = false;
    let rafId = 0;

    const update = () => {
      ticking = false;
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;

      // Limita o offset ao que a altura do container comporta, evitando bordas
      // vazias, mas nunca ultrapassa o máximo pedido.
      const offsetCap = Math.min(maxOffset, rect.height * 0.28);

      // Progresso de -1 (abaixo da viewport) a +1 (acima); 0 no centro.
      const center = rect.top + rect.height / 2;
      const raw = (center - vh / 2) / (vh / 2 + rect.height / 2);
      const progress = Math.max(-1, Math.min(1, raw));

      const offset = -progress * offsetCap;
      // Escala garante cobertura total mesmo no deslocamento máximo.
      const scale = 1 + (offsetCap * 2) / rect.height + 0.04;

      img.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`;
    };

    const onScroll = () => {
      if (!visible || ticking) return;
      ticking = true;
      rafId = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) update();
      },
      { threshold: 0 },
    );

    io.observe(parent);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, [maxOffset]);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      ref={imgRef}
      src={src}
      alt={alt}
      draggable={false}
      className={`absolute inset-0 h-full w-full object-cover will-change-transform ${className}`}
    />
  );
}
