import { Search, Heart, ShoppingBag, User, Facebook, Instagram, Menu } from "lucide-react";
import { NAV, SITE } from "@/lib/site-data";
import logo from "@/assets/ras-logo.jpg";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-cream/95 backdrop-blur">
      <div className="container-x flex items-center gap-4 py-4">
        {/* Logo */}
        <a href="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="RAS Jewellers logo"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full object-cover ring-1 ring-primary/30"
          />
          <span className="font-serif text-xl font-semibold tracking-[0.2em] text-gold-dark">
            {SITE.name}
          </span>
        </a>

        {/* Search */}
        <div className="mx-auto hidden w-full max-w-xl items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 md:flex">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            placeholder="Search Rings, Necklaces, Bridal…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        {/* Right */}
        <div className="ml-auto flex items-center gap-1">
          <button className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors hover:border-primary hover:text-gold-dark sm:flex">
            <User className="h-4 w-4" /> Account
          </button>
          <button aria-label="Wishlist" className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:text-gold-dark">
            <Heart className="h-5 w-5" />
          </button>
          <button aria-label="Cart" className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:text-gold-dark">
            <ShoppingBag className="h-5 w-5" />
          </button>
          <div className="mx-1 hidden h-6 w-px bg-border lg:block" />
          <div className="hidden items-center gap-2 text-muted-foreground lg:flex">
            <a href="#" aria-label="Facebook" className="transition-colors hover:text-gold-dark"><Facebook className="h-4 w-4" /></a>
            <a href="#" aria-label="Instagram" className="transition-colors hover:text-gold-dark"><Instagram className="h-4 w-4" /></a>
          </div>
          <button aria-label="Menu" className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Nav bar */}
      <nav className="hidden border-t border-border lg:block">
        <ul className="container-x flex items-center justify-center gap-8 py-3">
          {NAV.map((n) => (
            <li key={n.label} className="group relative">
              <button className="text-sm font-medium text-foreground/80 transition-colors group-hover:text-gold-dark">
                {n.label}
              </button>
              {n.items.length > 0 && (
                <div className="invisible absolute left-1/2 top-full z-50 mt-2 -translate-x-1/2 rounded-lg border border-border bg-card p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100">
                  {n.items.map((it) => (
                    <a key={it} href="#" className="block whitespace-nowrap rounded px-4 py-2 text-sm text-foreground/70 hover:bg-secondary hover:text-gold-dark">
                      {it}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
