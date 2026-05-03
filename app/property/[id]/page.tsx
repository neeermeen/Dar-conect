import { notFound } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PropertyGallery } from "@/components/property-gallery";
import { PropertyInfo } from "@/components/property-info";
import { PropertyFeatures } from "@/components/property-features";
import { ContactForm } from "@/components/contact-form";
import { PropertyVisitButtons } from "@/components/property-visit-buttons";
import { getPropertyById, getProperties } from "@/lib/properties";

export async function generateStaticParams() {
  const properties = await getProperties();
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
  const property = await getPropertyById(id);

  if (!property) {
    return {
      title: "Property Not Found | Dar-Connect",
    };
  }

  return {
    title: `${property.titre} | Dar-Connect`,
    description: property.description,
  };
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await getPropertyById(id);

  if (!property) {
    notFound();
  }

  return (
    <main style={{ minHeight: "100vh" }}>
      <Header />

      <section
        style={{
          paddingTop: "80px",
          paddingBottom: "40px",
          background: "#f5f5f5",
        }}
      >
        <div
          style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px" }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 1fr",
              gap: "40px",
            }}
          >
            {/* Contenu principal */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: "40px" }}
            >
              {/* Titre et infos */}
              <div>
                <h1
                  style={{
                    fontSize: "32px",
                    fontWeight: "bold",
                    marginBottom: "10px",
                  }}
                >
                  {property.titre}
                </h1>
                <p
                  style={{
                    color: "#666",
                    fontSize: "16px",
                    marginBottom: "20px",
                  }}
                >
                  📍 {property.ville}
                </p>
                <p
                  style={{
                    color: "#e94560",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  {property.prix_mensuel.toLocaleString("fr-FR")} DA/mois
                </p>
              </div>

              {/* Photo */}
              {property.photo_url && (
                <div
                  style={{
                    borderRadius: "10px",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={property.photo_url}
                    alt={property.titre}
                    style={{
                      width: "100%",
                      height: "400px",
                      objectFit: "cover",
                    }}
                  />
                </div>
              )}

              {/* Description */}
              <div>
                <h2
                  style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                  }}
                >
                  À propos
                </h2>
                <p style={{ color: "#666", lineHeight: "1.6" }}>
                  {property.description}
                </p>
              </div>
            </div>

            {/* Sidebar avec boutons */}
            <div style={{ position: "sticky", top: "100px" }}>
              <PropertyVisitButtons property={property} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
