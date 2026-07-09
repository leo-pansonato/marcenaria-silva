'use client';

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Phone,
  ArrowRight,
  MapPin,
  Sparkles,
  Trees,
  Hammer,
  CalendarClock,
  CheckCircle2,
  Instagram,
  Send,
  Clock,
  Info,
  Sliders,
} from 'lucide-react';

import Image from 'next/image';
import { projects, secondaryProjects, processSteps, values } from '../data';
import { Project } from '../types';
import Lenis from 'lenis';
import { ImmersiveGallery } from '../components/ImmersiveGallery';
import { InspirationCarousel } from '../components/InspirationCarousel';
import { ParallaxImage } from '../components/ParallaxImage';
import { SiteHeader } from '../components/SiteHeader';
import { SiteFooter } from '../components/SiteFooter';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { AmbientBackground } from '../components/AmbientBackground';
import { VideoPlayer } from '../components/VideoPlayer';
import { buildWhatsAppLink, asset } from '../lib/site';

// Imagens principais (fornecidas pelo cliente).
import imgKitchenBlue from '../assets/images/hero-cozinha-showroom.jpg';
import imgWorkspaceYellow from '../assets/images/home-office-eames-amarelo.jpg';

// Vídeos verticais que rodam como GIF vivo (sempre ativo, sem pausa) na home.
const HOME_VIDEO_QUALIDADE = asset('/videos/snapinsta.com.br-6a4a8c4bc7f22.mp4'); // parede amadeirada
const HOME_VIDEO_CINEMATIC = asset('/videos/snapinsta.com.br-6a4a8c5955467.mp4'); // reveal em 1080p

// Map icons dynamically
const iconMap: Record<string, React.ComponentType<any>> = {
  Trees: Trees,
  Sparkles: Sparkles,
  Hammer: Hammer,
  CalendarClock: CalendarClock,
};

export default function App() {
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Initialize Lenis for smooth premium kinetic scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.0, // ágil e fluido, mantendo o glide premium (antes: 2.2, arrastado)
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easeOutExpo easing
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // resposta imediata ao scroll (antes: 0.8)
      touchMultiplier: 1.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Trava o scroll do fundo enquanto o modal de projeto está aberto (mobile e desktop).
  useEffect(() => {
    if (!selectedProject) return;
    const previous = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = previous;
    };
  }, [selectedProject]);

  // Fecha o modal com a tecla Esc.
  useEffect(() => {
    if (!selectedProject) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selectedProject]);

  // Filter projects
  const filteredProjects = activeCategory === 'todos' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const filteredSecondaryProjects = activeCategory === 'todos'
    ? secondaryProjects
    : secondaryProjects.filter(p => p.category === activeCategory);

  // Form submission handler (redirects to WhatsApp for real conversion)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName || !contactPhone) return;

    const msg = `Olá Marcenaria Renovo! Meu nome é ${contactName}. Gostaria de agendar uma consultoria.\nTelefone: ${contactPhone}\n\nMensagem: ${contactMessage || 'Tenho interesse em móveis sob medida para minha residência.'}`;
    setFormSubmitted(true);
    
    // Smooth delay before opening whatsapp
    setTimeout(() => {
      window.open(buildWhatsAppLink(msg), '_blank');
      setFormSubmitted(false);
      setContactName('');
      setContactPhone('');
      setContactMessage('');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-noble-brown font-sans selection:bg-luxury-gold selection:text-white relative overflow-hidden">
      
      {/* 100% ALIVE: Floating Fluid Glass Background Elements */}
      <AmbientBackground />

      {/* HEADER / NAVIGATION (Liquid Glass) */}
      <SiteHeader />

      {/* HERO SECTION */}
      <section 
        id="início"
        className="relative pt-32 lg:pt-44 pb-20 lg:pb-32 px-6 lg:px-12 flex items-center justify-center z-10 overflow-hidden min-h-hero"
      >
        {/* Fundo: imagem em tela cheia com zoom lento e sutil */}
        <div className="absolute inset-0 overflow-hidden z-0 select-none pointer-events-none">
          <motion.div
            className="absolute inset-0 bg-cover bg-center will-change-transform"
            style={{ backgroundImage: `url(${imgKitchenBlue.src})` }}
            animate={{ scale: [1.03, 1.08, 1.03] }}
            transition={{ duration: 30, repeat: Infinity, ease: 'easeInOut' }}
          />
          {/* Escurecimento em gradiente horizontal: lado do texto mais escuro,
              a imagem respira à direita. Vinheta inferior sutil para profundidade. */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/25" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/15" />
        </div>

        {/* Conteúdo do hero - coluna única, alinhada à esquerda */}
        <div className="max-w-7xl mx-auto w-full relative z-10 font-grotesk">
          <div className="max-w-3xl">

            {/* Eyebrow */}
            <motion.p
              className="text-[11px] sm:text-xs uppercase tracking-[0.28em] text-luxury-gold-light/80 font-medium mb-7"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Marcenaria de Alto Padrão - Jundiaí
            </motion.p>

            {/* Headline */}
            <motion.h1
              className="text-white font-semibold tracking-tight leading-[1.06] text-4xl sm:text-6xl lg:text-7xl mb-7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.08 }}
            >
              Marcenaria de alto padrão,
              <br className="hidden sm:block" /> sob medida para o seu lar.
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
              className="text-base sm:text-lg text-white/70 leading-relaxed max-w-xl mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.16 }}
            >
              Projetos autorais que unem a precisão da engenharia moderna ao refino do trabalho manual.
            </motion.p>

            {/* CTA único e sóbrio (mantém o WhatsApp como canal de conversão) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.24 }}
            >
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FAF9F6] text-noble-brown hover:bg-luxury-gold hover:text-white text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer"
              >
                <span>Solicitar orçamento</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </motion.div>

            {/* Estatísticas discretas */}
            <motion.div
              className="mt-16 pt-8 border-t border-white/15 max-w-xl flex flex-wrap items-center gap-x-10 gap-y-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-semibold text-white">100%</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1.5">Sob medida</span>
              </div>
              <span className="hidden sm:block h-8 w-px bg-white/15" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-semibold text-white">10 anos</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1.5">De garantia</span>
              </div>
              <span className="hidden sm:block h-8 w-px bg-white/15" />
              <div className="flex flex-col">
                <span className="text-lg sm:text-xl font-semibold text-white">Jundiaí</span>
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mt-1.5">E região</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* PORTFOLIO SECTION (THE VITRINE) */}
      <section 
        id="projetos"
        className="py-24 bg-white/40 backdrop-blur-xs relative z-10 border-t border-luxury-gold/10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Section Heading */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold-dark font-extrabold block mb-3">
              Portfólio de Assinatura
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-noble-brown tracking-tight mb-4">
              Nossa Vitrine de Projetos Reais
            </h2>
            <div className="w-16 h-1 bg-luxury-gold mx-auto mb-6" />
            <p className="text-noble-brown/70 text-sm sm:text-base">
              Explore ambientes reais executados com rigor pela Marcenaria Renovo. Cada imagem representa nosso alto padrão em design, acabamentos nobres e soluções inteligentes.
            </p>
          </div>

          {/* Portfolio Categories Filters (Fluid slider / selector) */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
            {[
              { id: 'todos', label: 'Todos os Projetos' },
              { id: 'cozinhas', label: 'Cozinhas' },
              { id: 'salas', label: 'Salas & Painéis' },
              { id: 'dormitorios', label: 'Dormitórios' },
              { id: 'office', label: 'Home Office' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-noble-brown text-[#FAF9F6] shadow-md border-transparent scale-105'
                    : 'bg-white/60 hover:bg-white text-noble-brown/70 hover:text-noble-brown border border-luxury-gold/25'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Elastic Accordion Horizontal Gallery */}
          <div className="w-full mt-12 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-5 h-auto md:h-[600px] w-full">
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((project, idx) => (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    className={`flex-1 md:hover:flex-[3.5] transition-all duration-700 ease-in-out cursor-pointer relative overflow-hidden group rounded-3xl border border-luxury-gold/25 bg-stone-900 shadow-xl h-[320px] md:h-full flex-col justify-end ${idx >= 4 ? 'hidden md:flex' : 'flex'}`}
                  >
                    {/* Background Image of the Project */}
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transform group-hover:scale-105 transition-transform duration-1000 select-none z-0"
                      />
                    )}
                    {/* Dark Vignette Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 group-hover:from-black/98 transition-colors duration-500 z-10" />

                    {/* Category tag on image top right */}
                    <span className="absolute top-4 right-4 px-3.5 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[9px] font-bold uppercase tracking-wider text-luxury-gold-dark border border-luxury-gold/30 shadow-sm z-20">
                      {project.categoryLabel}
                    </span>

                    {/* Content wrapper */}
                    <div className="p-6 sm:p-8 relative z-20 w-full flex flex-col justify-end h-full">
                      
                      {/* Condensed view state (disappears on hover on desktop, always visible on mobile if not hovered) */}
                      <div className="transition-all duration-500 md:group-hover:opacity-0 md:group-hover:translate-y-4 md:absolute md:bottom-6 md:left-6 md:right-6 md:z-10">
                        <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-wide truncate">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[#E5D5C0] flex items-center gap-1.5 mt-1.5">
                          {project.categoryLabel}
                        </p>
                      </div>

                      {/* Expanded view state on hover (desktop only, fades in beautifully).
                          Largura fixa: o texto é diagramado uma vez nessa medida e o card
                          (com overflow-hidden) apenas o revela ao crescer — assim o texto
                          nunca reflui nem quebra linha durante a animação de hover. */}
                      <div className="opacity-0 translate-y-12 pointer-events-none md:group-hover:opacity-100 md:group-hover:translate-y-0 md:group-hover:pointer-events-auto transition-all duration-500 ease-out hidden md:flex flex-col md:w-[22rem] shrink-0">
                        <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-luxury-gold-light whitespace-nowrap">RENOVO EXCLUSIVE</span>
                        <h3 className="text-2xl lg:text-3xl font-display font-extrabold text-white mt-1 mb-2">
                          {project.title}
                        </h3>
                        <p className="text-xs text-[#FAF9F6]/90 leading-relaxed w-full mb-5">
                          {project.description}
                        </p>

                        {/* Specs with refined dividers */}
                        <div className="border-t border-white/20 pt-4 w-full">
                          <p className="text-[9px] uppercase font-bold tracking-widest text-luxury-gold-light mb-2">Características Principais</p>
                          <div className="flex flex-wrap gap-1.5">
                            {project.specs.materials.map((mat, mIdx) => (
                              <span key={mIdx} className="px-2.5 py-0.5 rounded bg-white/10 text-[9px] font-semibold text-white/95 border border-white/15">
                                {mat}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Touch overlay for mobile to tap open the detailed specs modal open directly */}
                    <button
                      type="button"
                      aria-label={`Ver detalhes do projeto ${project.title}`}
                      className="absolute inset-0 z-30 md:hidden cursor-pointer"
                      onClick={() => setSelectedProject(project)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* SECONDARY SECTION OF PROJECT CARDS: Clean, fully responsive premium grid with 6 spaces */}
          <div className="mt-24 pt-16 border-t border-luxury-gold/20">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold-dark font-extrabold block mb-2">
                Conceito & Detalhes
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-noble-brown tracking-tight">
                Galeria de Inspirações sob Medida
              </h3>
              <p className="text-noble-brown/65 text-xs sm:text-sm mt-3">
                Mais soluções exclusivas de marcenaria de luxo projetadas sob medida, destacando texturas e harmonizações perfeitas de materiais.
              </p>
            </div>

            {/* Carrossel: 3 cards por vez (2 em tablet, 1 no mobile), com setas e dots. */}
            <InspirationCarousel projects={filteredSecondaryProjects} />
          </div>

          {/* CTA de conversão do portfólio: convite direto após ver os projetos */}
          <motion.div
            className="mt-24 relative overflow-hidden rounded-3xl border border-luxury-gold/25 liquid-glass shadow-xl px-8 py-12 sm:px-16 sm:py-16 text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Brilho dourado decorativo ao fundo */}
            <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[120%] h-48 bg-luxury-gold/10 blur-3xl rounded-full" />
            <span className="relative text-xs uppercase tracking-[0.25em] text-luxury-gold-dark font-extrabold block mb-3">
              Seu Projeto Começa Aqui
            </span>
            <h3 className="relative text-2xl sm:text-4xl font-display font-extrabold text-noble-brown tracking-tight mb-4">
              Imaginou algo assim para o seu espaço?
            </h3>
            <p className="relative text-noble-brown/70 text-sm sm:text-base max-w-xl mx-auto mb-9">
              Cada projeto acima nasceu de uma conversa. Conte-nos o que você tem em mente e desenhamos, sem compromisso, uma solução exclusiva sob medida para o seu lar.
            </p>
            <a
              href={buildWhatsAppLink('Olá Marcenaria Renovo! Vi os projetos no site e gostaria de solicitar um orçamento sob medida para o meu espaço.')}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-noble-brown text-[#FAF9F6] hover:bg-luxury-gold hover:text-white text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer shadow-md"
            >
              <span>Solicitar meu orçamento</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </motion.div>

        </div>
      </section>

      {/* LIGHT-REFLECTION DETAIL MODAL FOR PORTFOLIO ITEMS (AnimatePresence) */}
      <AnimatePresence>
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-noble-brown-dark/70 backdrop-blur-md overscroll-contain"
            onClick={() => setSelectedProject(null)}
            role="presentation"
          >
            <motion.div
              className="bg-white rounded-3xl overflow-y-auto max-h-[90dvh] w-full max-w-3xl border border-luxury-gold/40 shadow-2xl relative overscroll-contain"
              data-lenis-prevent
              role="dialog"
              aria-modal="true"
              aria-label={selectedProject.title}
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 p-2.5 bg-black/40 hover:bg-black/60 text-white rounded-full transition-colors duration-300 cursor-pointer"
                aria-label="Fechar Modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="aspect-[4/3] sm:aspect-video md:aspect-auto md:h-full relative overflow-hidden bg-stone-100 min-h-[180px]">
                  {selectedProject.image && (
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  )}
                </div>
                
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-luxury-gold-dark block mb-2">
                      {selectedProject.categoryLabel}
                    </span>
                    <h3 className="text-2xl font-display font-extrabold text-noble-brown mb-4">
                      {selectedProject.title}
                    </h3>
                    <p className="text-xs text-noble-brown/70 leading-relaxed mb-6">
                      {selectedProject.description}
                    </p>

                    <div className="space-y-4 mb-8">
                      <div>
                        <h4 className="text-xs uppercase font-extrabold tracking-widest text-luxury-gold-dark mb-1.5">Materiais Utilizados</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.specs.materials.map((m, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-stone-100 text-[10px] font-semibold text-noble-brown-light">
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="text-xs uppercase font-extrabold tracking-widest text-luxury-gold-dark mb-1.5">Técnicas de Acabamento</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.specs.finishes.map((f, i) => (
                            <span key={i} className="px-2 py-1 rounded bg-luxury-gold-light/20 text-[10px] font-semibold text-luxury-gold-dark">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <a 
                    href={buildWhatsAppLink(`Olá! Vi o projeto "${selectedProject.title}" no seu site e adorei os detalhes. Gostaria de entender mais sobre o valor e o prazo para algo parecido no meu espaço.`)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-center text-sm flex items-center justify-center gap-2.5 transition-all duration-300 shadow-md cursor-pointer"
                  >
                    <Phone className="w-4 h-4 fill-white" />
                    <span>Quero um Orçamento Deste</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* IMMERSIVE GALLERY - experiência interativa (parallax + cursor + marquee) */}
      <ImmersiveGallery />

      {/* EXTREME QUALITY & MATERIALS SECTION */}
      <section 
        id="qualidade"
        className="py-24 bg-[#FAF9F6] relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Texts */}
            <div className="lg:col-span-6">
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold-dark font-extrabold block mb-3">
                Excelência sem Concessões
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-noble-brown tracking-tight mb-6">
                Materiais Nobres e Ferragens de Referência Mundial
              </h2>
              <p className="text-noble-brown/70 leading-relaxed text-sm sm:text-base mb-8">
                Um móvel sob medida de luxo não se define apenas por sua beleza externa, mas pelas matérias-primas invisíveis que estruturam sua longevidade. Na Marcenaria Renovo, cada dobradiça, parafuso e chapa de MDF é escolhido meticulosamente.
              </p>

              {/* Grid of values */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {values.map((val, idx) => {
                  const IconComp = iconMap[val.icon] || Sparkles;
                  return (
                    <motion.div 
                      key={idx}
                      className="p-5 rounded-2xl bg-white/70 backdrop-blur-xs border border-luxury-gold/15 hover:border-luxury-gold/45 transition-all duration-500 shadow-xs flex flex-col justify-between"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
                      whileHover={{ scale: 1.03, y: -4, boxShadow: "0 10px 30px -15px rgba(184, 134, 11, 0.15)" }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2.5 rounded-xl bg-luxury-gold-light/20 text-luxury-gold-dark">
                          <IconComp className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-noble-brown uppercase tracking-wider">{val.title}</h4>
                      </div>
                      <p className="text-xs text-noble-brown/65 leading-relaxed">{val.description}</p>
                    </motion.div>
                  );
                })}
              </div>

              {/* CTA inline: leva o interesse nos materiais direto para a conversa */}
              <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a
                  href={buildWhatsAppLink('Olá Marcenaria Renovo! Quero móveis sob medida com esse padrão de materiais nobres e ferragens premium. Podemos conversar?')}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-noble-brown text-[#FAF9F6] hover:bg-luxury-gold hover:text-white text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer shadow-sm"
                >
                  <span>Quero esse padrão no meu projeto</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <span className="text-xs text-noble-brown/55 leading-relaxed max-w-[15rem]">
                  Especificamos cada material com você, sem custo e sem compromisso.
                </span>
              </div>
            </div>

            {/* Graphics block side (Glass card hovering overlaying a picture of wood) */}
            <motion.div 
              className="lg:col-span-6 relative flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              
              {/* Vídeo vertical rodando como GIF vivo (sempre ativo, sem pausa) */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-4/3 sm:aspect-[3/4] w-full max-w-sm border border-luxury-gold/20 group">
                <VideoPlayer src={HOME_VIDEO_QUALIDADE} mode="ambient" />
                <div className="absolute inset-0 bg-linear-to-t from-noble-brown-dark/40 to-transparent pointer-events-none" />
                {/* Selo "ao vivo" */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full bg-black/45 backdrop-blur-xs px-3 py-1 text-[9px] font-bold uppercase tracking-[0.2em] text-white/90 pointer-events-none">
                  <span className="w-1.5 h-1.5 bg-luxury-gold-light rounded-full animate-pulse" />
                  <span>Em movimento</span>
                </div>
              </div>

              {/* Floating Glass Box over image.
                  No mobile o vídeo é curto (aspect 4/3), então o card é compacto
                  (menor padding, ícone e tipografia + descrição limitada a 3 linhas)
                  para não cobrir/interferir no vídeo. A partir de sm volta ao tamanho cheio. */}
              <motion.div
                className="absolute w-[86%] left-[7%] sm:w-[80%] sm:left-[10%] bottom-[-24px] sm:bottom-[-30px] liquid-glass rounded-2xl p-4 sm:p-6 border border-luxury-gold/30 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                animate={{
                  y: [0, -6, 0]
                }}
                transition={{
                  y: {
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                  },
                  default: { duration: 0.8 }
                }}
              >
                <div className="flex gap-3 sm:gap-4 items-start">
                  <div className="p-2.5 sm:p-3 bg-luxury-gold text-white rounded-xl shrink-0">
                    <Sliders className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base font-bold font-display tracking-wide text-noble-brown">
                      Precisão Tecnológica
                    </h4>
                    <p className="text-[11px] sm:text-xs text-noble-brown/70 leading-relaxed mt-1 sm:mt-1.5 line-clamp-3 sm:line-clamp-none">
                      Contamos com seccionadoras e coladeiras de borda computadorizadas de última geração. Isso garante folgas simétricas perfeitas de 2mm e vedação total contra umidade.
                    </p>
                  </div>
                </div>
              </motion.div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* PROCESS / METHOD SECTION (STEP BY STEP) */}
      <section 
        id="processo"
        className="py-24 bg-white/40 backdrop-blur-xs relative z-10 border-t border-b border-luxury-gold/15"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          {/* Heading */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold-dark font-extrabold block mb-3">
              Fluxo da Criação
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-noble-brown tracking-tight mb-4">
              Sua Jornada até a Casa Perfeita
            </h2>
            <div className="w-16 h-1 bg-luxury-gold mx-auto mb-6" />
            <p className="text-noble-brown/70 text-sm sm:text-base">
              Do rascunho em papel até o polimento final da madeira na montagem, mantemos um processo claro, sem surpresas e voltado para a excelência.
            </p>
          </div>

          {/* Stepper Timeline UI */}
          <div className="relative mt-12">
            
            {/* Linking horizontal/vertical line */}
            <div className="absolute top-[35px] left-8 lg:left-0 lg:right-0 lg:w-full h-1 bg-gradient-to-r from-luxury-gold-light via-luxury-gold-dark to-luxury-gold-light opacity-30 z-0 hidden lg:block" />

            <div className="grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-10 lg:gap-8 relative z-10">
              {processSteps.map((step, idx) => (
                <motion.div
                  key={step.number}
                  className={`relative flex flex-col items-center text-center group ${
                    idx === processSteps.length - 1 ? 'col-span-2 lg:col-span-1' : ''
                  }`}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.15 }}
                >

                  {/* Step bubble */}
                  <div className="relative w-14 h-14 lg:w-16 lg:h-16 rounded-2xl bg-white border-2 border-luxury-gold flex items-center justify-center text-lg lg:text-xl font-extrabold text-luxury-gold-dark shadow-md z-10 transform group-hover:scale-110 group-hover:bg-noble-brown group-hover:text-white group-hover:border-transparent transition-all duration-300">
                    {step.number}
                  </div>

                  <h4 className="text-sm lg:text-base font-bold text-noble-brown tracking-tight mt-4 lg:mt-5 mb-1.5 lg:mb-2 group-hover:text-luxury-gold-dark transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[11px] lg:text-xs text-noble-brown/65 leading-relaxed max-w-[210px]">
                    {step.description}
                  </p>

                </motion.div>
              ))}
            </div>

          </div>

          {/* Stepper Bottom conversion note */}
          <div className="mt-16 text-center">
            <motion.div 
              className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-white/60 border border-luxury-gold/25 shadow-xs"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-luxury-gold-dark">
                <Info className="w-4 h-4 text-luxury-gold-dark" />
                <span>Precisa de assessoria com seu arquiteto?</span>
              </div>
              <p className="text-xs text-noble-brown/70 max-w-sm sm:text-left leading-relaxed">
                Nós trabalhamos em perfeita sintonia com escritórios de arquitetura e design de interiores, seguindo plantas e detalhamentos executivos.
              </p>
              <a 
                href={buildWhatsAppLink('Olá Marcenaria Renovo! Sou arquiteto e tenho um projeto executivo pronto. Gostaria de enviar os detalhamentos para fazermos uma parceria e cotação.')}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-noble-brown text-[#FAF9F6] text-xs font-semibold uppercase rounded-lg hover:bg-luxury-gold transition-all duration-300 shadow-sm cursor-pointer"
              >
                Sou Arquiteto
              </a>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ABOUT SECTION (SOBRE A EMPRESA - GLASS FLOATING ON WHITE) */}
      <section 
        id="sobre"
        className="py-24 bg-[#FAF9F6] relative z-10"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Visual block with yellow chairs or bedroom cabinets */}
            <motion.div 
              className="lg:col-span-5 relative"
              initial={{ opacity: 0, x: -35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -inset-4 border border-luxury-gold/15 rounded-3xl pointer-events-none transform rotate-1 scale-102" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-4/3 sm:aspect-square group">
                <ParallaxImage
                  src={imgWorkspaceYellow.src}
                  alt="Ateliê Marcenaria Renovo"
                  maxOffset={120}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noble-brown-dark/50 to-transparent pointer-events-none" />
              </div>

              {/* Little seal of heritage with floating drift animation */}
              <motion.div 
                className="absolute -top-6 -left-6 bg-white border border-luxury-gold/30 rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg transform -rotate-12 z-10"
                animate={{
                  rotate: [-12, -7, -12],
                  y: [0, -4, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="text-[9px] uppercase font-bold text-luxury-gold-dark tracking-widest leading-none">Feito em</span>
                <span className="text-sm font-extrabold text-noble-brown mt-1">Jundiaí</span>
                <span className="text-[8px] uppercase tracking-wider text-noble-brown/50 mt-1">Estado de SP</span>
              </motion.div>
            </motion.div>

            {/* Content block: Glass panel over white background */}
            <motion.div 
              className="lg:col-span-7 liquid-glass p-8 sm:p-12 rounded-3xl border border-luxury-gold/25 shadow-xl relative"
              initial={{ opacity: 0, x: 35 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold-dark font-extrabold block mb-3">
                A Tradição & O Futuro
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-noble-brown tracking-tight mb-6">
                Marcenaria Renovo: Alma Artesanal, Rigor de Engenharia
              </h2>

              <div className="space-y-4 text-stone-700 leading-relaxed text-sm">
                <p>
                  Localizada estrategicamente em Jundiaí, SP, a Marcenaria Renovo nasceu com o propósito de resgatar o valor do verdadeiro trabalho artesanal de luxo, adaptando-o às necessidades de conforto e inteligência tecnológica do lar contemporâneo.
                </p>
                <p>
                  Não acreditamos em soluções padronizadas de fábrica. Para nós, cada chapa de madeira é uma tela em branco. Projetamos móveis que contam histórias, otimizam espaços difíceis e conferem uma atmosfera única de conforto ao seu lar.
                </p>
                <p>
                  Nossa equipe é formada por especialistas, desde arquitetos de detalhamento técnico a marceneiros de tradição familiar, comprometidos com o refino estético e a durabilidade eterna de cada peça instalada.
                </p>
              </div>

              {/* Checkmarks highlights with subtle scroll delay staggered entrance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-luxury-gold/20">
                <motion.div 
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-luxury-gold-dark shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-noble-brown uppercase">Atendimento Premium</h5>
                    <p className="text-[11px] text-noble-brown/60 leading-normal mt-0.5">Retornos ágeis, detalhamentos claros e flexibilidade.</p>
                  </div>
                </motion.div>
                <motion.div 
                  className="flex items-start gap-2.5"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.45 }}
                >
                  <CheckCircle2 className="w-5 h-5 text-luxury-gold-dark shrink-0 mt-0.5" />
                  <div>
                    <h5 className="text-xs font-bold text-noble-brown uppercase">Garantia Nobre</h5>
                    <p className="text-[11px] text-noble-brown/60 leading-normal mt-0.5">Suporte pós-instalação integral e garantia contratual.</p>
                  </div>
                </motion.div>
              </div>

              {/* CTA da seção Sobre: convida a conhecer o ateliê de perto */}
              <div className="mt-8 pt-8 border-t border-luxury-gold/20 flex flex-col sm:flex-row sm:items-center gap-4">
                <a
                  href={buildWhatsAppLink('Olá Marcenaria Renovo! Conheci a história de vocês no site e gostaria de agendar uma visita ao showroom em Jundiaí.')}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-full bg-luxury-gold text-white hover:bg-luxury-gold-dark text-sm font-semibold tracking-wide transition-colors duration-300 cursor-pointer shadow-sm shrink-0"
                >
                  <span>Agende uma visita ao showroom</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
                <p className="text-xs text-noble-brown/55 leading-relaxed max-w-xs">
                  Venha sentir os acabamentos e as texturas de perto no nosso ateliê em Jundiaí, SP.
                </p>
              </div>

            </motion.div>

          </div>

        </div>
      </section>

      {/* CONTACT / CONVERSATION SECTION (FORM + ADDRESS) */}
      <section 
        id="contato"
        className="py-24 bg-white/40 backdrop-blur-xs relative z-10 border-t border-luxury-gold/15"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Contact details / channels */}
            <div className="lg:col-span-5 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold-dark font-extrabold block mb-3">
                  Contato de Atendimento
                </span>
                <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-noble-brown tracking-tight mb-6">
                  Vamos Projetar Juntos?
                </h2>
                <p className="text-noble-brown/70 leading-relaxed text-sm sm:text-base mb-8">
                  Dê o primeiro passo rumo a uma experiência de moradia completamente otimizada e sofisticada. Preencha o formulário ou entre em contato diretamente pelo WhatsApp.
                </p>

                {/* Info List */}
                <div className="space-y-6">
                  
                  {/* Address */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white border border-luxury-gold/35 text-luxury-gold-dark rounded-xl shadow-xs">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-extrabold tracking-widest text-luxury-gold-dark">Showroom e Oficina</h4>
                      <p className="text-xs text-noble-brown/85 mt-1 leading-relaxed">
                        Av. Nove de Julho, 3500 - Sala 45 - Anhangabaú<br />
                        Jundiaí - SP, CEP 13208-002
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white border border-luxury-gold/35 text-luxury-gold-dark rounded-xl shadow-xs">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-extrabold tracking-widest text-luxury-gold-dark">WhatsApp e Ligações</h4>
                      <p className="text-xs text-noble-brown/85 mt-1">
                        +55 (11) 99876-5432
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white border border-luxury-gold/35 text-luxury-gold-dark rounded-xl shadow-xs">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs uppercase font-extrabold tracking-widest text-luxury-gold-dark">Horário de Funcionamento</h4>
                      <p className="text-xs text-noble-brown/85 mt-1 leading-normal">
                        Segunda a Sexta: 08:00h às 18:00h<br />
                        Sábados: 09:00h às 13:00h (Com agendamento prévio)
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Instagram highlight block */}
              <div className="mt-12 p-4 rounded-2xl bg-white/50 border border-luxury-gold/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white rounded-lg">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-noble-brown">Acompanhe no Instagram</p>
                    <p className="text-[10px] text-noble-brown/50 mt-0.5">@marcenaria.renovo.jundiai</p>
                  </div>
                </div>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="px-3 py-1.5 bg-white hover:bg-stone-50 border border-luxury-gold/25 text-[10px] font-bold uppercase tracking-widest rounded-lg transition-colors cursor-pointer"
                >
                  Seguir
                </a>
              </div>

            </div>

            {/* Premium Form in a Floating Glass Box */}
            <div className="lg:col-span-7">
              <motion.div 
                className="liquid-glass p-8 sm:p-10 rounded-3xl border border-luxury-gold/25 shadow-xl relative"
              >
                
                <h3 className="text-xl font-display font-extrabold text-noble-brown mb-2">
                  Agende sua Consultoria Gratuita
                </h3>
                <p className="text-xs text-noble-brown/60 mb-8 leading-relaxed">
                  Envie-nos uma breve mensagem informando o que precisa. Nós entraremos em contato para coletar as medidas preliminares ou agendar uma visita técnica sem compromisso em Jundiaí e cidades vizinhas.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-6">
                  
                  {/* Name field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name-input" className="text-[10px] font-extrabold uppercase tracking-widest text-luxury-gold-dark">
                      Seu Nome Completo
                    </label>
                    <input
                      id="name-input"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      placeholder="Ex: Carlos Eduardo de Oliveira"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-luxury-gold/20 focus:border-luxury-gold text-sm font-medium text-noble-brown placeholder-noble-brown/30 outline-hidden transition-all duration-300 shadow-inner"
                    />
                  </div>

                  {/* Phone field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="phone-input" className="text-[10px] font-extrabold uppercase tracking-widest text-luxury-gold-dark">
                      WhatsApp para Retorno
                    </label>
                    <input
                      id="phone-input"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="Ex: (11) 99876-5432"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-luxury-gold/20 focus:border-luxury-gold text-sm font-medium text-noble-brown placeholder-noble-brown/30 outline-hidden transition-all duration-300 shadow-inner"
                    />
                  </div>

                  {/* Message field */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message-input" className="text-[10px] font-extrabold uppercase tracking-widest text-luxury-gold-dark">
                      Conte-nos seu Sonho (Cômodos, Estilos, Ideias)
                    </label>
                    <textarea
                      id="message-input"
                      name="message"
                      rows={4}
                      placeholder="Ex: Preciso planejar os armários da minha cozinha integrada e sala com painel de TV ripado…"
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-4 py-3.5 rounded-xl bg-white/70 border border-luxury-gold/20 focus:border-luxury-gold text-sm font-medium text-noble-brown placeholder-noble-brown/30 outline-hidden transition-all duration-300 shadow-inner resize-none"
                    />
                  </div>

                  {/* Submission trigger */}
                  <button 
                    type="submit" 
                    disabled={formSubmitted}
                    className="w-full py-4 rounded-xl bg-noble-brown hover:bg-luxury-gold-dark text-white font-bold text-sm uppercase tracking-wider transition-all duration-500 shadow-md flex items-center justify-center gap-2.5 cursor-pointer disabled:bg-stone-300 disabled:cursor-not-allowed group"
                  >
                    {formSubmitted ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Abrindo Canal WhatsApp…</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        <span>Enviar pelo WhatsApp</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-noble-brown/40">
                    * Ao clicar, você será redirecionado para o nosso canal de atendimento exclusivo com seu formulário já estruturado.
                  </p>

                </form>

              </motion.div>
            </div>

          </div>

        </div>
      </section>

      {/* CINEMATIC PRESENTATION SECTION */}
      <section className="py-24 bg-stone-950 relative z-10 overflow-hidden border-t border-luxury-gold-dark/20 text-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Cinematic Pitch */}
            <div className="lg:col-span-5 flex flex-col items-start">
              <span className="text-xs uppercase tracking-[0.25em] text-luxury-gold-light font-extrabold block mb-3 animate-pulse">
                Filme de Assinatura
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight mb-6 leading-tight">
                Veja a Arte da Marcenaria em Movimento
              </h2>
              <div className="w-16 h-1 bg-luxury-gold-light mb-6" />
              <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
                Deixe-se envolver pela experiência sensorial de criação na Marcenaria Renovo: o rigor milimétrico da montagem e o refino de cada acabamento, em movimento contínuo. Sinta a alma do design sob medida - e conheça todos os nossos projetos em vídeo.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
                <Link
                  href="/portfolio"
                  className="px-6 py-3.5 rounded-full bg-white hover:bg-luxury-gold text-noble-brown hover:text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 shadow-md cursor-pointer group"
                >
                  <span>Ver todos os projetos</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <a
                  href={buildWhatsAppLink('Olá Marcenaria Renovo! Vi os vídeos dos projetos no site e gostaria de conversar sobre o meu.')}
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-3.5 rounded-full border border-white/25 text-white/85 hover:bg-white/10 text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Falar agora</span>
                </a>
              </div>
            </div>

            {/* Vídeo vertical rodando como GIF vivo (sempre ativo, sem pausa) */}
            <div className="lg:col-span-7 relative flex justify-center">
              {/* Anel dourado flutuante */}
              <motion.div
                className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[calc(100%-1rem)] max-w-[26rem] rounded-[2.2rem] border border-luxury-gold/25 pointer-events-none"
                animate={{ rotate: [0, 1.5, 0], scale: [1, 1.01, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="relative w-full max-w-sm rounded-3xl overflow-hidden aspect-[9/16] shadow-2xl border border-white/10 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.01 }}
              >
                <VideoPlayer src={HOME_VIDEO_CINEMATIC} mode="ambient" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                {/* Selo ao vivo */}
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/45 backdrop-blur-xs px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold text-white/90 pointer-events-none">
                  <span className="w-1.5 h-1.5 bg-luxury-gold-light rounded-full animate-pulse" />
                  <span>Em movimento</span>
                </div>

                {/* Rótulo inferior */}
                <div className="absolute bottom-4 left-5 right-5 z-10 flex items-center justify-between text-[11px] text-white/70 pointer-events-none">
                  <span className="font-semibold tracking-wide">Marcenaria Renovo</span>
                  <span className="font-mono text-luxury-gold-light">reel</span>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter />

      {/* FLOAT WHATSAPP CONVERSION CTA */}
      <WhatsAppFloat />

    </div>
  );
}
