import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import FishesSVG from "../assets/fishes.png";
import SharkSVG from "../assets/shark.png";
import WhaleSVG from "../assets/whale.png";
import TurtleSVG from "../assets/turtle.png";
import JellyfishSVG from "../assets/jellyfish.png";
import OceanGIF from "../assets/ocean.gif";
import "./WelcomePage.css";

const title = "El Gran Azul";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="welcome-container">
      {/* 🌊 Fondo del océano */}
      <img src={OceanGIF} alt="Ocean background" className="ocean-bg" />

      {/* 💧 BURBUJAS ANIMADAS */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="bubble"
          style={{
            left: `${Math.random() * 100}%`,
            width: `${4 + Math.random() * 8}px`,
            height: `${4 + Math.random() * 8}px`,
          }}
          initial={{ y: "100vh", opacity: 0, scale: 0 }}
          animate={{
            y: "-20vh",
            opacity: [0, 0.6, 0.8, 0.4, 0],
            scale: [0.5, 1, 1.2, 1, 0.8],
            x: [0, Math.random() * 30 - 15, Math.random() * 30 - 15, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 8 + Math.random() * 6,
            ease: "easeInOut",
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Luz ambiental */}
      <motion.div
        className="light-overlay"
        animate={{ opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Texto principal - CENTRADO */}
      <div className="text-zone">
        <h1 className="title">
          {title.split("").map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{ display: 'inline-block' }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: title.length * 0.15 + 0.4, duration: 1 }}
        >
          Sumérgete y descubre los misterios del océano.
        </motion.p>

        <motion.button
          className="start-btn"
          onClick={() => navigate("/login")}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: title.length * 0.15 + 1.2, duration: 0.6 }}
          whileHover={{
            scale: 1.1,
            boxShadow: "0 0 30px rgba(0,255,255,0.9)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Comenzar
        </motion.button>
      </div>

      {/* 🐋 Ballena SUPERIOR - entra desde fuera, derecha a izquierda */}
      <div className="animal-wrapper whale-wrapper">
        <motion.div
          className="water-trail"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 0.3, 0.5, 0.3, 0], scale: [0.8, 1.2, 1, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear", delay: 2 }}
        />
        <motion.img
          src={WhaleSVG}
          alt="Whale"
          className="animal-floating whale"
          initial={{ x: "-300px", rotateY: 180, opacity: 0 }}
          animate={{
            x: "120vw",
            rotateY: 180,
            opacity: [0, 0.6, 1, 0.6, 0],
            y: [0, -10, 0, 10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 30,
            ease: "linear",
            delay: 2,
          }}
        />
      </div>

      {/* 🦈 Tiburón SUPERIOR - derecha a izquierda */}
      <div className="animal-wrapper shark-wrapper">
        <motion.div
          className="water-trail"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.6, 0.4, 0] }}
          transition={{ repeat: Infinity, duration: 25, ease: "linear", delay: 3 }}
        />
        <motion.img
          src={SharkSVG}
          alt="Shark"
          className="animal-floating shark"
          initial={{ x: "120vw", opacity: 0 }}
          animate={{
            x: "-80vw",
            opacity: [0, 0.6, 1, 0.6, 0],
            y: [0, 8, 0, -8, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 25,
            ease: "linear",
            delay: 3,
          }}
        />
      </div>

      {/* 🐢 Tortuga INFERIOR - aparece desde fuera (izquierda a derecha) */}
      <div className="animal-wrapper turtle-wrapper">
        <motion.div
          className="water-trail"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.3, 0.5, 0.3, 0] }}
          transition={{ repeat: Infinity, duration: 32, ease: "linear", delay: 3 }}
        />
        <motion.img
          src={TurtleSVG}
          alt="Turtle"
          className="animal-floating turtle"
          initial={{ x: "-60vw", opacity: 0 }}
          animate={{
            x: "120vw",
            opacity: [0, 0.8, 1, 0.8, 0],
            y: [0, -5, 0, 5, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 32,
            ease: "linear",
            delay: 3,
          }}
        />
      </div>

      {/* 🐟 Peces INFERIOR - derecha a izquierda */}
      <div className="animal-wrapper fishes-wrapper">
        <motion.div
          className="water-trail small"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.4, 0.6, 0.4, 0] }}
          transition={{ repeat: Infinity, duration: 18, ease: "linear", delay: 4 }}
        />
        <motion.img
          src={FishesSVG}
          alt="Fishes"
          className="animal-floating fishes"
          initial={{ x: "120vw", opacity: 0 }}
          animate={{
            x: "-40vw",
            opacity: [0, 0.5, 1, 0.5, 0],
            y: [0, 6, 0, -6, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 18,
            ease: "linear",
            delay: 4,
          }}
        />
      </div>

      {/* 🪼 Medusas flotando suavemente hacia arriba */}
      {[...Array(7)].map((_, i) => (
        <motion.img
          key={i}
          src={JellyfishSVG}
          alt={`Jellyfish ${i + 1}`}
          className="jellyfish-floating"
          style={{
            bottom: `-${30 + i * 15}px`,
            left: `${10 + i * 12}%`,
            width: `${50 + (i % 3) * 15}px`,
          }}
          initial={{ y: 0, opacity: 0 }}
          animate={{
            y: ["0vh", "-100vh"],
            opacity: [0, 0.2, 0.9, 0.1, 0],
            x: [0, 10, -10, 0],
          }}
          transition={{
            repeat: Infinity,
            duration: 20 + i * 4,
            ease: "easeInOut",
            delay: 5 + i * 2,
          }}
        />
      ))}
    </div>
  );
}