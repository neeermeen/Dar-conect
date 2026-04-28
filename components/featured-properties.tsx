import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getFeaturedProperties } from "@/lib/properties";
import { PropertyCard } from "./property-card";
import { Button } from "@/components/ui/button";

export function FeaturedProperties() {
  const featuredProperties = getFeaturedProperties().slice(0, 6);

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-3">
            Featured Collection
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Exceptional Properties
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hand-picked properties representing the finest in French luxury real estate, 
            selected for their exceptional quality, location, and investment potential.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} featured />
          ))}
        </div>

        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-primary-foreground px-8"
          >
            <Link href="/properties">
              View All Properties
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
