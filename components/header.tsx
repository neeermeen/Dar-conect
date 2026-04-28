"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm">
          <div className="flex items-center gap-6">
            <a href="tel:+33123456789" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Phone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">+33 1 23 45 67 89</span>
            </a>
            <a href="mailto:contact@prestige-immo.fr" className="flex items-center gap-2 hover:text-gold transition-colors">
              <Mail className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">contact@prestige-immo.fr</span>
            </a>
          </div>
          <div className="text-primary-foreground/80">
            Luxury Real Estate Since 1985
          </div>
        </div>
      </div>
      
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-2xl font-bold tracking-tight text-primary">
              Prestige
            </span>
            <span className="text-xs tracking-[0.3em] uppercase text-muted-foreground -mt-1">
              Immobilier
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-medium text-foreground hover:text-gold transition-colors"
            >
              Home
            </Link>
            <Link
              href="/properties"
              className="text-sm font-medium text-foreground hover:text-gold transition-colors"
            >
              Properties
            </Link>
            <Link
              href="/map"
              className="text-sm font-medium text-foreground hover:text-gold transition-colors"
            >
              Map View
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium text-foreground hover:text-gold transition-colors"
            >
              Contact
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/account">
              <Button variant="ghost" size="icon" className="text-foreground hover:text-accent">
                <User className="h-5 w-5" />
                <span className="sr-only">Mon Compte</span>
              </Button>
            </Link>
            <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-primary-foreground">
              Schedule a Visit
            </Button>
          </div>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/properties"
                className="text-sm font-medium text-foreground hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Properties
              </Link>
              <Link
                href="/map"
                className="text-sm font-medium text-foreground hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Map View
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-foreground hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/account"
                className="text-sm font-medium text-foreground hover:text-gold transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Mon Compte
              </Link>
              <Button variant="outline" className="border-gold text-gold hover:bg-gold hover:text-primary-foreground w-full">
                Schedule a Visit
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
