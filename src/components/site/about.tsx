import { Check } from "lucide-react";
import { ABOUT } from "@/lib/site-data";
import founders from "@/assets/about/founders.jpg";

export function About() {
  return (
    <section id="about" className="bg-secondary/50 py-16">
      <div className="container-x">
        <div className="mb-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold-dark">About Us</p>
          <h2 className="mt-2 font-serif text-3xl md:text-4xl">{ABOUT.heading}</h2>
        </div>

        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={founders}
              alt="RAS Jewellers founders"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <p className="mt-2 text-center text-xs text-muted-foreground">Our Founders</p>
          </div>
          <div>
            <div className="space-y-4 text-sm text-muted-foreground md:text-base">
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

        {/* Our Promise */}
        <div className="mt-14 rounded-2xl border border-border bg-card p-8 md:p-10">
          <h3 className="text-center font-serif text-2xl text-gold-dark">Our Promise</h3>
          <ul className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2">
            {ABOUT.promise.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-foreground/80">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold-dark" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center font-serif text-lg text-gold-dark">RAS JEWELLERS</p>
          <p className="text-center text-sm italic text-muted-foreground">{ABOUT.tagline}</p>
        </div>
      </div>
    </section>
  );
}
