import { useState } from "react";
import { Search, Heart, ShoppingBag, User, Facebook, Instagram, Menu, X } from "lucide-react";
import { NAV, SITE, applyFilter, labelToCategory } from "@/lib/site-data";
import logo from "@/assets/ras-logo.jpg";

function handleNavClick(label: string) {
  const cat = labelToCategory(label);
  if (cat) {
    applyFilter({ kind: "category", value: cat });
    return;
  }
  const lower = label.toLowerCase();
  if (lower.includes("gold")) return applyFilter({ kind: "material", value: "gold" });
  if (lower.includes("silver")) return applyFilter({ kind: "material", value: "silver" });
  if (lower.includes("diamond")) return applyFilter({ kind: "material", value: "diamond" });
  // Fallback: just scroll to the products grid.
  applyFilter({ kind: "all" });
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOn, setWishlistOn] = useState(false);
  const [query, setQuery] = useState("");

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    const trending = document.getElementById("trending");
    if (trending) trending.scrollIntoView({ behavior: "smooth" });
    // Broadcast the query so the Trending section can filter itself.
    window.dispatchEvent(new CustomEvent("ras-search", { detail: query }));
  }

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
        <form
          onSubmit={handleSearch}
          className="mx-auto hidden w-full max-w-xl items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 md:flex"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Rings, Necklaces, Bridal…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </form>

        {/* Right */}
        <div className="ml-auto flex items-center gap-1">
          <button className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-medium uppercase tracking-wide transition-colors hover:border-primary hover:text-gold-dark sm:flex">
            <User className="h-4 w-4" /> Account
          </button>
          <button
            aria-label="Wishlist"
            onClick={() => setWishlistOn((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:text-gold-dark"
          >
            <Heart className={`h-5 w-5 ${wishlistOn ? "fill-gold-dark text-gold-dark" : ""}`} />
          </button>
          <button
            aria-label="Cart"
            onClick={() => setCartOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-foreground/70 transition-colors hover:text-gold-dark"
          >
            <ShoppingBag className="h-5 w-5" />
          </button>
          <div className="mx-1 hidden h-6 w-px bg-border lg:block" />
          <div className="hidden items-center gap-2 text-muted-foreground lg:flex">
            <a href="#" aria-label="Facebook" className="transition-colors hover:text-gold-dark"><Facebook className="h-4 w-4" /></a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer noopener" aria-label="Instagram" className="transition-colors hover:text-gold-dark"><Instagram className="h-4 w-4" /></a>
          </div>
          <button
            aria-label="Menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-full lg:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile search + menu */}
      {menuOpen && (
        <div className="border-t border-border bg-cream px-4 py-4 lg:hidden">
          <form onSubmit={handleSearch} className="mb-4 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Rings, Necklaces, Bridal…"
              className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
            />
          </form>
          <ul className="space-y-3">
            {NAV.map((n) => (
              <li key={n.label} className="text-sm font-medium text-foreground/80">
                {n.label}
              </li>
            ))}
          </ul>
        </div>
      )}

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
                    <a key={it} href="#trending" className="block whitespace-nowrap rounded px-4 py-2 text-sm text-foreground/70 hover:bg-secondary hover:text-gold-dark">
                      {it}
                    </a>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Cart drawer */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60]" onClick={() => setCartOpen(false)}>
          <div className="absolute inset-0 bg-black/40" />
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-card p-6 shadow-xl"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-xl">Your Bag</h3>
              <button aria-label="Close cart" onClick={() => setCartOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-10 flex flex-1 flex-col items-center justify-center text-center text-sm text-muted-foreground">
              <ShoppingBag className="mb-3 h-8 w-8 text-muted-foreground/50" />
              Your bag is empty.
              <br />
              Visit a showroom or call {SITE.phone} to place an order.
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
