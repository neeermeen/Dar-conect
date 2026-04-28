"use client";

import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon, DivIcon } from "leaflet";
import Link from "next/link";
import { Property, formatPrice } from "@/lib/properties";
import "leaflet/dist/leaflet.css";

interface PropertyMapProps {
  properties: Property[];
  selectedProperty?: Property | null;
  onPropertySelect?: (property: Property | null) => void;
  center?: [number, number];
  zoom?: number;
}

export function PropertyMap({
  properties,
  selectedProperty,
  onPropertySelect,
  center = [46.603354, 1.888334],
  zoom = 6,
}: PropertyMapProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-secondary/50 flex items-center justify-center">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  const createCustomIcon = (property: Property, isSelected: boolean) => {
    const price = formatPrice(property.price);
    return new DivIcon({
      className: "custom-marker",
      html: `
        <div class="relative">
          <div class="px-3 py-1.5 rounded-lg shadow-lg font-semibold text-sm whitespace-nowrap transition-all ${
            isSelected
              ? "bg-gold text-primary scale-110"
              : "bg-white text-foreground hover:scale-105"
          }" style="transform-origin: bottom center;">
            ${price}
          </div>
          <div class="absolute left-1/2 -translate-x-1/2 -bottom-2 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] ${
            isSelected ? "border-t-gold" : "border-t-white"
          }"></div>
        </div>
      `,
      iconSize: [100, 40],
      iconAnchor: [50, 40],
    });
  };

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      className="w-full h-full rounded-lg"
      style={{ minHeight: "400px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Marker
          key={property.id}
          position={[property.coordinates.lat, property.coordinates.lng]}
          icon={createCustomIcon(
            property,
            selectedProperty?.id === property.id
          )}
          eventHandlers={{
            click: () => onPropertySelect?.(property),
          }}
        >
          <Popup>
            <div className="p-2 min-w-[200px]">
              <h3 className="font-semibold text-foreground mb-1 line-clamp-1">
                {property.title}
              </h3>
              <p className="text-muted-foreground text-sm mb-2">
                {property.location}, {property.city}
              </p>
              <p className="font-bold text-gold mb-3">
                {formatPrice(property.price)}
              </p>
              <Link
                href={`/property/${property.id}`}
                className="text-sm text-gold hover:underline"
              >
                View Details →
              </Link>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
