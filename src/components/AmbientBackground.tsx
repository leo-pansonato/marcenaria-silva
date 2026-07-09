'use client';

import { motion } from 'motion/react';

/**
 * Blobs de vidro fluido flutuando ao fundo da página (dourado/marrom suave).
 * Camada decorativa, sem interação, sob todo o conteúdo (z-0).
 * Compartilhada entre a home e a página de portfólio para manter a atmosfera.
 */
export function AmbientBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Blob dourado suave 1 */}
      <motion.div
        className="absolute w-[45vw] h-[45vw] rounded-full bg-radial from-luxury-gold-light/20 via-transparent to-transparent -top-20 -left-20 filter blur-[80px] will-change-transform"
        animate={{ x: [0, 40, -20, 0], y: [0, -50, 30, 0], scale: [1, 1.1, 0.9, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blob marrom/bege 2 */}
      <motion.div
        className="absolute w-[50vw] h-[50vw] rounded-full bg-radial from-noble-brown-light/8 via-transparent to-transparent top-1/3 right-[-10vw] filter blur-[100px] will-change-transform"
        animate={{ x: [0, -30, 30, 0], y: [0, 60, -40, 0], scale: [1, 0.95, 1.05, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Blob dourado quente 3 */}
      <motion.div
        className="absolute w-[35vw] h-[35vw] rounded-full bg-radial from-amber-gold/8 via-transparent to-transparent bottom-10 left-[10vw] filter blur-[70px] will-change-transform"
        animate={{ x: [0, 30, -10, 0], y: [0, -30, 40, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
