import Link from "next/link";
import { Phone, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex flex-col mb-6">
              <span className="font-serif text-2xl font-bold tracking-tight text-gold">
                Prestige
              </span>
              <span className="text-xs tracking-[0.3em] uppercase text-primary-foreground/70 -mt-1">
                Immobilier
              </span>
            </div>
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Since 1985, we have been curating the finest selection of luxury properties 
              across France. Our commitment to excellence and discretion has made us the 
              trusted choice for discerning buyers.
            </p>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-gold">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/properties"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  All Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=villa"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Villas
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?type=apartment"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Apartments
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Map View
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-gold">
              Locations
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/properties?city=Paris"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Paris
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?city=Cannes"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  French Riviera
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?city=Lyon"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Lyon
                </Link>
              </li>
              <li>
                <Link
                  href="/properties?city=Gordes"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  Provence
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif text-lg font-semibold mb-6 text-gold">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-gold shrink-0 mt-0.5" />
                <span className="text-primary-foreground/80 text-sm">
                  15 Avenue Montaigne<br />
                  75008 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-gold shrink-0" />
                <a
                  href="tel:+33123456789"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gold shrink-0" />
                <a
                  href="mailto:contact@prestige-immo.fr"
                  className="text-primary-foreground/80 hover:text-gold transition-colors text-sm"
                >
                  contact@prestige-immo.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
            <p>&copy; {new Date().getFullYear()} Prestige Immobilier. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-gold transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
