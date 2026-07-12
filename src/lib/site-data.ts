import necklace from "@/assets/p-necklace.jpg";
import gentsring from "@/assets/p-gentsring.jpg";
import lionring from "@/assets/p-lionring.jpg";
import bangle from "@/assets/p-bangle.jpg";
import bridal from "@/assets/p-bridal.jpg";
import earrings from "@/assets/p-earrings.jpg";
import chain from "@/assets/p-chain.jpg";

export const SITE = {
  name: "RAS JEWELLERS",
  phone: "+91 98987 62093",
  whatsapp: "919898762093",
  email: "info@rasjewellers.com",
  established: "Est. 2000 · 25+ Years of Trust",
  instagram: "https://instagram.com/rasjewellers", // TODO: replace with your real Instagram handle/link
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

export const ANNOUNCEMENTS = [
  "100% BIS Hallmarked Jewellery",
  "HUID Enabled",
  "22K & 24K Gold",
  "Two Showrooms · Haldharvas & Khatlal",
  "Trusted for 25+ Years in Gujarat",
];

export const NAV = [
  { label: "Investment Plan", items: ["Gold Savings", "Monthly Plan"] },
  { label: "Home", items: [] },
  { label: "Our Brands", items: ["RAS Gold", "RAS Silver", "RAS Diamonds"] },
  { label: "Shop", items: ["Rings", "Necklaces", "Earrings", "Bangles", "Chains"] },
  { label: "Collection", items: ["Bridal", "Wedding", "Daily Wear", "Antique"] },
  { label: "Gifts", items: ["For Her", "For Him", "For Kids"] },
  { label: "Product Family", items: ["Gold", "Silver", "Diamond"] },
  { label: "Create Your Own", items: [] },
];

export type Material = "gold" | "silver" | "diamond";

export type Product = {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
  material: Material;
};

export const TRENDING: Product[] = [
  { id: "1", name: "Rose Gold Hexagon Link Necklace Set", code: "1RN18-188", price: 121396, image: necklace, material: "gold" },
  { id: "2", name: "Yellow Gold Jaguar Design Gents Ring", code: "JRG22-2032", price: 200035, image: gentsring, material: "gold" },
  { id: "3", name: 'Men\'s "King" Lion Face Ring', code: "JRG22-2069", price: 127219, image: lionring, material: "gold" },
  { id: "4", name: "Nfinity Loop Designer Ring", code: "VPLR18-257", price: 49140, image: bangle, material: "gold" },
  { id: "5", name: "Royal Bridal Necklace Set", code: "BRD22-901", price: 289500, image: bridal, material: "gold" },
  { id: "6", name: "Solitaire Drop Earrings", code: "EAR18-442", price: 38900, image: earrings, material: "diamond" },
  { id: "7", name: "Diamond Pendant Chain", code: "PND18-118", price: 42300, image: chain, material: "diamond" },
  { id: "8", name: "Rose Gold Hexagon Necklace", code: "1RN18-190", price: 118200, image: necklace, material: "gold" },
  { id: "9", name: "925 Silver Oxidised Anklet Pair", code: "SLA92-311", price: 4200, image: bangle, material: "silver" },
  { id: "10", name: "Sterling Silver Chain Bracelet", code: "SLB92-118", price: 3150, image: chain, material: "silver" },
];

export const CATEGORIES = [
  { title: "Necklaces", image: necklace, count: 120 },
  { title: "Rings", image: gentsring, count: 96 },
  { title: "Bridal Sets", image: bridal, count: 48 },
  { title: "Earrings", image: earrings, count: 84 },
  { title: "Bangles", image: bangle, count: 64 },
  { title: "Chains & Pendants", image: chain, count: 72 },
];

export const inr = (n: number) => `₹ ${n.toLocaleString("en-IN")}/-`;

/**
 * Gold & Silver collection banners.
 * Images below are free-to-use stock photography (Unsplash License) used only
 * as placeholders — swap the `image` values for real photography of your own
 * pieces whenever you have shots ready.
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
    image: "https://images.unsplash.com/photo-1758995115867-4ef47c98824e?w=1200&auto=format&fit=crop&q=80",
  },
  {
    title: "Silver Collection",
    material: "silver",
    description: "925 sterling silver pieces — light, versatile and made for daily wear.",
    image: "https://images.unsplash.com/photo-1739194806935-3b4c66aee282?w=1200&auto=format&fit=crop&q=80",
  },
];
