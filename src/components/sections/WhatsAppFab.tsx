'use client';

import { useEffect, useState } from 'react';
import { WhatsAppButton } from '../ui/WhatsAppButton';

/**
 * Botão flutuante de WhatsApp (FAB): aparece depois que o usuário passa do
 * hero e fica fixo no canto inferior direito, com pulse sutil (desligado em
 * prefers-reduced-motion via `motion-safe`).
 */
export function WhatsAppFab() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-6 right-6 z-[85] transition-all duration-500 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <WhatsAppButton
        variant="floating"
        message="Olá! Estou navegando no site da Marcenaria Silva e quero tirar uma dúvida."
        ariaLabel="Abrir conversa no WhatsApp da Marcenaria Silva"
      />
    </div>
  );
}
