import { SITE_URL } from "../data/brand";

type Crumb = { name: string; href?: string };

export const buildBreadcrumbSchema = (crumbs: readonly Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    ...(crumb.href ? { item: new URL(crumb.href, SITE_URL).toString() } : {}),
  })),
});
