import Animal from "./Animal";
import FishesSVG from "../assets/fishes.svg";
import TurtleSVG from "../assets/turtle.svg";
import SharkSVG from "../assets/shark.svg";
import WhaleSVG from "../assets/whale.svg";
import JellyfishSVG from "../assets/jellyfish.svg";

export default function AnimalsLayer() {
  return (
    <>
      <Animal src={WhaleSVG} yPos={15} speed={60} direction="right" width={250} flip />
      <Animal src={SharkSVG} yPos={40} speed={35} direction="left" width={180} />
      <Animal src={TurtleSVG} yPos={60} speed={28} direction="right" width={120} />
      <Animal src={FishesSVG} yPos={25} speed={20} direction="left" width={100} delay={1} />
      <Animal src={FishesSVG} yPos={35} speed={22} direction="left" width={90} delay={2} />

      {[...Array(6)].map((_, i) => (
        <Animal
          key={i}
          src={JellyfishSVG}
          yPos={10 + i * 15}
          speed={15 + i * 2}
          direction="up"
          width={40 + i * 5}
          delay={i * 1.5}
        />
      ))}
    </>
  );
}
