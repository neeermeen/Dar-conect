import { Bed, Bath, Square, MapPin, Calendar } from "lucide-react";
import { Property, formatPrice } from "@/lib/properties";
import { Badge } from "@/components/ui/badge";

interface PropertyInfoProps {
  property: Property;
}

export function PropertyInfo({ property }: PropertyInfoProps) {
  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Badge className="bg-gold text-primary font-medium">
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </Badge>
            <Badge variant="outline" className="border-gold text-gold">
              {property.status === "for-sale" ? "For Sale" : "For Rent"}
            </Badge>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
            {property.title}
          </h1>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 text-gold" />
            <span>{property.address}</span>
          </div>
        </div>
        <div className="text-right">
          <p className="font-serif text-3xl md:text-4xl font-bold text-gold">
            {formatPrice(property.price)}
          </p>
          {property.status === "for-sale" && (
            <p className="text-muted-foreground text-sm mt-1">
              {Math.round(property.price / property.area).toLocaleString("fr-FR")} €/m²
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 bg-secondary/50 rounded-xl mb-8">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-3">
            <Bed className="h-6 w-6 text-gold" />
          </div>
          <p className="font-semibold text-foreground text-lg">{property.bedrooms}</p>
          <p className="text-muted-foreground text-sm">Bedrooms</p>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-3">
            <Bath className="h-6 w-6 text-gold" />
          </div>
          <p className="font-semibold text-foreground text-lg">{property.bathrooms}</p>
          <p className="text-muted-foreground text-sm">Bathrooms</p>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-3">
            <Square className="h-6 w-6 text-gold" />
          </div>
          <p className="font-semibold text-foreground text-lg">{property.area} m²</p>
          <p className="text-muted-foreground text-sm">Living Area</p>
        </div>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 mb-3">
            <MapPin className="h-6 w-6 text-gold" />
          </div>
          <p className="font-semibold text-foreground text-lg">{property.city}</p>
          <p className="text-muted-foreground text-sm">Location</p>
        </div>
      </div>

      <div>
        <h2 className="font-serif text-2xl font-semibold text-foreground mb-4">
          About This Property
        </h2>
        <p className="text-muted-foreground leading-relaxed">
          {property.description}
        </p>
      </div>
    </div>
  );
}
