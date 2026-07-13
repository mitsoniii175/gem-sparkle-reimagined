import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { GALLERY_TABS, GALLERY_PAGE_SIZE, getGalleryImages, type GalleryTabKey } from "@/lib/gallery-data";
import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

type CollectionSearch = {
  cat: string;
  page: number;
};

export const Route = createFileRoute("/collection")({
  validateSearch: (search: Record<string, unknown>): CollectionSearch => ({
    cat: typeof search.cat === "string" ? search.cat : "necklaces",
    page: Number(search.page) > 0 ? Number(search.page) : 1,
  }),
  component: CollectionPage,
});

function CollectionPage() {
  const { cat, page } = Route.useSearch();
  const navigate = useNavigate({ from: "/collection" });
  const [lightbox, setLightbox] = useState<string | null>(null);

  const activeTab = GALLERY_TABS.find((t) => t.key === cat) ?? GALLERY_TABS[0];
  const images = getGalleryImages(activeTab.key);
  const totalPages = Math.max(1, Math.ceil(images.length / GALLERY_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * GALLERY_PAGE_SIZE;
  const pageImages = images.slice(start, start + GALLERY_PAGE_SIZE);

  function goToPage(p: number) {
    navigate({ search: { cat: activeTab.key, page: p } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Build a compact page-number list: 1 ... current-1 current current+1 ... last
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <section className="container-x py-12">
          <div className="mb-8 text-center">
            <h1 className="font-serif text-3xl md:text-4xl">
              {activeTab.label} <span className="text-gold-dark">Collection</span>
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {images.length} designs · Page {currentPage} of {totalPages}
            </p>
          </div>

          {/* Category switcher */}
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {GALLERY_TABS.map((t) => (
              <Link
                key={t.key}
                to="/collection"
                search={{ cat: t.key, page: 1 }}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  t.key === activeTab.key
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-foreground/70 hover:border-primary hover:text-gold-dark"
                }`}
              >
                {t.label} <span className="opacity-70">({t.images.length})</span>
              </Link>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {pageImages.map((src, idx) => (
              <button
                key={src + idx}
                onClick={() => setLightbox(src)}
                className="group overflow-hidden rounded-lg border border-border bg-card"
              >
                <img
                  src={src}
                  alt={`${activeTab.label} ${start + idx + 1}`}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </button>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
              <button
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-gold-dark disabled:opacity-30"
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {pageNumbers.map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 text-sm text-muted-foreground">…</span>
                ) : (
                  <button
                    key={p}
                    onClick={() => goToPage(p as number)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                      p === currentPage
                        ? "bg-primary text-primary-foreground"
                        : "border border-border text-foreground/70 hover:border-primary hover:text-gold-dark"
                    }`}
                  >
                    {p}
                  </button>
                )
              )}
              <button
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-foreground/70 transition-colors hover:border-primary hover:text-gold-dark disabled:opacity-30"
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/85 p-6"
          onClick={() => setLightbox(null)}
        >
          <button
            aria-label="Close"
            onClick={() => setLightbox(null)}
            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <img src={lightbox} alt="Selected jewellery piece" className="max-h-[85vh] max-w-full rounded-lg object-contain" />
        </div>
      )}
    </div>
  );
}

function getPageNumbers(current: number, total: number): (number | "...")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "...")[] = [1];
  if (current > 3) pages.push("...");
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p++) pages.push(p);
  if (current < total - 2) pages.push("...");
  pages.push(total);
  return pages;
}
