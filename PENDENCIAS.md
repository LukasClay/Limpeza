# Pendencias do projeto

Roadmap vivo de tudo que ainda falta para o site sair do "em desenvolvimento" e virar uma maquina de gerar orcamento. Atualizar conforme tarefas forem concluidas.

> Convencao: `[ ]` pendente, `[x]` concluido, `[~]` em andamento.

---

## 1. Setup externo (depende de voce / do dono)

### Resend (envio de emails do formulario)
- [ ] Criar conta em https://resend.com (free tier: 3.000 emails/mes, 100/dia)
- [ ] Gerar API key e salvar em local seguro
- [ ] Configurar variavel `RESEND_API_KEY` no Railway
- [ ] (Opcional) Configurar `LEADS_TO_EMAIL` no Railway se quiser email diferente do default
- [ ] Verificar dominio proprio no Resend para enviar como `noreply@allprocleaning.com` (substitui o `onboarding@resend.dev` atual). Sem dominio verificado funciona, mas o "from" sera o do Resend
- [ ] Apos verificar dominio, atualizar `LEADS_FROM_EMAIL` no Railway

> **Status atual:** sem a key, o endpoint `/api/quote` ainda funciona — o lead cai no log do servidor e o usuario e direcionado para o WhatsApp pre-preenchido.

### WhatsApp Business
- [ ] Confirmar que `(617) 955-4047` esta ativo no WhatsApp e responde
- [ ] (Recomendado) Migrar para WhatsApp Business com mensagem de saudacao automatica
- [ ] (Recomendado) Configurar respostas rapidas para perguntas comuns

### Dominio e hospedagem
- [ ] Confirmar dominio definitivo (atualmente o codigo usa `https://allprocleaning.com` em `SITE_URL`, `og:url`, JSON-LD, robots.txt, astro.config)
- [ ] Se mudar de dominio, atualizar:
  - `SITE_URL` em `src/data/brand.ts`
  - `site` em `astro.config.mjs`
  - `Sitemap:` em `public/robots.txt`
- [ ] Configurar DNS apontando para Railway
- [ ] Habilitar HTTPS (Railway faz automatico)
- [ ] Verificar dominio no Google Search Console
- [ ] Submeter sitemap no Search Console (`/sitemap-index.xml` agora funciona)

### Conteudo e prova social
- [ ] Coletar 3-5 reviews reais (Google/Facebook/Instagram) com nome, cidade e texto
- [ ] Pedir autorizacao por escrito para usar o nome do cliente no site
- [ ] Tirar 6-10 fotos antes/depois reais (mesmo angulo, boa luz, sem identificar a casa do cliente)
- [ ] **Revisar lista de cidades atendidas** em `src/data/site.ts` (campo `serviceCities`) — atualmente lista as 16 maiores de MA como placeholder
- [ ] Confirmar se a empresa oferece **garantia explicita** (ex.: "re-clean gratis se nao gostar em 24h")
- [ ] Confirmar dados de prova social: anos no mercado, n. de clientes, n. de funcionarios

### Marketing / analytics
- [ ] Decidir ferramenta de analytics: GA4, Plausible ou Meta Pixel
- [ ] Configurar conta e adicionar ID nas variaveis de ambiente
- [ ] Configurar eventos de conversao: clique em telefone, clique em WhatsApp, submit do formulario
- [ ] Configurar Google Business Profile (nao confundir com Search Console) com fotos e reviews
- [ ] Avaliar Meta Ads / Google Ads para captacao paga apos o site estar em ar

### Identidade visual
- [ ] Gerar `apple-touch-icon.png` (180x180) — atualmente so existe `favicon.svg`
- [ ] Gerar `og-image.jpg` dedicado (1200x630, ~150KB) — atualmente reaproveita `hero-cleaning.png` (1.4MB, pesado para preview)
- [ ] Logo em SVG transparente (atualmente usa PNG com `mix-blend-multiply` no header — fragil)

### Legal
- [x] **Politica de Privacidade** boilerplate em `/privacy` (2026-04-25)
- [ ] **Aprovar/revisar** o texto da Politica de Privacidade ja publicado em `src/pages/privacy.astro`
- [ ] (Opcional) Termos de Servico
- [ ] Confirmar se a empresa tem **LLC ou Inc.** registrada (impacta o copy "fully insured")
- [ ] Confirmar tipo de seguro real (general liability? bonded?)
- [ ] Atualizar `lastUpdated` em `src/pages/privacy.astro` quando alterar a politica

---

## 2. Decisoes pendentes (precisa de voce)

- [ ] Site sera **bilingue EN/PT**? (Massachusetts tem grande publico luso/brasileiro — pode ser diferencial real)
- [ ] Vai expor **faixa de preco** ("a partir de $X")? Recomendado para reduzir fricca.
- [ ] Quais **cidades** listar como area de atendimento?
- [ ] Existe **garantia formal**? Se sim, qual?
- [ ] Tem **horario de funcionamento** definido? (ajuda no JSON-LD e no copy "responde em 1h")
- [ ] Tem **redes sociais** alem do Instagram? (Facebook, Google Business, Yelp, etc.)
- [ ] Aceita **pagamento online**? Stripe? Zelle? Cash only?
- [ ] **Tagline final:** manter "Not just clean. ALL PRO clean." ou testar variantes?

---

## 3. Divida tecnica do codigo

### Arquitetura
- [x] Quebrar `src/pages/index.astro` em componentes (2026-04-25):
  - `src/components/layout/Header.astro`
  - `src/components/layout/Footer.astro`
  - `src/components/sections/Hero.astro`
  - `src/components/sections/TrustBar.astro`
  - `src/components/sections/Services.astro`
  - `src/components/sections/Statement.astro`
  - `src/components/sections/About.astro`
  - `src/components/sections/WhyUs.astro`
  - `src/components/sections/ServiceArea.astro`
  - `src/components/sections/Faq.astro`
  - `src/components/sections/Contact.astro`
  - `src/components/ui/MobileCTA.astro`
  - `src/components/ui/Icon.astro`
  - `src/layouts/BaseLayout.astro`
- [x] Mover `iconPaths` para `src/lib/icons.ts` (com tipo `IconName`)
- [x] Mover dados (`services`, `serviceOptions`, `trustBar`, etc.) para `src/data/site.ts`
- [x] Mover `brand` + `SITE_URL` para `src/data/brand.ts`
- [x] Mover helpers WhatsApp para `src/lib/whatsapp.ts`

### Tailwind v4
- [x] Migrar cores para `@theme` em `global.css` (2026-04-25)
- [x] Substituir hex literais (`#0B1F33`, etc.) por classes nomeadas (`bg-navy`, `text-green`)
- [x] Eliminar duplicacao com `:root` CSS vars

### UX / animacao
- [x] `IntersectionObserver` para classe `.reveal` (2026-04-25) — script no `BaseLayout`
- [x] Stagger correto via `--reveal-delay` por elemento
- [x] `scroll-padding-top` proporcional ao header (`var(--header-h)` / `var(--header-h-md)`)
- [x] Classe `.hover-lift` neutralizada via `@media (hover: none)` no mobile

### Mobile / acessibilidade
- [x] Mobile menu (`<details>`) auto-fechar (2026-04-25):
  - Ao clicar num link
  - Ao tocar fora
  - Ao pressionar Escape
- [ ] `aria-current` na navegacao quando o link aponta para a secao em viewport
- [ ] Verificar contraste WCAG AAA em todos os textos
- [ ] Testar com leitor de tela (VoiceOver / NVDA)
- [ ] Testar navegacao so com teclado

### SEO / paginas
- [x] Pagina 404 customizada (`src/pages/404.astro`) (2026-04-25)
- [x] Pagina de privacidade (`src/pages/privacy.astro`) linkada do formulario e footer
- [ ] (Opcional) Termos de servico (`src/pages/terms.astro`)
- [x] Instalar `@astrojs/sitemap` — gera `sitemap-index.xml` automaticamente (2026-04-25)
- [ ] Adicionar JSON-LD `BreadcrumbList` quando houver mais paginas
- [ ] (Opcional) `<link rel="alternate" hreflang>` se virar bilingue

### Performance
- [x] Migrar imagens para `astro:assets` (`<Picture>`) — gera AVIF/WebP automaticamente (2026-04-25)
- [ ] Self-host fontes Cinzel/Montserrat em `/public/fonts/` (elimina request ao Google Fonts)
- [ ] Pre-carregar (`<link rel="preload">`) a fonte usada no H1
- [ ] Comprimir `hero-cleaning.png` na fonte (atualmente PNG 1.4MB; o `<Picture>` ja serve AVIF/WebP otimizados, mas a origem ainda e pesada)
- [ ] Adicionar `loading="lazy"` em todas as imagens fora do fold (ja tem em algumas)
- [ ] Audit Lighthouse: alvo 95+ em todas as categorias
- [ ] Cache do `<Picture>` em SSR Node — primeira request gera, depois serve cache. Avaliar usar CDN (Cloudflare na frente do Railway)

### Seguranca
- [x] `src/middleware.ts` com headers basicos (2026-04-25):
  - `X-Content-Type-Options: nosniff`
  - `X-Frame-Options: DENY`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=()`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
- [ ] Adicionar `Content-Security-Policy` no middleware (precisa mapear todos os origins de fontes/scripts)
- [ ] Rate-limit do `/api/quote` hoje e em memoria (perdido em restart). Migrar para Redis/Upstash se volume crescer
- [ ] Adicionar reCAPTCHA v3 (invisivel) ou Cloudflare Turnstile no formulario (alem do honeypot atual)
- [ ] Testar com `securityheaders.com` apos deploy

### Tooling
- [ ] Adicionar script `lint` no `package.json` (Prettier + Astro plugin)
- [ ] Adicionar pre-commit hook (Husky ou simple-git-hooks) que roda `astro check`
- [ ] CI no GitHub Actions: rodar `astro check` e `astro build` em todo PR
- [ ] Configurar Renovate ou Dependabot para atualizacoes automaticas

---

## 4. Conteudo / secoes a adicionar

### Conversao / confianca
- [ ] **Beneficios** — secao com 4-6 cards (insured, trained team, eco products, free estimate, satisfaction guarantee, bilingual service)
- [ ] **Como Funciona** — virar secao propria com 4 passos visuais grandes (hoje esta inline no contato)
- [ ] **Antes / Depois** — galeria com slider ou grid (precisa fotos reais)
- [x] **FAQ** — 9 perguntas comuns em `src/data/site.ts` (`faqItems`) — generico, revisar (2026-04-25)
- [ ] **Garantia 100% Satisfacao** — selo visual + texto curto (depende de confirmacao do dono)
- [x] **Area de Atendimento** — secao com lista de cidades (2026-04-25). Falta confirmar lista real
- [ ] (Opcional) Mapa interativo na secao Area de Atendimento
- [ ] **Reviews reais** — substituir os trust cards atuais quando reviews chegarem
- [ ] **CTA final reforcado** — antes do footer, com 3 canais (WhatsApp, Call, Form) e prazo ("respondemos em 1h")

### Copy a reescrever (precisa aprovacao)
- [ ] Cards de servico — hoje sao poeticos ("A reliable rhythm…"), trocar por concretos ("Most popular plan. 2-3h on average. Same team when possible.")
- [ ] Eyebrows e microcopy ("Premium accessible", "ALL PRO Standard", "Fast next step") — algumas sao jargao de brand book sem valor pro cliente
- [ ] Statement do meio ("Clean spaces. Better living.") — substituir por prova social numerica quando tiver dados
- [ ] CTA do header — variar ("Free Quote" em vez de "Get Free Estimate" igual em 5 lugares)

---

## 5. Itens de QA antes de lancar

- [ ] Submeter formulario com Resend ativo de ponta a ponta (chega email? `Reply-To` funciona?)
- [ ] Clicar `wa.me` em iOS Safari, Android Chrome — abre WhatsApp app correto?
- [ ] Testar em iPhone SE (320px), iPhone 15, Pixel 8, iPad, Macbook 13", Desktop 1920px
- [ ] Lighthouse: Performance, Accessibility, SEO, Best Practices >= 90
- [ ] `securityheaders.com` >= grade A
- [ ] PageSpeed Insights mobile >= 90
- [ ] Validar JSON-LD em https://search.google.com/test/rich-results
- [ ] Compartilhar URL no WhatsApp e ver se a preview aparece com og:image
- [ ] Compartilhar no LinkedIn / Facebook idem
- [ ] Testar form com JS desativado — degrade gracioso? (hoje nao funciona sem JS, considerar fallback `action="/api/quote"` + redirect)
- [ ] Testar com adblocker ativo
- [ ] Verificar que `RESEND_API_KEY` nao vaza no client-side (so e usado em `/api/quote.ts`)
- [ ] Verificar logs do Railway por 1-2 dias para detectar abuso/bots

---

## 6. Decisoes ja tomadas (para historico)

- **Stack:** Astro 5 + Tailwind v4 + TypeScript strict + Node adapter (Railway) + `@astrojs/sitemap`
- **Idioma:** EN apenas (decisao do dono, 2026-04-25)
- **Fluxo de leads:** Form -> Resend (email com Reply-To) + botao "Continue on WhatsApp" no estado de sucesso. WhatsApp tambem como CTA direto em 5 lugares
- **Anti-spam:** honeypot + rate-limit 30s/IP + validacao server-side + checkbox de consentimento
- **Paleta:** navy `#0B1F33`, navy-soft `#07172A`, green `#2E7D32`, green-dark `#256628`, green-accent `#2EB872`, whatsapp `#25D366`, mist `#F4F7F8`, muted `#5F6B73`. Disponiveis como tokens Tailwind v4 (`bg-navy`, `text-green`, etc.)
- **Tipografia:** Cinzel (titulos) + Montserrat (corpo) — Google Fonts CDN por enquanto
- **Hover dos botoes verdes:** escurece (`hover:bg-green-dark`) — convencao
- **Estrutura de pastas:**
  - `src/data/` — dados estaticos (brand, services, FAQ, cities)
  - `src/lib/` — helpers (icons, whatsapp)
  - `src/components/layout/` — Header, Footer
  - `src/components/sections/` — secoes da home
  - `src/components/ui/` — Icon, MobileCTA
  - `src/layouts/` — BaseLayout (head + IntersectionObserver)
  - `src/pages/` — index, 404, privacy, api/quote
  - `src/middleware.ts` — security headers
- **Imagens:** `<Picture>` do `astro:assets` em hero e about; AVIF + WebP gerados em runtime SSR
