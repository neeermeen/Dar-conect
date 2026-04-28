import Link from "next/link";
import Image from "next/image";
import { Bed, Bath, Square, MapPin } from "lucide-react";
import { Property, formatPrice } from "@/lib/properties";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PropertyCardProps {
  property: Property;
  featured?: boolean;
}

export function PropertyCard({ property, featured = false }: PropertyCardProps) {
  return (
    <Link href={`/property/${property.id}`}>
      <Card className={`group overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${featured ? 'h-full' : ''}`}>
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute top-4 left-4 flex gap-2">
            <Badge className="bg-gold text-primary font-medium">
              {property.type.charAt(0).toUpperCase() + property.type.slice(1)}
            </Badge>
            {property.featured && (
              <Badge className="bg-primary text-primary-foreground font-medium">
                Featured
              </Badge>
            )}
          </div>
          <div className="absolute bottom-4 left-4 right-4">
            <p className="text-white font-serif text-2xl font-bold">
              {formatPrice(property.price)}
            </p>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-serif text-xl font-semibold text-foreground mb-2 line-clamp-1 group-hover:text-gold transition-colors">
            {property.title}
          </h3>
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <MapPin className="h-4 w-4 text-gold" />
            <span className="text-sm">{property.location}, {property.city}</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4 text-gold" />
              <span>{property.bedrooms} beds</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="h-4 w-4 text-gold" />
              <span>{property.bathrooms} baths</span>
            </div>
            <div className="flex items-center gap-2">
              <Square className="h-4 w-4 text-gold" />
              <span>{property.area} m²</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
