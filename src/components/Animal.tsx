import { motion } from "framer-motion";

interface AnimalProps {
    src: string;
    yPos: number;
    speed: number;
    direction: "left" | "right" | "up";
    width?: number;
    flip?: boolean;
    delay?: number;
}

export default function Animal({
    src,
    yPos,
    speed,
    direction,
    width = 150,
    flip = false,
    delay = 0,
}: AnimalProps) {
    let initial: any = { x: 0, y: `${yPos}vh`, opacity: 0 };
    let animate: any = { x: 0, y: `${yPos}vh`, opacity: 1 };

    if (direction === "right") {
        initial.x = -width;
        animate.x = "100vw";
    } else if (direction === "left") {
        initial.x = "100vw";
        animate.x = -width;
    } else if (direction === "up") {
        initial.y = "100vh";
        animate.y = -width;
    }

    return (
        <motion.div
            className="animal-wrapper"
            style={{ top: initial.y, width }}
            initial={initial}
            animate={animate}
            transition={{ duration: speed, repeat: Infinity, repeatType: "loop", delay }}
        >
            <img
                src={src}
                style={{
                    width: "100%",
                    transform: flip ? "scaleX(-1)" : "scaleX(1)",
                }}
                className="animal"
            />
            <div className="bubbles"></div>
        </motion.div>
    );
}
