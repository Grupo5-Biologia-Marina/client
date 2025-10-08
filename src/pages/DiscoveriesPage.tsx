import { Box, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";

// Import images from assets (manteniendo los nombres que ya tienes)
import marineLifeImg from "../assets/categories/marine-life.png";
import ecosystemsImg from "../assets/categories/ocean-ecosystems.jpg";
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
  return (
    <Box
      sx={{
        backgroundImage: `url(${oceanBack})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        py: 8,
        px: { xs: 2, md: 6 },
      }}
    >
      {/* 🐋 Título principal */}
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontWeight: "bold",
          color: "#e0f7fa",
          textShadow: "0 0 10px rgba(0,0,0,0.6)",
          mb: 6,
        }}
      >
        Descubrimientos de la Biología Marina
      </Typography>

      {/* 🌊 Descripción */}
      <Typography
        variant="h6"
        align="center"
        sx={{
          color: "#b2ebf2",
          maxWidth: "800px",
          mx: "auto",
          mb: 6,
        }}
      >
        Explora las cinco categorías principales que componen el fascinante mundo marino.
        Cada una te llevará a conocer un aspecto único del vasto océano que cubre nuestro planeta.
      </Typography>

      {/* 🐚 Tarjetas */}
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="stretch"
        sx={{
          display: "flex",
          flexWrap: "nowrap",
          overflowX: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {categories.map((cat) => (
          <Grid
            item
            key={cat.title}
            sx={{
              flex: "1 1 20%",
              minWidth: { xs: "250px", md: "18%" },
              display: "flex",
            }}
          >
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                borderRadius: 3,
                overflow: "hidden",
                height: "100%",
                minHeight: "380px",
                bgcolor: "rgba(255,255,255,0.9)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                  boxShadow: "0 0 20px rgba(0, 242, 255, 0.6)",
                },
              }}
            >
              <CardMedia
                component="img"
                height="160"
                image={cat.image}
                alt={cat.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    color: "#004d61",
                    mb: 1,
                    textAlign: "center",
                  }}
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
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
