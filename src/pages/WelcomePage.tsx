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

            {/* Luz ambiental */}
            <motion.div
                className="light-overlay"
                animate={{ opacity: [0.6, 0.3, 0.6] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Texto principal */}
            <div className="text-zone">
                <h1 className="title">
                    {title.split("").map((letter, i) => (
                        <motion.span
                            key={i}
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.15, duration: 0.6 }}
                        >
                            {letter}
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
                    whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 30px rgba(0,255,255,0.9)",
                    }}
                    whileTap={{ scale: 0.95 }}
                >
                    Comenzar
                </motion.button>
            </div>

            {/* 🐋 Ballena - entra desde fuera, derecha a izquierda */}
            <motion.img
                src={WhaleSVG}
                className="absolute"
                style={{
                    top: "10%",
                    left: "-300px",
                    width: "280px",
                }}
                initial={{ x: "-300px", rotateY: 180 }} 
                animate={{ x: "120vw", rotateY: 180, opacity: [0.6, 1, 0.6] }} 
                transition={{ repeat: Infinity, duration: 30, ease: "linear", delay: 2 }}
            />

            {/* 🦈 Tiburón - derecha a izquierda */}
            <motion.img
                src={SharkSVG}
                className="animal shark"
                initial={{ x: "120vw", opacity: 0.8 }}
                animate={{ x: "-80vw", opacity: [0.6, 1, 0.6] }}
                transition={{ repeat: Infinity, duration: 25, ease: "linear", delay: 3 }}
            />

            {/* 🐢 Tortuga - aparece desde fuera (izquierda a derecha) */}
            <motion.img
                src={TurtleSVG}
                className="animal turtle"
                initial={{ x: "-60vw", opacity: 0.8 }}
                animate={{ x: "120vw", opacity: [0.8, 1, 0.8] }}
                transition={{ repeat: Infinity, duration: 32, ease: "linear", delay: 3 }}
            />

            {/* 🐟 Peces - derecha a izquierda */}
            <motion.img
                src={FishesSVG}
                className="animal fishes"
                initial={{ x: "120vw", opacity: 0.7 }}
                animate={{ x: "-40vw", opacity: [0.5, 1, 0.5] }}
                transition={{ repeat: Infinity, duration: 18, ease: "linear", delay: 4 }}
            />

            {/* 🪼 Medusas flotando suavemente hacia arriba */}
            {[...Array(7)].map((_, i) => (
                <motion.img
                    key={i}
                    src={JellyfishSVG}
                    className="absolute"
                    style={{
                        bottom: `-${30 + i * 15}px`,
                        left: `${10 + i * 12}%`,
                        width: `${50 + (i % 3) * 15}px`,
                        opacity: 0.8,
                        filter: "drop-shadow(0 0 10px rgba(174, 244, 255, 0.6))",
                    }}
                    initial={{ y: 0, opacity: 0.2 }}
                    animate={{
                        y: ["0vh", "-95vh"],
                        opacity: [0.2, 0.9, 0.1],
                        x: [0, 10, -10, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 20 + i * 4,
                        ease: "easeInOut",
                        delay: i * 2,
                    }}
                />
            ))}
        </div>
    );
}
