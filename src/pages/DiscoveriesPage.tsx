import * as React from "react";
import { Box, Card, CardMedia, CardContent, Typography } from "@mui/material";

// Imágenes
import marineLifeImg from "../assets/categories/marine-life.png";
import ecosystemsImg from "../assets/categories/ocean-ecosystems.png";
import scienceImg from "../assets/categories/science-exploration.png";
import threatsImg from "../assets/categories/problems-threats.png";
import regionsImg from "../assets/categories/world-regions.png";
import oceanBack from "../assets/ocean-bg.png";

const categories = [
  {
    title: "🐠 Vida Marina",
    image: marineLifeImg,
    description:
      "Explora la asombrosa diversidad de criaturas que habitan nuestros océanos.",
  },
  {
    title: "🌊 Ecosistemas Oceánicos",
    image: ecosystemsImg,
    description:
      "Descubre cómo interactúan las especies y los ecosistemas bajo el mar.",
  },
  {
    title: "🔬 Ciencia y Exploración",
    image: scienceImg,
    description:
      "Conoce los avances científicos y las misiones que revelan los secretos del océano.",
  },
  {
    title: "⚠️ Problemas y Amenazas",
    image: threatsImg,
    description:
      "Comprende los desafíos ambientales que enfrentan los océanos del planeta.",
  },
  {
    title: "🌍 Regiones y Océanos del Mundo",
    image: regionsImg,
    description:
      "Sumérgete en las distintas regiones marinas que conforman el planeta azul.",
  },
];

export default function DiscoveriesPage() {
  const [hovered, setHovered] = React.useState<number | null>(null);

  return (
    <Box
      sx={{
        backgroundImage: `url(${oceanBack})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        py: 6,
        px: 3,
      }}
    >
      {/* Título */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#e0f7fa",
          textShadow: "0 0 15px rgba(0,0,0,0.8)",
          mb: 3,
          fontSize: { xs: "1.8rem", md: "3rem" },
        }}
      >
        Descubrimientos de la Biología Marina
      </Typography>

      {/* Descripción */}
      <Typography
        variant="h6"
        align="center"
        sx={{
          color: "#b2ebf2",
          maxWidth: "800px",
          mx: "auto",
          mb: 5,
          fontSize: { xs: "1rem", md: "1.25rem" },
        }}
      >
        Explora las cinco categorías principales que componen el fascinante mundo marino.
      </Typography>

      {/* Tarjetas */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: 3,
          justifyContent: "center",
          alignItems: "stretch",
          maxWidth: "1400px",
          mx: "auto",
          mb: 6,
        }}
      >
        {categories.map((cat, index) => (
          <Card
            key={cat.title}
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            sx={{
              flex: { xs: "1", md: "1 1 0" },
              borderRadius: 3,
              bgcolor: "rgba(255,255,255,0.95)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              transform: hovered === index ? "scale(1.05) translateY(-10px)" : "scale(1)",
              filter: hovered !== null && hovered !== index ? "brightness(0.6)" : "brightness(1)",
              boxShadow: hovered === index 
                ? "0 0 30px rgba(0, 242, 255, 0.8)" 
                : "0 4px 10px rgba(0,0,0,0.2)",
              zIndex: hovered === index ? 10 : 1,
            }}
          >
            <CardMedia
              component="img"
              height="180"
              image={cat.image}
              alt={cat.title}
            />
            <CardContent>
              <Typography
                variant="h6"
                fontWeight={600}
                sx={{ color: "#004d61", mb: 1, textAlign: "center" }}
              >
                {cat.title}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: "center" }}
              >
                {cat.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}