import { ChevronsRight } from 'lucide-react';

interface SwipeHintProps {
  /** Texto curto da pílula. */
  label?: string;
  /** `dark` sobre fundos espresso, `light` sobre fundos cream. */
  tone?: 'dark' | 'light';
  className?: string;
}

/**
 * Dica de arraste para os carrosséis no mobile: uma pílula de vidro com o rótulo
 * e chevrons que "cutucam" para o lado. Puramente decorativa (aria-hidden) e some
 * a partir de `lg`, onde os trilhos viram scroll "pinned" ou ganham setas próprias.
 */
export function SwipeHint({ label = 'Arraste', tone = 'dark', className = '' }: SwipeHintProps) {
  const toneClasses = tone === 'light' ? 'glass-light text-espresso/70' : 'glass text-cream/75';
  const iconColor = tone === 'light' ? 'text-caramel' : 'text-gold';

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none inline-flex select-none items-center gap-2 rounded-full px-3.5 py-1.5 font-sans text-[0.6rem] font-semibold uppercase tracking-[0.2em] lg:hidden ${toneClasses} ${className}`}
    >
      {label}
      <ChevronsRight
        className={`h-4 w-4 motion-safe:animate-swipe-nudge ${iconColor}`}
        strokeWidth={2.2}
        aria-hidden="true"
      />
    </span>
  );
}
