import Image from 'next/image';
import logoSilva from '../../assets/images/logo/logo-silva.png';
import { BRAND } from '../../lib/site';

interface BrandLogoProps {
  /** Controla a altura da marca via classe utilitária (ex.: "h-11"). */
  className?: string;
  /** Prioriza o carregamento (uso no header, acima da dobra). */
  priority?: boolean;
}

/**
 * Marca oficial da Marcenaria Silva — a arte original, fiel em 100%, apenas com
 * o fundo repintado no espresso do site para integração perfeita (transparente
 * em relação ao restante da página).
 */
export function BrandLogo({ className = 'h-11', priority = false }: BrandLogoProps) {
  return (
    <Image
      src={logoSilva}
      alt={`${BRAND.name} · ${BRAND.tagline}`}
      priority={priority}
      sizes="240px"
      className={`w-auto ${className}`}
    />
  );
}
