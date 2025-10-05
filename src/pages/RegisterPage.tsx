import { Link } from "react-router-dom";

export default function RegisterPage() {
  return (
    <div className="auth-container">
      <h1>Registro</h1>
      <form>
        <input type="text" name="username" placeholder="Nombre de usuario" required />
        <input type="text" name="firstname" placeholder="Nombre" />
        <input type="text" name="lastname" placeholder="Apellido" />
        <input type="email" name="email" placeholder="Email" required />
        <input type="password" name="password" placeholder="Contraseña" required />
        <button type="submit">Registrar</button>
      </form>
      <p>
        ¿Ya tienes cuenta?{" "}
        <Link to="/login">
          <button className="link-btn">Inicia sesión</button>
        </Link>
      </p>
    </div>
  );
}
