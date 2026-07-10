import { Heart } from "lucide-react";
import { TRENDING, inr } from "@/lib/site-data";

export function Trending() {
  return (
    <section id="trending" className="container-x py-16">
      <div className="mb-10 text-center">
        <h2 className="font-serif text-3xl md:text-4xl">
          <span className="text-gold-dark">Trending</span> Products
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">Most loved designs at RAS Jewellers this season</p>
      </div>

      <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4">
        {TRENDING.map((p) => (
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
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Heart className="h-4 w-4" />
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
    </section>
  );
}
