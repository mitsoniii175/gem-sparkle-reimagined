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

export type Product = {
  id: string;
  name: string;
  code: string;
  price: number;
  image: string;
};

export const TRENDING: Product[] = [
  { id: "1", name: "Rose Gold Hexagon Link Necklace Set", code: "1RN18-188", price: 121396, image: necklace },
  { id: "2", name: "Yellow Gold Jaguar Design Gents Ring", code: "JRG22-2032", price: 200035, image: gentsring },
  { id: "3", name: 'Men\'s "King" Lion Face Ring', code: "JRG22-2069", price: 127219, image: lionring },
  { id: "4", name: "Nfinity Loop Designer Ring", code: "VPLR18-257", price: 49140, image: bangle },
  { id: "5", name: "Royal Bridal Necklace Set", code: "BRD22-901", price: 289500, image: bridal },
  { id: "6", name: "Solitaire Drop Earrings", code: "EAR18-442", price: 38900, image: earrings },
  { id: "7", name: "Diamond Pendant Chain", code: "PND18-118", price: 42300, image: chain },
  { id: "8", name: "Rose Gold Hexagon Necklace", code: "1RN18-190", price: 118200, image: necklace },
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
