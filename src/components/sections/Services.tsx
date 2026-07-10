'use client';

import { useCallback, useRef } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  AlignVerticalJustifyCenter,
  ArrowLeft,
  ArrowRight,
  BedDouble,
  CookingPot,
  DraftingCompass,
  Droplets,
  Store,
} from 'lucide-react';
import { services } from '../../data/services';
import { useRevealGroup } from '../../hooks/useRevealGroup';
import { SplitTextReveal } from '../ui/SplitTextReveal';
import { SwipeHint } from '../ui/SwipeHint';
import { WhatsAppButton } from '../ui/WhatsAppButton';

const iconMap: Record<string, LucideIcon> = {
  CookingPot,
  BedDouble,
  AlignVerticalJustifyCenter,
  Droplets,
  Store,
  DraftingCompass,
};

/**
 * Serviços em carrossel horizontal: o visitante vê alguns cartões e avança os
 * demais pelas setas (ou arrastando). Compacto na vertical, fluido no toque.
 */
export function Services() {
  const revealRef = useRevealGroup<HTMLDivElement>({ stagger: 0.09 });
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCard = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>('[data-card]');
    const step = card ? card.offsetWidth + 20 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  }, []);

  return (
    <section
      id="servicos"
      aria-label="Serviços da Marcenaria Silva"
      className="section-y relative z-10 rounded-[2.5rem] bg-cream text-espresso"
    >
      <div ref={revealRef} className="mx-auto w-full max-w-[110rem] px-6 lg:px-12">
        {/* Cabeçalho + setas de navegação */}
        <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p
              data-reveal
              className="mb-5 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-tan"
            >
              Serviços
            </p>
            <SplitTextReveal
              as="h2"
              className="font-display text-[clamp(2rem,4vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.01em]"
            >
              Todo ambiente que a madeira alcança.
            </SplitTextReveal>
          </div>

          <div data-reveal className="flex items-center gap-4">
            <p className="hidden max-w-xs font-sans text-sm leading-relaxed text-espresso/60 sm:block">
              Projetamos, fabricamos e instalamos com a mesma equipe.
            </p>
            <div className="flex shrink-0 gap-2.5" role="group" aria-label="Navegar serviços">
              <button
                type="button"
                onClick={() => scrollByCard(-1)}
                aria-label="Serviço anterior"
                className="glass-light flex h-12 w-12 items-center justify-center rounded-full text-espresso transition-transform duration-300 hover:-translate-x-0.5 hover:text-caramel"
              >
                <ArrowLeft className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => scrollByCard(1)}
                aria-label="Próximo serviço"
                className="glass-light flex h-12 w-12 items-center justify-center rounded-full text-espresso transition-transform duration-300 hover:translate-x-0.5 hover:text-caramel"
              >
                <ArrowRight className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Dica de arraste (mobile) — no desktop as setas acima cumprem o papel */}
        <div className="mb-3 flex justify-end lg:hidden">
          <SwipeHint tone="light" />
        </div>

        {/* Trilho de cartões */}
        <div
          ref={trackRef}
          className="no-scrollbar -mx-6 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-6 pb-4 lg:-mx-12 lg:px-12"
        >
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? CookingPot;
            return (
              <article
                key={service.id}
                data-card
                className="group glass-sheen relative flex w-[80vw] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-espresso/10 bg-white/70 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-caramel/50 hover:shadow-[0_28px_56px_-32px_rgba(184,135,78,0.6)] sm:w-[22rem] sm:p-8 lg:w-[24rem]"
              >
                <span
                  aria-hidden="true"
                  className="text-outline pointer-events-none absolute -top-3 right-5 font-display text-[4.6rem] font-semibold italic leading-none opacity-70 transition-opacity duration-500 group-hover:opacity-100"
                >
                  {service.number}
                </span>

                <span className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-espresso text-gold transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-105">
                  <Icon className="h-5 w-5" strokeWidth={1.6} aria-hidden="true" />
                </span>

                <h3 className="mb-3 font-display text-2xl font-medium tracking-tight">
                  {service.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-espresso/68">
                  {service.description}
                </p>
              </article>
            );
          })}
        </div>

        {/* CTA de conversão da seção */}
        <div
          data-reveal
          className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-espresso/10 pt-9 sm:flex-row sm:items-center lg:mt-16"
        >
          <p className="max-w-md font-display text-xl font-medium italic text-espresso/85">
            Não encontrou o seu ambiente? A gente desenha do zero.
          </p>
          <WhatsAppButton message="Olá! Vi os serviços no site da Marcenaria Silva e quero solicitar um orçamento.">
            Solicitar orçamento
          </WhatsAppButton>
        </div>
      </div>
    </section>
  );
}
