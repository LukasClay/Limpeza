import { defineMiddleware } from "astro:middleware";

const STATIC_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), camera=(), microphone=(), payment=()",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
};

const buildCsp = (nonce: string) =>
  [
    "default-src 'self'",
    // Inline scripts (JSON-LD in <head>, form handler in Contact) carry a
    // per-request nonce. 'strict-dynamic' lets nonced scripts load other
    // scripts they trust without listing every origin here.
    `script-src 'self' 'nonce-${nonce}' 'strict-dynamic'`,
    // 'unsafe-inline' is still required because Astro injects scoped <style>
    // blocks at build time. Tightening tracked in PENDENCIAS.
    "style-src 'self' 'unsafe-inline'",
    "font-src 'self' data:",
    "img-src 'self' data: blob:",
    "connect-src 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

const generateNonce = (): string => {
  const bytes = new Uint8Array(16);
  crypto.getRandomValues(bytes);
  return btoa(String.fromCharCode(...bytes));
};

export const onRequest = defineMiddleware(async (context, next) => {
  const nonce = generateNonce();
  context.locals.cspNonce = nonce;

  const response = await next();

  for (const [name, value] of Object.entries(STATIC_HEADERS)) {
    if (!response.headers.has(name)) response.headers.set(name, value);
  }
  if (!response.headers.has("Content-Security-Policy")) {
    response.headers.set("Content-Security-Policy", buildCsp(nonce));
  }

  return response;
});
