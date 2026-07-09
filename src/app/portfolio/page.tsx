'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Phone, Clock, Sparkles } from 'lucide-react';
import Lenis from 'lenis';

import { SiteHeader } from '../../components/SiteHeader';
import { SiteFooter } from '../../components/SiteFooter';
import { WhatsAppFloat } from '../../components/WhatsAppFloat';
import { AmbientBackground } from '../../components/AmbientBackground';
import { VideoPlayer } from '../../components/VideoPlayer';
import { portfolioVideos } from '../../data';
import { buildWhatsAppLink } from '../../lib/site';

export default function PortfolioPage() {
  // Mesmo scroll cinético premium da home.
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-noble-brown font-sans selection:bg-luxury-gold selection:text-white relative overflow-hidden">
      <AmbientBackground />
      <SiteHeader />

      {/* HERO ESCURO - mantém o header transparente/consistente com a home */}
      <section className="relative z-10 overflow-hidden bg-noble-brown-dark text-white pt-36 lg:pt-48 pb-24 lg:pb-28 px-6 lg:px-12">
        {/* Brilho dourado ambiente */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-20 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-radial from-luxury-gold/18 via-transparent to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-[-10vw] h-[40vh] w-[40vh] rounded-full bg-radial from-noble-brown-light/25 via-transparent to-transparent blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-luxury-gold-light/80 hover:text-luxury-gold-light transition-colors mb-8"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Voltar ao site</span>
            </Link>
          </motion.div>

          <motion.span
            className="block text-[11px] sm:text-xs uppercase tracking-[0.28em] text-luxury-gold-light/80 font-medium mb-6"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
          >
            Portfólio - Nossos Projetos
          </motion.span>

          <motion.h1
            className="text-white font-semibold tracking-tight leading-[1.06] text-4xl sm:text-6xl lg:text-7xl max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12 }}
          >
            Nossos projetos,
            <br className="hidden sm:block" /> em movimento.
          </motion.h1>

          <motion.p
            className="mt-7 max-w-xl text-base sm:text-lg text-white/70 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Uma seleção de ambientes reais executados pela Marcenaria Renovo. Toque no play de cada projeto e veja a nossa marcenaria sob medida ganhar vida.
          </motion.p>

          <motion.div
            className="mt-14 pt-8 border-t border-white/15 max-w-xl flex flex-wrap items-center gap-x-10 gap-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
          >
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-semibold text-white">{portfolioVideos.length} projetos</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1.5">Em vídeo</span>
            </div>
            <span className="hidden sm:block h-8 w-px bg-white/15" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-semibold text-white">100%</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1.5">Sob medida</span>
            </div>
            <span className="hidden sm:block h-8 w-px bg-white/15" />
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-semibold text-white">Jundiaí</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1.5">E região</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GRID DE VÍDEOS */}
      <section className="relative z-10 py-20 sm:py-24 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold-dark font-extrabold block mb-3">
              Vitrine em Vídeo
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-noble-brown tracking-tight mb-4">
              Assista aos Projetos
            </h2>
            <div className="w-16 h-1 bg-luxury-gold mx-auto mb-6" />
            <p className="text-noble-brown/70 text-sm sm:text-base">
              Cada vídeo roda apenas ao clicar no play - no seu tempo, com o máximo de detalhe. Passeie pelos ambientes e imagine o seu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {portfolioVideos.map((video, idx) => (
              <motion.article
                key={video.id}
                className="mx-auto w-full max-w-sm"
                initial={{ opacity: 0, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: (idx % 3) * 0.1, ease: 'easeOut' }}
              >
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 24px 48px -18px rgba(62, 39, 35, 0.28)' }}
                  transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  className="relative aspect-[9/16] w-full overflow-hidden rounded-3xl border border-luxury-gold/25 bg-stone-950 shadow-xl"
                >
                  <VideoPlayer src={video.src} poster={video.poster} mode="click">
                    <span className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-luxury-gold/30 bg-white/90 px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest text-luxury-gold-dark shadow-sm">
                      <Sparkles className="h-3 w-3" />
                      {video.categoryLabel}
                    </span>
                    <h3 className="font-display text-lg font-bold tracking-wide text-white">
                      {video.title}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#E5D5C0]/90">
                      {video.description}
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] text-white/60">
                      <Clock className="h-3.5 w-3.5 text-luxury-gold-light" />
                      {video.duration}
                    </span>
                  </VideoPlayer>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="relative z-10 px-6 lg:px-12 pb-24">
        <div className="max-w-5xl mx-auto liquid-glass rounded-3xl border border-luxury-gold/25 shadow-xl px-8 py-12 sm:px-12 sm:py-16 text-center">
          <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold-dark font-extrabold block mb-3">
            Vamos criar o seu?
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-noble-brown tracking-tight mb-4">
            Seu projeto pode ser o próximo em movimento
          </h2>
          <p className="text-noble-brown/70 text-sm sm:text-base max-w-xl mx-auto mb-8">
            Conte para nós o ambiente que você sonha. Fazemos o projeto, a produção e a montagem sob medida, do começo ao fim.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={buildWhatsAppLink('Olá Marcenaria Renovo! Vi o portfólio em vídeo no site e gostaria de solicitar um orçamento para o meu projeto.')}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold uppercase tracking-wider transition-colors duration-300 shadow-md flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>Solicitar orçamento</span>
            </a>
            <Link
              href="/#projetos"
              className="w-full sm:w-auto px-8 py-4 rounded-full border border-luxury-gold/40 text-noble-brown hover:bg-white text-sm font-bold uppercase tracking-wider transition-colors duration-300 flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <span>Ver a vitrine de fotos</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
      <WhatsAppFloat />
    </div>
  );
}
