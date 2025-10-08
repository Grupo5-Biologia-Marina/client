import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";

export default function DiscoveriesPage() {
  const categories = [
    {
      title: "🐠 Vida Marina",
      image: "/assets/fish.jpg",
      description:
        "Descubre la increíble diversidad de criaturas que habitan los mares del planeta.",
    },
    {
      title: "🌊 Ecosistemas Oceánicos",
      image: "/assets/ocean.jpg",
      description:
        "Explora los distintos hábitats marinos, desde arrecifes hasta fosas abisales.",
    },
    {
      title: "🔬 Ciencia y Exploración",
      image: "/assets/science.jpg",
      description:
        "Sumérgete en los descubrimientos y avances científicos que revelan los secretos del océano.",
    },
    {
      title: "⚠️ Problemas y Amenazas",
      image: "/assets/pollution.jpg",
      description:
        "Aprende sobre los desafíos ambientales que enfrentan nuestros océanos y cómo ayudar.",
    },
    {
      title: "🌍 Regiones y Océanos del Mundo",
      image: "/assets/world.jpg",
      description:
        "Viaja a través de los mares del planeta y conoce sus características únicas.",
    },
  ];

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url("/assets/ocean.gif")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 6 },
        py: { xs: 4, md: 10 },
      }}
    >
      {/* Overlay para mejorar contraste */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0, 20, 40, 0.6)",
          backdropFilter: "blur(3px)",
        }}
      />

      {/* Contenido principal */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          color: "white",
          maxWidth: "1200px",
          width: "100%",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 700,
            mb: 2,
            textShadow: "0 0 10px #00bfff",
          }}
        >
          Explora las maravillas del océano 🌊
        </Typography>

        <Typography
          variant="h6"
          sx={{
            color: "#cdefff",
            mb: 6,
            fontWeight: 400,
          }}
        >
          Sumérgete en cinco fascinantes categorías que muestran la vida, la
          ciencia y los misterios del mundo marino.
        </Typography>

        {/* Grid de tarjetas */}
        <Grid container spacing={3} justifyContent="space-around">
          {categories.map((cat) => (
            <Grid item xs={12} sm={6} md={4} lg={2} xl={2.4} key={cat.title}>
              <Card
                sx={{
                  height: "100%",
                  borderRadius: 3,
                  bgcolor: "rgba(255,255,255,0.85)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0 0 20px rgba(0,191,255,0.5)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={cat.image}
                  alt={cat.title}
                />
                <CardContent>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: "#003b6f", mb: 1 }}
                  >
                    {cat.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {cat.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
