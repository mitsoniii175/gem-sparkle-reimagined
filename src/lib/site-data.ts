import necklaceClassic from "@/assets/products/necklace-classic.jpg";
import necklaceBridal from "@/assets/products/necklace-bridal.jpg";
import earrings1 from "@/assets/products/earrings-1.jpg";
import earrings2 from "@/assets/products/earrings-2.jpg";
import bangles1 from "@/assets/products/bangles-1.jpg";
import bangles2 from "@/assets/products/bangles-2.jpg";
import payalSilver1 from "@/assets/products/payal-silver-1.jpg";
import payalSilver2 from "@/assets/products/payal-silver-2.jpg";
import mensChain from "@/assets/products/mens-chain.jpg";
import mensRing from "@/assets/products/mens-ring.jpg";
import mensBracelet from "@/assets/products/mens-bracelet.jpg";
import goldSet from "@/assets/products/gold-set.jpg";

export const SITE = {
  name: "RAS JEWELLERS",
  phone: "+91 98987 62093",
  whatsapp: "919898762093",
  email: "info@rasjewellers.com",
  established: "Est. 2000 · 25+ Years of Trust",
  instagram: "https://www.instagram.com/rasjewelsofficial?igsh=MWM4Zzc0eWJjY3Z2YQ==",
};

/**
 * Today's rates — EDIT THESE BY HAND EVERY DAY.
 * Leave a value as `null` to hide that line on the site until you fill it in.
 * Example: goldRate22k: 6540  ->  shows "22K Gold · Rs 6,540 / gram"
 */
export const RATES: {
  goldRate22k: number | null;
  goldRate24k: number | null;
  silverRate: number | null;
  updatedOn: string | null;
} = {
  goldRate22k: null,
  goldRate24k: null,
  silverRate: null,
  updatedOn: null,
};

export const ABOUT = {
  heading: "Our Story",
  paragraphs: [
    "RAS Jewellers has been a trusted name in Gujarat since 2000 — over 25 years of crafting gold and silver jewellery for life's biggest celebrations and everyday elegance.",
    "What started as a single family showroom has grown into two — in Haldharvas and Khatlal — while staying true to the same values: honest pricing, certified purity, and jewellery made to last generations.",
    "Every piece we sell is 100% BIS hallmarked and HUID enabled, so you can buy with complete confidence. From bridal sets to everyday silver, we craft each design with the same care we'd want for our own family.",
  ],
  highlights: [
    { label: "Established", value: "2000" },
    { label: "Showrooms", value: "2 · Haldharvas & Khatlal" },
    { label: "Hallmarking", value: "100% BIS · HUID Enabled" },
  ],
};

export const ANNOUNCEMENTS = [
  "100% BIS Hallmarked Jewellery",
  "HUID Enabled",
  "22K & 24K Gold",
  "Two Showrooms · Haldharvas & Khatlal",
  "Trusted for 25+ Years in Gujarat",
];

export const NAV = [
  { label: "Home", items: [] },
  { label: "Shop", items: ["Necklaces", "Rings", "Earrings", "Bangles", "Chains & Pendants", "Anklets"] },
  { label: "Bridal Collection", items: [] },
  { label: "Our Brands", items: ["RAS Gold", "RAS Silver"] },
  { label: "Custom Design", items: [] },
  { label: "About Us", items: [] },
];

export type Material = "gold" | "silver";

export type Category =
  | "Necklaces"
  | "Rings"
  | "Bridal Sets"
  | "Earrings"
  | "Bangles"
  | "Chains & Pendants"
  | "Anklets";

export type Product = {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  material: Material;
  category: Category;
};

/** A single active filter shared across the site (nav, tiles, search). */
export type Filter =
  | { kind: "all" }
  | { kind: "material"; value: Material }
  | { kind: "category"; value: Category };

/** Broadcast a filter so the Trending section can react from anywhere. */
export function applyFilter(filter: Filter) {
  window.dispatchEvent(new CustomEvent<Filter>("ras-filter", { detail: filter }));
  const trending = document.getElementById("trending");
  if (trending) trending.scrollIntoView({ behavior: "smooth" });
}

/** Map a nav/menu label to a product category (or null if not a category). */
export function labelToCategory(label: string): Category | null {
  const map: Record<string, Category> = {
    Rings: "Rings",
    Necklaces: "Necklaces",
    Earrings: "Earrings",
    Bangles: "Bangles",
    Chains: "Chains & Pendants",
    "Chains & Pendants": "Chains & Pendants",
    "Bridal Sets": "Bridal Sets",
    Bridal: "Bridal Sets",
    "Bridal Collection": "Bridal Sets",
    Anklets: "Anklets",
    Payal: "Anklets",
  };
  return map[label] ?? null;
}

/** WhatsApp link with a pre-filled message — used for custom design / enquiry buttons. */
export const whatsappLink = (message: string) =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;

/** Resolve a nav/menu label to a filter, then apply + scroll to it. Used by both header and footer nav so every button behaves the same way. */
export function triggerNavClick(label: string) {
  if (label === "Home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }
  if (label === "About Us") {
    const about = document.getElementById("about");
    if (about) about.scrollIntoView({ behavior: "smooth" });
    return;
  }
  if (label === "Custom Design") {
    window.open(whatsappLink("Hi RAS Jewellers, I'd like to enquire about a custom design."), "_blank");
    return;
  }
  const cat = labelToCategory(label);
  if (cat) return applyFilter({ kind: "category", value: cat });
  const lower = label.toLowerCase();
  if (lower.includes("gold")) return applyFilter({ kind: "material", value: "gold" });
  if (lower.includes("silver")) return applyFilter({ kind: "material", value: "silver" });
  applyFilter({ kind: "all" });
}

/**
 * `price` is kept here for your own internal reference only — it is NOT shown
 * on the site anymore (per your request). Customers see "Enquire for Price"
 * with a WhatsApp button instead. Feel free to update these numbers whenever
 * you like; they simply won't be displayed publicly.
 */
export const TRENDING: Product[] = [
  { id: "1", name: "Bridal Gold Necklace Set", code: "BRD22-001", price: 285000, image: necklaceBridal, material: "gold", category: "Bridal Sets" },
  { id: "2", name: "Classic Gold Necklace", code: "NCK22-002", price: 98500, image: necklaceClassic, material: "gold", category: "Necklaces" },
  { id: "3", name: "Traditional Gold Earrings", code: "EAR22-003", price: 32500, image: earrings1, material: "gold", category: "Earrings" },
  { id: "4", name: "Designer Gold Earrings", code: "EAR22-004", price: 27800, image: earrings2, material: "gold", category: "Earrings" },
  { id: "5", name: "Gold Bangles Set", code: "BNG22-005", price: 156000, image: bangles1, material: "gold", category: "Bangles" },
  { id: "6", name: "Classic Gold Bangles", code: "BNG22-006", price: 89000, image: bangles2, material: "gold", category: "Bangles" },
  { id: "7", name: "925 Silver Payal Pair", code: "PYL92-007", price: 4800, image: payalSilver1, material: "silver", category: "Anklets" },
  { id: "8", name: "925 Silver Designer Payal", code: "PYL92-008", price: 5600, image: payalSilver2, material: "silver", category: "Anklets" },
  { id: "9", name: "Men's Gold Chain", code: "CHN22-009", price: 112000, image: mensChain, material: "gold", category: "Chains & Pendants" },
  { id: "10", name: "Men's Gold Ring", code: "RNG22-010", price: 68000, image: mensRing, material: "gold", category: "Rings" },
  { id: "11", name: "Men's Gold Bracelet", code: "BRC22-011", price: 74500, image: mensBracelet, material: "gold", category: "Bangles" },
  { id: "12", name: "Gold Necklace Set", code: "SET22-012", price: 132000, image: goldSet, material: "gold", category: "Necklaces" },
];

export const CATEGORIES: { title: Category; image: string; count: number }[] = [
  { title: "Necklaces", image: necklaceClassic, count: 120 },
  { title: "Rings", image: mensRing, count: 96 },
  { title: "Bridal Sets", image: necklaceBridal, count: 48 },
  { title: "Earrings", image: earrings1, count: 84 },
  { title: "Bangles", image: bangles1, count: 64 },
  { title: "Chains & Pendants", image: mensChain, count: 72 },
  { title: "Anklets", image: payalSilver1, count: 30 },
];

export const inr = (n: number) => `₹ ${n.toLocaleString("en-IN")}/-`;

/**
 * Gold & Silver collection banners — now using your real product photography.
 */
export const MATERIAL_COLLECTIONS: {
  title: string;
  material: Material;
  description: string;
  image: string;
}[] = [
  {
    title: "Gold Collection",
    material: "gold",
    description: "22K & 24K BIS hallmarked gold, handcrafted for everyday elegance and celebration.",
    image: goldSet,
  },
  {
    title: "Silver Collection",
    material: "silver",
    description: "925 sterling silver pieces — light, versatile and made for daily wear.",
    image: payalSilver2,
  },
];
