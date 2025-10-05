import { motion } from "framer-motion";

interface AnimalProps {
  src: string;
  speed?: number;
  yPos?: number;
  direction?: "left" | "right";
}

export default function Animal({ src, speed = 20, yPos = 50, direction = "right" }: AnimalProps) {
  const from = direction === "right" ? "-100px" : "100vw";
  const to = direction === "right" ? "100vw" : "-100px";

  return (
    <motion.img
      src={src}
      className="absolute w-16 opacity-70"
      style={{ top: `${yPos}%` }}
      animate={{ x: [from, to] }}
      transition={{ repeat: Infinity, duration: speed, ease: "linear" }}
    />
  );
}
