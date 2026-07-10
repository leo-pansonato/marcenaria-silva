import { BRAND, navItems } from '../../lib/site';
import { BrandLogo } from '../ui/BrandLogo';
import { WhatsAppButton } from '../ui/WhatsAppButton';

/** Rodapé com navegação, contato e a marca d'água tipográfica da casa. */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-caramel/12 bg-espresso-deep pb-10 pt-14 lg:pt-16">
      {/* Marca d'água */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 -bottom-6 select-none text-center font-display text-[clamp(6rem,19vw,17rem)] font-semibold uppercase leading-none tracking-[0.04em] text-cream/4"
      >
        Silva
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[110rem] px-6 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Marca */}
          <div className="lg:col-span-5">
            <BrandLogo className="h-16 lg:h-[4.5rem]" />
            <p className="mt-7 max-w-sm font-sans text-sm leading-relaxed text-cream/60">
              {BRAND.description}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-caramel/30 px-4 py-1.5 font-sans text-[0.6rem] font-bold uppercase tracking-[0.22em] text-gold">
              Móveis planejados de alto padrão
            </span>
          </div>

          {/* Navegação */}
          <nav aria-label="Navegação do rodapé" className="lg:col-span-3">
            <h3 className="mb-5 font-sans text-[0.62rem] font-bold uppercase tracking-[0.28em] text-caramel">
              Navegue
            </h3>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-sans text-sm text-cream/70 transition-colors hover:text-gold"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div className="lg:col-span-4">
            <h3 className="mb-5 font-sans text-[0.62rem] font-bold uppercase tracking-[0.28em] text-caramel">
              Contato
            </h3>
            <ul className="space-y-3 font-sans text-sm text-cream/70">
              <li>
                <WhatsAppButton
                  variant="inline"
                  message="Olá! Cheguei pelo site da Marcenaria Silva e quero conversar sobre um projeto."
                  ariaLabel="Conversar no WhatsApp da Marcenaria Silva"
                >
                  {BRAND.phoneDisplay}
                </WhatsAppButton>
              </li>
              <li>
                <a
                  href={BRAND.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  Instagram · {BRAND.instagramHandle}
                </a>
              </li>
              <li>{BRAND.hours}</li>
              <li className="text-cream/50">{BRAND.serviceArea}</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-cream/8 pt-6 sm:flex-row sm:items-center">
          <p className="font-sans text-xs text-cream/45">
            © {new Date().getFullYear()} {BRAND.name} · todos os direitos reservados.
          </p>
          <p className="font-display text-xs italic text-cream/40">
            Feito sob medida, como tudo por aqui.
          </p>
        </div>
      </div>
    </footer>
  );
}
