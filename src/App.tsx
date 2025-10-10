<<<<<<< HEAD
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./router/router";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";
/**
 * AppContent vive dentro del BrowserRouter para poder usar useLocation.
 * Encapsulamos la lógica de "ocultar navbar/footer en ciertas rutas" aquí.
 */
function AppContent() {
  const location = useLocation();
  const [username, setUsername] = useState<string>("Explorador"); // o traelo del contexto/auth si lo tienes

  // Rutas donde NO queremos navbar ni footer
  // Ajusta las rutas según tu router (si tu welcome es '/', mantenlo).
  const hidePaths = ["/", "/welcome", "/login", "/register"];

  // shouldHide = true si la ruta actual es exactamente una de las anteriores
  // o si empieza por esa ruta (p. ej. /login/verify)
  const shouldHide = hidePaths.some((p) =>
    p === "/"
      ? location.pathname === "/" // root necesita igualdad exacta
      : location.pathname === p || location.pathname.startsWith(p + "/") || location.pathname.startsWith(p)
  );

  const handleLogout = () => {
    console.log("Cerrar sesión");
    // aquí borrar token / contexto y redirigir si procede
  };
=======
import './App.css'

function App() {
>>>>>>> b3bc6610332a579c058605cfbd149e19f8e62d36

  return (
    <>
     
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
