"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { SearchFilters } from "./search-filters";

export function Hero() {
  const router = useRouter();

  const handleFilterChange = (filters: {
    city?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
  }) => {
    const params = new URLSearchParams();
    if (filters.city) params.set("city", filters.city);
    if (filters.type) params.set("type", filters.type);
    if (filters.minPrice) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.minBedrooms) params.set("minBedrooms", filters.minBedrooms.toString());
    
    router.push(`/properties?${params.toString()}`);
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80"
          alt="Luxury property"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-4">
            Exceptional Properties
          </p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight text-balance">
            Discover Your Dream Home in France
          </h1>
          <p className="text-white/90 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
            Explore our exclusive collection of luxury properties in the most prestigious 
            locations across France. From Parisian penthouses to Mediterranean villas.
          </p>
          
          <div className="max-w-4xl mx-auto">
            <SearchFilters onFilterChange={handleFilterChange} variant="hero" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
