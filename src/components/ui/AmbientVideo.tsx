'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import { Play, Pause } from 'lucide-react';
import { asset } from '../../lib/site';

interface AmbientVideoProps {
  /** Caminho público do .mp4 (a partir de /public) — o basePath é aplicado aqui. */
  src: string;
  /** Poster estático (import). Camada-base sempre visível enquanto o vídeo carrega. */
  poster?: StaticImageData;
  /** Carrega o vídeo imediatamente (hero/LCP) em vez de esperar a visibilidade. */
  eager?: boolean;
  /** Legenda em itálico no rodapé (ex.: "A oficina, ao vivo."). */
  caption?: string;
  /** Rótulo acessível do conteúdo (ex.: "a oficina em movimento"). */
  label?: string;
  /** Overlays extras sobre o vídeo (badges). Ficam abaixo do controle de play. */
  children?: ReactNode;
  className?: string;
}

/**
 * Vídeo do portfólio em loop mudo. O poster é a camada-base (nunca há tela vazia)
 * e o vídeo faz fade por cima assim que tem o primeiro frame. Enquanto visível e
 * com movimento permitido, dá autoplay ambiente; em qualquer versão há um
 * **botão de play/pause funcional** por cima — essencial no mobile, onde o
 * autoplay costuma ser bloqueado, e para quem prefere menos movimento.
 */
export function AmbientVideo({
  src,
  poster,
  eager = false,
  caption,
  label = 'o vídeo',
  children,
  className = '',
}: AmbientVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Respeita quem pausou manualmente: não força retomada ao reentrar.
          if (!userPausedRef.current) {
            video.play().catch(() => {
              /* autoplay bloqueado: o poster + botão de play permanecem */
            });
          }
        } else {
          video.pause();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      userPausedRef.current = false;
      video.play().catch(() => {
        /* alguns navegadores bloqueiam até um gesto: mudo garante o play */
      });
    } else {
      userPausedRef.current = true;
      video.pause();
    }
  };

  return (
    <>
      {/* Camada de mídia (recebe o parallax do trilho horizontal no desktop) */}
      <div data-parallax className="absolute inset-0">
        {poster && (
          <Image
            src={poster}
            alt=""
            aria-hidden="true"
            fill
            priority={eager}
            sizes="100vw"
            className={`object-cover ${className}`}
          />
        )}
        <video
          ref={videoRef}
          src={asset(src)}
          poster={poster?.src}
          muted
          loop
          playsInline
          preload={eager ? 'auto' : 'metadata'}
          aria-label={label}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onCanPlay={(e) => e.currentTarget.classList.remove('opacity-0')}
          className={`relative h-full w-full object-cover opacity-0 transition-opacity duration-1000 ease-out ${className}`}
        />
      </div>

      {/* Gradiente de leitura + overlays passados pelo pai (não capturam clique) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-espresso-deep/85 via-transparent to-espresso/25"
      />
      {children}
      {caption && (
        <p className="pointer-events-none absolute inset-x-5 bottom-6 font-display text-lg font-medium italic text-cream sm:text-xl">
          {caption}
        </p>
      )}

      {/* Controle de reprodução — presente em todas as versões, sempre por cima */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? `Pausar ${label}` : `Reproduzir ${label}`}
        aria-pressed={isPlaying}
        className={`group/play absolute inset-0 z-10 flex items-center justify-center ${
          isPlaying ? 'cursor-default' : 'cursor-pointer'
        }`}
      >
        {/* Botão central grande — aparece quando o vídeo está parado */}
        <span
          className={`relative flex h-16 w-16 items-center justify-center transition-all duration-500 sm:h-20 sm:w-20 ${
            isPlaying ? 'scale-75 opacity-0' : 'scale-100 opacity-100'
          }`}
        >
          <span
            aria-hidden="true"
            className="glass absolute inset-0 rounded-full motion-safe:animate-play-ring"
          />
          <span className="glass relative flex h-full w-full items-center justify-center rounded-full text-cream transition-transform duration-300 group-hover/play:scale-105 group-active/play:scale-95">
            <Play className="ml-0.5 h-6 w-6 sm:h-7 sm:w-7" fill="currentColor" strokeWidth={0} aria-hidden="true" />
          </span>
        </span>

        {/* Controle discreto de pausa — aparece enquanto o vídeo toca */}
        <span
          className={`glass absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full text-cream transition-all duration-300 ${
            isPlaying ? 'opacity-80 group-hover/play:opacity-100' : 'pointer-events-none scale-90 opacity-0'
          }`}
        >
          <Pause className="h-4 w-4" fill="currentColor" strokeWidth={0} aria-hidden="true" />
        </span>
      </button>
    </>
  );
}
