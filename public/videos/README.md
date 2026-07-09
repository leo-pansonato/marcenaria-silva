# Vídeos da landing

Coloque seus arquivos de vídeo **aqui dentro** desta pasta (`public/videos/`).

## Como "fazer upload" (é só copiar o arquivo pra cá)

No VS Code: arraste o arquivo do seu computador para esta pasta na barra lateral
(Explorer). Ou, no Explorador de Arquivos do Windows, copie e cole o `.mp4` aqui.

## Como referenciar no código

Tudo que está em `public/` é servido a partir da raiz do site. Então um arquivo
`public/videos/apresentacao.mp4` vira a URL `/videos/apresentacao.mp4`:

```tsx
<video
  src="/videos/apresentacao.mp4"
  poster="/videos/apresentacao-capa.jpg"  // opcional: imagem enquanto carrega
  controls
  playsInline
/>
```

Para vídeo de fundo (sem controles, tocando sozinho), precisa ser mudo:

```tsx
<video src="/videos/fundo.mp4" autoPlay muted loop playsInline />
```

## Dicas de formato e tamanho

- Formato: **MP4 (codec H.264 + áudio AAC)** - o mais compatível. `.webm` é opcional
  como versão extra mais leve.
- Tamanho: tente deixar cada vídeo abaixo de ~15–20 MB. Vídeos muito grandes deixam
  o site lento (arquivos em `public/` não são comprimidos pelo Next).
- Nomes: sem espaços nem acentos. Ex.: `apresentacao.mp4`, `cozinha-tour.mp4`.
- Vertical (celular) ou horizontal, tanto faz - só me avise a proporção.

## Muitos vídeos ou arquivos pesados?

Se forem vários vídeos longos/pesados, o ideal é hospedar fora (YouTube/Vimeo não
listado, Cloudflare Stream, etc.) e embutir. Me avise que eu explico esse caminho.
