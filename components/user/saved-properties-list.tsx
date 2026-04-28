"use client";

import { SavedProperty } from "@/lib/user";
import { properties } from "@/lib/properties";
import { PropertyCard } from "@/components/property-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

interface SavedPropertiesListProps {
  savedProperties: SavedProperty[];
}

export function SavedPropertiesList({ savedProperties }: SavedPropertiesListProps) {
  const savedPropertyData = savedProperties
    .map((sp) => {
      const property = properties.find((p) => p.id === sp.propertyId);
      return property ? { ...property, savedAt: sp.savedAt } : null;
    })
    .filter(Boolean);

  if (savedPropertyData.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl text-foreground mb-2">
              Aucun Favori
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              {"Vous n'avez pas encore de propriétés sauvegardées. Explorez nos biens et ajoutez vos favoris."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Heart className="h-5 w-5 text-accent" />
            Mes Propriétés Favorites
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {savedPropertyData.length} propriété{savedPropertyData.length > 1 ? "s" : ""} sauvegardée{savedPropertyData.length > 1 ? "s" : ""}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {savedPropertyData.map((property) => (
          property && <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  );
}
