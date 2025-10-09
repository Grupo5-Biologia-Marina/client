// src/data/fakePosts.ts

export interface Post {
    id: number;
    userId: number;
    title: string;
    content: string;
    credits: string;
    createdAt: string; // ISO date string
    categories: string[];
    images: string[];
}

export const fakePosts: Post[] = [
    {
        id: 1,
        userId: 1,
        title: "Dientes “fuera de la boca” en un pez",
        content: `Se ha descubierto que el pez spotted ratfish, relacionado con los tiburones, posee filas de dientes localizadas en un apéndice frontal llamado tenáculo, en lugar de dentro de la boca. 
En machos adultos, este apéndice se utiliza durante la reproducción para agarrar la aleta pectoral de la hembra y mantener contacto mientras nadan.
Este hallazgo desafía la suposición de que los dientes solo aparecen en mandíbulas, mostrando que los genes responsables de dientes pueden activarse en otras partes del cuerpo. 
Se analizaron tejidos y micro-CT de ejemplares y fósiles relacionados, confirmando que esta estructura no es un simple escama modificada, sino un diente funcional con relevancia evolutiva.`,
        credits: "SciTechDaily",
        createdAt: "2025-10-09T12:00:00Z",
        categories: ["🦈 Vida Marina", "🤿 Ciencia y Exploración"],
        images: ["https://res.cloudinary.com/demo/image/upload/v1690000000/fish_teeth.jpg"]
    },
    {
        id: 2,
        userId: 2,
        title: "Tiburones ballena con cicatrices provocadas por humanos",
        content: `Los tiburones ballena (Rhincodon typus), especie en peligro, muestran cicatrices atribuibles a actividades humanas en un 62 % de los ejemplares estudiados en Papúa Occidental, Indonesia. 
La mayoría son abrasiones leves, pero también se observan cortes profundos y amputaciones en ~17,7 % de los casos. 
El estudio sugiere que la modificación de prácticas de pesca y regulaciones de turismo marino podrían reducir significativamente estas heridas, protegiendo hábitats costeros vulnerables.`,
        credits: "SciTechDaily",
        createdAt: "2025-10-08T10:30:00Z",
        categories: ["🦈 Vida Marina", "⚠️ Problemas y Amenazas"],
        images: ["https://res.cloudinary.com/demo/image/upload/v1690000001/whale_shark.jpg"]
    },
    {
        id: 3,
        userId: 3,
        title: "Los delfines podrían recordar experiencias personales",
        content: `Estudios recientes sugieren que los delfines nariz de botella podrían poseer memoria episódica: la habilidad de recordar eventos específicos vividos en el pasado, incluyendo quién estuvo, dónde y cuándo. 
Se realizaron experimentos que requerían recordar detalles de eventos previos para resolver situaciones nuevas. 
Esto indica que su memoria personal no solo recuerda hechos generales, y plantea debates sobre la extensión de la memoria episódica en mamíferos marinos.`,
        credits: "The Scientist",
        createdAt: "2025-10-07T09:15:00Z",
        categories: ["🤿 Ciencia y Exploración", "🦭 Regiones y Océanos del Mundo"],
        images: ["https://res.cloudinary.com/demo/image/upload/v1690000002/dolphin.jpg"]
    }
];
