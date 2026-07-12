import { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { TRENDING, inr, type Material } from "@/lib/site-data";

export function Trending({ materialFilter }: { materialFilter: Material | "all" }) {
  const [query, setQuery] = useState("");
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});

  useEffect(() => {
    function onSearch(e: Event) {
      setQuery((e as CustomEvent<string>).detail ?? "");
    }
    window.addEventListener("ras-search", onSearch);
    return () => window.removeEventListener("ras-search", onSearch);
  }, []);

  const products = useMemo(() => {
    return TRENDING.filter((p) => {
      const matchesMaterial = materialFilter === "all" || p.material === materialFilter;
      const matchesQuery = query.trim() === "" || p.name.toLowerCase().includes(query.trim().toLowerCase());
      return matchesMaterial && matchesQuery;
    });
  }, [materialFilter, query]);

  return (
    <section id="trending" className="container-x py-16">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">
          <span className="text-gold-dark">Trending</span> Products
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {query
            ? `Results for "${query}"`
            : materialFilter !== "all"
              ? `Showing our ${materialFilter} collection`
              : "Most loved designs at RAS Jewellers this season"}
        </p>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-sm text-muted-foreground">No products match — try a different search.</p>
      ) : (
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
          {products.map((p) => (
            <article key={p.id} className="group overflow-hidden rounded-xl border border-border bg-card transition-shadow hover:shadow-xl">
              <div className="relative overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                  aria-label="Add to wishlist"
                  onClick={() => setWishlist((w) => ({ ...w, [p.id]: !w[p.id] }))}
                  className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity ${
                    wishlist[p.id] ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                  }`}
                >
                  <Heart className={`h-4 w-4 ${wishlist[p.id] ? "fill-current" : ""}`} />
                </button>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 min-h-[2.5rem] font-sans text-sm font-medium text-foreground">
                  {p.name}
                </h3>
                <p className="mt-1 text-xs text-muted-foreground">{p.code}</p>
                <p className="mt-2 text-sm font-semibold text-gold-dark">{inr(p.price)}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
