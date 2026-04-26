import { supabase } from "./supabaseClient";

export default async function Home() {
  const { data: maisons, error } = await supabase.from("maisons").select("*");

  if (error)
    return <div style={{ padding: "50px" }}>Erreur : {error.message}</div>;

  return (
    <div style={{ padding: "50px", fontFamily: "sans-serif" }}>
      <h1 style={{ color: "blue" }}>🏠 Dar-Connect : Mes Maisons</h1>
      <div style={{ marginTop: "20px" }}>
        {maisons?.map((m ) => (
          <div
            key={m.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <h3>
              {m.titre} - {m.prix} DA
            </h3>
            <p>{m.ville}</p>
          </div>
        ))}
      </div>
      {maisons?.length === 0 && (
        <p>Aucune maison trouvée. Vérifie ta base de données !</p>
      )}
    </div>
  );
}
