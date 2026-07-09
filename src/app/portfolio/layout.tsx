import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Portfólio em Vídeo | Marcenaria Renovo',
  description:
    'Nossos projetos de marcenaria sob medida em movimento: cozinhas, dormitórios, painéis e ambientes lúdicos executados pela Marcenaria Renovo em Jundiaí/SP.',
};

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
