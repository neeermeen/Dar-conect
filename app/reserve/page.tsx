"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { getPropertyById } from "@/lib/properties";
import { createVisit, uploadIdCard } from "@/lib/visits";
import { Property } from "@/lib/properties";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { CalendarIcon, Upload, MapPin, Home, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function ReservePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const propertyId = searchParams.get("id");

  const [property, setProperty] = useState<Property | null>(null);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [file, setFile] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const init = async () => {
      if (!propertyId) {
        router.push("/properties");
        return;
      }

      // Fetch property
      const prop = await getPropertyById(propertyId);
      setProperty(prop);

      // Check auth
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      if (!user) {
        router.push("/login?redirect=/reserve?id=" + propertyId);
      }
    };
    init();
  }, [propertyId, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!property || !propertyId || !date || !file || !user) return;

    setLoading(true);
    try {
      // Upload ID
      const idUrl = await uploadIdCard(file);

      // Create visit
      const { error } = await createVisit(
        propertyId,
        property.titre,
        date.toISOString(),
        idUrl || "",
        notes || undefined,
      );

      if (error) throw error;

      toast({
        title: "✅ Visite réservée !",
        description: "Nous vous contacterons bientôt pour confirmer.",
      });

      router.push("/account");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "❌ Erreur",
        description: error.message || "Réessayez.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!property || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          Chargement...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
          <Link href={`/property/${propertyId}`}>
            <ArrowLeft className="h-4 w-4 mr-1" /> Retour
          </Link>
        </Button>

        <Card className="shadow-xl">
          <CardHeader className="text-center pb-4">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Home className="h-8 w-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Réserver visite</CardTitle>
            <p className="text-muted-foreground text-lg font-medium">
              {property.titre}
            </p>
            <p className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" /> {property.ville}
            </p>
          </CardHeader>

          <CardContent className="pt-0">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date">📅 Date souhaitée</Label>
                <Input
                  id="date"
                  type="date"
                  className="h-12"
                  value={date ? format(date, "yyyy-MM-dd") : ""}
                  onChange={(e) =>
                    setDate(
                      e.target.value ? new Date(e.target.value) : undefined,
                    )
                  }
                  min={format(new Date(), "yyyy-MM-dd")}
                  required
                />
              </div>

              <div>
                <Label htmlFor="id-card">
                  🆔 Carte d'identité
                  <span className="text-destructive ml-1">*</span>
                </Label>
                <Input
                  id="id-card"
                  type="file"
                  accept="image/jpeg,image/png,image/jpg,application/pdf"
                  className="mt-2"
                  onChange={(e) =>
                    setFile(e.target.files ? e.target.files[0] : null)
                  }
                  required
                />
                {file && (
                  <div className="mt-2 p-3 bg-muted/50 rounded-md text-sm">
                    <Upload className="inline h-4 w-4 mr-2" />
                    {file.name} ({(file.size / 1024 / 1024).toFixed(1)} MB)
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">💬 Message optionnel</Label>
                <textarea
                  id="notes"
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                  placeholder="Ex: Préférer matin, questions sur le bien..."
                  maxLength={500}
                />
                <p className="text-xs text-muted-foreground">
                  {notes.length}/500
                </p>
              </div>

              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={loading || !date || !file}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white/80 mr-2 inline-block" />
                    Réservation en cours...
                  </>
                ) : (
                  "Confirmer ma réservation"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
