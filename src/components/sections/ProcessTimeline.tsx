'use client';

import { processSteps } from '../../data/process';
import { videoPaths, projectImages } from '../../data/media';
import { useHorizontalPin } from '../../hooks/useHorizontalPin';
import { AmbientVideo } from '../ui/AmbientVideo';
import { SwipeHint } from '../ui/SwipeHint';
import { WhatsAppButton } from '../ui/WhatsAppButton';

/**
 * Processo como scrollytelling horizontal: a seção trava e as cinco etapas
 * atravessam a tela com a linha de progresso preenchendo no topo.
 * Mobile/reduced-motion: carrossel nativo com scroll-snap.
 */
export function ProcessTimeline() {
  const { sectionRef, trackRef, progressRef, pinned } = useHorizontalPin<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      id="processo"
      aria-label="Processo de trabalho da Marcenaria Silva"
      className={`relative overflow-hidden bg-espresso ${
        pinned ? 'flex h-svh flex-col justify-center pb-6 pt-24' : 'section-y'
      }`}
    >
      {/* Brilho quente de fundo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 bottom-0 h-[34rem] w-[34rem] rounded-full bg-caramel/10 blur-[130px]"
      />

      <div className="mx-auto mb-10 flex w-full max-w-[110rem] items-center justify-between px-6 lg:px-12">
        <p className="font-sans text-[0.72rem] font-semibold uppercase tracking-[0.38em] text-gold">
          Processo
        </p>
        <div className="flex items-center gap-4">
          <SwipeHint />
          <span className="hidden h-px w-40 overflow-hidden bg-cream/12 lg:block lg:w-56">
            <span ref={progressRef} className="block h-full w-full origin-left scale-x-0 bg-caramel" />
          </span>
        </div>
      </div>

      <div
        ref={trackRef}
        className={`flex items-stretch gap-6 px-6 will-change-transform sm:gap-10 lg:gap-14 lg:px-12 ${
          pinned ? '' : 'no-scrollbar snap-x snap-mandatory overflow-x-auto pb-4'
        }`}
      >
        {/* Abertura */}
        <div data-panel className="flex w-[82vw] shrink-0 snap-center flex-col justify-center sm:w-[24rem] lg:w-[28rem]">
          <h2
            data-panel-reveal
            className="font-display text-[clamp(2.2rem,4.5vw,3.9rem)] font-medium leading-[1.05] tracking-[-0.01em] text-cream"
          >
            Do risco
            <span className="block italic text-gold">ao encaixe.</span>
          </h2>
          <p data-panel-reveal className="mt-6 max-w-xs font-sans text-sm leading-relaxed text-cream/65">
            Cinco etapas, um responsável, nenhuma surpresa. É assim que um projeto
            atravessa a nossa oficina.
          </p>
        </div>

        {/* Etapas */}
        {processSteps.map((step) => (
          <div
            key={step.number}
            data-panel
            className="flex w-[78vw] shrink-0 snap-center flex-col justify-center border-l border-caramel/15 pl-7 sm:w-[22rem] lg:w-[26rem] lg:pl-10"
          >
            <span
              data-panel-reveal
              aria-hidden="true"
              className="text-outline font-display text-[clamp(4.5rem,8vw,7rem)] font-semibold italic leading-none"
            >
              {step.number}
            </span>
            <div data-panel-reveal className="filete mb-6 mt-8 w-16" />
            <h3 data-panel-reveal className="font-display text-2xl font-medium text-cream lg:text-3xl">
              {step.title}
            </h3>
            <p data-panel-reveal className="mt-4 max-w-sm font-sans text-sm leading-relaxed text-cream/68">
              {step.description}
            </p>
          </div>
        ))}

        {/* Reel de bastidor entre as etapas e o CTA */}
        <div
          data-panel
          className="relative aspect-[9/16] h-[58vh] shrink-0 snap-center self-center overflow-hidden rounded-[1.75rem] border border-caramel/15 bg-brown lg:h-[64vh]"
        >
          <AmbientVideo
            src={videoPaths.ambiente[1]}
            poster={projectImages.cozinhaRipado[2]}
            caption="Bastidor de montagem"
            label="o bastidor de montagem"
          />
        </div>

        {/* Fechamento com CTA */}
        <div data-panel className="flex w-[82vw] shrink-0 snap-center flex-col justify-center sm:w-[24rem] lg:w-[30rem]">
          <h3
            data-panel-reveal
            className="font-display text-[clamp(1.9rem,3.2vw,2.9rem)] font-medium leading-[1.12] text-cream"
          >
            A etapa 01 começa com
            <span className="italic text-gold"> uma mensagem.</span>
          </h3>
          <p data-panel-reveal className="mt-5 max-w-sm font-sans text-sm leading-relaxed text-cream/70">
            Sem compromisso: conte o que você precisa e devolvemos os próximos
            passos com prazos e estimativa.
          </p>
          <div data-panel-reveal className="mt-9">
            <WhatsAppButton message="Olá! Quero começar meu projeto com a Marcenaria Silva. Pode me explicar os próximos passos?">
              Começar meu projeto
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
