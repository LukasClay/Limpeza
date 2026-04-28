# ALL PRO Cleaning Services Landing Page

Landing page para limpeza residencial e comercial criada com Astro, Tailwind CSS e TypeScript.

## Stack

- Astro
- Tailwind CSS
- TypeScript
- Adapter Node para deploy no Railway

## Comandos

```bash
npm install
npm run dev          # dev server
npm run check        # tsc + astro check
npm run build        # production build
npm run start        # roda o dist Node SSR
npm run fonts:fetch  # baixa Cinzel/Montserrat WOFF2 para /public/fonts
npm run assets:build # gera /public/og-image.jpg + apple-touch-icon.png a partir do hero/logo
```

> `fonts:fetch` e `assets:build` so precisam ser rodados quando voce trocar a fonte ou o hero/logo. Os arquivos gerados sao versionados no git.

## Deploy Railway

O projeto inclui `railway.json` com:

- Build command: `npm run build`
- Start command: `npm run start`
- Healthcheck path: `/`

O servidor Astro esta configurado para escutar em `0.0.0.0` e usar `process.env.PORT` quando disponivel.

## Variaveis de ambiente

O endpoint `/api/quote` envia o lead por email via Resend. Configure no Railway:

| Variavel | Obrigatoria | Descricao |
|---|---|---|
| `RESEND_API_KEY` | Sim (em producao) | API key do Resend (https://resend.com). Free tier: 3.000 emails/mes. |
| `LEADS_TO_EMAIL` | Nao | Email destino dos leads. Default: `allprocleaninginc1@gmail.com`. |
| `LEADS_FROM_EMAIL` | Nao | Remetente. Default: `ALL PRO Cleaning <onboarding@resend.dev>`. Quando o dominio proprio for verificado no Resend, troque para `noreply@allprocleaning.com`. |

Sem `RESEND_API_KEY` o endpoint ainda retorna sucesso (o lead aparece no log do servidor) e o usuario e direcionado para o WhatsApp pre-preenchido. Nenhum lead e perdido.

## Canais de contato

A landing page entrega o lead em multiplos canais:

1. **Formulario** -> `/api/quote` -> email via Resend (com `Reply-To` do cliente).
2. **Botao "Continue on WhatsApp"** apos sucesso do formulario, com mensagem ja preenchida.
3. **Botoes WhatsApp diretos** em header, hero, secao de contato, footer e barra mobile.
4. **Botao Call** com `tel:` em header, hero, secao de contato, footer e barra mobile.
5. **Fallback noscript:** o `<form>` tem `action="/api/quote"` e `method="POST"`. Sem JS, o submit vira um redirect para `/thanks` apos enviar o email.

## Estrutura de pastas

```
src/
  assets/         imagens otimizadas via astro:assets
  components/
    layout/       Header, Footer
    sections/     Hero, TrustBar, Services, Statement, About, WhyUs, ServiceArea, Faq, Contact
    ui/           Icon, MobileCTA
  data/           dados estaticos (brand, services, FAQ, cidades)
  layouts/        BaseLayout (head + IntersectionObserver para .reveal)
  lib/            helpers (icons, whatsapp)
  middleware.ts   security headers (CSP, HSTS, X-Frame-Options, ...)
  pages/
    index.astro
    privacy.astro
    thanks.astro
    404.astro
    api/quote.ts  endpoint POST (JSON ou form-encoded)
public/
  fonts/          Cinzel + Montserrat WOFF2 + fonts.css (gerados por scripts/fetch-fonts.mjs)
  brand/          logo
  favicon.svg, apple-touch-icon.png, og-image.jpg, robots.txt, hero-cleaning.png
scripts/
  fetch-fonts.mjs        baixa as fontes do Google Fonts e gera o CSS local
  build-static-assets.mjs gera og-image.jpg e apple-touch-icon.png via sharp
```

## CI

`.github/workflows/check.yml` roda `npm run check` e `npm run build` em cada PR e push para `main`.
