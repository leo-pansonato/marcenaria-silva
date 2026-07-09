# Redesign do Hero - referência Planhat

**Data:** 2026-07-05
**Escopo:** Somente a seção HERO (`src/app/page.tsx`, `#início`). Nav, demais seções e dados ficam intactos.

## Objetivo

Deixar a primeira seção mais **clean e premium**, inspirada no hero do Planhat
(coluna única, muito respiro, tipografia grotesca limpa, um CTA discreto), reduzindo
a quantidade de texto e removendo os elementos que dão "cara de IA".

## Decisões (aprovadas)

1. **Tipografia:** Hanken Grotesk, aplicada apenas no hero.
2. **Layout:** coluna única, alinhada à esquerda. Remove a coluna direita inteira.
3. **Estatísticas:** mantidas, porém discretas (filetes finos, sem dourado forte).
4. **CTA:** um único botão sóbrio; link do WhatsApp preservado (canal de conversão).

## Mudanças

### Tipografia (`src/app/layout.tsx` + `src/app/globals.css`)
- Importar `Hanken_Grotesk` via `next/font/google`, `variable: '--font-hanken'`,
  `display: 'swap'`, auto-hospedada (sem CDN).
- Adicionar a variável ao `<html>` className junto de jakarta/cormorant.
- Em `globals.css` `@theme`: `--font-grotesk: var(--font-hanken), ui-sans-serif, system-ui, sans-serif;`
  → habilita a utility `font-grotesk`, usada só dentro do hero.

### Hero (`src/app/page.tsx`, bloco `HERO SECTION`)
- **Fundo:** mesma imagem (`imgKitchenBlue`), overlay em **gradiente horizontal**
  (mais escuro à esquerda, imagem respira à direita) + leve vinheta inferior.
  Zoom de fundo mantido, porém sutil.
- **Coluna única** alinhada à esquerda, largura de texto limitada (~`max-w-3xl`),
  bastante respiro vertical.
- **Eyebrow:** texto puro em maiúsculas com tracking largo, sem badge/glass/✨:
  `MARCENARIA DE ALTO PADRÃO - JUNDIAÍ`.
- **Headline** (Hanken, peso médio, branco, sem trecho dourado itálico):
  "Marcenaria de alto padrão, sob medida para o seu lar."
- **Apoio** (1 frase):
  "Projetos autorais que unem a precisão da engenharia moderna ao refino do trabalho manual."
- **CTA único** sóbrio (off-white → dourado no hover) "Solicitar orçamento",
  ícone discreto, `href` = `buildWhatsAppLink()` mantido.
- **Estatísticas** discretas: linha com filetes finos, números em creme, rótulos
  minúsculos em maiúsculas; sem borda/dourado gritante.

### Removido do hero
- Coluna direita: moldura tracejada dourada, `Image` emoldurada, card de vidro
  "Qualidade Extrema", indicador de bússola girando.
- Segundo botão "Conhecer Portfólio", badge/pill do eyebrow.
- Animações "AI-ish": pulso verde (`animate-pulse-subtle`), brilho deslizante
  (`animate-shine`), bússola (`animate-spin-slow`), float do card.
- Mantido apenas: fade-in-up sutil na entrada + zoom lento do fundo.

## Fora de escopo
- Header/nav, blobs de fundo da página, e todas as seções abaixo do hero.
- Ícones agora não usados (`Compass`, `Award`, etc.) podem permanecer importados
  se ainda usados noutras seções; remover só os que ficarem órfãos.

## Critério de sucesso
- Hero em coluna única, minimalista, legível, sem elementos pulsantes/girando.
- `next build`/typecheck sem erros novos.
- Fonte Hanken Grotesk visível na headline do hero.
