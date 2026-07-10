'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { projects } from '../../data/projects';
import { videoPaths, projectImages } from '../../data/media';
import { ProjectImage } from '../../types';
import { useHorizontalPin } from '../../hooks/useHorizontalPin';
import { AmbientVideo } from '../ui/AmbientVideo';
import { SwipeHint } from '../ui/SwipeHint';
import { WhatsAppButton } from '../ui/WhatsAppButton';

/**
 * Mídia do painel: crossfade automático entre as fotos do projeto enquanto o
 * painel está visível (IntersectionObserver). Uma foto só = imagem estática.
 */
function PanelMedia({ images }: { images: ProjectImage[] }) {
  const [active, setActive] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap || images.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timer = window.setInterval(
            () => setActive((i) => (i + 1) % images.length),
            4200,
          );
        } else {
          window.clearInterval(timer);
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(wrap);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [images.length]);

  return (
    <div ref={wrapRef} data-parallax className="absolute inset-0">
      {images.map((img, i) => (
        <Image
          key={img.alt}
          src={img.src}
          alt={img.alt}
          aria-hidden={i !== active}
          fill
          sizes="(max-width: 640px) 86vw, (max-width: 1024px) 70vw, 62vw"
          className={`object-cover transition-opacity duration-[1600ms] ease-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
}

/**
 * Vitrine de projetos em scroll horizontal "pinned" (desktop): a página trava
 * e os projetos deslizam lateralmente. No mobile/reduced-motion, vira um
 * carrossel nativo com scroll-snap — mesma marcação.
 */
export function ProjectsShowcase() {
  const { sectionRef, trackRef, progressRef, pinned } = useHorizontalPin<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="projetos"
      aria-label="Vitrine de projetos da Marcenaria Silva"
      className={`relative overflow-hidden bg-espresso ${
        pinned ? 'flex h-svh flex-col justify-center pb-6 pt-24' : 'section-y'
      }`}
    >
      {/* Cabeçalho enxuto: o título grande vive no primeiro painel do trilho */}
      <div className="mx-auto mb-8 flex w-full max-w-[110rem] items-center justify-between px-6 lg:px-12">
        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold">
          Portfólio real
        </p>
        <div className="flex items-center gap-4">
          <SwipeHint />
          <span className="hidden font-sans text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-cream/40 lg:block">
            {pinned ? 'Role para percorrer' : 'Deslize para o lado'}
          </span>
          <span className="hidden h-px w-40 overflow-hidden bg-cream/12 lg:block lg:w-56">
            <span
              ref={progressRef}
              className="block h-full w-full origin-left scale-x-0 bg-caramel"
            />
          </span>
        </div>
      </div>

      {/* Trilho horizontal */}
      <div
        ref={trackRef}
        className={`flex items-stretch gap-5 px-6 will-change-transform sm:gap-8 lg:gap-10 lg:px-12 ${
          pinned ? '' : 'no-scrollbar snap-x snap-mandatory overflow-x-auto pb-4'
        }`}
      >
        {/* Painel de abertura */}
        <div
          data-panel
          className="flex w-[82vw] shrink-0 snap-center flex-col justify-center sm:w-[26rem] lg:w-[30rem]"
        >
          <h2
            data-panel-reveal
            className="font-display text-[clamp(2.2rem,4.5vw,3.9rem)] font-medium leading-[1.05] tracking-[-0.01em] text-cream"
          >
            Projetos que
            <span className="block italic text-gold">assinamos.</span>
          </h2>
          <p data-panel-reveal className="mt-6 hidden max-w-xs font-sans text-sm leading-relaxed text-cream/65 sm:block">
            Ambientes reais, executados pela nossa oficina. Sem banco de imagens,
            sem promessa de catálogo.
          </p>
          <p
            data-panel-reveal
            aria-hidden="true"
            className="mt-10 inline-flex items-center gap-3 font-sans text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-caramel"
          >
            <span className="filete w-12" />
            {String(projects.length).padStart(2, '0')} projetos
          </p>
        </div>

        {/* Painéis de projeto */}
        {projects.map((project, index) => (
          <article
            key={project.id}
            data-panel
            className="group relative h-[58vh] w-[86vw] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-caramel/15 bg-brown sm:w-[70vw] lg:h-[70vh] lg:min-h-[30rem] lg:w-[min(62vw,54rem)]"
          >
            <PanelMedia images={project.images} />

            {/* Gradações: leitura garantida + tinta caramelo no hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-espresso-deep/92 via-espresso/30 to-espresso/5 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-gradient-to-tr from-caramel/22 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

            {/* Índice + categoria */}
            <span
              aria-hidden="true"
              className="text-outline absolute right-5 top-4 font-display text-[clamp(2rem,3.6vw,3.2rem)] font-semibold leading-none"
            >
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="glass absolute left-5 top-5 rounded-full px-3 py-1 font-sans text-[0.58rem] font-bold uppercase tracking-[0.18em] text-gold">
              {project.categoryLabel}
            </span>

            {/* Conteúdo */}
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <h3
                data-panel-reveal
                className="font-display text-[clamp(1.2rem,2vw,1.75rem)] font-medium leading-tight text-cream"
              >
                {project.title}
              </h3>
              <p
                data-panel-reveal
                className="mt-2 hidden max-w-md font-sans text-[0.78rem] leading-snug text-cream/75 transition-colors duration-500 group-hover:text-cream sm:block"
              >
                {project.description}
              </p>
              <ul data-panel-reveal className="mt-3 flex flex-wrap gap-1.5" aria-label="Materiais e acabamentos">
                {project.materials.map((material) => (
                  <li
                    key={material}
                    className="glass rounded-full px-2.5 py-0.5 font-sans text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-cream/90"
                  >
                    {material}
                  </li>
                ))}
              </ul>
              <div
                data-panel-reveal
                className="mt-4 flex flex-wrap items-center gap-4 transition-transform duration-500 ease-out group-hover:-translate-y-1"
              >
                <WhatsAppButton
                  variant="outline"
                  message={project.whatsappMessage}
                  ariaLabel={`Pedir um projeto como ${project.title} pelo WhatsApp`}
                  className="!px-4 !py-2 !text-xs"
                >
                  Quero um projeto assim
                </WhatsAppButton>
              </div>
            </div>
          </article>
        ))}

        {/* Painel de vídeo — a oficina em movimento */}
        <div
          data-panel
          className="relative aspect-[9/16] h-[58vh] shrink-0 snap-center overflow-hidden rounded-[1.75rem] border border-caramel/15 bg-brown lg:h-[70vh]"
        >
          <AmbientVideo
            src={videoPaths.filme}
            poster={projectImages.cozinhaRipado[3]}
            caption="A oficina, ao vivo."
            label="a oficina em movimento"
          >
            <span className="glass pointer-events-none absolute left-5 top-5 inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-sans text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold">
              <span className="h-1.5 w-1.5 rounded-full bg-gold motion-safe:animate-pulse" />
              Em movimento
            </span>
          </AmbientVideo>
        </div>

        {/* Painel final de conversão */}
        <div
          data-panel
          className="flex w-[86vw] shrink-0 snap-center flex-col justify-center rounded-[1.75rem] border border-caramel/20 bg-gradient-to-br from-brown to-espresso-deep p-8 sm:w-[70vw] sm:p-12 lg:w-[36rem]"
        >
          <p
            data-panel-reveal
            className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold"
          >
            E o próximo?
          </p>
          <h3
            data-panel-reveal
            className="mt-5 font-display text-[clamp(1.9rem,3.4vw,3rem)] font-medium leading-[1.1] text-cream"
          >
            O próximo painel desta vitrine
            <span className="italic text-gold"> pode ser seu.</span>
          </h3>
          <p data-panel-reveal className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-cream/70">
            Mande fotos ou medidas do seu espaço e volte aqui em alguns meses para
            se ver no portfólio.
          </p>
          <div data-panel-reveal className="mt-9">
            <WhatsAppButton message="Olá! Vi a vitrine de projetos da Marcenaria Silva e quero começar o meu.">
              Começar meu projeto
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
