import { Building2, Users, Award, MapPin } from "lucide-react";

const stats = [
  {
    icon: Building2,
    value: "500+",
    label: "Properties Sold",
  },
  {
    icon: Users,
    value: "1,200+",
    label: "Happy Clients",
  },
  {
    icon: Award,
    value: "38",
    label: "Years Experience",
  },
  {
    icon: MapPin,
    value: "15",
    label: "Prime Locations",
  },
];

export function StatsSection() {
  return (
    <section className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gold/20 mb-4">
                <stat.icon className="h-7 w-7 text-gold" />
              </div>
              <p className="font-serif text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}
              </p>
              <p className="text-primary-foreground/70 text-sm uppercase tracking-wider">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
