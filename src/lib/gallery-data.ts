// Auto-loads every photo dropped into these folders — no manual imports needed.
// To add more photos later, just drop .jpg files into the matching folder in
// src/assets/gallery/ and they'll show up here automatically.
const goldImages = import.meta.glob("@/assets/gallery/gold/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const menImages = import.meta.glob("@/assets/gallery/men/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const necklaceImages = import.meta.glob("@/assets/gallery/necklaces/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const earringImages = import.meta.glob("@/assets/gallery/earrings/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const bangleImages = import.meta.glob("@/assets/gallery/bangles/*.jpg", { eager: true, import: "default" }) as Record<string, string>;
const payalImages = import.meta.glob("@/assets/gallery/payal/*.jpg", { eager: true, import: "default" }) as Record<string, string>;

function toSortedList(mod: Record<string, string>) {
  return Object.keys(mod)
    .sort()
    .map((k) => mod[k]);
}

export const GALLERY_TABS = [
  { key: "necklaces", label: "Necklaces", images: toSortedList(necklaceImages) },
  { key: "earrings", label: "Earrings", images: toSortedList(earringImages) },
  { key: "bangles", label: "Bangles", images: toSortedList(bangleImages) },
  { key: "payal", label: "Payal (Silver)", images: toSortedList(payalImages) },
  { key: "men", label: "Men's Jewellery", images: toSortedList(menImages) },
  { key: "gold", label: "Gold Sets", images: toSortedList(goldImages) },
] as const;

export type GalleryTabKey = (typeof GALLERY_TABS)[number]["key"];

export function getGalleryImages(key: string): string[] {
  return GALLERY_TABS.find((t) => t.key === key)?.images ?? GALLERY_TABS[0].images;
}

export const GALLERY_PAGE_SIZE = 24;
