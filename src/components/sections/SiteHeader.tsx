'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { navItems } from '../../lib/site';
import { BrandLogo } from '../ui/BrandLogo';
import { WhatsAppButton } from '../ui/WhatsAppButton';
import { useLenis } from '../providers/SmoothScrollProvider';

const HEADER_OFFSET = -72;

/**
 * Header fixo e translúcido: transparente sobre o hero, ganha blur + filete ao
 * rolar. Desktop: navegação completa. Mobile: menu overlay em tela cheia.
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lenis = useLenis();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Trava o scroll de fundo enquanto o menu mobile está aberto.
  useEffect(() => {
    if (menuOpen) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.documentElement.style.overflow = '';
    };
  }, [menuOpen, lenis]);

  const goTo = useCallback(
    (href: string) => {
      setMenuOpen(false);
      const target = document.querySelector(href);
      if (!target) return;
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: HEADER_OFFSET, duration: 1.4 });
      else target.scrollIntoView({ behavior: 'auto', block: 'start' });
    },
    [lenis],
  );

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    goTo(href);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-60 transition-all duration-500 ${
        scrolled
          ? 'border-b border-caramel/15 bg-espresso/65 py-3 backdrop-blur-xl backdrop-saturate-150'
          : 'border-b border-transparent bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-[110rem] items-center justify-between px-6 lg:px-12">
        <a
          href="#inicio"
          onClick={(e) => onNavClick(e, '#inicio')}
          aria-label="Voltar ao início · Marcenaria Silva"
          className="transition-opacity hover:opacity-80"
        >
          <BrandLogo className="h-10 sm:h-11" priority />
        </a>

        {/* Navegação desktop */}
        <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => onNavClick(e, item.href)}
              className="group relative py-2 font-sans text-[0.8rem] font-medium uppercase tracking-[0.14em] text-cream/75 transition-colors duration-300 hover:text-cream"
            >
              {item.label}
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-400 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <WhatsAppButton
            message="Olá! Estou no site da Marcenaria Silva e gostaria de falar com vocês."
            className="hidden sm:inline-flex !px-5 !py-2.5 text-[0.8rem]"
            ariaLabel="Fale conosco pelo WhatsApp"
          >
            Fale conosco
          </WhatsAppButton>

          {/* Botão do menu mobile */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
            className="flex h-11 w-11 flex-col items-center justify-center gap-[7px] rounded-full border border-caramel/30 lg:hidden"
          >
            <span
              className={`h-px w-5 bg-cream transition-transform duration-300 ${menuOpen ? 'translate-y-1 rotate-45' : ''}`}
            />
            <span
              className={`h-px w-5 bg-cream transition-transform duration-300 ${menuOpen ? '-translate-y-1 -rotate-45' : ''}`}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile em tela cheia */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="fixed inset-0 top-0 z-[-1] flex h-dvh flex-col justify-between bg-espresso-deep/97 px-6 pb-10 pt-28 backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Navegação do menu" className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item.href)}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-caramel/12 py-4 font-display text-3xl font-medium tracking-wide text-cream transition-colors hover:text-gold"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <WhatsAppButton
                message="Olá! Estou no site da Marcenaria Silva e gostaria de falar com vocês."
                className="w-full"
              >
                Fale conosco no WhatsApp
              </WhatsAppButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
