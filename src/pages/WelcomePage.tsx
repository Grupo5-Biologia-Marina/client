// src/pages/WelcomePage.tsx
import { motion } from "framer-motion";
import ParticlesLayer from "../components/ParticlesLayer";
import SharkSVG from "../assets/shark.svg";
import TurtleSVG from "../assets/turtle.svg";
import JellyfishSVG from "../assets/jellyfish.svg";
import "./WelcomePage.css";

export default function WelcomePage() {
  return (
    <div className="welcome-container">
      {/* Fondo animado */}
      <ParticlesLayer />

      {/* Título y botón */}
      <div className="text-center z-10">
        <h1 className="welcome-title">
          Sumérgete en <span style={{ color: "#FACC15" }}>El Gran Azul</span> 🌊
        </h1>
        <motion.button
          className="start-button"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Comenzar
        </motion.button>
      </div>

      {/* Animales flotando (placeholders) */}
      <motion.img
        src={SharkSVG}
        className="animal"
        style={{ top: "20%", left: "-100px" }}
        animate={{ x: ["-100px", "120vw"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
      <motion.img
        src={TurtleSVG}
        className="animal"
        style={{ top: "50%", left: "120vw" }}
        animate={{ x: ["120vw", "-100px"] }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />
      <motion.img
        src={JellyfishSVG}
        className="animal"
        style={{ top: "70%", left: "-150px" }}
        animate={{ x: ["-150px", "120vw"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />
    </div>
  );
}
