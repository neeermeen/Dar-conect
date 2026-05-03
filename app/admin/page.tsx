"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import {
  updateVisitStatus,
  getAllVisits,
  VisitReservation,
} from "@/lib/visits";

type AdminTab = "overview" | "maisons" | "visites";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [maisons, setMaisons] = useState([]);
  const [visites, setVisites] = useState<VisitReservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);

      const maisonsData = await supabase
        .from("maisons")
        .select("*")
        .then((r) => r.data || []);
      const visitesData = await getAllVisits();
      setMaisons((maisonsData || []) as any);
      setVisites(visitesData || []);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const refreshVisites = async () => {
    const data = await getAllVisits();
    setVisites(data || []);
  };

  const handleConfirm = async (visitId: string) => {
    const result = await updateVisitStatus(visitId, "confirmed");
    if (result.success) {
      refreshVisites();
    }
  };

  const handleReject = async (visitId: string) => {
    const result = await updateVisitStatus(visitId, "cancelled");
    if (result.success) {
      refreshVisites();
    }
  };

  if (loading)
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>Chargement...</div>
    );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5" }}>
      <nav
        style={{
          background: "#1a1a2e",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", margin: 0 }}>🏠 Dar-Connect Admin</h1>
        <button
          onClick={handleLogout}
          style={{
            background: "#e94560",
            color: "white",
            padding: "8px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Se déconnecter
        </button>
      </nav>

      <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        <h1 style={{ marginBottom: "30px" }}>Tableau de Bord Admin</h1>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            borderBottom: "2px solid #ddd",
          }}
        >
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              borderBottom:
                activeTab === "overview" ? "3px solid #e94560" : "none",
              color: activeTab === "overview" ? "#e94560" : "#666",
              fontWeight: activeTab === "overview" ? "bold" : "normal",
              fontSize: "14px",
            }}
          >
            📊 Aperçu
          </button>
          <button
            onClick={() => setActiveTab("maisons")}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              borderBottom:
                activeTab === "maisons" ? "3px solid #e94560" : "none",
              color: activeTab === "maisons" ? "#e94560" : "#666",
              fontWeight: activeTab === "maisons" ? "bold" : "normal",
              fontSize: "14px",
            }}
          >
            🏠 Maisons ({maisons.length})
          </button>
          <button
            onClick={() => setActiveTab("visites")}
            style={{
              padding: "12px 20px",
              border: "none",
              background: "transparent",
              cursor: "pointer",
              borderBottom:
                activeTab === "visites" ? "3px solid #e94560" : "none",
              color: activeTab === "visites" ? "#e94560" : "#666",
              fontWeight: activeTab === "visites" ? "bold" : "normal",
              fontSize: "14px",
            }}
          >
            📅 Visites ({visites.length})
          </button>
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <p
                style={{
                  color: "#999",
                  fontSize: "13px",
                  margin: "0 0 10px 0",
                }}
              >
                Total Maisons
              </p>
              <h2 style={{ margin: "0", color: "#1a1a2e", fontSize: "32px" }}>
                {maisons.length}
              </h2>
            </div>
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <p
                style={{
                  color: "#999",
                  fontSize: "13px",
                  margin: "0 0 10px 0",
                }}
              >
                Total Visites
              </p>
              <h2 style={{ margin: "0", color: "#1a1a2e", fontSize: "32px" }}>
                {visites.length}
              </h2>
            </div>
            <div
              style={{
                background: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <p
                style={{
                  color: "#999",
                  fontSize: "13px",
                  margin: "0 0 10px 0",
                }}
              >
                Visites Confirmées
              </p>
              <h2 style={{ margin: "0", color: "#1a1a2e", fontSize: "32px" }}>
                {visites.filter((v: any) => v.statut === "confirmée").length}
              </h2>
            </div>
          </div>
        )}

        {/* Maisons Tab */}
        {activeTab === "maisons" && (
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    background: "#f5f5f5",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Titre
                  </th>
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Ville
                  </th>
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Prix/mois
                  </th>
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Description
                  </th>
                </tr>
              </thead>
              <tbody>
                {maisons.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: "40px",
                        textAlign: "center",
                        color: "#999",
                      }}
                    >
                      Aucune maison
                    </td>
                  </tr>
                ) : (
                  maisons.map((maison: any) => (
                    <tr
                      key={maison.id}
                      style={{ borderBottom: "1px solid #eee" }}
                    >
                      <td style={{ padding: "15px" }}>{maison.titre}</td>
                      <td style={{ padding: "15px" }}>{maison.ville}</td>
                      <td
                        style={{
                          padding: "15px",
                          color: "#e94560",
                          fontWeight: "bold",
                        }}
                      >
                        {maison.prix_mensuel.toLocaleString("fr-FR")} DA
                      </td>
                      <td
                        style={{
                          padding: "15px",
                          color: "#666",
                          fontSize: "13px",
                        }}
                      >
                        {maison.description}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Visites Tab */}
        {activeTab === "visites" && (
          <div
            style={{
              background: "white",
              borderRadius: "10px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr
                  style={{
                    background: "#f5f5f5",
                    borderBottom: "2px solid #ddd",
                  }}
                >
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Maison
                  </th>
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Ville
                  </th>
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      padding: "15px",
                      textAlign: "left",
                      fontWeight: "bold",
                    }}
                  >
                    Statut
                  </th>
                </tr>
              </thead>
              <tbody>
                {visites.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      style={{
                        padding: "40px",
                        textAlign: "center",
                        color: "#999",
                      }}
                    >
                      Aucune visite
                    </td>
                  </tr>
                ) : (
                  visites.map((visite: any) => (
                    <tr
                      key={visite.id}
                      style={{ borderBottom: "1px solid #eee" }}
                    >
                      <td style={{ padding: "15px" }}>
                        {visite.property_title}
                      </td>
                      <td style={{ padding: "15px" }}>
                        {visite.maisons?.ville || "N/A"}
                      </td>
                      <td style={{ padding: "15px" }}>
                        {new Date(visite.requested_date).toLocaleDateString(
                          "fr-FR",
                        )}
                      </td>
                      <td style={{ padding: "15px", minWidth: "350px" }}>
                        <span
                          style={{
                            background:
                              visite.status === "confirmed"
                                ? "#10b981"
                                : visite.status === "cancelled"
                                  ? "#ef4444"
                                  : visite.status === "pending"
                                    ? "#f59e0b"
                                    : "#3b82f6",
                            color: "white",
                            padding: "6px 14px",
                            borderRadius: "20px",
                            fontSize: "13px",
                            fontWeight: "bold",
                          }}
                        >
                          {visite.status === "pending"
                            ? "En attente"
                            : visite.status === "confirmed"
                              ? "Confirmée"
                              : visite.status === "cancelled"
                                ? "Annulée"
                                : "Terminée"}
                        </span>
                        {visite.status === "pending" && (
                          <div
                            style={{
                              marginTop: "10px",
                              display: "flex",
                              gap: "8px",
                              flexWrap: "wrap",
                            }}
                          >
                            <button
                              onClick={() => handleConfirm(visite.id)}
                              style={{
                                flex: "1",
                                minWidth: "100px",
                                background: "#10b981",
                                color: "white",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "13px",
                                transition: "all 0.2s",
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.background = "#059669")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.background = "#10b981")
                              }
                            >
                              ✅ Confirmer
                            </button>
                            <button
                              onClick={() => handleReject(visite.id)}
                              style={{
                                flex: "1",
                                minWidth: "100px",
                                background: "#ef4444",
                                color: "white",
                                border: "none",
                                padding: "8px 12px",
                                borderRadius: "6px",
                                cursor: "pointer",
                                fontWeight: "bold",
                                fontSize: "13px",
                                transition: "all 0.2s",
                              }}
                              onMouseOver={(e) =>
                                (e.currentTarget.style.background = "#dc2626")
                              }
                              onMouseOut={(e) =>
                                (e.currentTarget.style.background = "#ef4444")
                              }
                            >
                              ❌ Rejeter
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
