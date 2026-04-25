import type { APIRoute } from "astro";

export const prerender = false;

const TO_EMAIL = import.meta.env.LEADS_TO_EMAIL ?? "allprocleaninginc1@gmail.com";
const FROM_EMAIL = import.meta.env.LEADS_FROM_EMAIL ?? "ALL PRO Cleaning <onboarding@resend.dev>";
const RESEND_API_KEY = import.meta.env.RESEND_API_KEY;

const RATE_LIMIT_WINDOW_MS = 30_000;
const recentSubmissions = new Map<string, number>();

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const json = (status: number, data: Record<string, unknown>) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const redirect = (location: string) =>
  new Response(null, { status: 303, headers: { Location: location } });

type Lead = {
  name: string;
  phone: string;
  email: string;
  zip: string;
  service: string;
  message: string;
};

const buildEmailHtml = (lead: Lead) => `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#0B1F33">
    <h2 style="color:#0B1F33;margin:0 0 16px">New estimate request</h2>
    <table style="width:100%;border-collapse:collapse">
      <tbody>
        <tr><td style="padding:8px 0;color:#5F6B73"><strong>Name</strong></td><td style="padding:8px 0">${escapeHtml(lead.name)}</td></tr>
        <tr><td style="padding:8px 0;color:#5F6B73"><strong>Phone</strong></td><td style="padding:8px 0"><a href="tel:${escapeHtml(lead.phone)}">${escapeHtml(lead.phone)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#5F6B73"><strong>Email</strong></td><td style="padding:8px 0"><a href="mailto:${escapeHtml(lead.email)}">${escapeHtml(lead.email)}</a></td></tr>
        <tr><td style="padding:8px 0;color:#5F6B73"><strong>ZIP</strong></td><td style="padding:8px 0">${escapeHtml(lead.zip)}</td></tr>
        <tr><td style="padding:8px 0;color:#5F6B73"><strong>Service</strong></td><td style="padding:8px 0">${escapeHtml(lead.service)}</td></tr>
        <tr><td style="padding:8px 0;color:#5F6B73;vertical-align:top"><strong>Message</strong></td><td style="padding:8px 0;white-space:pre-wrap">${escapeHtml(lead.message || "—")}</td></tr>
      </tbody>
    </table>
    <p style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:12px;color:#5F6B73">
      Sent from the ALL PRO Cleaning website estimate form.
    </p>
  </div>
`;

const buildEmailText = (lead: Lead) =>
  [
    "New estimate request",
    "",
    `Name: ${lead.name}`,
    `Phone: ${lead.phone}`,
    `Email: ${lead.email}`,
    `ZIP: ${lead.zip}`,
    `Service: ${lead.service}`,
    `Message: ${lead.message || "—"}`,
  ].join("\n");

const parsePayload = async (
  request: Request,
): Promise<{ data: Record<string, unknown>; isForm: boolean }> => {
  const ct = request.headers.get("content-type") ?? "";
  if (ct.includes("application/json")) {
    return { data: await request.json(), isForm: false };
  }
  if (ct.includes("application/x-www-form-urlencoded") || ct.includes("multipart/form-data")) {
    const formData = await request.formData();
    const data: Record<string, unknown> = {};
    for (const [key, value] of formData.entries()) {
      data[key] = typeof value === "string" ? value : value.name;
    }
    data.consent = formData.get("consent") !== null;
    return { data, isForm: true };
  }
  throw new Error("Unsupported content type");
};

const errorResponse = (status: number, error: string, isForm: boolean) =>
  isForm ? redirect(`/?error=${encodeURIComponent(error)}#contact`) : json(status, { ok: false, error });

export const POST: APIRoute = async ({ request, clientAddress }) => {
  let parsed: { data: Record<string, unknown>; isForm: boolean };
  try {
    parsed = await parsePayload(request);
  } catch {
    return json(400, { ok: false, error: "Invalid request body." });
  }
  const { data: payload, isForm } = parsed;

  const honeypot = typeof payload.website === "string" ? payload.website.trim() : "";
  if (honeypot.length > 0) {
    return isForm ? redirect("/thanks") : json(200, { ok: true });
  }

  const name = String(payload.name ?? "").trim();
  const phone = String(payload.phone ?? "").trim();
  const email = String(payload.email ?? "").trim();
  const zip = String(payload.zip ?? "").trim();
  const service = String(payload.service ?? "").trim();
  const message = String(payload.message ?? "").trim();
  const consent = Boolean(payload.consent);

  if (name.length < 2) return errorResponse(400, "Please enter your name.", isForm);
  if (phone.length < 7) return errorResponse(400, "Please enter a valid phone number.", isForm);
  if (!isEmail(email)) return errorResponse(400, "Please enter a valid email.", isForm);
  if (!/^\d{5}$/.test(zip)) return errorResponse(400, "Please enter a 5-digit ZIP code.", isForm);
  if (!service) return errorResponse(400, "Please choose a service.", isForm);
  if (!consent) return errorResponse(400, "Please agree to be contacted.", isForm);
  if (name.length > 120 || message.length > 2000) {
    return errorResponse(400, "Submission too long.", isForm);
  }

  const ip = clientAddress ?? request.headers.get("x-forwarded-for") ?? "unknown";
  const now = Date.now();
  const last = recentSubmissions.get(ip) ?? 0;
  if (now - last < RATE_LIMIT_WINDOW_MS) {
    return errorResponse(429, "Please wait a moment before sending again.", isForm);
  }
  recentSubmissions.set(ip, now);
  if (recentSubmissions.size > 500) {
    for (const [key, ts] of recentSubmissions) {
      if (now - ts > RATE_LIMIT_WINDOW_MS * 4) recentSubmissions.delete(key);
    }
  }

  const lead: Lead = { name, phone, email, zip, service, message };

  if (!RESEND_API_KEY) {
    console.warn("[quote] RESEND_API_KEY not set — lead received but email skipped:", lead);
    return isForm ? redirect("/thanks") : json(200, { ok: true, emailSent: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [TO_EMAIL],
        reply_to: email,
        subject: `New estimate request — ${name} (${service})`,
        html: buildEmailHtml(lead),
        text: buildEmailText(lead),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("[quote] Resend error:", res.status, detail);
      return isForm ? redirect("/thanks") : json(200, { ok: true, emailSent: false });
    }
  } catch (error) {
    console.error("[quote] Resend request failed:", error);
    return isForm ? redirect("/thanks") : json(200, { ok: true, emailSent: false });
  }

  return isForm ? redirect("/thanks") : json(200, { ok: true, emailSent: true });
};
