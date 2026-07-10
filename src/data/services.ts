import { Service } from '../types';

/** Serviços exibidos no carrossel. Textos curtos e diretos, sem enrolação. */
export const services: Service[] = [
  {
    id: 'cozinhas',
    number: '01',
    title: 'Cozinhas planejadas',
    description:
      'Ilhas, torres quentes e bancadas desenhadas para o seu jeito de cozinhar e render.',
    icon: 'CookingPot',
    featured: true,
  },
  {
    id: 'dormitorios',
    number: '02',
    title: 'Dormitórios & closets',
    description:
      'Guarda-roupas e closets com interiores que organizam a rotina sem esforço.',
    icon: 'BedDouble',
  },
  {
    id: 'paineis',
    number: '03',
    title: 'Painéis & ripados',
    description:
      'Ripados com luz indireta e painéis que dão profundidade a qualquer parede.',
    icon: 'AlignVerticalJustifyCenter',
  },
  {
    id: 'banheiros',
    number: '04',
    title: 'Banheiros & lavanderias',
    description:
      'Gabinetes suspensos e nichos sob medida que escondem o trabalho e mostram o acabamento.',
    icon: 'Droplets',
  },
  {
    id: 'comercial',
    number: '05',
    title: 'Ambientes comerciais',
    description:
      'Recepções, balcões e bancadas que carregam a identidade da sua marca.',
    icon: 'Store',
    featured: true,
  },
  {
    id: 'arquitetos',
    number: '06',
    title: 'Execução para arquitetos',
    description:
      'Levamos o seu detalhamento à bancada com rigor de fábrica, prazo claro e obra limpa.',
    icon: 'DraftingCompass',
  },
];
