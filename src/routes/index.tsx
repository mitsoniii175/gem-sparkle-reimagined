import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Trending } from "@/components/site/trending";
import { Categories } from "@/components/site/categories";
import { MaterialCollections } from "@/components/site/material-collections";
import { GoldRateBanner } from "@/components/site/gold-rate";
import { Footer } from "@/components/site/footer";
import type { Material } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [materialFilter, setMaterialFilter] = useState<Material | "all">("all");

  function handleSelectMaterial(m: Material) {
    setMaterialFilter((current) => (current === m ? "all" : m));
    const trending = document.getElementById("trending");
    if (trending) trending.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Trending materialFilter={materialFilter} />
        <Categories />
        <MaterialCollections onSelect={handleSelectMaterial} />
        <GoldRateBanner />
      </main>
      <Footer />
    </div>
  );
}
