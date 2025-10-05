import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

export default function ParticlesLayer() {
  // Inicializa el engine con todos los presets
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" }, // repeler burbujas al pasar el mouse
          },
          modes: { repulse: { distance: 100 } },
        },
        particles: {
          color: { value: "#ffffff" },
          links: { enable: false },
          move: { enable: true, speed: 0.5, direction: "none", outModes: "bounce" },
          number: { value: 30 },
          opacity: { value: 0.3 },
          size: { value: { min: 2, max: 5 } },
        },
      }}
    />
  );
}
