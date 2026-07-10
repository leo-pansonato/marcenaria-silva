'use client';

import { testimonials } from '../../data/testimonials';
import { Testimonial } from '../../types';
import { useRevealGroup } from '../../hooks/useRevealGroup';
import { SplitTextReveal } from '../ui/SplitTextReveal';

function TestimonialCard({ quote, author, project }: Testimonial) {
  return (
    <figure className="glass-light glass-sheen relative w-[19rem] shrink-0 rounded-2xl p-7 sm:w-[22rem]">
      <span aria-hidden="true" className="mb-4 block font-display text-5xl leading-none text-caramel">
        “
      </span>
      <blockquote className="font-display text-[1.02rem] font-medium italic leading-relaxed text-espresso/90">
        {quote}
      </blockquote>
      <figcaption className="mt-6 flex items-baseline justify-between gap-4">
        <span className="font-sans text-sm font-bold text-espresso">{author}</span>
        <span className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-tan">
          {project}
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Depoimentos em marquee duplo (fileiras em direções opostas, pausa no hover).
 * Com reduced-motion, os cards viram uma grade estática (CSS cuida disso).
 */
export function Testimonials() {
  const revealRef = useRevealGroup<HTMLElement>();
  const half = Math.ceil(testimonials.length / 2);
  const rows: [Testimonial[], boolean][] = [
    [testimonials.slice(0, half), false],
    [testimonials.slice(half), true],
  ];

  return (
    <section
      ref={revealRef}
      id="depoimentos"
      aria-label="Depoimentos de clientes"
      className="section-y relative z-10 rounded-[2.5rem] bg-cream text-espresso"
    >
      <div className="mx-auto mb-12 w-full max-w-[110rem] px-6 lg:mb-14 lg:px-12">
        <p
          data-reveal
          className="mb-6 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-tan"
        >
          Depoimentos
        </p>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SplitTextReveal
            as="h2"
            className="max-w-2xl font-display text-[clamp(2.1rem,4.2vw,3.7rem)] font-medium leading-[1.06] tracking-[-0.01em]"
          >
            Quem já vive num projeto Silva.
          </SplitTextReveal>
          <p data-reveal className="max-w-xs font-sans text-sm leading-relaxed text-espresso/60">
            Palavra de quem abriu a porta para a nossa equipe e fechou com a casa
            pronta.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {rows.map(([row, reverse], rowIndex) => (
          <div key={rowIndex} className="marquee mask-fade-x overflow-hidden">
            <div className={`marquee-track gap-6 pr-6 ${reverse ? 'reverse' : ''}`}>
              {[...row, ...row].map((testimonial, i) => (
                <div key={`${testimonial.author}-${i}`} aria-hidden={i >= row.length}>
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
