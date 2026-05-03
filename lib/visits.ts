import { supabase } from "./supabase";

export interface VisitReservation {
  id: string;
  property_id: string;
  property_title: string;
  user_id: string;
  requested_date: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  id_upload_url?: string;
  notes?: string;
  created_at: string;
}

export async function getPropertyVisits(
  propertyId: string,
): Promise<VisitReservation[]> {
  const { data, error } = await supabase
    .from("visits")
    .select("*")
    .eq("property_id", propertyId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching visits:", error);
    return [];
  }
  return data || [];
}

export async function createVisit(
  propertyId: string,
  propertyTitle: string,
  requestedDate: string,
  idUploadUrl?: string,
  notes?: string,
): Promise<{ data: VisitReservation | null; error: any }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { data: null, error: new Error("User not authenticated") };
  }

  const { data, error } = await supabase
    .from("visits")
    .insert({
      property_id: propertyId,
      property_title: propertyTitle,
      user_id: user.id,
      requested_date: requestedDate,
      status: "pending" as const,
      id_upload_url: idUploadUrl,
      notes,
    })
    .select()
    .single();

  if (error) console.error("Error creating visit:", error);
  return { data, error };
}

export async function uploadIdCard(file: File): Promise<string | null> {
  if (!file) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `id-${Date.now()}.${fileExt}`;
  const filePath = `id-cards/${fileName}`;

  const { data, error } = await supabase.storage
    .from("id-cards")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Upload error:", error);
    return null;
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("id-cards").getPublicUrl(filePath);

  return publicUrl;
}

export async function updateVisitStatus(
  visitId: string,
  newStatus: "confirmed" | "cancelled" | "completed",
): Promise<{ success: boolean; error?: any }> {
  const { data, error } = await supabase
    .from("visits")
    .update({ status: newStatus })
    .eq("id", visitId)
    .select()
    .single();

  if (error) {
    console.error("Update error:", error);
    return { success: false, error };
  }
  return { success: true };
}

export async function getAllVisits(): Promise<VisitReservation[]> {
  const { data, error } = await supabase
    .from("visits")
    .select("*, maisons(titre, ville)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching all visits:", error);
    return [];
  }
  return data || [];
}
