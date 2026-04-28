"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { X, Bed, Bath, Square, MapPin, ChevronRight } from "lucide-react";
import { Header } from "@/components/header";
import { properties, Property, formatPrice } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const PropertyMap = dynamic(
  () => import("@/components/property-map").then((mod) => mod.PropertyMap),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    ),
  }
);

export default function MapPage() {
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 pt-32 pb-6 px-4">
        <div className="container mx-auto h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-serif text-3xl font-bold text-foreground">
                Map View
              </h1>
              <p className="text-muted-foreground">
                Explore {properties.length} properties across France
              </p>
            </div>
            <Button
              asChild
              variant="outline"
              className="border-gold text-gold hover:bg-gold hover:text-primary-foreground"
            >
              <Link href="/properties">
                View List
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative h-[calc(100vh-220px)] rounded-xl overflow-hidden shadow-lg border border-border">
            <PropertyMap
              properties={properties}
              selectedProperty={selectedProperty}
              onPropertySelect={setSelectedProperty}
            />

            {selectedProperty && (
              <div className="absolute bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 z-[1000]">
                <Card className="border-0 shadow-2xl overflow-hidden">
                  <button
                    className="absolute top-3 right-3 z-10 p-1.5 rounded-full bg-white/90 hover:bg-white shadow-md"
                    onClick={() => setSelectedProperty(null)}
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="relative h-40">
                    <Image
                      src={selectedProperty.images[0]}
                      alt={selectedProperty.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <p className="text-white font-serif text-xl font-bold">
                        {formatPrice(selectedProperty.price)}
                      </p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif text-lg font-semibold text-foreground mb-1 line-clamp-1">
                      {selectedProperty.title}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4 text-gold" />
                      <span className="text-sm">
                        {selectedProperty.location}, {selectedProperty.city}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1.5">
                        <Bed className="h-4 w-4 text-gold" />
                        <span>{selectedProperty.bedrooms}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Bath className="h-4 w-4 text-gold" />
                        <span>{selectedProperty.bathrooms}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Square className="h-4 w-4 text-gold" />
                        <span>{selectedProperty.area} m²</span>
                      </div>
                    </div>
                    <Button
                      asChild
                      className="w-full bg-gold hover:bg-gold/90 text-primary"
                    >
                      <Link href={`/property/${selectedProperty.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
