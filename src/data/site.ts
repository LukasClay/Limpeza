import type { IconName } from "../lib/icons";

export const navItems = [
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  { label: "Why Us", href: "/#why-us" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
] as const;

export type Service = {
  icon: IconName;
  title: string;
  label: string;
  text: string;
};

export const services: readonly Service[] = [
  {
    icon: "sparkles",
    title: "Weekly Cleaning",
    label: "Weekly Cleaning",
    text: "Consistent care for busy homes.",
  },
  {
    icon: "refresh",
    title: "Bi-weekly Cleaning",
    label: "Bi-weekly Cleaning",
    text: "A reliable rhythm that keeps your space fresh.",
  },
  {
    icon: "calendar",
    title: "Monthly Cleaning",
    label: "Monthly Cleaning",
    text: "A deeper reset for your home or office.",
  },
  {
    icon: "key",
    title: "Move In Cleaning",
    label: "Move In",
    text: "Start fresh before the first box opens.",
  },
  {
    icon: "home",
    title: "Move Out Cleaning",
    label: "Move Out",
    text: "Leave the space ready for its next use.",
  },
  {
    icon: "building",
    title: "Post Construction",
    label: "Post Construction",
    text: "Detailed cleanup after the dust settles.",
  },
];

export const serviceOptions = [
  "Weekly Cleaning",
  "Bi-weekly Cleaning",
  "Monthly Cleaning",
  "Move In",
  "Move Out",
  "Post Construction",
  "Commercial Cleaning",
] as const;

export type TrustBarItem = { icon: IconName; title: string; text: string };

export const trustBar: readonly TrustBarItem[] = [
  { icon: "shield", title: "Fully Insured", text: "Professional coverage" },
  { icon: "estimate", title: "Free Estimates", text: "Clear next step" },
  {
    icon: "home",
    title: "Residential & Commercial",
    text: "Homes, offices, and businesses",
  },
  { icon: "map", title: "Serving Massachusetts", text: "Local service area" },
];

export type AboutPoint = { icon: IconName; title: string };

export const aboutPoints: readonly AboutPoint[] = [
  { icon: "shield", title: "Insured" },
  { icon: "clock", title: "Reliable" },
  { icon: "sparkles", title: "Detail-Oriented" },
  { icon: "users", title: "Professional" },
];

export const processItems = [
  "Quick request",
  "Clear estimate",
  "Professional cleaning",
  "Fresh, ready space",
] as const;

export type TrustCard = { icon: IconName; title: string; text: string };

export const trustCards: readonly TrustCard[] = [
  {
    icon: "shield",
    title: "Fully insured",
    text: "Built to give homeowners and businesses confidence before the first visit.",
  },
  {
    icon: "clock",
    title: "Clear communication",
    text: "A simple estimate process and organized follow-up from the start.",
  },
  {
    icon: "sparkles",
    title: "Professional standard",
    text: "Careful attention to detail for residential and commercial spaces.",
  },
];

// Generic Massachusetts city list — owner should review and trim/extend.
export const serviceCities = [
  "Boston",
  "Cambridge",
  "Worcester",
  "Springfield",
  "Lowell",
  "Quincy",
  "Newton",
  "Framingham",
  "Brockton",
  "Lynn",
  "Somerville",
  "Waltham",
  "Brookline",
  "Medford",
  "Malden",
  "Revere",
] as const;

export type FaqItem = { question: string; answer: string };

export const faqItems: readonly FaqItem[] = [
  {
    question: "Do you bring your own cleaning supplies and equipment?",
    answer:
      "Yes. Our team arrives with professional, pre-tested products and equipment. If you prefer specific products for allergies, pets, or sensitive surfaces, just let us know in advance.",
  },
  {
    question: "How long does a typical cleaning take?",
    answer:
      "Most homes take between 2 and 4 hours, depending on size and scope. Move-in, move-out, and post-construction cleanings can take longer. We confirm an estimated window when we send your free quote.",
  },
  {
    question: "Are you insured?",
    answer:
      "Yes. ALL PRO Cleaning Services is fully insured. Coverage details can be shared on request before your first visit.",
  },
  {
    question: "How do I get a free estimate?",
    answer:
      "Send us a message on WhatsApp, fill out the estimate form on this page, or call us. We typically reply within 1 hour during business hours.",
  },
  {
    question: "How do payments work?",
    answer:
      "We send a clear estimate before any work starts. Payment options are confirmed during the quote — most clients pay after the cleaning is finished and approved.",
  },
  {
    question: "What if I am not happy with something?",
    answer:
      "Tell us within 24 hours and we will come back to re-clean the area. Your satisfaction is the standard we aim for.",
  },
  {
    question: "Do you have pets-safe options?",
    answer:
      "Yes. We use products that are safe for homes with pets and children. Mention any specific concerns when requesting your estimate.",
  },
  {
    question: "Which areas in Massachusetts do you serve?",
    answer:
      "We cover most of the Greater Boston, MetroWest, and Worcester areas. If your city is not on our list, ask us — we may still be able to help.",
  },
  {
    question: "Can I cancel or reschedule?",
    answer:
      "Yes. Reach out at least 24 hours in advance whenever possible so we can offer the slot to another client.",
  },
];
