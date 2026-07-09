'use client';

import { useRef, useState, type ReactNode } from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  /**
   * `ambient` = comporta como GIF: toca sozinho, em loop, mudo e sem controles
   * (não pode ser pausado). `click` = mostra o pôster + botão de play e só toca
   * ao clicar, com controles nativos (pode pausar).
   */
  mode?: 'ambient' | 'click';
  /** Classes extras aplicadas ao <video>. */
  className?: string;
  /** Info sobreposta (tag/título/descrição) exibida só antes de iniciar (modo click). */
  children?: ReactNode;
}

/**
 * Player de vídeo com dois modos. O elemento-pai deve ser `relative overflow-hidden`.
 */
export function VideoPlayer({
  src,
  poster,
  mode = 'click',
  className = '',
  children,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  // Modo ambiente: GIF vivo, sem interação possível.
  if (mode === 'ambient') {
    return (
      <video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
        tabIndex={-1}
        className={`h-full w-full object-cover pointer-events-none select-none ${className}`}
      />
    );
  }

  const start = () => {
    setStarted(true);
    videoRef.current?.play().catch(() => {
      /* autoplay bloqueado - controles nativos assumem */
    });
  };

  return (
    <>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        loop
        preload="metadata"
        controls={started}
        className={`h-full w-full object-cover ${className}`}
      />

      {!started && (
        <>
          {/* Alvo de clique em toda a área + vinheta + botão de play */}
          <button
            type="button"
            onClick={start}
            aria-label="Reproduzir vídeo"
            className="group/play absolute inset-0 z-20 flex cursor-pointer items-center justify-center"
          >
            <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 transition-colors duration-500 group-hover/play:from-black/90" />
            <span className="relative flex items-center justify-center">
              <span className="absolute -inset-4 rounded-full border-2 border-luxury-gold/50 opacity-30 animate-ping" />
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-luxury-gold bg-white/15 text-luxury-gold shadow-2xl backdrop-blur-md transition-all duration-500 group-hover/play:scale-110 group-hover/play:border-transparent group-hover/play:bg-luxury-gold group-hover/play:text-white sm:h-20 sm:w-20">
                <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" />
              </span>
            </span>
          </button>

          {/* Info (não bloqueia o clique) */}
          {children && (
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 p-5 sm:p-6">
              {children}
            </div>
          )}
        </>
      )}
    </>
  );
}
