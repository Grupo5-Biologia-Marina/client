import React from "react";
import { Box, Container, Typography, Button, useTheme, useMediaQuery } from "@mui/material";

interface CategoryPageProps {
  title: string;
  intro: string;
  onShowPosts: () => void;
  background?: string; // opcional para que cada página pueda usar su fondo
}

const CategoryPage: React.FC<CategoryPageProps> = ({ title, intro, onShowPosts, background }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: theme.spacing(4),
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant={isMobile ? "h4" : "h2"}
          sx={{
            fontWeight: "bold",
            textShadow: "0 4px 12px rgba(0,0,0,0.6)",
            marginBottom: theme.spacing(2),
          }}
        >
          {title}
        </Typography>

        <Typography
          variant={isMobile ? "body1" : "h5"}
          sx={{
            marginBottom: theme.spacing(4),
            textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            maxWidth: "700px",
            marginX: "auto",
          }}
        >
          {intro}
        </Typography>

        <Button
          variant="contained"
          size={isMobile ? "medium" : "large"}
          onClick={onShowPosts}
          sx={{
            backgroundColor: "rgba(0, 77, 102, 0.85)",
            "&:hover": {
              backgroundColor: "rgba(0, 119, 170, 1)",
            },
            paddingX: theme.spacing(4),
            paddingY: theme.spacing(1.5),
            borderRadius: "9999px",
            fontWeight: "bold",
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
        >
          Ver publicaciones
        </Button>
      </Container>
    </Box>
  );
};

export default CategoryPage;
