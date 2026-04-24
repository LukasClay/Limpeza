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
