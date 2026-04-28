"use client";

import { useState } from "react";
import { UserProfile } from "@/lib/user";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Bell, Lock, Mail, Trash2, User } from "lucide-react";

interface AccountSettingsProps {
  user: UserProfile;
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || "",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    newProperties: true,
    priceChanges: true,
    inquiryResponses: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <User className="h-5 w-5 text-accent" />
            Informations Personnelles
          </CardTitle>
          <CardDescription>
            Mettez à jour vos informations de profil
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">Prénom</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Nom</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Adresse email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Téléphone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+33 6 00 00 00 00"
            />
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            Sauvegarder les modifications
          </Button>
        </CardContent>
      </Card>

      {/* Notifications */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Bell className="h-5 w-5 text-accent" />
            Notifications
          </CardTitle>
          <CardDescription>
            Gérez vos préférences de notification
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notifications par email</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des notifications par email
              </p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={() => handleNotificationChange("email")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Nouvelles propriétés</Label>
              <p className="text-sm text-muted-foreground">
                Être notifié des nouvelles propriétés correspondant à vos critères
              </p>
            </div>
            <Switch
              checked={notifications.newProperties}
              onCheckedChange={() => handleNotificationChange("newProperties")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Changements de prix</Label>
              <p className="text-sm text-muted-foreground">
                Être alerté des baisses de prix sur vos favoris
              </p>
            </div>
            <Switch
              checked={notifications.priceChanges}
              onCheckedChange={() => handleNotificationChange("priceChanges")}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Réponses aux demandes</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir une notification quand un agent répond à votre demande
              </p>
            </div>
            <Switch
              checked={notifications.inquiryResponses}
              onCheckedChange={() => handleNotificationChange("inquiryResponses")}
            />
          </div>
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2">
            <Lock className="h-5 w-5 text-accent" />
            Sécurité
          </CardTitle>
          <CardDescription>
            Gérez la sécurité de votre compte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full sm:w-auto">
            Changer le mot de passe
          </Button>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="font-serif flex items-center gap-2 text-destructive">
            <Trash2 className="h-5 w-5" />
            Zone de Danger
          </CardTitle>
          <CardDescription>
            Actions irréversibles sur votre compte
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            La suppression de votre compte est permanente et ne peut pas être annulée. Toutes vos données seront définitivement effacées.
          </p>
          <Button variant="destructive">
            Supprimer mon compte
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
