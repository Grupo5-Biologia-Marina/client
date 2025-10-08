import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/router";
import "./index.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </>
  );
}
