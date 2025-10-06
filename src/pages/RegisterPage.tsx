import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import OceanBG from "../assets/ocean-bg.png";
import "./AuthPage.css";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:4000/auth/register", {
        username,
        firstname,
        lastname,
        email,
        password,
      });

      if (response.status === 201) {
        const { token, user } = response.data;

        // Guardamos datos en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("username", user.username);

        // Redirigimos a descubrimientos
        navigate("/discoveries");
      }
    } catch (err: any) {
      console.error("Error al registrar:", err);
      setError(err.response?.data?.message || "Error al registrarse");
    }
  };

  return (
    <div className="auth-container">
      <img src={OceanBG} alt="Ocean background" className="auth-bg" />
      <div className="auth-card">
        <h2>Registro</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Nombre"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Apellido"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Registrarse</button>
        </form>

        {error && <p className="error-text">{error}</p>}

        <p>
          ¿Ya tienes cuenta?{" "}
          <span className="auth-link" onClick={() => navigate("/login")}>
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  );
}
