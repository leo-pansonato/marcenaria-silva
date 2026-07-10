/**
 * Mapa central de mídia — o ÚNICO arquivo que conhece nomes de arquivo.
 * Para trocar qualquer imagem ou vídeo do site, altere apenas este mapa.
 *
 * Imagens: src/assets/images/** (import estático ➜ width/height automáticos, sem CLS).
 * Vídeos:  public/videos/** (strings ➜ sempre servidas via asset() para suportar basePath).
 */
import logoMarca from '../assets/images/logo/logo-marcenaria-silva.jpg';
import identidadeRecepcao from '../assets/images/logo/identidade-visual-recepcao.jpg';

import cozinhaRipado01 from '../assets/images/projetos/cozinha-ripado-ambar-01.jpg';
import cozinhaRipado02 from '../assets/images/projetos/cozinha-ripado-ambar-02.jpg';
import cozinhaRipado03 from '../assets/images/projetos/cozinha-ripado-ambar-03.jpg';
import cozinhaRipado04 from '../assets/images/projetos/cozinha-ripado-ambar-04.jpg';
import cozinhaRipado05 from '../assets/images/projetos/cozinha-ripado-ambar-05.jpg';

import aptoCozinha01 from '../assets/images/projetos/apartamento-cozinha-01.jpg';
import aptoJantar01 from '../assets/images/projetos/apartamento-jantar-01.jpg';
import aptoJantar02 from '../assets/images/projetos/apartamento-jantar-02.jpg';
import aptoDormitorio01 from '../assets/images/projetos/apartamento-dormitorio-01.jpg';
import aptoDormitorio02 from '../assets/images/projetos/apartamento-dormitorio-02.jpg';
import aptoDormitorio03 from '../assets/images/projetos/apartamento-dormitorio-03.jpg';
import aptoBanheiro01 from '../assets/images/projetos/apartamento-banheiro-01.jpg';
import aptoLavanderia01 from '../assets/images/projetos/apartamento-lavanderia-01.jpg';
import aptoLavanderia02 from '../assets/images/projetos/apartamento-lavanderia-02.jpg';

import estudioRecepcao01 from '../assets/images/projetos/estudio-beleza-recepcao-01.jpg';
import estudioRecepcao02 from '../assets/images/projetos/estudio-beleza-recepcao-02.jpg';
import estudioManicure01 from '../assets/images/projetos/estudio-beleza-manicure-01.jpg';
import estudioManicure02 from '../assets/images/projetos/estudio-beleza-manicure-02.jpg';
import estudioSala01 from '../assets/images/projetos/estudio-beleza-sala-01.jpg';
import estudioCafe01 from '../assets/images/projetos/estudio-beleza-cafe-01.jpg';

import cozinhaMarmore01 from '../assets/images/projetos/cozinha-marmore-01.jpg';
import cozinhaRustica01 from '../assets/images/projetos/cozinha-rustica-01.jpg';
import oticaBalcao01 from '../assets/images/projetos/otica-balcao-01.jpg';

export const brandImages = {
  /** Logo oficial sobre fundo espresso (também usada como imagem OG). */
  logo: logoMarca,
  /** Mockup da identidade visual aplicada em recepção — usada no manifesto. */
  identidade: identidadeRecepcao,
} as const;

export const projectImages = {
  cozinhaRipado: [cozinhaRipado01, cozinhaRipado02, cozinhaRipado03, cozinhaRipado04, cozinhaRipado05],
  apartamento: {
    cozinha: aptoCozinha01,
    jantar: [aptoJantar01, aptoJantar02],
    dormitorio: [aptoDormitorio01, aptoDormitorio02, aptoDormitorio03],
    banheiro: aptoBanheiro01,
    lavanderia: [aptoLavanderia01, aptoLavanderia02],
  },
  estudioBeleza: {
    recepcao: [estudioRecepcao01, estudioRecepcao02],
    manicure: [estudioManicure01, estudioManicure02],
    sala: estudioSala01,
    cafe: estudioCafe01,
  },
  cozinhaMarmore: cozinhaMarmore01,
  cozinhaRustica: cozinhaRustica01,
  oticaBalcao: oticaBalcao01,
} as const;

/**
 * Reels verticais (9:16) em /public/videos.
 * Sem metadados de conteúdo disponíveis, o mapeamento por papel foi feito por
 * duração/peso — se algum reel não combinar com o slot, troque apenas aqui.
 */
export const videoPaths = {
  /** Fundo do hero (o reel mais longo). */
  hero: '/videos/hero-reel.mp4',
  /** Painel de vídeo na vitrine horizontal de projetos. */
  filme: '/videos/filme-marcenaria.mp4',
  /** Loops de ambiente usados nas seções de processo/manifesto. */
  ambiente: [
    '/videos/reel-ambiente-01.mp4',
    '/videos/reel-ambiente-02.mp4',
    '/videos/reel-ambiente-03.mp4',
  ],
} as const;
