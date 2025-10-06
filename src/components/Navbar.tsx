import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isPostsOpen, setIsPostsOpen] = useState(false);
  const [isCatsOpen, setIsCatsOpen] = useState(false);
  const [isUserOpen, setIsUserOpen] = useState(false);

  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "explorador";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="w-full bg-gradient-to-r from-blue-900 to-cyan-700 text-white p-4 shadow-lg flex items-center justify-between">
      {/* 🌊 Logo */}
      <Link to="/discoveries" className="text-2xl font-bold tracking-wide hover:text-cyan-300 transition">
        🐋 El Gran Azul
      </Link>

      {/* 🔽 Menús */}
      <div className="flex items-center space-x-6 relative">
        {/* POSTS */}
        <div className="relative">
          <button
            className="hover:text-cyan-300"
            onClick={() => setIsPostsOpen(!isPostsOpen)}
          >
            Posts ▾
          </button>
          {isPostsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute mt-2 bg-blue-800 rounded-lg shadow-md p-2 w-40 z-20"
            >
              <Link to="/discoveries" className="block px-3 py-2 hover:bg-cyan-700 rounded">
                Ver todos
              </Link>
              <Link to="/discoveries/new" className="block px-3 py-2 hover:bg-cyan-700 rounded">
                Crear nuevo
              </Link>
            </motion.div>
          )}
        </div>

        {/* CATEGORÍAS */}
        <div className="relative">
          <button
            className="hover:text-cyan-300"
            onClick={() => setIsCatsOpen(!isCatsOpen)}
          >
            Categorías ▾
          </button>
          {isCatsOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute mt-2 bg-blue-800 rounded-lg shadow-md p-2 w-48 z-20"
            >
              <Link to="/category/corales" className="block px-3 py-2 hover:bg-cyan-700 rounded">
                🪸 Corales
              </Link>
              <Link to="/category/peces" className="block px-3 py-2 hover:bg-cyan-700 rounded">
                🐠 Peces
              </Link>
              <Link to="/category/mamiferos" className="block px-3 py-2 hover:bg-cyan-700 rounded">
                🐋 Mamíferos marinos
              </Link>
              <Link to="/category/plantas" className="block px-3 py-2 hover:bg-cyan-700 rounded">
                🌿 Flora marina
              </Link>
              <Link to="/category/misterios" className="block px-3 py-2 hover:bg-cyan-700 rounded">
                🌀 Misterios del océano
              </Link>
            </motion.div>
          )}
        </div>

        {/* MI CUENTA */}
        <div className="relative">
          <button
            className="hover:text-cyan-300"
            onClick={() => setIsUserOpen(!isUserOpen)}
          >
            Mi cuenta ▾
          </button>
          {isUserOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute mt-2 bg-blue-800 rounded-lg shadow-md p-2 w-48 z-20"
            >
              <Link to="/profile" className="block px-3 py-2 hover:bg-cyan-700 rounded">
                👤 Ver perfil
              </Link>
              <Link to="/curiosities" className="block px-3 py-2 hover:bg-cyan-700 rounded">
                💫 Curiosidades marinas
              </Link>
            </motion.div>
          )}
        </div>

        {/* CERRAR SESIÓN */}
        <button
          onClick={handleLogout}
          className="ml-4 px-4 py-2 bg-cyan-600 rounded-lg hover:bg-cyan-500 transition"
        >
          Cerrar sesión
        </button>

        {/* 👋 Saludo */}
        <span className="ml-4 italic text-cyan-300">Hola, {username}</span>
      </div>
    </nav>
  );
}