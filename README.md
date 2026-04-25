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
npm run dev
npm run check
npm run build
npm run start
```

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
