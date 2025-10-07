import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function DiscoveriesPage() {
  const navigate = useNavigate();
  const username = "Pepito"; // reemplazar por estado real de usuario
  const role: "admin" | "user" = "user";

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const discoveries = [
    { id: 1, title: "Coral Gardens", description: "Increíble arrecife de coral con especies únicas." },
    { id: 2, title: "Blue Whale Spotting", description: "Avistamiento de ballenas azules en su hábitat natural." },
    { id: 3, title: "Deep Sea Creatures", description: "Exploración de criaturas de aguas profundas." },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 via-blue-800 to-blue-700 text-white">
      <Navbar username={username} role={role} onLogout={handleLogout} />

      <div className="max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Discoveries</h1>

        <div className="space-y-6">
          {discoveries.map((item) => (
            <div
              key={item.id}
              className="bg-blue-800 bg-opacity-80 p-5 rounded-xl shadow-lg hover:shadow-2xl transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
