'use client';

import { useLayoutEffect, useRef, useState } from 'react';
import { gsap, EASE, DESKTOP_MOTION } from '../lib/gsap';

/**
 * Seção com scroll horizontal "pinned": em desktop (com movimento permitido),
 * a seção trava na viewport e o trilho desliza no eixo X conforme o usuário
 * rola verticalmente. Elementos com [data-panel-reveal] dentro de cada
 * [data-panel] revelam ao entrar pela lateral; elementos [data-parallax]
 * ganham deriva horizontal sutil (profundidade cinematográfica).
 *
 * Em mobile ou reduced-motion, `pinned` fica false e o trilho vira um
 * carrossel nativo com scroll-snap — mesma marcação, zero JS.
 */
export function useHorizontalPin<S extends HTMLElement = HTMLElement>() {
  const sectionRef = useRef<S>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();
    mm.add(DESKTOP_MOTION, () => {
      setPinned(true);

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
      const drive = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          // Um pouco mais de inércia no scrub = deslize sedoso, sem "grudar".
          scrub: 1.15,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressRef.current) gsap.set(progressRef.current, { scaleX: self.progress });
          },
        },
      });

      // Reveal interno de cada painel — curva expo, disparado pela posição horizontal.
      track.querySelectorAll<HTMLElement>('[data-panel]').forEach((panel) => {
        const items = panel.querySelectorAll<HTMLElement>('[data-panel-reveal]');
        if (items.length) {
          gsap.from(items, {
            y: 46,
            autoAlpha: 0,
            duration: 1.1,
            ease: EASE.reveal,
            stagger: 0.08,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: drive,
              start: 'left 82%',
              once: true,
            },
            onComplete: () => gsap.set(items, { clearProps: 'all' }),
          });
        }

        // Parallax horizontal da mídia: deriva suave enquanto o painel cruza a tela.
        const media = panel.querySelector<HTMLElement>('[data-parallax]');
        if (media) {
          gsap.fromTo(
            media,
            { xPercent: -5, scale: 1.1 },
            {
              xPercent: 5,
              scale: 1.1,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: drive,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            },
          );
        }
      });

      return () => setPinned(false);
    });

    return () => mm.revert();
  }, []);

  return { sectionRef, trackRef, progressRef, pinned };
}
