import type {NextConfig} from 'next';

/**
 * O site é 100% estático (todas as rotas são pré-renderizadas), então usamos o
 * `output: 'export'` para publicar como conteúdo estático - perfeito para o
 * GitHub Pages.
 *
 * O GitHub Pages de projeto serve em `usuario.github.io/marcenaria-renovo/`, ou
 * seja, sob um subcaminho. O `basePath`/`assetPrefix` só é aplicado quando a
 * variável `NEXT_PUBLIC_BASE_PATH` está definida (feito no workflow de deploy).
 * Localmente ela fica vazia, então `npm run dev` continua servindo na raiz `/`.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    // O otimizador de imagens do Next não roda em hospedagem estática.
    unoptimized: true,
  },
};

export default nextConfig;
