"use client";

import { useState } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-40 pb-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-3">
            Get in Touch
          </p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Our team of experts is ready to assist you with all your luxury real
            estate needs.
          </p>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <Card className="border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                        <MapPin className="h-6 w-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Our Office
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          15 Avenue Montaigne
                          <br />
                          75008 Paris, France
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                        <Phone className="h-6 w-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Phone
                        </h3>
                        <a
                          href="tel:+33123456789"
                          className="text-muted-foreground text-sm hover:text-gold transition-colors"
                        >
                          +33 1 23 45 67 89
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                        <Mail className="h-6 w-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Email
                        </h3>
                        <a
                          href="mailto:contact@prestige-immo.fr"
                          className="text-muted-foreground text-sm hover:text-gold transition-colors"
                        >
                          contact@prestige-immo.fr
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                        <Clock className="h-6 w-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">
                          Office Hours
                        </h3>
                        <p className="text-muted-foreground text-sm">
                          Monday - Friday: 9:00 - 19:00
                          <br />
                          Saturday: 10:00 - 17:00
                          <br />
                          Sunday: By appointment
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="lg:col-span-2">
              <Card className="border-gold/20 shadow-lg">
                <CardContent className="p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/20 mb-6">
                        <CheckCircle className="h-10 w-10 text-gold" />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold text-foreground mb-3">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground max-w-md mx-auto">
                        Thank you for contacting us. One of our team members
                        will get back to you within 24 hours.
                      </p>
                      <Button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({
                            name: "",
                            email: "",
                            phone: "",
                            subject: "",
                            message: "",
                          });
                        }}
                        variant="outline"
                        className="mt-6 border-gold text-gold hover:bg-gold hover:text-primary-foreground"
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <>
                      <h2 className="font-serif text-2xl font-semibold text-foreground mb-2">
                        Send Us a Message
                      </h2>
                      <p className="text-muted-foreground mb-8">
                        Fill out the form below and we&apos;ll respond as soon
                        as possible.
                      </p>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Full Name *
                            </label>
                            <Input
                              placeholder="John Doe"
                              value={formData.name}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  name: e.target.value,
                                })
                              }
                              required
                              className="border-border focus:border-gold focus:ring-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Email Address *
                            </label>
                            <Input
                              type="email"
                              placeholder="john@example.com"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              required
                              className="border-border focus:border-gold focus:ring-gold"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Phone Number
                            </label>
                            <Input
                              type="tel"
                              placeholder="+33 1 23 45 67 89"
                              value={formData.phone}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  phone: e.target.value,
                                })
                              }
                              className="border-border focus:border-gold focus:ring-gold"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-foreground mb-2">
                              Subject *
                            </label>
                            <Select
                              value={formData.subject}
                              onValueChange={(value) =>
                                setFormData({ ...formData, subject: value })
                              }
                              required
                            >
                              <SelectTrigger className="border-border focus:border-gold focus:ring-gold">
                                <SelectValue placeholder="Select a subject" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="buying">
                                  Property Inquiry
                                </SelectItem>
                                <SelectItem value="selling">
                                  Selling Property
                                </SelectItem>
                                <SelectItem value="valuation">
                                  Property Valuation
                                </SelectItem>
                                <SelectItem value="investment">
                                  Investment Advice
                                </SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Message *
                          </label>
                          <Textarea
                            placeholder="Tell us about your requirements..."
                            value={formData.message}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                message: e.target.value,
                              })
                            }
                            rows={6}
                            required
                            className="border-border focus:border-gold focus:ring-gold resize-none"
                          />
                        </div>

                        <Button
                          type="submit"
                          className="w-full md:w-auto bg-gold hover:bg-gold/90 text-primary font-medium px-8"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </form>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
