import type { Metadata, Viewport } from 'next';
import { Fraunces, Manrope } from 'next/font/google';
import './globals.css';
import { asset, BRAND, SITE_URL } from '../lib/site';

// Display serifada de alto contraste — voz artesanal da marca.
const fraunces = Fraunces({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-fraunces',
  display: 'swap',
});

// Sans geométrica limpa para corpo e interface.
const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
});

const title = 'Marcenaria Silva | Móveis Planejados de Alto Padrão';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description: BRAND.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: SITE_URL,
    siteName: BRAND.name,
    title,
    description: BRAND.description,
    images: [
      {
        url: asset('/og-marcenaria-silva.jpg'),
        width: 1080,
        height: 1080,
        alt: 'Logo da Marcenaria Silva · Móveis Planejados',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: BRAND.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#2C1B10',
  colorScheme: 'dark',
};

// Dados estruturados para busca local (rich results).
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: BRAND.name,
  description: BRAND.description,
  url: SITE_URL,
  image: `${SITE_URL}${asset('/og-marcenaria-silva.jpg')}`,
  areaServed: 'São Paulo, Brasil',
  priceRange: '$$$',
  sameAs: [BRAND.instagramUrl],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${fraunces.variable} ${manrope.variable}`}>
      <body>
        {children}
        <script
          type="application/ld+json"
          // Conteúdo 100% estático (constantes locais); escape defensivo de "<"
          // conforme recomendação da documentação do Next.js para JSON-LD.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
}
