import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useAlertContext } from "../context/AlertContext";
import foca from "../assets/VirtualAssistant/foca.png"; // ajusta la ruta según tu estructura
import "./VirtualAssistant.css";

function VirtualAssistant() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => !!state.token);
  const { showAlert } = useAlertContext();

  const irAOtraPagina = () => {
    if (!isAuthenticated) {
      showAlert("Debes iniciar sesión para hacer el test 🦭", "warning");
      return;
    }

    navigate("/test");
  };

  return (
    <div className="boton-imagen">
      <img
        src={foca}
        alt="test"
        onClick={irAOtraPagina}
        className="imagen-boton"
      />
      <p>
        ¿Qué post eres
        <br />
        según este test?
      </p>
    </div>
  );
}

export default VirtualAssistant;
