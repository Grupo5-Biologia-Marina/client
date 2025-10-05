// src/components/ParticlesLayer.tsx
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "tsparticles";

export default function ParticlesLayer() {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine); // carga todos los presets de tsparticles
  }, []);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      options={{
        background: { color: "transparent" },
        fpsLimit: 60,
        interactivity: {
          events: { onHover: { enable: true, mode: "repulse" } },
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
