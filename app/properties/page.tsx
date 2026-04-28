"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyCard } from "@/components/property-card";
import { SearchFilters } from "@/components/search-filters";
import { properties, filterProperties } from "@/lib/properties";

export default function PropertiesPage() {
  const searchParams = useSearchParams();
  const [filteredProperties, setFilteredProperties] = useState(properties);

  useEffect(() => {
    const city = searchParams.get("city") || undefined;
    const type = searchParams.get("type") || undefined;
    const minPrice = searchParams.get("minPrice")
      ? parseInt(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseInt(searchParams.get("maxPrice")!)
      : undefined;
    const minBedrooms = searchParams.get("minBedrooms")
      ? parseInt(searchParams.get("minBedrooms")!)
      : undefined;

    const filtered = filterProperties({
      city,
      type,
      minPrice,
      maxPrice,
      minBedrooms,
    });
    setFilteredProperties(filtered);
  }, [searchParams]);

  const handleFilterChange = (filters: {
    city?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
  }) => {
    const filtered = filterProperties(filters);
    setFilteredProperties(filtered);
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="pt-40 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-3">
            Our Portfolio
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Luxury Properties
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Browse our exceptional collection of properties across France&apos;s most 
            prestigious locations.
          </p>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <SearchFilters onFilterChange={handleFilterChange} variant="page" />
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredProperties.length}</span> properties
            </p>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                No properties found matching your criteria.
              </p>
              <p className="text-muted-foreground mt-2">
                Try adjusting your filters to see more results.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
