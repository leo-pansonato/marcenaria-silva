import Link from 'next/link';
import { CheckCircle2, MapPin } from 'lucide-react';
import { navItems } from '../lib/site';

/** Rodapé institucional compartilhado entre a home e o portfólio. */
export function SiteFooter() {
  return (
    <footer className="bg-noble-brown text-[#FAF9F6] py-16 px-6 lg:px-12 border-t border-luxury-gold-dark/35 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        {/* Marca */}
        <div className="md:col-span-5 flex flex-col items-start">
          <Link href="/" className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 border-2 border-luxury-gold flex items-center justify-center rounded-sm rotate-45">
              <span className="text-luxury-gold-light font-display font-extrabold text-lg -rotate-45 block">R</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-display font-bold tracking-widest text-[#FAF9F6]">RENOVO</span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-luxury-gold-light font-semibold">Marcenaria de Arte</span>
            </div>
          </Link>
          <p className="text-xs text-[#FAF9F6]/60 leading-relaxed max-w-sm mb-6">
            Móveis sob medida de alta marcenaria criados para gerar bem-estar, beleza e funcionalidade vitalícia para lares refinados de Jundiaí e região.
          </p>
          <span className="text-[11px] font-bold text-luxury-gold-light tracking-wide flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-luxury-gold-light" />
            <span>Garantia Nobre Contratual Estendida</span>
          </span>
        </div>

        {/* Navegação */}
        <div className="md:col-span-3">
          <h4 className="text-sm font-bold uppercase tracking-widest text-luxury-gold-light mb-6">Navegação</h4>
          <div className="grid grid-cols-2 gap-3 text-xs text-[#FAF9F6]/75">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#FAF9F6] hover:translate-x-1 transition-all"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Localização */}
        <div className="md:col-span-4">
          <h4 className="text-sm font-bold uppercase tracking-widest text-luxury-gold-light mb-6">Oficina em Jundiaí</h4>
          <p className="text-xs text-[#FAF9F6]/70 leading-relaxed mb-4">
            Av. Nove de Julho, 3500 - Sala 45 - Anhangabaú<br />
            Jundiaí - SP, 13208-002
          </p>
          <div className="flex items-center gap-1.5 text-xs text-luxury-gold-light font-semibold">
            <MapPin className="w-4 h-4" />
            <span>Jundiaí - SP</span>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-[#FAF9F6]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] text-[#FAF9F6]/40">
        <p>© {new Date().getFullYear()} Marcenaria Renovo Ltda. Todos os direitos reservados.</p>
        <p className="flex items-center gap-1.5">
          <span>Desenvolvido sob medida em Jundiaí/SP</span>
        </p>
      </div>
    </footer>
  );
}
