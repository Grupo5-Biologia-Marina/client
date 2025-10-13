import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./router/router";
import "./index.css";
import './App.css';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

/**
 * AppContent vive dentro del BrowserRouter para poder usar useLocation.
 * Controla qué rutas muestran navbar/footer.
 */
function AppContent() {
  const location = useLocation();

  const hidePaths = ["/", "/welcome", "/login", "/register"];
  const shouldHide = hidePaths.some(p =>
    p === "/" ? location.pathname === "/" : location.pathname === p || location.pathname.startsWith(p)
  );

  return (
    <>
      {!shouldHide && <Navbar />}
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
