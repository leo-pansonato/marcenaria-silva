/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Project, ProcessStep, PortfolioVideo } from './types';
import { asset } from './lib/site';

// Imagens do portfólio (fornecidas pelo cliente).
import cozinhaNoite from './assets/images/cozinha-showroom-noite.jpg';
import painelRipado from './assets/images/painel-ripado-madeira.jpg';
import cozinhaCompacta from './assets/images/cozinha-compacta.jpg';
import dormitorioArmarios from './assets/images/dormitorio-armarios.jpg';
import homeOfficeEames from './assets/images/home-office-eames-amarelo.jpg';
import homeOfficeRipado from './assets/images/home-office-ripado-cinza.jpg';
import gourmetChurrasqueira from './assets/images/gourmet-churrasqueira.jpg';

// Novas fotos reais de projetos (adicionadas pelo cliente) - preenchem os
// espaços que antes ficavam sem imagem.
import novoDormitorioRose from './assets/images/snapinsta.com.br-6a4a8dd5ecdd2.jpg';
import novoPainelRipado from './assets/images/snapinsta.com.br-6a4a8dd19da9e.jpg';
import novaCozinhaGreige from './assets/images/snapinsta.com.br-6a4a8dda3ecad.jpg';

export const projects: Project[] = [
  {
    id: 'proj-1',
    title: 'Cozinha Provençal Marítimo',
    description: 'Armários sob medida em laca fosca azul-provençal com tampos em mármore Carrara e puxadores esculpidos em metal dourado champanhe.',
    category: 'cozinhas',
    categoryLabel: 'Cozinhas Gourmet',
    image: cozinhaNoite,
    specs: {
      materials: ['MDF Naval Hidrófugo', 'Mármore Carrara', 'Puxadores Champagne'],
      finishes: ['Laca Microtexturizada Fosca', 'Bordas Usinadas'],
      location: ''
    }
  },
  {
    id: 'proj-2',
    title: 'Painel Integrado Industrial',
    description: 'Home theater premium com painel ripado em carvalho europeu natural e prateleiras estruturadas em aço carbono fosco escovado.',
    category: 'salas',
    categoryLabel: 'Salas & Painéis',
    image: painelRipado,
    specs: {
      materials: ['Carvalho Europeu Natural', 'Aço Carbono Microtexturizado'],
      finishes: ['Verniz Poliuretano Acetinado', 'Ripado Hand-cut'],
      location: ''
    }
  },
  {
    id: 'proj-3',
    title: 'Espaço Gourmet Nogueira',
    description: 'Cozinha de luxo integrada em madeira nogueira premium com ilha em mármore nero e mesa de jantar acoplada em prancha maciça.',
    category: 'cozinhas',
    categoryLabel: 'Cozinhas Gourmet',
    image: cozinhaCompacta,
    specs: {
      materials: ['Nogueira Maciça & Carvalho', 'Granito Escovado', 'Metais Bronze'],
      finishes: ['Seladora Artesanal Atóxica', 'Encaixes Tradicionais'],
      location: ''
    }
  },
  {
    id: 'proj-4',
    title: 'Dormitório Master Laca',
    description: 'Móveis suspensos integrados com armários em laca branca texturizada e painéis acolhedores com iluminação LED embutida quente.',
    category: 'dormitorios',
    categoryLabel: 'Dormitórios',
    image: dormitorioArmarios,
    specs: {
      materials: ['MDF High Standard', 'Vidro Reflecta Ambar', 'Perfis Champagne'],
      finishes: ['Laca Acetinada Premium', 'Fitas LED 2700K Inteligentes'],
      location: ''
    }
  },
  {
    id: 'proj-5',
    title: 'Studio Creative & Eames',
    description: 'Bancada suspensa com gaveteiro planejado, prateleiras flutuantes e painel retroiluminado. Detalhes de cor com as icônicas cadeiras Eames amarelas.',
    category: 'office',
    categoryLabel: 'Home Office',
    image: homeOfficeEames,
    specs: {
      materials: ['MDF Laca Branca', 'Estrutura Suspensa Oculta'],
      finishes: ['Acabamento High Gloss', 'Fita de LED Indireta Inteligente'],
      location: ''
    }
  },
  {
    // Espaço antes sem foto - agora preenchido com um dormitório real do cliente.
    id: 'proj-6',
    title: 'Dormitório Planejado Rosé',
    description: 'Dormitório sob medida com armários aéreos, nicho central iluminado, cabeceira integrada e bancada de estudos - tudo harmonizado em delicados tons rosé.',
    category: 'dormitorios',
    categoryLabel: 'Dormitórios',
    image: novoDormitorioRose,
    specs: {
      materials: ['MDF Rosé Fosco', 'Nicho Amadeirado', 'Perfis de Alumínio'],
      finishes: ['Baixo Fosco Aveludado', 'Iluminação LED Embutida'],
      location: ''
    }
  }
];

// Grade secundária de inspirações - cards limpos, descrição curta, sem localização.
export const secondaryProjects: Project[] = [
  {
    // Espaço antes sem foto - agora um painel ripado real do cliente.
    id: 'sec-1',
    title: 'Painel Ripado Champagne',
    description: 'Painel ripado sob medida em laca branca com puxadores verticais champagne, criando profundidade e sofisticação ao ambiente.',
    category: 'salas',
    categoryLabel: 'Salas & Painéis',
    image: novoPainelRipado,
    specs: {
      materials: ['MDF Ripado Laca Branca', 'Puxadores Champagne'],
      finishes: ['Laca Fosca', 'Ripado Vertical'],
      location: ''
    }
  },
  {
    id: 'sec-2',
    title: 'Home Office Ateliê',
    description: 'Workspace moderno com mesa flutuante em madeira maciça e painéis ripados.',
    category: 'office',
    categoryLabel: 'Home Office',
    image: homeOfficeRipado,
    specs: {
      materials: ['MDF Ripado', 'Madeira Maciça'],
      finishes: ['Verniz Acetinado'],
      location: ''
    }
  },
  {
    // Espaço antes sem foto - agora uma cozinha real do cliente.
    id: 'sec-3',
    title: 'Cozinha Greige Compacta',
    description: 'Cozinha planejada com superiores em branco e inferiores em greige, puxadores concha e ampla bancada de trabalho.',
    category: 'cozinhas',
    categoryLabel: 'Cozinhas',
    image: novaCozinhaGreige,
    specs: {
      materials: ['MDF Branco & Greige', 'Puxadores Concha'],
      finishes: ['Portas Perfil Shaker', 'Tampo em Nanoglass'],
      location: ''
    }
  },
  {
    id: 'sec-4',
    title: 'Gourmet Balcony Bar',
    description: 'Área externa de alto padrão integrada com armários navais em teca natural.',
    category: 'cozinhas',
    categoryLabel: 'Cozinhas Gourmet',
    image: gourmetChurrasqueira,
    specs: {
      materials: ['MDF Naval', 'Teca Maciça'],
      finishes: ['Verniz Marítimo'],
      location: ''
    }
  }
];

// Vídeos do portfólio (verticais). Os 2 melhores ficam na home como GIF vivo;
// estes 5 vão para a página /portfolio e tocam apenas ao clicar.
const rawPortfolioVideos: PortfolioVideo[] = [
  {
    id: 'vid-1',
    src: '/videos/snapinsta.com.br-6a4a8c5406366.mp4',
    poster: '/videos/posters/snapinsta.com.br-6a4a8c5406366.jpg',
    title: 'Projetos Premium em Destaque',
    categoryLabel: 'Assinatura Renovo',
    description: 'Um panorama do padrão Renovo: ambientes personalizados com acabamento sofisticado e alto brilho.',
    duration: '0:20'
  },
  {
    id: 'vid-2',
    src: '/videos/snapinsta.com.br-6a4a8c4fe4794.mp4',
    poster: '/videos/posters/snapinsta.com.br-6a4a8c4fe4794.jpg',
    title: 'Espaço Kids Sob Medida',
    categoryLabel: 'Ambientes Lúdicos',
    description: 'Brinquedoteca com escorregador integrado - marcenaria segura, divertida e cheia de personalidade.',
    duration: '0:38'
  },
  {
    id: 'vid-3',
    src: '/videos/snapinsta.com.br-6a4a8c52112f2.mp4',
    poster: '/videos/posters/snapinsta.com.br-6a4a8c52112f2.jpg',
    title: 'Bastidores da Montagem',
    categoryLabel: 'Nosso Processo',
    description: 'Nossa equipe executando a instalação milimétrica de um projeto planejado, no detalhe.',
    duration: '0:24'
  },
  {
    id: 'vid-4',
    src: '/videos/snapinsta.com.br-6a4a8c5b40d2d.mp4',
    poster: '/videos/posters/snapinsta.com.br-6a4a8c5b40d2d.jpg',
    title: 'Transformação: Antes & Depois',
    categoryLabel: 'Antes & Depois',
    description: 'A metamorfose de um ambiente com marcenaria planejada, vidro e iluminação embutida.',
    duration: '0:55'
  },
  {
    id: 'vid-5',
    src: '/videos/snapinsta.com.br-6a4a8c817a88e.mp4',
    poster: '/videos/posters/snapinsta.com.br-6a4a8c817a88e.jpg',
    title: 'Guarda-Roupa Planejado',
    categoryLabel: 'Dormitórios',
    description: 'Detalhes internos de um guarda-roupa sob medida com organização inteligente e acabamento impecável.',
    duration: '0:24'
  }
];

// Prefixa os caminhos de /public (vídeos e posters) com o basePath de publicação
// (necessário no GitHub Pages, onde o site vive sob /marcenaria-renovo).
export const portfolioVideos: PortfolioVideo[] = rawPortfolioVideos.map((v) => ({
  ...v,
  src: asset(v.src),
  poster: asset(v.poster),
}));

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Consultoria e Briefing',
    description: 'Alinhamos seus desejos, necessidades e referências arquitetônicas em uma conversa inicial detalhada.'
  },
  {
    number: '02',
    title: 'Desenho & Projeto 3D',
    description: 'Apresentamos soluções inteligentes de ergonomia e layout com renderizações 3D realistas de cada ambiente.'
  },
  {
    number: '03',
    title: 'Seleção de Matérias-Primas',
    description: 'Escolha refinada de madeiras nobres, laminados italianos, lacas de alta durabilidade e ferragens com amortecimento.'
  },
  {
    number: '04',
    title: 'Produção Artesanal',
    description: 'Nossos mestres marceneiros fabricam suas peças combinando maquinário de alta precisão e acabamento manual artesanal.'
  },
  {
    number: '05',
    title: 'Montagem de Elite',
    description: 'Equipe própria altamente treinada executa a instalação silenciosa, com limpeza rigorosa e respeito ao seu lar.'
  }
];

export const values = [
  {
    title: 'Madeiras de Origem',
    description: 'Trabalhamos exclusivamente com fornecedores certificados que possuem selo de manejo florestal responsável.',
    icon: 'Trees'
  },
  {
    title: 'Acabamentos Nobres',
    description: 'Lacas importadas, revestimentos resistentes e polimento artesanal que garantem durabilidade vitalícia.',
    icon: 'Sparkles'
  },
  {
    title: 'Ferragens Austríacas',
    description: 'Sistemas Blum com amortecimento pneumático integrado e corrediças ocultas para suavidade silenciosa.',
    icon: 'Hammer'
  },
  {
    title: 'Pontualidade Britânica',
    description: 'Cronograma rigorosamente cumprido com acompanhamento semanal da produção em tempo real por Whatsapp.',
    icon: 'CalendarClock'
  }
];
