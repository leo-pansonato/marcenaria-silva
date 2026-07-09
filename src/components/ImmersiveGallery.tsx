'use client';

import Image, { type StaticImageData } from 'next/image';
import { type ReactNode } from 'react';

import { useInViewAnimation } from '../hooks/useInViewAnimation';
import { ParallaxImage } from './ParallaxImage';
import { CursorImageTrail } from './CursorImageTrail';

import imgHero from '../assets/images/hero-cozinha-showroom.jpg';
import imgCozinhaNoite from '../assets/images/cozinha-showroom-noite.jpg';
import imgCozinhaCompacta from '../assets/images/cozinha-compacta.jpg';
import imgPainelRipado from '../assets/images/painel-ripado-madeira.jpg';
import imgEames from '../assets/images/home-office-eames-amarelo.jpg';
import imgGourmet from '../assets/images/gourmet-churrasqueira.jpg';
import imgDormitorio from '../assets/images/dormitorio-armarios.jpg';
import imgPainelTv from '../assets/images/painel-tv-marmore.jpg';
import imgOfficeRipado from '../assets/images/home-office-ripado-cinza.jpg';
// Fotos novas do cliente que enriquecem a vitrine viva (marquee + trilha do cursor).
import imgNovaCozinhaWide from '../assets/images/snapinsta.com.br-6a4a8dde2f637.jpg';
import imgReelCapa from '../assets/images/snapinsta.com.br-6a4a8c5712c6f.jpg';

// Conjunto de imagens da experiência (referências estáveis em nível de módulo).
const galleryImages: StaticImageData[] = [
  imgHero,
  imgCozinhaNoite,
  imgCozinhaCompacta,
  imgPainelRipado,
  imgEames,
  imgGourmet,
  imgDormitorio,
  imgPainelTv,
  imgOfficeRipado,
  imgNovaCozinhaWide,
  imgReelCapa,
];

// Array estável de URLs para o efeito de cursor.
const trailImages: string[] = galleryImages.map((i) => i.src);

// Duas fileiras para o marquee (duplicadas p/ loop contínuo e sem emenda).
const rowA: StaticImageData[] = [
  ...galleryImages.slice(0, 5),
  ...galleryImages.slice(0, 5),
];
const rowB: StaticImageData[] = [
  ...galleryImages.slice(4),
  ...galleryImages.slice(4),
];

/** Wrapper de reveal com fade-in-up disparado pelo IntersectionObserver. */
function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, inView } = useInViewAnimation<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`${inView ? 'animate-fade-in-up' : 'opacity-0'} ${className}`}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

function MarqueeItem({ img }: { img: StaticImageData }) {
  return (
    <div className="relative mr-5 h-40 w-64 shrink-0 overflow-hidden rounded-2xl border border-white/10 sm:mr-6 sm:h-56 sm:w-80">
      <Image
        src={img}
        alt="Projeto Marcenaria Renovo"
        fill
        sizes="320px"
        className="object-cover"
      />
    </div>
  );
}

/**
 * Seção imersiva: banda com parallax de scroll, zona interativa que faz
 * miniaturas "nascerem" sob o cursor e um marquee infinito de projetos.
 * Todos os textos entram com fade-in-up escalonado (useInViewAnimation).
 */
export function ImmersiveGallery() {
  return (
    <section
      id="experiencia"
      className="relative z-10 overflow-hidden bg-noble-brown-dark text-white"
    >
      {/* 1) Banda de abertura com parallax de scroll (offset máx. 200px) */}
      <div className="relative h-[80vh] min-h-[520px] overflow-hidden">
        <ParallaxImage
          src={imgHero.src}
          alt="Detalhe de marcenaria de alto padrão"
          maxOffset={200}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noble-brown-dark/85 via-noble-brown-dark/45 to-noble-brown-dark" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6 lg:px-12">
          <Reveal delay={0.1}>
            <span className="text-[11px] font-medium uppercase tracking-[0.3em] text-luxury-gold-light/80 sm:text-xs">
              Uma experiência imersiva
            </span>
          </Reveal>
          <Reveal delay={0.2} className="mt-5 max-w-3xl">
            <h2 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Entre no nosso <span className="text-luxury-gold">universo</span> de
              detalhes.
            </h2>
          </Reveal>
          <Reveal delay={0.3} className="mt-6 max-w-xl">
            <p className="text-base leading-relaxed text-white/70 sm:text-lg">
              Role a página, mova o cursor e deixe cada ambiente ganhar vida. Uma
              vitrine viva da nossa marcenaria sob medida.
            </p>
          </Reveal>
        </div>

        {/* Indicador de scroll */}
        <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-white/50">
          <span className="text-[10px] uppercase tracking-[0.25em]">Continue</span>
          <span className="h-10 w-px bg-gradient-to-b from-luxury-gold/70 to-transparent" />
        </div>
      </div>

      {/* 2) Zona interativa: miniaturas nascem sob o cursor */}
      <CursorImageTrail
        images={trailImages}
        className="flex min-h-[70vh] items-center justify-center border-y border-white/10"
      >
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              'radial-gradient(circle at center, rgba(197,168,128,0.12), transparent 60%)',
          }}
        />
        <div className="pointer-events-none relative z-10 select-none px-6 text-center">
          <Reveal delay={0.1}>
            <span className="text-[11px] uppercase tracking-[0.3em] text-luxury-gold-light/70">
              Interaja
            </span>
          </Reveal>
          <Reveal delay={0.2} className="mt-4">
            <h3 className="text-3xl font-semibold tracking-tight sm:text-5xl">
              Passe o mouse por aqui
            </h3>
          </Reveal>
          <Reveal delay={0.3} className="mt-4">
            <p className="mx-auto max-w-md text-sm text-white/55 sm:text-base">
              e veja nossos projetos aparecerem, girarem e desaparecerem como num
              sonho.
            </p>
          </Reveal>
        </div>
      </CursorImageTrail>

      {/* 3) Marquee infinito de projetos (pausa no hover) */}
      <div className="space-y-5 py-16 sm:space-y-6 sm:py-24">
        <div className="marquee">
          <div className="marquee-track">
            {rowA.map((img, i) => (
              <MarqueeItem key={`a-${i}`} img={img} />
            ))}
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-track reverse">
            {rowB.map((img, i) => (
              <MarqueeItem key={`b-${i}`} img={img} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
