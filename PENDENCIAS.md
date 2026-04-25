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
- [ ] Confirmar dominio definitivo (atualmente o codigo usa `https://allprocleaning.com` em `SITE_URL`, `og:url`, JSON-LD, robots.txt)
- [ ] Se mudar de dominio, atualizar `SITE_URL` em `src/pages/index.astro` e a `Sitemap:` em `public/robots.txt`
- [ ] Configurar DNS apontando para Railway
- [ ] Habilitar HTTPS (Railway faz automatico)
- [ ] Verificar dominio no Google Search Console
- [ ] Submeter sitemap no Search Console

### Conteudo e prova social
- [ ] Coletar 3-5 reviews reais (Google/Facebook/Instagram) com nome, cidade e texto
- [ ] Pedir autorizacao por escrito para usar o nome do cliente no site
- [ ] Tirar 6-10 fotos antes/depois reais (mesmo angulo, boa luz, sem identificar a casa do cliente)
- [ ] Listar cidades realmente atendidas em MA (atualmente o site so diz "Massachusetts")
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
- [ ] Gerar `og-image.jpg` dedicado (1200x630) — atualmente reaproveita `hero-cleaning.png`
- [ ] Logo em SVG transparente (atualmente usa PNG com `mix-blend-multiply` no header — fragil)

### Legal
- [ ] Aprovar texto da Politica de Privacidade (quando for criada)
- [ ] (Opcional) Termos de Servico
- [ ] Confirmar se a empresa tem **LLC ou Inc.** registrada (impacta o copy "fully insured")
- [ ] Confirmar tipo de seguro real (general liability? bonded?)

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
- [ ] Quebrar `src/pages/index.astro` (740+ linhas) em componentes:
  - `src/components/layout/Header.astro`
  - `src/components/layout/Footer.astro`
  - `src/components/sections/Hero.astro`
  - `src/components/sections/TrustBar.astro`
  - `src/components/sections/Services.astro`
  - `src/components/sections/About.astro`
  - `src/components/sections/WhyUs.astro`
  - `src/components/sections/Contact.astro`
  - `src/components/ui/MobileCTA.astro`
  - `src/components/ui/Icon.astro`
- [ ] Mover `iconPaths` para `src/lib/icons.ts`
- [ ] Mover dados (`services`, `serviceOptions`, `trustBar`, etc.) para `src/data/`
- [ ] Mover helpers WhatsApp para `src/lib/whatsapp.ts`

### Tailwind v4
- [ ] Migrar cores para `@theme` em `global.css`:
  ```css
  @theme {
    --color-navy: #0B1F33;
    --color-navy-soft: #07172A;
    --color-green: #2E7D32;
    --color-green-dark: #256628;
    --color-green-accent: #2EB872;
    --color-whatsapp: #25D366;
    --color-mist: #F4F7F8;
    --color-muted: #5F6B73;
  }
  ```
- [ ] Substituir todas as ocorrencias de hex literais (`#0B1F33`, etc.) por classes nomeadas (`bg-navy`, `text-green`)
- [ ] Eliminar duplicacao com `:root` CSS vars

### UX / animacao
- [ ] `IntersectionObserver` para classe `.reveal` (atualmente dispara no load — quebra o efeito quando o usuario rola)
- [ ] Stagger correto para todos os cards (atualmente so funciona pros 3 primeiros)
- [ ] `scroll-padding-top` proporcional ao header (`clamp(72px, 12vh, 88px)` em vez de `88px` fixo)
- [ ] `hover:` so dispara em dispositivos hover-capable: envolver com `@media (hover:hover)` para nao travar no mobile

### Mobile / acessibilidade
- [ ] Mobile menu (`<details>`) auto-fechar:
  - Ao clicar num link
  - Ao tocar fora
  - Ao pressionar Escape
- [ ] `aria-current` na navegacao quando o link aponta para a secao em viewport
- [ ] Verificar contraste WCAG AAA em todos os textos
- [ ] Testar com leitor de tela (VoiceOver / NVDA)
- [ ] Testar navegacao so com teclado

### SEO / paginas
- [ ] Pagina 404 customizada (`src/pages/404.astro`)
- [ ] Pagina de privacidade (`src/pages/privacy.astro`) linkada do formulario
- [ ] (Opcional) Termos de servico (`src/pages/terms.astro`)
- [ ] Instalar `@astrojs/sitemap` — gera sitemap.xml automaticamente
- [ ] Adicionar JSON-LD `BreadcrumbList` quando houver mais paginas
- [ ] (Opcional) `<link rel="alternate" hreflang>` se virar bilingue

### Performance
- [ ] Migrar imagens para `astro:assets` (`<Image>` ou `<Picture>`) — gera AVIF/WebP automaticamente
- [ ] Self-host fontes Cinzel/Montserrat em `/public/fonts/` (elimina request ao Google Fonts)
- [ ] Pre-carregar (`<link rel="preload">`) a fonte usada no H1
- [ ] Comprimir `hero-cleaning.png` (atualmente PNG, ideal e WebP/AVIF)
- [ ] Adicionar `loading="lazy"` em todas as imagens fora do fold (ja tem em algumas)
- [ ] Audit Lighthouse: alvo 95+ em todas as categorias

### Seguranca
- [ ] `src/middleware.ts` com headers basicos:
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `X-Frame-Options: DENY`
  - `Permissions-Policy: geolocation=(), camera=(), microphone=()`
  - CSP minima
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
- [ ] **FAQ** — 8-10 perguntas comuns:
  - Vocs trazem os produtos de limpeza?
  - Quanto tempo dura uma limpeza?
  - E seguro deixar a equipe na minha casa?
  - Como funciona o pagamento?
  - Posso cancelar ou remarcar?
  - Atendem area X?
  - Tenho pets, ha algum cuidado?
  - O que esta incluso na limpeza padrao?
  - Como sao calculados os precos?
  - Vocs oferecem produtos eco-friendly?
- [ ] **Garantia 100% Satisfacao** — selo visual + texto curto (depende de confirmacao do dono)
- [ ] **Area de Atendimento** — lista de cidades + (opcional) mapa
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

- **Stack:** Astro 5 + Tailwind v4 + TypeScript strict + Node adapter (Railway)
- **Idioma:** EN apenas (decisao do dono, 2026-04-25)
- **Fluxo de leads:** Form -> Resend (email com Reply-To) + botao "Continue on WhatsApp" no estado de sucesso. WhatsApp tambem como CTA direto em 5 lugares
- **Anti-spam:** honeypot + rate-limit 30s/IP + validacao server-side + checkbox de consentimento
- **Paleta:** navy `#0B1F33`, navy-soft `#07172A`, green `#2E7D32`, green-dark `#256628`, green-accent `#2EB872`, whatsapp `#25D366`, mist `#F4F7F8`, muted `#5F6B73`
- **Tipografia:** Cinzel (titulos) + Montserrat (corpo) — Google Fonts CDN por enquanto
- **Hover dos botoes verdes:** escurece (`hover:bg-[#256628]`) — convencao
