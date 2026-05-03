"use client";

import { useState } from "react";
import Link from "next/link";
import { getPropertyVisits } from "@/lib/visits";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CalendarDays } from "lucide-react";

interface Property {
  id: string;
  titre: string;
  ville: string;
}

interface VisitReservation {
  id: string;
  property_title: string;
  requested_date: string;
  status: string;
}

interface PropertyVisitButtonsProps {
  property: Property;
}

export function PropertyVisitButtons({ property }: PropertyVisitButtonsProps) {
  const [visits, setVisits] = useState<VisitReservation[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const loadVisits = async () => {
    setLoading(true);
    const data = await getPropertyVisits(property.id);
    setVisits(data);
    setOpen(true);
    setLoading(false);
  };

  return (
    <div className="space-y-3 mt-6">
      <Link
        href={`/reserve?id=${property.id}`}
        className="block w-full bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-xl text-lg shadow-lg hover:shadow-xl transition-all duration-300 text-center"
      >
        🎯 Réserver une visite
      </Link>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            onClick={loadVisits}
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            size="lg"
          >
            <CalendarDays className="mr-2 h-5 w-5" />
            {loading ? "Chargement..." : "📋 Voir toutes les visites"}
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md sm:max-w-lg p-0">
          <div className="p-6">
            <h3 className="text-2xl font-bold text-center mb-6 text-foreground">
              📋 Visites pour {property.titre}
            </h3>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {visits.length === 0 ? (
                <div className="text-center py-12">
                  <CalendarDays className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-lg">
                    Aucune visite réservée pour ce bien
                  </p>
                </div>
              ) : (
                visits.map((visit) => (
                  <div
                    key={visit.id}
                    className="group bg-gradient-to-r from-muted to-background p-6 rounded-2xl border hover:border-primary/50 transition-all duration-200 hover:shadow-lg"
                  >
                    <div className="font-bold text-xl mb-3 line-clamp-1 group-hover:text-primary">
                      {visit.property_title}
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2 bg-primary/10 px-3 py-2 rounded-full">
                        <CalendarDays className="h-4 w-4" />
                        <span>
                          {new Date(visit.requested_date).toLocaleDateString(
                            "fr-FR",
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-100 text-emerald-800">
                        <span>
                          📋{" "}
                          {visit.status === "pending"
                            ? "En attente"
                            : visit.status.charAt(0).toUpperCase() +
                              visit.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
