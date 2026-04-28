/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    cspNonce: string;
  }
}

interface ImportMetaEnv {
  readonly RESEND_API_KEY?: string;
  readonly LEADS_TO_EMAIL?: string;
  readonly LEADS_FROM_EMAIL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
