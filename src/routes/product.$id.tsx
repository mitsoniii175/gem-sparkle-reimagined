import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { ArrowLeft, BadgeCheck, Heart, MessageCircle, ShoppingBag, Truck } from "lucide-react";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import {
  JEWELLERY_CARE,
  estimatedDelivery,
  getProduct,
  getRelatedProducts,
  makingCharges,
  whatsappLink,
  type Product,
} from "@/lib/site-data";
import { getGalleryImages } from "@/lib/gallery-data";
import productVideo from "@/assets/product-showcase.mp4.asset.json";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Product unavailable — RAS Jewellers" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { product } = loaderData;
    const title = `${product.name} · ${product.purity} — RAS Jewellers`;
    const description = `${product.name} (${product.code}) — ${product.purity}, approx ${product.weight}, BIS hallmarked. Enquire on WhatsApp or visit our Haldharvas & Khatlal showrooms.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "product" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProductDetailsPage,
  notFoundComponent: ProductNotFound,
});

function ProductNotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementBar />
      <Header />
      <main className="container-x flex flex-1 flex-col items-center justify-center gap-4 py-24 text-center">
        <h1 className="font-serif text-3xl">This design isn’t available</h1>
        <p className="text-sm text-muted-foreground">It may have been sold or moved to another collection.</p>
        <Link to="/" className="rounded-full bg-primary px-6 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground">
          Back to home
        </Link>
      </main>
      <Footer />
    </div>
  );
}

function categoryToGalleryTab(product: Product): string {
  if (product.material === "silver") return "payal";
  switch (product.category) {
    case "Earrings":
      return "earrings";
    case "Bangles":
      return "bangles";
    case "Bridal Sets":
      return "gold";
    case "Chains & Pendants":
    case "Rings":
      return "men";
    default:
      return "necklaces";
  }
}

function ProductDetailsPage() {
  const { product } = Route.useLoaderData();
  const [active, setActive] = useState(0);
  const [wishlisted, setWishlisted] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [zoom, setZoom] = useState<{ x: number; y: number } | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const images = useMemo(() => {
    const extras = getGalleryImages(categoryToGalleryTab(product)).slice(0, 4);
    return [product.image, ...extras.filter((s) => s !== product.image)].slice(0, 5);
  }, [product]);

  const related = useMemo(() => getRelatedProducts(product), [product]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = frameRef.current?.getBoundingClientRect();
    if (!rect) return;
    setZoom({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  const specs = [
    { label: "Purity", value: product.purity },
    { label: "Approx. Weight", value: product.weight },
    { label: "Design Code", value: product.code },
    { label: "Making Charges", value: makingCharges(product) },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 pb-28 lg:pb-0">
        <div className="container-x py-8">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-gold-dark"
          >
            <ArrowLeft className="h-4 w-4" /> Back to collection
          </Link>
        </div>

        <section className="container-x grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Gallery */}
          <div>
            <div
              ref={frameRef}
              onMouseMove={onMove}
              onMouseLeave={() => setZoom(null)}
              className="relative overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_20px_60px_-40px_hsl(0_0%_0%/0.5)]"
            >
              <img
                src={images[active]}
                alt={`${product.name} — ${product.purity} jewellery, view ${active + 1}`}
                className="aspect-square w-full object-cover transition-transform duration-200"
                style={
                  zoom
                    ? { transform: "scale(2)", transformOrigin: `${zoom.x}% ${zoom.y}%` }
                    : undefined
                }
              />
              <span className="pointer-events-none absolute bottom-4 left-4 rounded-full bg-background/85 px-3 py-1 text-[11px] uppercase tracking-widest text-muted-foreground backdrop-blur">
                Hover to zoom
              </span>
              <button
                aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                onClick={() => setWishlisted((v) => !v)}
                className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-background/90 text-gold-dark shadow-md backdrop-blur transition-transform hover:scale-110"
              >
                <Heart className={`h-5 w-5 ${wishlisted ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-5 gap-3">
              {images.map((src, i) => (
                <button
                  key={src + i}
                  onClick={() => setActive(i)}
                  aria-label={`View image ${i + 1}`}
                  className={`overflow-hidden rounded-xl border transition-all ${
                    i === active ? "border-primary ring-2 ring-primary/30" : "border-border/60 hover:border-primary"
                  }`}
                >
                  <img src={src} alt={`${product.name} thumbnail ${i + 1}`} loading="lazy" className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>

            {/* Product video */}
            <div className="mt-6 overflow-hidden rounded-3xl border border-border/60 bg-card">
              <video
                src={productVideo.url}
                poster={product.image}
                controls
                muted
                loop
                playsInline
                preload="none"
                className="aspect-video w-full object-cover"
              />
              <p className="px-5 py-3 text-xs uppercase tracking-widest text-muted-foreground">
                Product video · 360° showcase
              </p>
            </div>
          </div>

          {/* Details */}
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-gold-dark">{product.category}</p>
            <h1 className="mt-3 font-serif text-3xl leading-tight md:text-4xl">{product.name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold-dark">
                <BadgeCheck className="h-3.5 w-3.5" /> BIS Hallmarked
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-foreground/70">
                {product.purity}
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-foreground/70">
                HUID Enabled
              </span>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Handcrafted by our in-house karigars, this {product.name.toLowerCase()} is finished with certified{" "}
              {product.purity} purity. Final price is calculated on the day’s metal rate plus making charges — our team
              will share a transparent quote on WhatsApp or in showroom.
            </p>

            <dl className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 sm:grid-cols-2">
              {specs.map((s) => (
                <div key={s.label} className="bg-card p-5">
                  <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">{s.label}</dt>
                  <dd className="mt-1 text-sm font-medium text-foreground">{s.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-6 flex items-start gap-3 rounded-2xl border border-border/60 bg-card p-5">
              <Truck className="mt-0.5 h-5 w-5 shrink-0 text-gold-dark" />
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Estimated Delivery</p>
                <p className="mt-1 text-sm font-medium text-foreground">{estimatedDelivery(product)}</p>
              </div>
            </div>

            {/* Desktop actions */}
            <div className="mt-8 hidden gap-3 lg:flex">
              <a
                href={whatsappLink(
                  `Hi RAS Jewellers, I'd like to enquire about ${product.name} (${product.code}) — ${product.purity}, ${product.weight}.`
                )}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 py-4 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" /> Enquire on WhatsApp
              </a>
              <button
                onClick={() => setInCart(true)}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-primary px-6 py-4 text-xs font-semibold uppercase tracking-widest text-gold-dark transition-colors hover:bg-primary/10"
              >
                <ShoppingBag className="h-4 w-4" /> {inCart ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>

            {/* Care instructions */}
            <div className="mt-10 rounded-2xl border border-border/60 bg-card p-6">
              <h2 className="font-serif text-xl">Jewellery Care Instructions</h2>
              <ul className="mt-4 space-y-3">
                {JEWELLERY_CARE.map((tip) => (
                  <li key={tip} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Related products */}
        {related.length > 0 && (
          <section className="container-x py-16">
            <h2 className="text-center font-serif text-2xl md:text-3xl">
              You May Also <span className="text-gold-dark">Love</span>
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  to="/product/$id"
                  params={{ id: r.id }}
                  className="group overflow-hidden rounded-3xl border border-border/60 bg-card transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                >
                  <img
                    src={r.image}
                    alt={`${r.name} — ${r.purity} jewellery by RAS Jewellers`}
                    loading="lazy"
                    className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="p-5">
                    <h3 className="font-serif text-base leading-snug">{r.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      {r.purity} · {r.weight}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-50 flex gap-3 border-t border-border/60 bg-background/95 p-3 backdrop-blur lg:hidden">
        <a
          href={whatsappLink(
            `Hi RAS Jewellers, I'd like to enquire about ${product.name} (${product.code}) — ${product.purity}, ${product.weight}.`
          )}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-primary-foreground"
        >
          <MessageCircle className="h-4 w-4" /> Enquire
        </a>
        <button
          onClick={() => setInCart(true)}
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-primary px-4 py-3.5 text-[11px] font-semibold uppercase tracking-widest text-gold-dark"
        >
          <ShoppingBag className="h-4 w-4" /> {inCart ? "Added" : "Add to Cart"}
        </button>
      </div>

      <Footer />
    </div>
  );
}
