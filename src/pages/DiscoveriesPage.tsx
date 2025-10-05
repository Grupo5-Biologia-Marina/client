export default function DiscoveriesPage() {
  const discoveries = [
    { id: 1, title: "Coral Gardens", description: "Increíble arrecife de coral con especies únicas." },
    { id: 2, title: "Blue Whale Spotting", description: "Avistamiento de ballenas azules en su hábitat natural." },
    { id: 3, title: "Deep Sea Creatures", description: "Exploración de criaturas de aguas profundas." },
  ];

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Discoveries</h1>
      {discoveries.map((item) => (
        <div key={item.id} style={{ marginBottom: "1.5rem", padding: "1rem", border: "1px solid #ccc", borderRadius: "0.5rem" }}>
          <h2 style={{ marginBottom: "0.5rem" }}>{item.title}</h2>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
}
