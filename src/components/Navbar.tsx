// src/components/Navbar.tsx
import { useState } from "react";
import "./Navbar.css";

interface NavbarProps {
  username?: string;
  role?: "user" | "admin";
  onLogout?: () => void;
}

export default function Navbar({ username = "Explorador", role = "user", onLogout }: NavbarProps) {
  const [postsOpen, setPostsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-left">
        <div className="brand">EL GRAN AZUL</div>
      </div>

      <div className="nav-right">
        <div className="greeting">Hola, {username} 👋</div>

        <div className="dropdown">
          <button onClick={() => setPostsOpen(!postsOpen)}>Posts ▾</button>
          {postsOpen && (
            <div className="dropdown-menu">
              <button>Ver todos</button>
              <button>Crear nuevo</button>
            </div>
          )}
        </div>

        <div className="dropdown">
          <button onClick={() => setCategoriesOpen(!categoriesOpen)}>Categorías ▾</button>
          {categoriesOpen && (
            <div className="dropdown-menu">
              <button>Biología marina</button>
              <button>Astronomía</button>
              <button>Botánica</button>
              <button>Paleontología</button>
            </div>
          )}
        </div>

        <div className="dropdown">
          <button onClick={() => setAccountOpen(!accountOpen)}>Mi cuenta ▾</button>
          {accountOpen && (
            <div className="dropdown-menu">
              <button>Perfil</button>
              {role === "admin" && <button>Administrar usuarios</button>}
              <button onClick={onLogout}>Cerrar sesión</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
