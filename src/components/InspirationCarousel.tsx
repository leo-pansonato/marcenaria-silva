'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';

/**
 * Carrossel da "Galeria de Inspirações sob Medida".
 * Mostra 3 cards por vez no desktop (2 em tablet, 1 no mobile), com setas,
 * indicadores (dots) e arrasto/swipe. A trilha usa translateX em % relativo
 * à própria largura, então cada passo desloca exatamente um card.
 */

function usePerView() {
  const [perView, setPerView] = useState(3);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w < 640) setPerView(1);
      else if (w < 1024) setPerView(2);
      else setPerView(3);
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);

  return perView;
}

export function InspirationCarousel({ projects }: { projects: Project[] }) {
  const perView = usePerView();
  const [index, setIndex] = useState(0);

  const maxIndex = Math.max(0, projects.length - perView);
  const canNavigate = projects.length > perView;

  // Reinicia ao trocar de filtro (a lista muda) e reajusta se o índice ficar
  // além do novo limite (ex.: ao redimensionar a janela).
  useEffect(() => {
    setIndex(0);
  }, [projects.length]);

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(
    () => setIndex((i) => Math.min(maxIndex, i + 1)),
    [maxIndex],
  );

  // Navegação por teclado quando o carrossel está focado.
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    }
  };

  // Swipe/arrasto horizontal (mobile e trackpad).
  const startX = useRef<number | null>(null);
  const onPointerDown = (e: React.PointerEvent) => {
    startX.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current;
    startX.current = null;
    if (Math.abs(dx) > 50) {
      if (dx < 0) next();
      else prev();
    }
  };

  if (projects.length === 0) return null;

  return (
    <div className="relative" role="group" aria-roledescription="carrossel" aria-label="Galeria de inspirações">
      {/* Viewport que recorta a trilha */}
      <div
        className="overflow-hidden"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
      >
        <div
          className="flex touch-pan-y transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * (100 / perView)}%)` }}
        >
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="shrink-0 grow-0 px-3 sm:px-4"
              style={{ flexBasis: `${100 / perView}%` }}
              aria-hidden={idx < index || idx >= index + perView}
            >
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px -15px rgba(62, 39, 35, 0.15)' }}
                className="relative h-[320px] rounded-3xl overflow-hidden border border-luxury-gold/15 bg-stone-950 group cursor-pointer shadow-md"
              >
                {/* Project Image with Slow Scale Zoom */}
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-[1200ms] select-none z-0"
                  />
                )}

                {/* Ambient Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent group-hover:from-black/95 transition-all duration-500 z-10" />

                {/* Category Label Tag */}
                <span className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[8.5px] font-extrabold uppercase tracking-widest text-luxury-gold-dark border border-luxury-gold/20 shadow-xs z-20">
                  {project.categoryLabel}
                </span>

                {/* Content on bottom (No location, short description, no buttons) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-7 z-20 flex flex-col justify-end">
                  <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-luxury-gold-light/90">Marcenaria Fina</span>
                  <h4 className="text-lg font-display font-bold text-white mt-0.5 tracking-wide">
                    {project.title}
                  </h4>
                  {/* Shortened/smaller description, with no location or CTA buttons */}
                  <p className="text-xs text-[#E5D5C0]/85 leading-relaxed mt-2 line-clamp-2 max-w-sm">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles: seta anterior, dots, seta próxima */}
      {canNavigate && (
        <div className="mt-10 flex items-center justify-center gap-5">
          <button
            type="button"
            onClick={prev}
            disabled={index === 0}
            aria-label="Inspirações anteriores"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-luxury-gold/40 bg-white/70 text-noble-brown shadow-xs transition-all duration-300 hover:bg-noble-brown hover:text-white hover:border-transparent disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white/70 disabled:hover:text-noble-brown cursor-pointer"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Ir para o grupo ${i + 1}`}
                aria-current={i === index}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === index
                    ? 'w-6 bg-luxury-gold-dark'
                    : 'w-2 bg-luxury-gold/30 hover:bg-luxury-gold/60'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={next}
            disabled={index >= maxIndex}
            aria-label="Próximas inspirações"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-luxury-gold/40 bg-white/70 text-noble-brown shadow-xs transition-all duration-300 hover:bg-noble-brown hover:text-white hover:border-transparent disabled:opacity-35 disabled:cursor-not-allowed disabled:hover:bg-white/70 disabled:hover:text-noble-brown cursor-pointer"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
}
