import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById } from "../services/userService";
import type { User } from "../types/userTypes";
import { api } from "../services/api";

const ProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const loggedUserId = localStorage.getItem("userId");

    if (!loggedUserId || id !== loggedUserId.toString()) {
      alert("No tienes permiso para ver este perfil");
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getUserById(id);
        setUser(userData);
      } catch {
        setError("No se pudo cargar la información del perfil");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id, navigate]);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      navigate("/login");
    } catch (err) {
      console.error("Error al cerrar sesión", err);
    }
  };

  if (loading) return <p>Cargando perfil...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-page">
      <h1>Hola {user?.username}</h1>

      {user ? (
        <div className="profile-info">
          {/* Imagen de perfil */}
          {user.img ? (
            <img
              src={user.img}
              alt={`Foto de perfil de ${user.username}`}
              className="profile-image"
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                objectFit: "cover",
                marginBottom: "1rem",
              }}
            />
          ) : (
            <div
              style={{
                width: "150px",
                height: "150px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <span>Sin imagen</span>
            </div>
          )}

          <h2>Tu perfil:</h2>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Nombre:</strong> {user.firstname}</p>
          <p><strong>Apellido:</strong> {user.lastname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Rol:</strong> {user.role}</p>
          <p>
            <strong>Password:</strong>{" "}
            <input type="password" value="********" disabled />
          </p>

          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      ) : (
        <p>No se encontró información del usuario.</p>
      )}
    </div>
  );
};

export default ProfilePage;