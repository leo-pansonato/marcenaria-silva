'use client';

import { useEffect, useRef, type ReactNode } from 'react';

interface CursorImageTrailProps {
  /** Lista de URLs (use imagens estáticas .src). Deve ser referência estável. */
  images: string[];
  children?: ReactNode;
  className?: string;
}

/**
 * Ao passar o mouse dentro da área, "spawna" miniaturas na posição do cursor.
 *
 * - rotação aleatória de -10 a +10 graus
 * - some em 1000ms com scale-down
 * - intervalo mínimo de 80ms entre spawns
 * - loop de animação e limpeza via requestAnimationFrame
 *
 * Respeita `prefers-reduced-motion` (não spawna nada).
 */
export function CursorImageTrail({
  images,
  children,
  className = '',
}: CursorImageTrailProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || images.length === 0) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let lastSpawn = 0;
    let imgIndex = 0;
    let rafId = 0;
    const spawns: { el: HTMLImageElement; born: number; rot: number }[] = [];

    const spawn = (clientX: number, clientY: number) => {
      const now = performance.now();
      if (now - lastSpawn < 80) return; // mínimo 80ms entre spawns
      lastSpawn = now;

      const rect = container.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;

      const el = document.createElement('img');
      el.src = images[imgIndex % images.length];
      el.alt = '';
      el.draggable = false;
      imgIndex += 1;

      const rot = Math.random() * 20 - 10; // -10..+10 graus
      el.className = 'cursor-trail-img';
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      el.style.transform = `translate(-50%, -50%) rotate(${rot}deg) scale(1)`;

      container.appendChild(el);
      spawns.push({ el, born: now, rot });
    };

    const onMove = (e: MouseEvent) => spawn(e.clientX, e.clientY);

    const tick = () => {
      const now = performance.now();
      for (let i = spawns.length - 1; i >= 0; i -= 1) {
        const s = spawns[i];
        const t = Math.min(1, (now - s.born) / 1000); // fade ao longo de 1000ms
        const scale = 1 - t * 0.5; // scale-down
        s.el.style.opacity = `${1 - t}`;
        s.el.style.transform = `translate(-50%, -50%) rotate(${s.rot}deg) scale(${scale})`;
        if (t >= 1) {
          s.el.remove();
          spawns.splice(i, 1);
        }
      }
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    container.addEventListener('mousemove', onMove);

    return () => {
      container.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafId);
      spawns.forEach((s) => s.el.remove());
    };
  }, [images]);

  return (
    <div ref={containerRef} className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
}
