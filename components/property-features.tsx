import { Check } from "lucide-react";
import { Property } from "@/lib/properties";

interface PropertyFeaturesProps {
  property: Property;
}

export function PropertyFeatures({ property }: PropertyFeaturesProps) {
  return (
    <div>
      <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
        Features & Amenities
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {property.features.map((feature, index) => (
          <div
            key={index}
            className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg"
          >
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
              <Check className="h-4 w-4 text-gold" />
            </div>
            <span className="text-foreground font-medium">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
