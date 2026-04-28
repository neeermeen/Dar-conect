"use client";

import { useState } from "react";
import { Inquiry } from "@/lib/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Clock, CheckCircle, XCircle, MessageSquare, ExternalLink } from "lucide-react";
import Link from "next/link";

interface InquiriesListProps {
  inquiries: Inquiry[];
}

export function InquiriesList({ inquiries }: InquiriesListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "responded" | "closed">("all");

  const filteredInquiries = filter === "all" 
    ? inquiries 
    : inquiries.filter((i) => i.status === filter);

  const statusConfig = {
    pending: {
      label: "En attente",
      icon: Clock,
      className: "bg-yellow-100 text-yellow-800",
    },
    responded: {
      label: "Répondu",
      icon: CheckCircle,
      className: "bg-green-100 text-green-800",
    },
    closed: {
      label: "Fermé",
      icon: XCircle,
      className: "bg-muted text-muted-foreground",
    },
  };

  const filterButtons = [
    { value: "all" as const, label: "Toutes" },
    { value: "pending" as const, label: "En attente" },
    { value: "responded" as const, label: "Répondues" },
    { value: "closed" as const, label: "Fermées" },
  ];

  if (inquiries.length === 0) {
    return (
      <Card>
        <CardContent className="py-12">
          <div className="text-center">
            <div className="h-16 w-16 mx-auto rounded-full bg-muted flex items-center justify-center mb-4">
              <MessageSquare className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-serif text-xl text-foreground mb-2">
              Aucune Demande
            </h3>
            <p className="text-muted-foreground max-w-sm mx-auto">
              {"Vous n'avez pas encore envoyé de demandes. Contactez-nous pour en savoir plus sur nos propriétés."}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <MessageSquare className="h-5 w-5 text-accent" />
            Mes Demandes de Contact
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {filterButtons.map((btn) => (
              <Button
                key={btn.value}
                variant={filter === btn.value ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(btn.value)}
              >
                {btn.label}
                {btn.value !== "all" && (
                  <span className="ml-1">
                    ({inquiries.filter((i) => i.status === btn.value).length})
                  </span>
                )}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredInquiries.map((inquiry) => {
          const status = statusConfig[inquiry.status];
          const StatusIcon = status.icon;
          const isExpanded = expandedId === inquiry.id;

          return (
            <Card key={inquiry.id} className="overflow-hidden">
              <div
                className="p-4 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => setExpandedId(isExpanded ? null : inquiry.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2 rounded-lg ${status.className}`}>
                    <StatusIcon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {inquiry.propertyTitle}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                          {inquiry.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`text-xs px-2 py-1 rounded-full ${status.className}`}>
                          {status.label}
                        </span>
                        {isExpanded ? (
                          <ChevronUp className="h-5 w-5 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-muted-foreground" />
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Envoyé le {new Date(inquiry.createdAt).toLocaleDateString("fr-FR", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              </div>

              {isExpanded && (
                <div className="px-4 pb-4 pt-0 border-t border-border">
                  <div className="pt-4 space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Votre message
                      </h4>
                      <p className="text-foreground bg-muted p-3 rounded-lg">
                        {inquiry.message}
                      </p>
                    </div>

                    {inquiry.response && (
                      <div>
                        <h4 className="text-sm font-medium text-muted-foreground mb-2">
                          Réponse de notre équipe
                          {inquiry.respondedAt && (
                            <span className="font-normal ml-2">
                              ({new Date(inquiry.respondedAt).toLocaleDateString("fr-FR")})
                            </span>
                          )}
                        </h4>
                        <p className="text-foreground bg-accent/20 p-3 rounded-lg border border-accent/30">
                          {inquiry.response}
                        </p>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Link href={`/property/${inquiry.propertyId}`}>
                        <Button variant="outline" size="sm">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Voir la propriété
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}
