export function GoldRateBanner() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container-x flex flex-col items-center justify-between gap-4 py-6 text-center md:flex-row md:text-left">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] opacity-80">Today's Gold Rate</p>
          <p className="mt-1 font-serif text-2xl">22K Gold · ₹ 6,540 / gram</p>
        </div>
        <div className="flex gap-8">
          <div>
            <p className="text-xs uppercase tracking-widest opacity-80">24K Gold</p>
            <p className="font-serif text-xl">₹ 7,130 /g</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-widest opacity-80">Silver</p>
            <p className="font-serif text-xl">₹ 92 /g</p>
          </div>
        </div>
      </div>
    </section>
  );
}
