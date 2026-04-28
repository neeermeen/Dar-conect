"use client";

import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  onFilterChange: (filters: {
    city?: string;
    type?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
  }) => void;
  className?: string;
  variant?: "hero" | "page";
}

const cities = ["Paris", "Cannes", "Antibes", "Lyon", "Gordes", "Saint-Émilion"];
const propertyTypes = ["apartment", "house", "villa", "penthouse"];
const priceRanges = [
  { label: "Any Price", min: undefined, max: undefined },
  { label: "Under €1M", min: undefined, max: 1000000 },
  { label: "€1M - €2M", min: 1000000, max: 2000000 },
  { label: "€2M - €5M", min: 2000000, max: 5000000 },
  { label: "Over €5M", min: 5000000, max: undefined },
];
const bedroomOptions = [
  { label: "Any", value: undefined },
  { label: "1+", value: 1 },
  { label: "2+", value: 2 },
  { label: "3+", value: 3 },
  { label: "4+", value: 4 },
  { label: "5+", value: 5 },
];

export function SearchFilters({
  onFilterChange,
  className = "",
  variant = "page",
}: SearchFiltersProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [city, setCity] = useState<string>("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [priceRange, setPriceRange] = useState<string>("0");
  const [bedrooms, setBedrooms] = useState<string>("");

  const handleSearch = () => {
    const selectedPriceRange = priceRanges[parseInt(priceRange)];
    onFilterChange({
      city: city || undefined,
      type: propertyType || undefined,
      minPrice: selectedPriceRange?.min,
      maxPrice: selectedPriceRange?.max,
      minBedrooms: bedrooms ? parseInt(bedrooms) : undefined,
    });
  };

  const handleReset = () => {
    setCity("");
    setPropertyType("");
    setPriceRange("0");
    setBedrooms("");
    onFilterChange({});
  };

  const isHero = variant === "hero";

  return (
    <div
      className={`${
        isHero
          ? "bg-white/95 backdrop-blur-md rounded-xl shadow-2xl p-6"
          : "bg-card rounded-lg border border-border p-6"
      } ${className}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Location
          </label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {cities.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Property Type
          </label>
          <Select value={propertyType} onValueChange={setPropertyType}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              {propertyTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Price Range
          </label>
          <Select value={priceRange} onValueChange={setPriceRange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any Price" />
            </SelectTrigger>
            <SelectContent>
              {priceRanges.map((range, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {range.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Bedrooms
          </label>
          <Select value={bedrooms} onValueChange={setBedrooms}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              {bedroomOptions.map((option) => (
                <SelectItem
                  key={option.label}
                  value={option.value?.toString() || "any"}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-6">
        <Button
          onClick={handleSearch}
          className="flex-1 md:flex-none bg-gold hover:bg-gold/90 text-primary font-medium"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Properties
        </Button>
        <Button
          variant="outline"
          onClick={handleReset}
          className="border-border text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
}
