import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./router/router";
import "./index.css";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { AlertProvider } from "./context/AlertContext";

function AppContent() {
  const location = useLocation();

  // rutas donde no se muestran navbar/footer
  const hidePaths = ["/", "/welcome", "/login", "/register"];
  const shouldHide = hidePaths.some((p) =>
    p === "/"
      ? location.pathname === "/"
      : location.pathname === p || location.pathname.startsWith(p)
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
      {/* El provider envuelve todo el contenido, incluyendo rutas, navbar y footer */}
      <AlertProvider>
        <AppContent />
      </AlertProvider>
    </BrowserRouter>
  );
}
