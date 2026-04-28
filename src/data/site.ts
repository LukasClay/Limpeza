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
  ideal: string;
  cta: string;
};

export const services: readonly Service[] = [
  {
    icon: "sparkles",
    title: "Weekly Cleaning",
    label: "Weekly Cleaning",
    text: "Keep your home clean without spending your weekends catching up.",
    ideal: "Busy households",
    cta: "Estimate weekly cleaning",
  },
  {
    icon: "refresh",
    title: "Bi-weekly Cleaning",
    label: "Bi-weekly Cleaning",
    text: "A reliable routine that keeps rooms ready between deeper resets.",
    ideal: "Steady upkeep",
    cta: "Estimate bi-weekly cleaning",
  },
  {
    icon: "calendar",
    title: "Monthly Cleaning",
    label: "Monthly Cleaning",
    text: "A deeper reset for homes or offices that need periodic attention.",
    ideal: "Fresh resets",
    cta: "Estimate monthly cleaning",
  },
  {
    icon: "key",
    title: "Move In Cleaning",
    label: "Move In",
    text: "Start your new space with a clean foundation before furniture and boxes take over.",
    ideal: "New homes and apartments",
    cta: "Estimate move-in cleaning",
  },
  {
    icon: "home",
    title: "Move Out Cleaning",
    label: "Move Out",
    text: "Leave the property ready for inspection, listing, or the next tenant.",
    ideal: "Tenants, landlords, property managers",
    cta: "Estimate move-out cleaning",
  },
  {
    icon: "building",
    title: "Post Construction",
    label: "Post Construction",
    text: "Remove dust, debris, and residue after renovation or construction work.",
    ideal: "Renovations and builds",
    cta: "Estimate post-construction cleaning",
  },
  {
    icon: "building",
    title: "Commercial Cleaning",
    label: "Commercial Cleaning",
    text: "Keep client-facing and team spaces presentable with a clear cleaning plan.",
    ideal: "Offices and small businesses",
    cta: "Estimate commercial cleaning",
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
  { icon: "estimate", title: "Clear Estimates", text: "No confusing back-and-forth" },
  { icon: "clock", title: "Simple Scheduling", text: "Know what happens next" },
  {
    icon: "home",
    title: "Homes & Businesses",
    text: "Residential and commercial",
  },
  { icon: "map", title: "Serving Massachusetts", text: "Local service area" },
];

export type BestForItem = { icon: IconName; title: string; text: string };

export const bestFor: readonly BestForItem[] = [
  {
    icon: "refresh",
    title: "Busy routine",
    text: "Weekly or bi-weekly cleaning keeps your home consistently fresh.",
  },
  {
    icon: "sparkles",
    title: "Fresh reset",
    text: "Monthly cleaning helps restore order when the space needs deeper attention.",
  },
  {
    icon: "key",
    title: "Moving day",
    text: "Move-in and move-out cleaning make handoff feel simpler.",
  },
  {
    icon: "building",
    title: "After renovation",
    text: "Post-construction cleanup helps remove dust and surface buildup.",
  },
  {
    icon: "home",
    title: "Business space",
    text: "Commercial cleaning keeps offices and shared areas ready for people.",
  },
];

export type Benefit = { icon: IconName; title: string; text: string };

export const benefits: readonly Benefit[] = [
  {
    icon: "estimate",
    title: "Clear estimates before scheduling",
    text: "Share what you need, where you are located, and the type of cleaning. We help you understand the next step before the visit.",
  },
  {
    icon: "home",
    title: "Cleaning for homes and businesses",
    text: "Residential, commercial, move-in, move-out, recurring, and post-construction cleaning in one place.",
  },
  {
    icon: "sparkles",
    title: "Detail-oriented cleaning process",
    text: "The service is focused on visible results, cleaner surfaces, and the details that make a space feel ready to use.",
  },
  {
    icon: "clock",
    title: "Simple communication",
    text: "Request your estimate by WhatsApp, phone, or form and keep the conversation organized from the first contact.",
  },
  {
    icon: "refresh",
    title: "Flexible recurring options",
    text: "Choose weekly, bi-weekly, monthly, or one-time cleaning depending on how often your space needs attention.",
  },
  {
    icon: "map",
    title: "Massachusetts service area",
    text: "Send your ZIP code with the service you need so the team can confirm availability for your location.",
  },
];

export type AboutPoint = { icon: IconName; title: string };

export const aboutPoints: readonly AboutPoint[] = [
  { icon: "estimate", title: "Clear Estimates" },
  { icon: "clock", title: "Reliable" },
  { icon: "sparkles", title: "Detail-Oriented" },
  { icon: "users", title: "Professional" },
];

export type ProcessItem = { title: string; text: string };

export const processItems: readonly ProcessItem[] = [
  {
    title: "Send your request",
    text: "Tell us what kind of cleaning you need, where the space is located, and any important details.",
  },
  {
    title: "Get a clear estimate",
    text: "We review the scope and help you understand the next step before anything is scheduled.",
  },
  {
    title: "Schedule the cleaning",
    text: "Once the estimate is aligned, the visit is organized around the service your space needs.",
  },
  {
    title: "Enjoy the finished space",
    text: "Your home, office, or property is left cleaner, fresher, and easier to use.",
  },
];

export type TrustCard = { icon: IconName; title: string; text: string };

export const trustCards: readonly TrustCard[] = [
  {
    icon: "estimate",
    title: "Clear estimate process",
    text: "A simple request flow built to help you understand the next step before scheduling.",
  },
  {
    icon: "clock",
    title: "Organized communication",
    text: "Professional follow-up by WhatsApp, phone, or form so the request does not feel vague.",
  },
  {
    icon: "sparkles",
    title: "Detail-oriented service",
    text: "Careful attention to the areas that matter most in residential and commercial spaces.",
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
      "Yes. Our team can bring the supplies and equipment needed for the cleaning. If you prefer specific products for allergies, pets, or sensitive surfaces, mention that when requesting your estimate.",
  },
  {
    question: "How long does a typical cleaning take?",
    answer:
      "Timing depends on the size of the space, the condition of the property, and the type of cleaning requested. We confirm the expected scope and estimated visit window before scheduling.",
  },
  {
    question: "Do you offer residential and commercial cleaning?",
    answer:
      "Yes. ALL PRO Cleaning Services works with homes, apartments, offices, and business spaces, including recurring cleaning, move-in, move-out, and post-construction cleaning.",
  },
  {
    question: "How do I get a free estimate?",
    answer:
      "Send us a message on WhatsApp, fill out the estimate form on this page, or call us. Share the type of cleaning you need, your location, and any important details about the space.",
  },
  {
    question: "How do payments work?",
    answer:
      "We provide a clear estimate before the cleaning is scheduled. Payment options and timing are confirmed during the quote process.",
  },
  {
    question: "What if I am not happy with something?",
    answer:
      "Tell us as soon as possible. We review the concern, understand what happened, and explain the best next step based on the service provided.",
  },
  {
    question: "Can you work around pets, children, or sensitive surfaces?",
    answer:
      "Let us know about pets, children, allergies, delicate materials, or product preferences before the visit so the team can plan the cleaning with those details in mind.",
  },
  {
    question: "Which areas in Massachusetts do you serve?",
    answer:
      "We serve selected areas in Massachusetts. If your city is not listed, send us your ZIP code and service type so we can confirm whether we can help.",
  },
  {
    question: "Can I cancel or reschedule?",
    answer:
      "Yes. Contact us as early as possible if you need to cancel or reschedule, so we can adjust the appointment and offer the slot to another client when possible.",
  },
];
