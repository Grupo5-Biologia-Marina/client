import Animal from "./Animal";
import FishSVG from "../assets/fish.svg";
import TurtleSVG from "../assets/turtle.svg";

export default function AnimalsLayer() {
  return (
    <>
      <Animal src={FishSVG} yPos={20} speed={15} direction="right" />
      <Animal src={TurtleSVG} yPos={60} speed={30} direction="left" />
      <Animal src={FishSVG} yPos={40} speed={20} direction="left" />
    </>
  );
}
