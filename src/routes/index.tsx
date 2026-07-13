import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/site/announcement-bar";
import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Services } from "@/components/site/services";
import { Trending } from "@/components/site/trending";
import { Gallery } from "@/components/site/gallery";
import { Categories } from "@/components/site/categories";
import { MaterialCollections } from "@/components/site/material-collections";
import { About } from "@/components/site/about";
import { GoldRateBanner } from "@/components/site/gold-rate";
import { Footer } from "@/components/site/footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <Trending />
        <Gallery />
        <Categories />
        <MaterialCollections />
        <About />
        <GoldRateBanner />
      </main>
      <Footer />
    </div>
  );
}

