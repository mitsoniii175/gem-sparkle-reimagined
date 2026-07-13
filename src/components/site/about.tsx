import { ABOUT } from "@/lib/site-data";
import goldSet from "@/assets/products/gold-set.jpg";

export function About() {
  return (
    <section id="about" className="bg-secondary/50 py-16">
      <div className="container-x grid gap-10 md:grid-cols-2 md:items-center">
        <div className="overflow-hidden rounded-2xl">
          <img
            src={goldSet}
            alt="RAS Jewellers handcrafted gold jewellery"
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-dark">About Us</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">{ABOUT.heading}</h2>
          <div className="mt-4 space-y-4 text-sm text-muted-foreground md:text-base">
            {ABOUT.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-border pt-6">
            {ABOUT.highlights.map((h) => (
              <div key={h.label}>
                <p className="font-serif text-lg text-gold-dark md:text-xl">{h.value}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-muted-foreground">{h.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
