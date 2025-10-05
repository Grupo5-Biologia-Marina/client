import ParticlesLayer from "../components/ParticlesLayer";
import { motion } from "framer-motion";

export default function WelcomePage() {
  return (
    <div className="relative w-full h-screen bg-blue-900 overflow-hidden flex flex-col justify-center items-center">
      {/* Partículas animadas */}
      <ParticlesLayer />

      {/* Gradiente radial de luz bajo el agua */}
      <motion.div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at top, rgba(255,255,255,0.3) 0%, transparent 70%)' }}
        animate={{ opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Contenido central */}
      <div className="relative z-10 text-center text-white px-4">
        <h1 className="text-5xl font-bold mb-6 drop-shadow-lg">
          Sumérgete en <span className="text-yellow-200">El Gran Azul</span> 🌊
        </h1>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-bold transition-all duration-300"
        >
          Comenzar
        </motion.button>
      </div>
    </div>
  );
}
