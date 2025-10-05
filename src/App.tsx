import { motion } from "framer-motion"
import FishSVG from "./assets/fish.svg" // ejemplo

function App() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-blue-900 overflow-hidden">
      {/* Gradiente de luz sobre el agua */}
      <motion.div 
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at top, rgba(255,255,255,0.4) 0%, transparent 70%)' }}
        animate={{ opacity: [0.6, 0.3, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Título */}
      <h1 className="relative z-10 text-5xl font-bold text-white drop-shadow-lg text-center px-4">
        Sumérgete en <span className="text-yellow-200">El Gran Azul</span> 🌊
      </h1>

      {/* Ejemplo de animal flotando */}
      <motion.img 
        src={FishSVG} 
        className="absolute w-16"
        style={{ top: "30%" }}
        animate={{ x: ["-100px", "100vw"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
    </div>
  )
}

export default App
