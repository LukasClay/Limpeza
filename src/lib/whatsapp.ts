import { brand } from "../data/brand";

export const buildWhatsappUrl = (message: string) =>
  `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const whatsappMessages = {
  default: "Hi! I'd like a free cleaning estimate.",
  residential: "Hi! I'd like a free estimate for residential cleaning.",
  commercial: "Hi! I'd like a free estimate for commercial cleaning.",
} as const;

export const whatsappDefaultUrl = buildWhatsappUrl(whatsappMessages.default);
