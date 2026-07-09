# Marcenaria Renovo - Landing Page

Landing page premium da **Marcenaria Renovo** (Jundiaí/SP) - móveis planejados e sob medida de alto padrão.

Stack: **Next.js 16 (App Router)** · **React 19** · **Tailwind CSS v4** · `motion` (animações) · `lucide-react` (ícones) · `lenis` (scroll suave).

## Rodar localmente

**Pré-requisitos:** Node.js 20.9+ (recomendado 22+).

1. Instalar dependências:
   ```bash
   npm install
   ```
2. Ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```
   App em http://localhost:3000

## Scripts

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento (porta 3000) |
| `npm run build` | Build de produção |
| `npm start` | Servir o build de produção (porta 3000) |
| `npm run typecheck` | Checagem de tipos (`tsc --noEmit`) |

## Estrutura

```
src/
  app/
    layout.tsx     # RootLayout, metadata, fontes (next/font)
    page.tsx       # Página (Client Component) com todas as seções
    globals.css    # Tailwind v4 (@theme) + estilos custom + Lenis
  data.ts          # Conteúdo dos projetos/portfólio
  types.ts         # Tipos
  assets/images/   # Imagens (importadas como módulos + next/image)
```
