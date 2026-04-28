import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyGallery } from "@/components/property-gallery";
import { PropertyInfo } from "@/components/property-info";
import { PropertyFeatures } from "@/components/property-features";
import { ContactForm } from "@/components/contact-form";
import { getPropertyById, properties } from "@/lib/properties";

export async function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    return {
      title: "Property Not Found | Prestige Immobilier",
    };
  }

  return {
    title: `${property.title} | Prestige Immobilier`,
    description: property.description,
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <Header />

      <section className="pt-32">
        <PropertyGallery images={property.images} title={property.title} />
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <PropertyInfo property={property} />
              <PropertyFeatures property={property} />
            </div>
            <div className="lg:col-span-1">
              <div className="sticky top-32">
                <ContactForm propertyTitle={property.title} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
