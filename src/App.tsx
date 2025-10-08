import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./router/router";
import "./styles/index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useState } from "react";

function AppContent() {
  const location = useLocation();
  const [username, setUsername] = useState("User"); // O traer del contexto/auth

  const hideNavFooter = ["/welcome", "/login", "/register"];
  const shouldHide = hideNavFooter.includes(location.pathname);

  const handleLogout = () => {
    console.log("Cerrar sesión");
    // Aquí borras token, rediriges, etc.
  };

  return (
    <>
      {!shouldHide && <Navbar username={username} onLogout={handleLogout} />}
      <AppRoutes />
      {!shouldHide && <Footer />}
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
