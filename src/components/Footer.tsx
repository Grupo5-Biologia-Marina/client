import { Box, Container, Typography, Link as MuiLink } from "@mui/material";
import logoFactoria from "../assets/logo-factoria.png";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(90deg, #001f2f, #003d5c)",
        boxShadow: "0 -2px 15px rgba(0, 191, 255, 0.2)",
        borderTop: "1px solid rgba(0, 191, 255, 0.3)",
        color: "#e0f7ff",
        py: 4,
        mt: "auto",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Luz animada sutil al fondo */}
      <Box
        sx={{
          content: '""',
          position: "absolute",
          top: 0,
          left: "-50%",
          width: "200%",
          height: "100%",
          background:
            "linear-gradient(120deg, transparent, rgba(0,255,255,0.1), transparent)",
          animation: "shine 8s linear infinite",
          pointerEvents: "none",
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          flexWrap: "wrap",
          zIndex: 2,
          position: "relative",
        }}
      >
        {/* Logo Factoría F5 */}
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <img
            src={logoFactoria}
            alt="Logo Factoría F5"
            style={{
              height: "50px",
              filter: "drop-shadow(0 0 6px rgba(0,191,255,0.5))",
            }}
          />
        </Box>

        {/* Texto principal */}
        <Typography variant="body2" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
          © 2025 Proyecto colaborativo desarrollado por 5 coders del bootcamp{" "}
          <MuiLink
            href="https://factoriaf5.org"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "#00eaff",
              textDecoration: "none",
              fontWeight: 600,
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                bottom: -2,
                left: "50%",
                width: "0%",
                height: "2px",
                background: "linear-gradient(90deg, #00bfff, #00eaff)",
                borderRadius: "1px",
                transform: "translateX(-50%)",
                transition: "width 0.3s ease",
                boxShadow: "0 0 6px rgba(0,191,255,0.6)",
              },
              "&:hover": {
                color: "#00ffff",
                textShadow: "0 0 6px rgba(0,255,255,0.6)",
              },
              "&:hover::after": {
                width: "90%",
              },
            }}
          >
            Factoría F5
          </MuiLink>
          . Todos los derechos reservados.
        </Typography>
      </Container>

      {/* Animaciones */}
      <style>
        {`
          @keyframes shine {
            0% { left: -50%; }
            50% { left: 0%; }
            100% { left: -50%; }
          }
        `}
      </style>
    </Box>
  );
}
