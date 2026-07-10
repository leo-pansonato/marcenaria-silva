import { buildWhatsAppLink } from '../../lib/site';

type Variant = 'primary' | 'outline' | 'inline' | 'floating';

interface WhatsAppButtonProps {
  /** Mensagem pré-preenchida, contextual ao ponto da página. */
  message: string;
  children?: React.ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}

/** Glifo oficial do WhatsApp (path público da marca). */
export function WhatsAppIcon({ className = 'h-[1.15em] w-[1.15em]' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const variantClasses: Record<Variant, string> = {
  primary:
    'inline-flex items-center justify-center gap-2.5 rounded-full bg-caramel px-7 py-3.5 text-sm font-semibold tracking-wide text-espresso-deep shadow-[0_10px_30px_-10px_rgba(184,135,78,0.7)] transition-all duration-300 hover:bg-gold hover:shadow-[0_14px_36px_-10px_rgba(200,155,106,0.8)] hover:-translate-y-0.5 active:translate-y-0',
  outline:
    'inline-flex items-center justify-center gap-2.5 rounded-full border border-caramel/45 bg-transparent px-6 py-3 text-sm font-semibold tracking-wide text-cream transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-0.5',
  inline:
    'inline-flex items-center gap-2 text-sm font-semibold text-caramel underline-offset-4 transition-colors duration-300 hover:text-gold hover:underline',
  floating:
    'flex h-14 w-14 items-center justify-center rounded-full bg-caramel text-espresso-deep shadow-[0_12px_32px_-8px_rgba(0,0,0,0.55)] transition-transform duration-300 hover:scale-105 hover:bg-gold motion-safe:animate-fab-pulse',
};

/**
 * Único componente de conversão do site: todo CTA abre o WhatsApp da empresa
 * com mensagem contextual. Sem formulários, sem back-end.
 */
export function WhatsAppButton({
  message,
  children,
  variant = 'primary',
  className = '',
  ariaLabel,
}: WhatsAppButtonProps) {
  return (
    <a
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel ?? 'Conversar com a Marcenaria Silva no WhatsApp'}
      className={`${variantClasses[variant]} ${className}`}
    >
      <WhatsAppIcon />
      {children}
    </a>
  );
}
