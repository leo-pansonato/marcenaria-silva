'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap, EASE, MOTION_OK } from '../../lib/gsap';
import { heroContent, stats } from '../../data/content';
import { SplitTextReveal } from '../ui/SplitTextReveal';
import { AnimatedCounter } from '../ui/AnimatedCounter';
import { WhatsAppButton } from '../ui/WhatsAppButton';

/** Cor sólida do site no fundo do hero + CTA em verde esmeralda. */
const EMERALD_CTA =
  '!bg-[#0F9D63] !text-white !shadow-[0_12px_34px_-10px_rgba(15,157,99,0.75)] hover:!bg-[#13B472] hover:!shadow-[0_16px_40px_-10px_rgba(19,180,114,0.85)]';

/**
 * Hero minimalista: sem imagem ou vídeo de fundo — apenas a cor da marca.
 * Headline serifada revelada palavra a palavra, CTA de WhatsApp em destaque e
 * as estatísticas da empresa. O conteúdo afunda suavemente ao rolar.
 */
export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const entering = enterRef.current?.querySelectorAll('[data-hero-enter]');
      if (entering?.length) {
        gsap.from(entering, {
          y: 36,
          autoAlpha: 0,
          duration: 1.1,
          ease: EASE.soft,
          stagger: 0.12,
          delay: 0.35,
        });
      }

      gsap.to(contentRef.current, {
        yPercent: -10,
        autoAlpha: 0.15,
        ease: 'none',
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: true },
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Apresentação da Marcenaria Silva"
      className="relative flex min-h-svh items-end overflow-hidden bg-espresso pb-[clamp(3rem,7vh,5.5rem)] pt-28 sm:pt-32"
    >
      <div ref={contentRef} className="relative z-10 mx-auto w-full max-w-[110rem] px-6 lg:px-12">
        <div className="max-w-4xl">
          <SplitTextReveal
            as="p"
            delay={0.1}
            className="mb-6 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold sm:text-xs"
          >
            {heroContent.eyebrow}
          </SplitTextReveal>

          <h1 className="mb-6 font-display text-[clamp(2.6rem,7vw,5.6rem)] font-medium leading-[1.03] tracking-[-0.015em] text-cream">
            {heroContent.headline.map((line) => (
              <SplitTextReveal
                key={line.text}
                as="span"
                delay={line.accent ? 0.42 : 0.22}
                className={line.accent ? 'block pb-2 font-light italic text-gold' : 'block'}
              >
                {line.text}
              </SplitTextReveal>
            ))}
          </h1>

          <div ref={enterRef}>
            <p
              data-hero-enter
              className="mb-9 max-w-xl font-sans text-base leading-relaxed text-cream/75 sm:text-lg"
            >
              {heroContent.subtitle}
            </p>

            <div data-hero-enter className="flex flex-wrap items-center gap-4">
              <WhatsAppButton message={heroContent.ctaMessage} className={`!px-9 !py-4 ${EMERALD_CTA}`}>
                {heroContent.cta}
              </WhatsAppButton>
              <a
                href="#projetos"
                className="group inline-flex items-center gap-2 px-2 py-3 font-sans text-sm font-semibold tracking-wide text-cream/80 transition-colors hover:text-gold"
              >
                Ver projetos
                <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </a>
            </div>

            {/* Estatísticas sobre o filete */}
            <div data-hero-enter className="mt-12 max-w-2xl">
              <div className="filete mb-6" />
              <dl className="flex flex-wrap gap-x-12 gap-y-5">
                {stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="font-display text-3xl font-medium text-cream sm:text-4xl">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </dd>
                    <dd className="mt-1.5 font-sans text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cream/50">
                      {stat.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Indicador de scroll */}
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-8 z-10 hidden flex-col items-center gap-4 lg:flex"
      >
        <span className="font-sans text-[0.6rem] font-semibold uppercase tracking-[0.3em] text-cream/45 [writing-mode:vertical-rl]">
          {heroContent.scrollHint}
        </span>
        <span className="block h-16 w-px overflow-hidden bg-cream/15">
          <span className="block h-full w-full bg-gold motion-safe:animate-scroll-line" />
        </span>
      </div>
    </section>
  );
}
