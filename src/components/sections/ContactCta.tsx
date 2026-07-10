'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, DESKTOP_MOTION } from '../../lib/gsap';
import { contactContent } from '../../data/content';
import { useRevealGroup } from '../../hooks/useRevealGroup';
import { SplitTextReveal } from '../ui/SplitTextReveal';
import { WhatsAppButton } from '../ui/WhatsAppButton';

/**
 * Bloco final de conversão: headline gigante, botão de WhatsApp protagonista e
 * um brilho quente que acompanha o mouse (só desktop + movimento permitido).
 * Sem formulário — o site inteiro converte via wa.me.
 */
export function ContactCta() {
  const sectionRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const revealRef = useRevealGroup<HTMLDivElement>({ stagger: 0.08 });

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;
    if (!section || !glow) return;

    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      const xTo = gsap.quickTo(glow, 'x', { duration: 0.9, ease: 'power3.out' });
      const yTo = gsap.quickTo(glow, 'y', { duration: 0.9, ease: 'power3.out' });
      const onMove = (e: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        xTo(e.clientX - rect.left);
        yTo(e.clientY - rect.top);
      };
      section.addEventListener('pointermove', onMove, { passive: true });
      return () => section.removeEventListener('pointermove', onMove);
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contato"
      aria-label="Contato da Marcenaria Silva"
      className="section-y relative overflow-hidden bg-espresso-deep"
    >
      {/* Brilhos quentes: um fixo, um que segue o mouse */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[30rem] w-[52rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-caramel/12 blur-[140px]"
      />
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[110px]"
      />

      <div ref={revealRef} className="relative z-10 mx-auto w-full max-w-5xl px-6 text-center lg:px-12">
        <p
          data-reveal
          className="mb-7 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold"
        >
          {contactContent.eyebrow}
        </p>

        <h2 className="font-display text-[clamp(2.5rem,6.4vw,5.2rem)] font-medium leading-[1.04] tracking-[-0.015em] text-cream">
          <SplitTextReveal as="span" className="block">
            {contactContent.headline[0]}
          </SplitTextReveal>
          <SplitTextReveal as="span" delay={0.18} className="block italic text-gold">
            {contactContent.headline[1]}
          </SplitTextReveal>
        </h2>

        <p
          data-reveal
          className="mx-auto mt-8 max-w-xl font-sans text-base leading-relaxed text-cream/70"
        >
          {contactContent.subtitle}
        </p>

        <div data-reveal className="mt-12 flex flex-col items-center gap-4">
          <WhatsAppButton
            message={contactContent.ctaMessage}
            className="!px-12 !py-5 !text-base"
            ariaLabel="Abrir conversa no WhatsApp para iniciar um projeto"
          >
            {contactContent.cta}
          </WhatsAppButton>
          <span className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-cream/40">
            Resposta no mesmo dia útil
          </span>
        </div>
      </div>
    </section>
  );
}
