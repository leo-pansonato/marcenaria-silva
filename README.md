# Marcenaria Silva — Móveis Planejados de Alto Padrão

Site institucional **100% estático** (one-page) da Marcenaria Silva. Toda a
conversão acontece por links diretos de WhatsApp (`wa.me`) — sem back-end,
sem formulário, sem banco de dados.

Stack: **Next.js 16 (App Router, `output: export`)** · **React 19** ·
**Tailwind CSS v4** · **GSAP (ScrollTrigger + SplitText)** · **Lenis** ·
`motion` (micro-interações) · `lucide-react` (ícones).

## Rodar localmente

**Pré-requisitos:** Node.js 20.9+ (recomendado 22+).

```bash
npm install
npm run dev   # http://localhost:3000
```

| Script | Descrição |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build estático (gera `out/`) |
| `npm run typecheck` | Checagem de tipos |

## Antes de publicar — dados da empresa (EDITAR)

Tudo em **`src/lib/site.ts`**:

1. `WHATSAPP_NUMBER` — troque `55XXXXXXXXXXX` pelo número real (55 + DDD + número).
2. `SITE_URL` — URL pública final (repita em `public/robots.txt` e `public/sitemap.xml`).
3. `BRAND` — telefone de exibição, Instagram, horário e área de atuação.

Números do hero/estatísticas: `src/data/content.ts`. Depoimentos reais:
`src/data/testimonials.ts` (ambos marcados com `EDITAR`).

## Mídia

O mapa central é **`src/data/media.ts`** — nenhum outro arquivo conhece nomes
de arquivo. Imagens em `src/assets/images/{logo,projetos}/`, vídeos em
`public/videos/`. Para trocar/adicionar mídia, substitua o arquivo físico e
(“se mudar o nome”) atualize apenas o `media.ts`.

Os 5 reels verticais foram mapeados por papel (`hero-reel`, `filme-marcenaria`,
`reel-ambiente-01..03`); se algum vídeo não combinar com o slot, troque os
caminhos no `media.ts`.

## Estrutura

```
src/
  app/            # layout (fontes/SEO/JSON-LD), page, globals.css, favicon
  lib/            # site.ts (config única) · gsap.ts (plugins + eases)
  data/           # conteúdo em dados: media, projects, services, process, ...
  components/
    providers/    # SmoothScrollProvider (Lenis + GSAP em um ticker)
    ui/           # WhatsAppButton, BrandLogo, SplitTextReveal, AmbientVideo...
    sections/     # Hero, Manifesto, ProjectsShowcase (horizontal pinned),
                  # Services, ProcessTimeline, Testimonials, ContactCta, Footer
  hooks/          # useHorizontalPin, useRevealGroup
```

## Deploy (GitHub Pages)

Push na `master` dispara `.github/workflows/deploy.yml`: build estático com
`NEXT_PUBLIC_BASE_PATH=/<nome-do-repo>` (dinâmico) e publicação no Pages.

## Acessibilidade & performance

- `prefers-reduced-motion`: Lenis desativado, GSAP gated por `matchMedia`,
  marquees viram grade estática.
- Vídeos: `muted loop playsinline preload="metadata"`, tocam só quando visíveis.
- Mobile: seções horizontais viram carrossel nativo com scroll-snap (sem pin).
