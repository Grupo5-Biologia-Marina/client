import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./router/router";
import "./index.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AlertProvider } from "./context/AlertContext";
import NavigationButtons from "./components/NavigationButtons";
import { useEffect } from "react";

function AppContent() {
  const location = useLocation();

  // Rutas donde no se muestran navbar/footer
  const hidePaths = ["/", "/welcome", "/login", "/register"];
  const shouldHide = hidePaths.some((p) =>
    p === "/" ? location.pathname === "/" : location.pathname.startsWith(p)
  );

  // Scroll al inicio al cambiar de ruta
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      {!shouldHide && <Navbar />}

      <AppRoutes />
      <NavigationButtons />
      {!shouldHide && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AlertProvider>
        <AppContent />
      </AlertProvider>
    </BrowserRouter>
  );
}
