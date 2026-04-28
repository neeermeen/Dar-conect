import { Key, Briefcase, Shield, Compass } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const services = [
  {
    icon: Key,
    title: "Property Sales",
    description:
      "Expert guidance through every step of buying or selling your luxury property, ensuring the best possible outcome.",
  },
  {
    icon: Briefcase,
    title: "Investment Advisory",
    description:
      "Strategic advice on real estate investments, market trends, and portfolio diversification opportunities.",
  },
  {
    icon: Shield,
    title: "Property Management",
    description:
      "Comprehensive management services for your property, from maintenance to rental management.",
  },
  {
    icon: Compass,
    title: "Relocation Services",
    description:
      "Complete relocation assistance including area orientation, school selection, and settling-in support.",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold uppercase tracking-[0.3em] text-sm font-medium mb-3">
            Our Services
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tailored to Your Needs
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive suite of services designed to meet the unique 
            requirements of discerning clients in the luxury real estate market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-0 shadow-md hover:shadow-lg transition-shadow bg-card"
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/10 mb-6">
                  <service.icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
