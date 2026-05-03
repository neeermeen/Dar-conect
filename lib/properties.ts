import { supabase } from "./supabase";

export interface Property {
  id: string;
  titre: string;
  description: string;
  prix_mensuel: number;
  ville: string;
  photo_url?: string;
}

export async function getProperties(): Promise<Property[]> {
  const { data, error } = await supabase.from("maisons").select("*");

  if (error) {
    console.error("Erreur:", error);
    return [];
  }

  return data || [];
}

export async function getPropertyById(id: string): Promise<Property | null> {
  const { data, error } = await supabase
    .from("maisons")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return null;
  return data;
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(price);
}
