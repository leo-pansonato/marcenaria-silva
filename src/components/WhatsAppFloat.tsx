import { Phone } from 'lucide-react';
import { buildWhatsAppLink } from '../lib/site';

/** Botão flutuante de conversão via WhatsApp (com ondas de ripple). */
export function WhatsAppFloat() {
  return (
    <div className="fixed bottom-[calc(1.5rem+env(safe-area-inset-bottom))] right-[calc(1.5rem+env(safe-area-inset-right))] z-45 flex items-center justify-center">
      <div className="absolute w-16 h-16 bg-emerald-500 rounded-full animate-ping opacity-25" />
      <div className="absolute w-20 h-20 bg-emerald-400 rounded-full animate-ping opacity-10" />
      <a
        href={buildWhatsAppLink()}
        target="_blank"
        rel="noreferrer"
        className="relative w-14 h-14 bg-emerald-500 hover:bg-emerald-600 rounded-full shadow-2xl flex items-center justify-center text-white transition-all duration-300 hover:scale-110 group cursor-pointer border border-emerald-400/20"
        aria-label="Falar pelo WhatsApp"
        id="whatsapp-floating-btn"
      >
        <Phone className="w-7 h-7 fill-white group-hover:rotate-12 transition-transform duration-300" />
      </a>
    </div>
  );
}
