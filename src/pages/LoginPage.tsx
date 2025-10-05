import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form>
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Login</button>
      </form>
      <p>
        ¿No tienes cuenta?{" "}
        <Link to="/register">
          <button className="link-btn">Regístrate</button>
        </Link>
      </p>
    </div>
  );
}
