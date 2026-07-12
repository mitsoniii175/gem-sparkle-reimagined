import { useMemo, useState } from "react";

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

const TABS = [
  { key: "necklaces", label: "Necklaces", images: () => toSortedList(necklaceImages) },
  { key: "earrings", label: "Earrings", images: () => toSortedList(earringImages) },
  { key: "bangles", label: "Bangles", images: () => toSortedList(bangleImages) },
  { key: "payal", label: "Payal (Silver)", images: () => toSortedList(payalImages) },
  { key: "men", label: "Men's Jewellery", images: () => toSortedList(menImages) },
  { key: "gold", label: "Gold Sets", images: () => toSortedList(goldImages) },
] as const;

export function Gallery() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]["key"]>("necklaces");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const active = TABS.find((t) => t.key === activeTab)!;
  const images = useMemo(() => active.images(), [active]);

  return (
    <section id="gallery" className="container-x py-16">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">
          Full <span className="text-gold-dark">Collection</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every piece from our showroom — {TABS.reduce((sum, t) => sum + t.images().length, 0)} designs and counting
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {TABS.map((t) => {
          const count = t.images().length;
          return (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === t.key
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-foreground/70 hover:border-primary hover:text-gold-dark"
              }`}
            >
              {t.label} <span className="opacity-70">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {images.map((src, idx) => (
          <button
            key={src + idx}
            onClick={() => setLightbox(src)}
            className="group overflow-hidden rounded-lg border border-border bg-card"
          >
            <img
              src={src}
              alt={`${active.label} ${idx + 1}`}
              loading="lazy"
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-6"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="Selected jewellery piece" className="max-h-[85vh] max-w-full rounded-lg object-contain" />
        </div>
      )}
    </section>
  );
}
