import { Project } from '../types';
import { projectImages } from './media';

/**
 * Vitrine de projetos reais — cada projeto vira um painel do scroll horizontal.
 * A primeira imagem é a capa; as demais entram no crossfade automático.
 */
export const projects: Project[] = [
  {
    id: 'cozinha-ripado-ambar',
    title: 'Cozinha Ripado Âmbar',
    category: 'cozinhas',
    categoryLabel: 'Cozinha planejada',
    description:
      'Frentes em cinza acetinado, adega colmeia e ripado de madeira coroado por luz âmbar indireta. A bancada em granito preto absorve o dia a dia; a luz faz o resto.',
    images: [
      { src: projectImages.cozinhaRipado[0], alt: 'Cozinha planejada com armários cinza, ripado de madeira iluminado e adega colmeia' },
      { src: projectImages.cozinhaRipado[1], alt: 'Vista ampla da cozinha planejada integrada à varanda, com bancada em granito preto' },
      { src: projectImages.cozinhaRipado[2], alt: 'Cozinha planejada com torre de forno, ripado de madeira e iluminação âmbar embutida' },
      { src: projectImages.cozinhaRipado[3], alt: 'Detalhe do cooktop e micro-ondas embutidos na marcenaria cinza com adega colmeia' },
      { src: projectImages.cozinhaRipado[4], alt: 'Ângulo do forno embutido e bancada preta da cozinha planejada com ripado' },
    ],
    materials: ['MDF cinza acetinado', 'Ripado freijó', 'Granito São Gabriel', 'LED 2700K'],
    whatsappMessage:
      'Olá! Vi a Cozinha Ripado Âmbar no site da Marcenaria Silva e quero um projeto assim para a minha casa.',
  },
  {
    id: 'apartamento-completo',
    title: 'Apartamento Completo',
    category: 'residencial',
    categoryLabel: 'Residencial completo',
    description:
      'Um apartamento inteiro resolvido em marcenaria: cozinha, jantar, dormitório, banheiro e lavanderia falando a mesma língua, com cinza suave, linhas retas e cada centímetro aproveitado.',
    images: [
      { src: projectImages.apartamento.cozinha, alt: 'Cozinha planejada em cinza claro com bancada preta e mesa de jantar integrada' },
      { src: projectImages.apartamento.jantar[0], alt: 'Mesa de jantar oval preta com cadeiras em veludo cinza sob medida' },
      { src: projectImages.apartamento.dormitorio[0], alt: 'Guarda-roupa planejado com portas de correr abertas mostrando organização interna' },
      { src: projectImages.apartamento.banheiro, alt: 'Gabinete de banheiro suspenso em cinza com cuba branca e nicho embutido' },
      { src: projectImages.apartamento.lavanderia[0], alt: 'Armário de lavanderia planejado com porta-vassouras embutido' },
    ],
    materials: ['MDF cinza fendi', 'Portas de correr', 'Nichos iluminados', 'Ferragens soft-close'],
    whatsappMessage:
      'Olá! Vi o projeto Apartamento Completo no site da Marcenaria Silva e quero planejar os ambientes do meu imóvel.',
  },
  {
    id: 'estudio-beleza',
    title: 'Estúdio de Beleza',
    category: 'comercial',
    categoryLabel: 'Projeto comercial',
    description:
      'Recepção, bancadas de atendimento e apoio de café em branco com ripas de nogueira e metais dourados. Marcenaria comercial que recebe bem e fotografa melhor ainda.',
    images: [
      { src: projectImages.estudioBeleza.recepcao[0], alt: 'Balcão de recepção branco com ripas de madeira em estúdio de beleza' },
      { src: projectImages.estudioBeleza.manicure[0], alt: 'Mesa de manicure planejada com ripado de nogueira e expositor de esmaltes em arco dourado' },
      { src: projectImages.estudioBeleza.cafe, alt: 'Canto de café planejado com estrutura dourada e torre para purificador' },
      { src: projectImages.estudioBeleza.manicure[1], alt: 'Bancada de atendimento em L com ripado de madeira e cadeiras estofadas' },
      { src: projectImages.estudioBeleza.recepcao[1], alt: 'Vista interna do balcão de recepção planejado com mesa de apoio' },
    ],
    materials: ['MDF branco TX', 'Ripas de nogueira', 'Metalaria dourada', 'Bancadas de atendimento'],
    whatsappMessage:
      'Olá! Vi o Estúdio de Beleza no site da Marcenaria Silva e quero um projeto comercial para o meu negócio.',
  },
  {
    id: 'cozinha-classica',
    title: 'Cozinha Clássica Fendi',
    category: 'cozinhas',
    categoryLabel: 'Cozinha planejada',
    description:
      'Tons de fendi sobre porcelanato calacatta, bancada em granito preto e filetes de madeira aparente. Uma cozinha em L generosa, desenhada para render com pouca manutenção.',
    images: [
      { src: projectImages.cozinhaMarmore, alt: 'Cozinha planejada em L nas cores fendi e branco com bancada preta e revestimento marmorizado' },
    ],
    materials: ['MDF fendi', 'Granito preto', 'Bordas em freijó', 'Duas cubas inox'],
    whatsappMessage:
      'Olá! Vi a Cozinha Clássica Fendi no site da Marcenaria Silva e quero um orçamento para a minha cozinha.',
  },
  {
    id: 'otica-atendimento',
    title: 'Ótica · Balcão Central',
    category: 'comercial',
    categoryLabel: 'Projeto comercial',
    description:
      'Balcão de atendimento em U com carvalho claro e frisos brancos sobrepostos. Ponto focal da loja, desenhado para fluxo de clientes e caixa no mesmo gesto.',
    images: [
      { src: projectImages.oticaBalcao, alt: 'Balcão de atendimento em U com madeira clara e frisos brancos em loja de ótica' },
    ],
    materials: ['MDF carvalho claro', 'Frisos laqueados', 'Tampo contínuo', 'Painel de marca'],
    whatsappMessage:
      'Olá! Vi o balcão da ótica no site da Marcenaria Silva e quero um projeto para a minha loja.',
  },
  {
    id: 'cozinha-madeira',
    title: 'Cozinha Linear Amêndoa',
    category: 'cozinhas',
    categoryLabel: 'Cozinha planejada',
    description:
      'Marcenaria em tom amêndoa com puxadores perfil preto e granito verde ubatuba. Um corredor de trabalho direto, honesto e feito para durar décadas.',
    images: [
      { src: projectImages.cozinhaRustica, alt: 'Bancada de cozinha linear em madeira tom amêndoa com granito escuro e cuba inox' },
    ],
    materials: ['MDF amêndoa', 'Granito ubatuba', 'Puxadores perfil', 'Módulos sob medida'],
    whatsappMessage:
      'Olá! Vi a Cozinha Linear Amêndoa no site da Marcenaria Silva e quero algo parecido no meu espaço.',
  },
];
