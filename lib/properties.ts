export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  bedrooms: number;
  bathrooms: number;
  area: number;
  type: 'apartment' | 'house' | 'villa' | 'penthouse';
  features: string[];
  images: string[];
  featured: boolean;
  status: 'for-sale' | 'for-rent';
}

export const properties: Property[] = [
  {
    id: "1",
    title: "Luxurious Penthouse with Panoramic Views",
    description: "Experience the pinnacle of luxury living in this stunning penthouse featuring floor-to-ceiling windows, a private terrace, and breathtaking city views. The open-concept living space is perfect for entertaining, while the chef's kitchen boasts top-of-the-line appliances.",
    price: 2850000,
    location: "Paris 16ème",
    city: "Paris",
    address: "Avenue Foch, Paris 16ème",
    coordinates: { lat: 48.8714, lng: 2.2847 },
    bedrooms: 4,
    bathrooms: 3,
    area: 280,
    type: "penthouse",
    features: ["Private Terrace", "Concierge", "Wine Cellar", "Smart Home", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
    ],
    featured: true,
    status: "for-sale"
  },
  {
    id: "2",
    title: "Elegant Haussmannian Apartment",
    description: "A beautifully restored Haussmannian apartment combining classic Parisian charm with modern amenities. Features include original parquet floors, ornate moldings, marble fireplaces, and a recently renovated kitchen.",
    price: 1650000,
    location: "Saint-Germain-des-Prés",
    city: "Paris",
    address: "Rue de Sèvres, Paris 6ème",
    coordinates: { lat: 48.8508, lng: 2.3266 },
    bedrooms: 3,
    bathrooms: 2,
    area: 175,
    type: "apartment",
    features: ["Period Features", "High Ceilings", "Balcony", "Cellar", "Elevator"],
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80"
    ],
    featured: true,
    status: "for-sale"
  },
  {
    id: "3",
    title: "Mediterranean Villa with Pool",
    description: "Stunning Mediterranean-style villa set in manicured gardens with infinity pool overlooking the sea. This exceptional property offers unparalleled privacy and luxury living on the French Riviera.",
    price: 4500000,
    location: "Cap d'Antibes",
    city: "Antibes",
    address: "Boulevard du Cap, Antibes",
    coordinates: { lat: 43.5536, lng: 7.1357 },
    bedrooms: 6,
    bathrooms: 5,
    area: 450,
    type: "villa",
    features: ["Infinity Pool", "Sea View", "Guest House", "Garden", "Security"],
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
    ],
    featured: true,
    status: "for-sale"
  },
  {
    id: "4",
    title: "Modern Loft in Historic District",
    description: "An exceptional loft conversion in the heart of Lyon's UNESCO-listed old town. Industrial chic meets contemporary comfort with exposed brick, steel beams, and designer finishes throughout.",
    price: 890000,
    location: "Vieux Lyon",
    city: "Lyon",
    address: "Rue Saint-Jean, Lyon",
    coordinates: { lat: 45.7614, lng: 4.8271 },
    bedrooms: 2,
    bathrooms: 2,
    area: 145,
    type: "apartment",
    features: ["Exposed Brick", "High Ceilings", "Rooftop Access", "Historic Building"],
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&q=80"
    ],
    featured: false,
    status: "for-sale"
  },
  {
    id: "5",
    title: "Seafront Apartment in Cannes",
    description: "Wake up to the sound of waves in this prestigious seafront apartment on La Croisette. Enjoy direct beach access, stunning Mediterranean views, and the finest address in Cannes.",
    price: 3200000,
    location: "La Croisette",
    city: "Cannes",
    address: "Boulevard de la Croisette, Cannes",
    coordinates: { lat: 43.5512, lng: 7.0173 },
    bedrooms: 3,
    bathrooms: 2,
    area: 165,
    type: "apartment",
    features: ["Seafront", "Beach Access", "24h Concierge", "Parking", "Terrace"],
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&q=80"
    ],
    featured: true,
    status: "for-sale"
  },
  {
    id: "6",
    title: "Charming Provençal Mas",
    description: "An authentic Provençal farmhouse surrounded by lavender fields and olive groves. Meticulously restored to preserve its character while offering all modern comforts.",
    price: 1850000,
    location: "Luberon",
    city: "Gordes",
    address: "Route de Gordes, Luberon",
    coordinates: { lat: 43.9119, lng: 5.2019 },
    bedrooms: 5,
    bathrooms: 4,
    area: 320,
    type: "house",
    features: ["Pool", "Olive Grove", "Wine Cellar", "Guest Cottage", "Views"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80"
    ],
    featured: false,
    status: "for-sale"
  },
  {
    id: "7",
    title: "Designer Apartment Near Champs-Élysées",
    description: "A meticulously designed contemporary apartment steps from the Champs-Élysées. Featuring bespoke interiors by a renowned designer, this property epitomizes Parisian sophistication.",
    price: 2100000,
    location: "Triangle d'Or",
    city: "Paris",
    address: "Avenue George V, Paris 8ème",
    coordinates: { lat: 48.8664, lng: 2.3016 },
    bedrooms: 2,
    bathrooms: 2,
    area: 130,
    type: "apartment",
    features: ["Designer Interior", "Concierge", "Gym Access", "Secure Parking"],
    images: [
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80"
    ],
    featured: false,
    status: "for-sale"
  },
  {
    id: "8",
    title: "Historic Château with Vineyard",
    description: "A magnificent 18th-century château set within its own producing vineyard. This exceptional estate includes formal gardens, a chapel, and multiple outbuildings.",
    price: 8500000,
    location: "Bordeaux Region",
    city: "Saint-Émilion",
    address: "Route des Châteaux, Saint-Émilion",
    coordinates: { lat: 44.8964, lng: -0.1556 },
    bedrooms: 12,
    bathrooms: 8,
    area: 1200,
    type: "house",
    features: ["Vineyard", "Chapel", "Staff Quarters", "Gardens", "Wine Production"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80"
    ],
    featured: true,
    status: "for-sale"
  }
];

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function getPropertyById(id: string): Property | undefined {
  return properties.find(p => p.id === id);
}

export function getFeaturedProperties(): Property[] {
  return properties.filter(p => p.featured);
}

export function filterProperties(filters: {
  city?: string;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minArea?: number;
}): Property[] {
  return properties.filter(property => {
    if (filters.city && property.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }
    if (filters.type && property.type !== filters.type) {
      return false;
    }
    if (filters.minPrice && property.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && property.price > filters.maxPrice) {
      return false;
    }
    if (filters.minBedrooms && property.bedrooms < filters.minBedrooms) {
      return false;
    }
    if (filters.minArea && property.area < filters.minArea) {
      return false;
    }
    return true;
  });
}
