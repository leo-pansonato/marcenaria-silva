import { ProcessStep } from '../types';

/** Jornada do projeto — alimenta o scrollytelling horizontal da seção Processo. */
export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Escuta',
    description:
      'Uma conversa longa antes de qualquer desenho. Entendemos rotina, medidas, manias e orçamento; o projeto nasce daí, não de um catálogo.',
  },
  {
    number: '02',
    title: 'Projeto 3D',
    description:
      'Você vê o ambiente pronto antes de existir: renderizações realistas, alternativas de layout e revisões até a assinatura.',
  },
  {
    number: '03',
    title: 'Materiais',
    description:
      'Especificação de chapas, lâminas, pedras e ferragens com amortecimento. Cada escolha documentada, sem surpresa no orçamento.',
  },
  {
    number: '04',
    title: 'Produção',
    description:
      'Corte de precisão milimétrica e montagem de bancada na nossa oficina. Máquina onde ela é melhor, mão onde ela é insubstituível.',
  },
  {
    number: '05',
    title: 'Instalação',
    description:
      'Equipe própria, obra protegida e limpeza final. Entregamos com regulagem fina de portas e gavetas, e garantia assinada.',
  },
];
