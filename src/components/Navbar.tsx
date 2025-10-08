import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  username?: string | null;
}

export default function Navbar({ username }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // No mostrar navbar en estas rutas
  if (["/", "/login", "/register"].includes(location.pathname)) return null;

  const postOptions = ["Ver todos", "Crear"];
  const categories = [
    "🐠 Vida Marina",
    "Ecosistemas Oceánicos",
    "Ciencia y Exploración",
    "⚠️ Problemas y Amenazas",
    "Regiones y Océanos del Mundo",
  ];

  return (
    <nav className="navbar-gradient w-full text-white shadow-lg fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-wide text-white hover:text-cyan-200 transition-colors">
          El Gran Azul
        </h1>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Saludo */}
          {username && <span className="font-semibold px-2 py-1 rounded bg-black bg-opacity-30 text-white">Hola, {username}</span>}

          {/* Posts */}
          <div className="relative group">
            <button className="hover:text-cyan-300 transition px-2 py-1 rounded">
              Posts ▾
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-black bg-opacity-70 rounded-lg mt-2 py-1 min-w-[150px] shadow-lg border border-cyan-700">
              {postOptions.map((opt) => (
                <Link
                  key={opt}
                  to={`/posts/${opt.toLowerCase().replace(" ", "-")}`}
                  className="px-4 py-2 text-left hover:bg-cyan-800 hover:text-white transition"
                >
                  {opt}
                </Link>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="relative group">
            <button className="hover:text-cyan-300 transition px-2 py-1 rounded">
              Categorías ▾
            </button>
            <div className="absolute hidden group-hover:flex flex-col bg-black bg-opacity-70 rounded-lg mt-2 py-1 min-w-[200px] shadow-lg border border-cyan-700">
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
                  className="px-4 py-2 text-left hover:bg-cyan-800 hover:text-white transition"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>

          {/* Mi cuenta */}
          <Link className="hover:text-cyan-300 transition px-2 py-1 rounded" to="/account">
            Mi cuenta
          </Link>

          {/* Cerrar sesión */}
          <button className="hover:text-red-400 transition px-2 py-1 rounded">
            Cerrar sesión
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-cyan-300 hover:text-white transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-80 flex flex-col items-center py-4 space-y-3">
          <span className="text-white font-semibold">Hola, {username}</span>
          <Link className="hover:text-cyan-300 transition" to="/posts/all">
            Posts
          </Link>
          <div className="flex flex-col items-center space-y-1">
            <span className="text-cyan-400 font-semibold">Categorías</span>
            {categories.map((cat) => (
              <Link
                key={cat}
                className="text-sm hover:text-cyan-300 transition"
                to={`/category/${cat.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {cat}
              </Link>
            ))}
          </div>
          <Link className="hover:text-cyan-300 transition" to="/account">
            Mi cuenta
          </Link>
          <button className="hover:text-red-400 transition">Cerrar sesión</button>
        </div>
      )}
    </nav>
  );
}
