import { useNavigate } from "react-router-dom";
import NavigationButtons from "../components/NavigationButtons";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "80vh",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "4rem", marginBottom: "1rem" }}>404</h1>
      <p style={{ fontSize: "1.5rem", marginBottom: "2rem" }}>
        La página que buscas no se encuentra.
      </p>
      <button
        onClick={() => navigate("/discoveries")}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#0077aa",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Volver al inicio
      </button>
      <NavigationButtons />
    </div>
  );
}
