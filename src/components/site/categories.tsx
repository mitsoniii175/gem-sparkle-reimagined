import { COLLECTIONS, applyFilter } from "@/lib/site-data";

export function Categories() {
  return (
    <section id="collections" className="bg-secondary/30 py-16 md:py-24">
      <div className="container-x">
        <div className="mb-10 text-center md:mb-14">
          <h2 className="font-serif text-3xl md:text-4xl">
            Our <span className="text-gold-dark">Collections</span>
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Explore our finest handcrafted collections
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {COLLECTIONS.map((c) => (
            <button
              key={c.title}
              onClick={() => applyFilter(c.filter)}
              className="group relative overflow-hidden rounded-2xl bg-card text-left shadow-md transition-shadow duration-500 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <div className="aspect-[4/5] w-full overflow-hidden">
                <img
                  src={c.image}
                  alt={`${c.title} at RAS Jewellers`}
                  width={600}
                  height={750}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-serif text-2xl text-cream md:text-3xl">
                  {c.title}
                </h3>
                <span className="mt-2 inline-block text-xs font-medium uppercase tracking-widest text-cream/80 transition-transform duration-500 group-hover:translate-x-1">
                  Shop now →
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
