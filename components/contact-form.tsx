"use client";

import { useState } from "react";
import { Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ContactFormProps {
  propertyTitle?: string;
}

export function ContactForm({ propertyTitle }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: propertyTitle
      ? `I am interested in "${propertyTitle}" and would like more information.`
      : "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send to an API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="border-gold/20 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-6">
            <Mail className="h-8 w-8 text-gold" />
          </div>
          <h3 className="font-serif text-2xl font-semibold text-foreground mb-2">
            Thank You!
          </h3>
          <p className="text-muted-foreground">
            We have received your inquiry and will contact you shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-gold/20 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="font-serif text-xl text-foreground">
          Schedule a Visit
        </CardTitle>
        <p className="text-muted-foreground text-sm">
          Fill out the form below and our team will contact you.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="border-border focus:border-gold focus:ring-gold"
            />
          </div>
          <div>
            <Input
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="border-border focus:border-gold focus:ring-gold"
            />
          </div>
          <div>
            <Input
              type="tel"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="border-border focus:border-gold focus:ring-gold"
            />
          </div>
          <div>
            <Textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={4}
              className="border-border focus:border-gold focus:ring-gold resize-none"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-gold hover:bg-gold/90 text-primary font-medium"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Request Information
          </Button>
        </form>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4 text-center">
            Or contact us directly
          </p>
          <div className="space-y-3">
            <a
              href="tel:+33123456789"
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <Phone className="h-5 w-5 text-gold" />
              <span className="text-foreground">+33 1 23 45 67 89</span>
            </a>
            <a
              href="mailto:contact@prestige-immo.fr"
              className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <Mail className="h-5 w-5 text-gold" />
              <span className="text-foreground">contact@prestige-immo.fr</span>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
