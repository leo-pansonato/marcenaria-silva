'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap, EASE, MOTION_OK } from '../../lib/gsap';
import { manifesto } from '../../data/content';
import { brandImages, projectImages } from '../../data/media';
import { useRevealGroup } from '../../hooks/useRevealGroup';

/** Fotos que "passam" no letreiro do rodapé da seção. */
const stripImages = [
  { src: projectImages.cozinhaRipado[1], alt: 'Cozinha planejada integrada à varanda' },
  { src: projectImages.apartamento.jantar[0], alt: 'Mesa de jantar com cadeiras de veludo' },
  { src: projectImages.estudioBeleza.manicure[0], alt: 'Mesa de manicure com ripado de nogueira' },
  { src: projectImages.cozinhaRipado[3], alt: 'Detalhe de cooktop embutido na marcenaria' },
  { src: projectImages.apartamento.dormitorio[0], alt: 'Guarda-roupa planejado aberto' },
  { src: projectImages.estudioBeleza.recepcao[0], alt: 'Recepção planejada de estúdio de beleza' },
  { src: projectImages.cozinhaMarmore, alt: 'Cozinha planejada em tons fendi' },
  { src: projectImages.apartamento.cozinha, alt: 'Cozinha planejada com bancada preta' },
];

/**
 * Manifesto: as linhas ganham foco uma a uma conforme o scroll avança,
 * a imagem se revela por máscara que expande e um letreiro de fotos
 * atravessa a base da seção.
 */
export function Manifesto() {
  const revealRef = useRevealGroup<HTMLDivElement>();
  const linesRef = useRef<HTMLHeadingElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const maskImgRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // Linhas do manifesto: cascata que ganha foco ao entrar e PERMANECE plena.
      const lines = linesRef.current?.querySelectorAll('[data-line]');
      if (lines?.length) {
        gsap.set(lines, { opacity: 0.15, y: 8 });
        gsap.to(lines, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: EASE.soft,
          stagger: 0.18,
          scrollTrigger: {
            trigger: linesRef.current,
            start: 'top 74%',
            once: true,
          },
        });
      }

      // Máscara que expande revelando a imagem, com parallax interno.
      if (maskRef.current) {
        gsap.fromTo(
          maskRef.current,
          { clipPath: 'inset(16% 11% 16% 11% round 1.5rem)' },
          {
            clipPath: 'inset(0% 0% 0% 0% round 1.5rem)',
            ease: 'none',
            scrollTrigger: { trigger: maskRef.current, start: 'top 88%', end: 'top 34%', scrub: true },
          },
        );
      }
      if (maskImgRef.current) {
        gsap.fromTo(
          maskImgRef.current,
          { scale: 1.18, yPercent: -5 },
          {
            scale: 1,
            yPercent: 5,
            ease: 'none',
            scrollTrigger: { trigger: maskRef.current, start: 'top bottom', end: 'bottom top', scrub: true },
          },
        );
      }
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      id="manifesto"
      aria-label="Manifesto da Marcenaria Silva"
      className="section-y relative z-10 rounded-[2.5rem] bg-cream text-espresso"
    >
      <div ref={revealRef} className="mx-auto w-full max-w-[110rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Texto */}
          <div className="lg:col-span-7">
            <p
              data-reveal
              className="mb-8 font-sans text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-tan"
            >
              {manifesto.eyebrow}
            </p>

            <h2
              ref={linesRef}
              className="font-display text-[clamp(1.8rem,3.6vw,3.3rem)] font-medium leading-[1.18] tracking-[-0.01em]"
            >
              {manifesto.lines.map((line, i) => (
                <span
                  key={line}
                  data-line
                  className={`block ${i === manifesto.lines.length - 1 ? 'italic text-caramel' : ''}`}
                >
                  {line}
                </span>
              ))}
            </h2>

            <div data-reveal className="mt-12 max-w-md lg:mt-16">
              <div className="filete mb-6" />
              <p className="font-sans text-[0.95rem] leading-relaxed text-espresso/70">
                {manifesto.support}
              </p>
            </div>
          </div>

          {/* Imagens sobrepostas */}
          <div className="relative lg:col-span-5">
            <div ref={maskRef} className="relative aspect-[4/3] overflow-hidden rounded-3xl will-change-[clip-path]">
              <div ref={maskImgRef} className="absolute inset-0 will-change-transform">
                <Image
                  src={brandImages.identidade}
                  alt="Identidade visual da Marcenaria Silva aplicada em uma recepção com balcão de madeira"
                  fill
                  sizes="(max-width: 1024px) 92vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            <figure
              data-reveal
              className="relative z-10 -mt-16 ml-auto w-[68%] rotate-1 lg:-mt-24 lg:mr-[-1.5rem]"
            >
              <div className="overflow-hidden rounded-2xl border-[6px] border-cream shadow-[0_24px_60px_-24px_rgba(44,27,16,0.5)]">
                <Image
                  src={projectImages.cozinhaRipado[4]}
                  alt="Detalhe de forno embutido em marcenaria cinza com ripado de madeira e luz âmbar"
                  sizes="(max-width: 1024px) 64vw, 26vw"
                  className="h-auto w-full object-cover"
                />
              </div>
              <figcaption className="mt-4 flex items-center gap-3 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-espresso/55">
                <span className="filete w-10 shrink-0" />
                {manifesto.imageCaption}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>

      {/* Letreiro de fotos passando — respiro horizontal entre manifesto e projetos */}
      <div className="marquee mask-fade-x mt-14 overflow-hidden pt-14 lg:mt-20 lg:pt-20">
        <div className="marquee-track gap-5 pr-5">
          {[...stripImages, ...stripImages].map((img, i) => (
            <div
              key={`${img.alt}-${i}`}
              className="relative h-32 w-52 shrink-0 overflow-hidden rounded-xl sm:h-40 sm:w-60"
            >
              <Image
                src={img.src}
                alt={i < stripImages.length ? img.alt : ''}
                aria-hidden={i >= stripImages.length}
                fill
                sizes="256px"
                className="object-cover transition-transform duration-700 ease-out hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
