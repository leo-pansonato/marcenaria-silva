'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Phone, ChevronRight } from 'lucide-react';

import { buildWhatsAppLink, navItems } from '../lib/site';

/**
 * Header/navegação em vidro líquido, compartilhado entre a home e o portfólio.
 *
 * - `transparentAtTop`: quando true (padrão), o header fica transparente sobre
 *   o hero escuro no topo e vira sólido ao rolar. Ambas as páginas têm um hero
 *   escuro no topo, então o comportamento é idêntico.
 */
export function SiteHeader({ transparentAtTop = true }: { transparentAtTop?: boolean }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trava o scroll do fundo enquanto o menu mobile está aberto.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [mobileMenuOpen]);

  // Fecha o menu mobile com a tecla Esc.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileMenuOpen]);

  // "Compacto" = fundo claro sólido (rolou a página, ou página sem hero escuro).
  const solid = scrolled || !transparentAtTop;

  const isActive = (href: string) =>
    href.startsWith('/portfolio') && pathname?.startsWith('/portfolio');

  return (
    <>
      <header
        id="navbar-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          solid
            ? 'py-4 bg-white/80 backdrop-blur-md border-b border-luxury-gold/20 shadow-md'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 border-2 border-luxury-gold flex items-center justify-center rounded-sm rotate-45 transition-transform duration-700 group-hover:rotate-135">
                <span
                  className={`font-display font-extrabold text-lg -rotate-45 block transition-colors duration-300 ${
                    solid ? 'text-luxury-gold-dark' : 'text-luxury-gold-light'
                  }`}
                >
                  R
                </span>
              </div>
              <div className="absolute -inset-1 border border-luxury-gold/30 rounded-sm rotate-45 scale-110 pointer-events-none group-hover:scale-125 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span
                className={`text-xl font-display font-bold tracking-widest transition-colors duration-300 ${
                  solid ? 'text-noble-brown group-hover:text-luxury-gold-dark' : 'text-white group-hover:text-luxury-gold-light'
                }`}
              >
                RENOVO
              </span>
              <span
                className={`text-[9px] uppercase tracking-[0.3em] font-semibold transition-colors duration-300 ${
                  solid ? 'text-luxury-gold-dark' : 'text-luxury-gold-light'
                }`}
              >
                Marcenaria de Arte
              </span>
            </div>
          </Link>

          {/* Navegação desktop */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold tracking-wide transition-all duration-300 relative py-1 group ${
                  solid ? 'text-noble-brown/80 hover:text-luxury-gold-dark' : 'text-white/85 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-luxury-gold transition-all duration-300 group-hover:w-full ${
                    isActive(item.href) ? 'w-full' : 'w-0'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* CTA WhatsApp */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noreferrer"
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-500 shadow-sm flex items-center gap-2 group cursor-pointer ${
                solid ? 'bg-noble-brown text-[#FAF9F6] hover:bg-luxury-gold' : 'bg-white/10 text-white hover:bg-white hover:text-noble-brown border border-white/20'
              }`}
            >
              <span>Orçamento Rápido</span>
              <Phone className={`w-3.5 h-3.5 group-hover:rotate-12 transition-transform duration-300 ${solid ? 'text-luxury-gold-light' : 'text-luxury-gold'}`} />
            </a>
          </div>

          {/* Botão menu mobile */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className={`md:hidden p-2 transition-colors duration-300 ${solid ? 'text-noble-brown hover:text-luxury-gold' : 'text-white hover:text-luxury-gold-light'}`}
            aria-label="Abrir Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Drawer mobile */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-50 bg-noble-brown/40 backdrop-blur-md md:hidden flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              className="w-[82%] max-w-sm h-full bg-[#FAF9F6] p-8 border-l border-luxury-gold/30 flex flex-col justify-between gap-8 relative shadow-2xl overflow-y-auto overscroll-contain"
              data-lenis-prevent
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <div className="flex items-center justify-between mb-12">
                  <span className="font-display font-bold tracking-widest text-lg">RENOVO</span>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 border border-luxury-gold/20 rounded-full text-noble-brown"
                    aria-label="Fechar Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`text-lg font-medium flex items-center justify-between group border-b border-luxury-gold/10 pb-2 ${
                        isActive(item.href) ? 'text-luxury-gold-dark' : 'text-noble-brown/90 hover:text-luxury-gold-dark'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-luxury-gold opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href={buildWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-[#FAF9F6] font-bold text-center flex items-center justify-center gap-3 transition-colors shadow-lg"
                >
                  <Phone className="w-5 h-5" />
                  <span>Falar com Projetista</span>
                </a>
                <p className="text-center text-xs text-noble-brown/50">Jundiaí - SP e Região</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
