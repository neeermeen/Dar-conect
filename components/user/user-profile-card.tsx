"use client";

import { UserProfile } from "@/lib/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Heart, Mail, MessageSquare, Phone, User } from "lucide-react";

interface UserProfileCardProps {
  user: UserProfile;
}

export function UserProfileCard({ user }: UserProfileCardProps) {
  const memberSince = new Date(user.createdAt).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
  });

  const stats = [
    {
      label: "Propriétés Sauvegardées",
      value: user.savedProperties.length,
      icon: Heart,
    },
    {
      label: "Demandes Envoyées",
      value: user.inquiries.length,
      icon: MessageSquare,
    },
    {
      label: "En Attente de Réponse",
      value: user.inquiries.filter((i) => i.status === "pending").length,
      icon: Mail,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="h-24 w-24 rounded-full bg-accent flex items-center justify-center shrink-0">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={`${user.firstName} ${user.lastName}`}
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <User className="h-12 w-12 text-accent-foreground" />
              )}
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="font-serif text-2xl text-foreground">
                {user.firstName} {user.lastName}
              </h2>
              <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:gap-4 text-muted-foreground">
                <span className="flex items-center justify-center sm:justify-start gap-1">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </span>
                {user.phone && (
                  <span className="flex items-center justify-center sm:justify-start gap-1">
                    <Phone className="h-4 w-4" />
                    {user.phone}
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-muted-foreground flex items-center justify-center sm:justify-start gap-1">
                <Calendar className="h-4 w-4" />
                Membre depuis {memberSince}
              </p>
            </div>
            <Button variant="outline" className="shrink-0">
              Modifier le Profil
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/50 flex items-center justify-center">
                    <Icon className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif">Activité Récente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {user.inquiries.slice(0, 3).map((inquiry) => (
              <div
                key={inquiry.id}
                className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0"
              >
                <div
                  className={`h-2 w-2 mt-2 rounded-full shrink-0 ${
                    inquiry.status === "pending"
                      ? "bg-yellow-500"
                      : inquiry.status === "responded"
                      ? "bg-green-500"
                      : "bg-muted-foreground"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    {inquiry.propertyTitle}
                  </p>
                  <p className="text-sm text-muted-foreground truncate">
                    {inquiry.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(inquiry.createdAt).toLocaleDateString("fr-FR")}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                    inquiry.status === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : inquiry.status === "responded"
                      ? "bg-green-100 text-green-800"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {inquiry.status === "pending"
                    ? "En attente"
                    : inquiry.status === "responded"
                    ? "Répondu"
                    : "Fermé"}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
