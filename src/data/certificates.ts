/**
 * Certificates shown on the /certificates page.
 *
 * To add one, follow CERTIFICATES.md in the project root:
 *   1. Put a web-sized image in public/certificates/<slug>.webp
 *   2. Add an entry to the array below (newest first).
 */

export type Certificate = {
  /** Short unique id, also the image file name (without .webp). */
  slug: string;
  /** Course or programme name, as written on the certificate. */
  title: string;
  /** Who issued it, e.g. "NPTEL · IIT Madras" or "100xDevs". */
  issuer: string;
  /** When it was completed, as a display string, e.g. "Jul–Oct 2026". */
  date: string;
  /** Optional extra detail: duration, credits, etc. */
  detail?: string;
  /** Optional small badge, e.g. "Elite". */
  badge?: string;
  /** Optional public verification link. */
  verifyUrl?: string;
  /** Image path under /public, usually `/certificates/<slug>.webp`. */
  image: string;
  /** Image width / height (landscape certificates are ~1.4). */
  ratio: number;
  /** Groups the filter tabs on the page. */
  category: "Engineering" | "Business" | "Security" | "Other";
};

export const certificates: Certificate[] = [
  {
    slug: "100xdevs-cohort-3",
    title: "Web Development + DevOps + Blockchain Cohort 3.0",
    issuer: "100xDevs",
    date: "Nov 2026",
    detail: "325 hours",
    verifyUrl: "https://100xdevs.com/verify-certificate/DydrTLDT-9BDiwfiNq8wUforNt5Z9nPQOmDv4-QkVYc",
    image: "/certificates/100xdevs-cohort-3.webp",
    ratio: 1600 / 1200,
    category: "Engineering",
  },
  {
    slug: "nptel-cyber-security",
    title: "Cyber Security and Privacy",
    issuer: "NPTEL · IIT Madras",
    date: "Jul–Oct 2026",
    detail: "12 weeks · 4 credits",
    image: "/certificates/nptel-cyber-security.webp",
    ratio: 1600 / 1131,
    category: "Security",
  },
  {
    slug: "nptel-project-management",
    title: "Project Management",
    issuer: "NPTEL · IIT Roorkee",
    date: "Feb–Apr 2026",
    detail: "8 weeks · 3 credits",
    badge: "Elite",
    image: "/certificates/nptel-project-management.webp",
    ratio: 1600 / 1146,
    category: "Business",
  },
  {
    slug: "nptel-supply-chain",
    title: "Supply Chain Analytics",
    issuer: "NPTEL · IIT Roorkee",
    date: "Feb–Apr 2026",
    detail: "8 weeks · 3 credits",
    image: "/certificates/nptel-supply-chain.webp",
    ratio: 1600 / 1146,
    category: "Business",
  },
];
