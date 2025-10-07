import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/router";
import "./styles/index.css";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Footer />
    </>
  );
}
