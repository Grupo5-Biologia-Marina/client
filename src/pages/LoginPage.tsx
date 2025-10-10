import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import OceanBG from "../assets/ocean-bg.png";
import "./AuthPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("Login exitoso:", res.data);

      // Guardar token y userId en localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.data.id.toString());

      navigate("/discoveries");
    } catch (err: any) {
      console.error(err.response?.data || "Error al iniciar sesión");
    }
  };

  return (
    <div className="auth-container">
      <img src={OceanBG} alt="Ocean background" className="auth-bg" />
      <div className="auth-card">
        <h2>Iniciar sesión</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              className="toggle-password-text"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Ocultar" : "Ver"}
            </span>
          </div>

          <button type="submit">Iniciar sesión</button>
        </form>
        <p>
          ¿No tienes cuenta?{" "}
          <span className="auth-link" onClick={() => navigate("/register")}>
            Regístrate
          </span>
        </p>
      </div>
    </div>
  );
}
