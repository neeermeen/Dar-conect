"use client";

import { useState } from "react";
import { VisitReservation } from "@/lib/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle, XCircle, AlertCircle, MapPin } from "lucide-react";
import Link from "next/link";

interface VisitReservationsListProps {
  visitReservations: VisitReservation[];
}

export function VisitReservationsList({ visitReservations }: VisitReservationsListProps) {
  const [filter, setFilter] = useState<"all" | "pending" | "confirmed" | "completed" | "cancelled">("all");

  const filteredReservations = filter === "all"
    ? visitReservations
    : visitReservations.filter((r) => r.status === filter);

  const statusConfig = {
    pending: {
      label: "En attente",
      icon: Clock,
      className: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    confirmed: {
      label: "Confirmée",
      icon: CheckCircle,
      className: "bg-green-100 text-green-800 border-green-200",
    },
    cancelled: {
      label: "Annulée",
      icon: XCircle,
      className: "bg-red-100 text-red-800 border-red-200",
    },
    completed: {
      label: "Terminée",
      icon: CheckCircle,
      className: "bg-blue-100 text-blue-800 border-blue-200",
    },
  };

  const filterButtons = [
    { value: "all" as const, label: "Toutes" },
    { value: "pending" as const, label: "En attente" },
    { value: "confirmed" as const, label: "Confirmées" },
    { value: "completed" as const, label: "Terminées" },
    { value: "cancelled" as const, label: "Annulées" },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (visitReservations.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">Aucune visite réservée</h3>
            <p className="text-muted-foreground mb-4">
              Vous n'avez pas encore réservé de visites.
            </p>
            <Button asChild>
              <Link href="/properties">Explorer les biens</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-2">
        {filterButtons.map((button) => (
          <Button
            key={button.value}
            variant={filter === button.value ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter(button.value)}
          >
            {button.label}
            {button.value !== "all" && (
              <Badge variant="secondary" className="ml-2">
                {visitReservations.filter(r => r.status === button.value).length}
              </Badge>
            )}
          </Button>
        ))}
      </div>

      {/* Reservations List */}
      <div className="space-y-4">
        {filteredReservations.map((reservation) => {
          const status = statusConfig[reservation.status];
          const StatusIcon = status.icon;

          return (
            <Card key={reservation.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">
                        <Link
                          href={`/property/${reservation.propertyId}`}
                          className="hover:text-primary transition-colors"
                        >
                          {reservation.propertyTitle}
                        </Link>
                      </h3>
                      <Badge className={status.className}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {status.label}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          <strong>Date demandée:</strong> {formatDate(reservation.requestedDate)}
                        </span>
                      </div>

                      {reservation.confirmedDate && (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          <span>
                            <strong>Date confirmée:</strong> {formatDate(reservation.confirmedDate)}
                          </span>
                        </div>
                      )}

                      {reservation.notes && (
                        <div className="flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 mt-0.5" />
                          <span>
                            <strong>Notes:</strong> {reservation.notes}
                          </span>
                        </div>
                      )}

                      <div className="text-xs">
                        Réservée le {formatDate(reservation.createdAt)}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/property/${reservation.propertyId}`}>
                        <MapPin className="w-4 h-4 mr-2" />
                        Voir le bien
                      </Link>
                    </Button>

                    {reservation.status === 'confirmed' && (
                      <Button size="sm" className="bg-red-600 hover:bg-red-700">
                        Annuler la visite
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredReservations.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-muted-foreground">
              Aucune visite {filter !== "all" ? statusConfig[filter].label.toLowerCase() : ""} trouvée.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}