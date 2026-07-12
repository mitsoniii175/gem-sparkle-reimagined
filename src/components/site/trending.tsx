import { useEffect, useMemo, useState } from "react";
import { Heart } from "lucide-react";
import { TRENDING, inr, type Filter } from "@/lib/site-data";

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
      const matchesFilter =
        filter.kind === "all" ||
        (filter.kind === "material" && p.material === filter.value) ||
        (filter.kind === "category" && p.category === filter.value);
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
