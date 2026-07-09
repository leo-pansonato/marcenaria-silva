import type {Metadata, Viewport} from 'next';
import {Hanken_Grotesk} from 'next/font/google';
import './globals.css';

// Fonte única da landing (grotesca limpa, referência visual Planhat / LL Geigy Duplex),
// auto-hospedada via next/font - sem CDN externa e sem layout shift.
// Alimenta --font-sans / --font-display / --font-grotesk no @theme (ver globals.css).
const hanken = Hanken_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  style: ['normal', 'italic'],
  variable: '--font-hanken',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Marcenaria Renovo | Móveis Planejados de Alto Padrão',
  description:
    'Landing Page premium para a Marcenaria Renovo em Jundiaí, SP. Móveis planejados e sob medida de alto padrão, com acabamento artesanal de luxo.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#FAF9F6',
  colorScheme: 'light',
};

export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="pt-BR" className={hanken.variable}>
      <body>{children}</body>
    </html>
  );
}
