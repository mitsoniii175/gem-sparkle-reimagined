import { useEffect, useMemo, useState } from "react";
import { ArrowRight, BadgeCheck, Heart, MessageCircle } from "lucide-react";
import { TRENDING, whatsappLink, type Filter } from "@/lib/site-data";

export function Trending() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>({ kind: "all" });
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    function onSearch(e: Event) {
      setQuery((e as CustomEvent<string>).detail ?? "");
      setFilter({ kind: "all" });
    }
    function onFilter(e: Event) {
      setFilter((e as CustomEvent<Filter>).detail);
      setQuery("");
    }
    window.addEventListener("ras-search", onSearch);
    window.addEventListener("ras-filter", onFilter);
    return () => {
      window.removeEventListener("ras-search", onSearch);
      window.removeEventListener("ras-filter", onFilter);
    };
  }, []);

  const products = useMemo(() => {
    return TRENDING.filter((p) => {
      let matchesFilter = true;
      if (filter.kind === "material") matchesFilter = p.material === filter.value;
      else if (filter.kind === "category") matchesFilter = p.category === filter.value;
      else if (filter.kind === "collection") {
        if (filter.value === "men") matchesFilter = p.name.toLowerCase().includes("men's");
        else if (filter.value === "women") matchesFilter = !p.name.toLowerCase().includes("men's");
      }
      const matchesQuery =
        query.trim() === "" || p.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesFilter && matchesQuery;
    });
  }, [filter, query]);

  const subtitle = query
    ? `Results for "${query}"`
    : filter.kind === "material"
      ? `Showing our ${filter.value} collection`
      : filter.kind === "category"
        ? `Showing ${filter.value}`
        : filter.kind === "collection"
          ? `Showing ${filter.value === "men" ? "Men's" : "Women's"} Jewellery`
          : "Most loved designs at RAS Jewellers this season";

  const showReset = query !== "" || filter.kind !== "all";

  return (
    <section id="trending" className="container-x py-16">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">
          <span className="text-gold-dark">Trending</span> Products
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        {showReset && (
          <button
            onClick={() => {
              setFilter({ kind: "all" });
              setQuery("");
            }}
            className="mt-3 inline-block text-xs font-medium uppercase tracking-widest text-gold-dark underline underline-offset-4"
          >
            Show all products
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">No products match — try a different search.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <article
              key={p.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border/60 bg-card shadow-[0_2px_20px_-12px_hsl(0_0%_0%/0.25)] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={`${p.name} — ${p.purity} ${p.material} jewellery by RAS Jewellers`}
                  width={800}
                  height={800}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-foreground/15 via-transparent to-transparent" />

                <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold-dark backdrop-blur">
                  {p.purity}
                </span>

                <button
                  aria-label={wishlist[p.id] ? "Remove from wishlist" : "Add to wishlist"}
                  onClick={() => setWishlist((w) => ({ ...w, [p.id]: !w[p.id] }))}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-gold-dark shadow-md backdrop-blur transition-transform hover:scale-110"
                >
                  <Heart className={`h-[18px] w-[18px] ${wishlist[p.id] ? "fill-current" : ""}`} />
                </button>
              </div>

              <div className="flex flex-1 flex-col gap-4 p-6">
                <div>
                  <h3 className="font-serif text-lg leading-snug text-foreground">{p.name}</h3>
                  <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{p.code}</p>
                </div>

                <dl className="flex items-center gap-6 border-y border-border/60 py-3 text-sm">
                  <div>
                    <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">Purity</dt>
                    <dd className="mt-0.5 font-medium text-foreground">{p.purity}</dd>
                  </div>
                  <div>
                    <dt className="text-[11px] uppercase tracking-widest text-muted-foreground">Weight</dt>
                    <dd className="mt-0.5 font-medium text-foreground">{p.weight}</dd>
                  </div>
                </dl>

                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-gold-dark">
                  <BadgeCheck className="h-3.5 w-3.5" /> BIS Hallmarked
                </span>

                <div className="mt-auto flex flex-col gap-2 pt-1">
                  <a
                    href={whatsappLink(
                      `Hi RAS Jewellers, I'd like to view details of ${p.name} (${p.code}) — ${p.purity}, ${p.weight}.`
                    )}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold uppercase tracking-widest text-primary-foreground transition-opacity hover:opacity-90"
                  >
                    View Details <ArrowRight className="h-4 w-4" />
                  </a>
                  <a
                    href={whatsappLink(`Hi RAS Jewellers, I'd like to enquire about ${p.name} (${p.code}).`)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-medium uppercase tracking-widest text-gold-dark hover:underline"
                  >
                    <MessageCircle className="h-4 w-4" /> Enquire for Price
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

