"use client";

import { useEffect, useState } from "react";
import { getProperties } from "@/lib/properties";
import Link from "next/link";
import { getPropertyVisits } from "@/lib/visits";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";

interface Property {
  id: string;
  titre: string;
  description: string;
  prix_mensuel: number;
  ville: string;
  photo_url?: string;
}

interface VisitReservation {
  id: string;
  property_title: string;
  requested_date: string;
  status: string;
  created_at: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedVisits, setSelectedVisits] = useState<VisitReservation[]>([]);
  const [showVisits, setShowVisits] = useState<string | null>(null);
  const [loadingVisits, setLoadingVisits] = useState<string | null>(null);

  useEffect(() => {
    const loadProperties = async () => {
      const data = await getProperties();
      setProperties(data);
      setLoading(false);
    };
    loadProperties();
  }, []);

  const handleShowVisits = async (propertyId: string) => {
    setLoadingVisits(propertyId);
    const visits = await getPropertyVisits(propertyId);
    setSelectedVisits(visits);
    setShowVisits(propertyId);
    setLoadingVisits(null);
  };

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>Chargement...</div>
    );

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f5f5",
        padding: "40px 20px",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        🏠 Nos Maisons Disponibles
      </h1>

      {properties.length === 0 ? (
        <div style={{ textAlign: "center", color: "#999" }}>
          <p>Aucune maison disponible pour le moment</p>
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "20px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {properties.map((property) => (
            <div
              key={property.id}
              style={{
                background: "white",
                borderRadius: "10px",
                overflow: "hidden",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                transition: "transform 0.3s",
              }}
            >
              {property.photo_url && (
                <img
                  src={property.photo_url}
                  alt={property.titre}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
              )}

              <div style={{ padding: "20px" }}>
                <h2 style={{ margin: "0 0 10px 0", fontSize: "18px" }}>
                  {property.titre}
                </h2>
                <p style={{ margin: "5px 0", color: "#666", fontSize: "14px" }}>
                  {property.description}
                </p>
                <p
                  style={{ margin: "10px 0", color: "#999", fontSize: "13px" }}
                >
                  📍 {property.ville}
                </p>
                <p
                  style={{
                    margin: "15px 0",
                    color: "#e94560",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {property.prix_mensuel.toLocaleString("fr-FR")} DA/mois
                </p>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Link
                    href={`/reserve?id=${property.id}`}
                    style={{
                      flex: 1,
                      display: "block",
                      background: "#e94560",
                      color: "white",
                      textDecoration: "none",
                      padding: "10px",
                      borderRadius: "5px",
                      textAlign: "center",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Réserver une visite
                  </Link>
                  <Dialog
                    open={showVisits === property.id}
                    onOpenChange={() => setShowVisits(null)}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleShowVisits(property.id)}
                        disabled={loadingVisits === property.id}
                        style={{
                          background: "#4f46e5",
                          color: "white",
                          border: "none",
                          padding: "10px 15px",
                          borderRadius: "5px",
                          cursor: "pointer",
                          fontSize: "14px",
                          fontWeight: "bold",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <CalendarDays
                          style={{
                            width: "16px",
                            height: "16px",
                            marginRight: "5px",
                          }}
                        />
                        {loadingVisits === property.id ? "..." : "Visites"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent style={{ maxWidth: "500px" }}>
                      <div style={{ padding: "20px" }}>
                        <h3
                          style={{
                            margin: "0 0 20px 0",
                            fontSize: "20px",
                            textAlign: "center",
                          }}
                        >
                          📋 Visites pour {property.titre}
                        </h3>
                        {selectedVisits.length === 0 ? (
                          <p
                            style={{
                              textAlign: "center",
                              color: "#999",
                              margin: "0",
                            }}
                          >
                            Aucune visite planifiée pour ce bien
                          </p>
                        ) : (
                          selectedVisits.map((visit) => (
                            <div
                              key={visit.id}
                              style={{
                                background: "#f8fafc",
                                padding: "15px",
                                borderRadius: "8px",
                                marginBottom: "10px",
                                borderLeft: "4px solid #e94560",
                              }}
                            >
                              <div
                                style={{
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  marginBottom: "5px",
                                }}
                              >
                                {visit.property_title}
                              </div>
                              <div
                                style={{
                                  display: "flex",
                                  gap: "15px",
                                  fontSize: "14px",
                                  color: "#666",
                                }}
                              >
                                <span>
                                  📅 Date :{" "}
                                  {new Date(
                                    visit.requested_date,
                                  ).toLocaleDateString("fr-FR")}
                                </span>
                                <span>
                                  📋 Statut :{" "}
                                  {visit.status === "pending"
                                    ? "En attente"
                                    : visit.status}
                                </span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
