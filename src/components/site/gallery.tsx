import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { GALLERY_TABS, type GalleryTabKey } from "@/lib/gallery-data";

const PREVIEW_COUNT = 10;

export function Gallery() {
  const [activeTab, setActiveTab] = useState<GalleryTabKey>("necklaces");
  const [lightbox, setLightbox] = useState<string | null>(null);

  const active = GALLERY_TABS.find((t) => t.key === activeTab)!;
  const preview = useMemo(() => active.images.slice(0, PREVIEW_COUNT), [active]);
  const totalCount = useMemo(() => GALLERY_TABS.reduce((sum, t) => sum + t.images.length, 0), []);

  return (
    <section id="gallery" className="container-x py-16">
      <div className="mb-8 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">
          Full <span className="text-gold-dark">Collection</span>
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Every piece from our showroom — {totalCount} designs and counting
        </p>
      </div>

      {/* Tabs */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {GALLERY_TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setActiveTab(t.key)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === t.key
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-foreground/70 hover:border-primary hover:text-gold-dark"
            }`}
          >
            {t.label} <span className="opacity-70">({t.images.length})</span>
          </button>
        ))}
      </div>

      {/* Preview grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {preview.map((src, idx) => (
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

      {/* View All -> opens dedicated paginated page */}
      {active.images.length > PREVIEW_COUNT && (
        <div className="mt-8 text-center">
          <Link
            to="/collection"
            search={{ cat: active.key, page: 1 }}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            View All {active.label} ({active.images.length})
          </Link>
        </div>
      )}

      {/* Lightbox for quick preview */}
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
