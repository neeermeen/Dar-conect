import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { FeaturedProperties } from "@/components/featured-properties";
import { StatsSection } from "@/components/stats-section";
import { ServicesSection } from "@/components/services-section";
import { Footer } from "@/components/footer";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedProperties />
      <StatsSection />
      <ServicesSection />
      <Footer />
    </main>
  );
}
