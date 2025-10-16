import { useLocation } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";

const NavigationButtons = () => {
  const location = useLocation();

  // Rutas donde no se muestran los botones
  const hidePaths = ["/", "/welcome", "/login", "/register"];
  const shouldHide = hidePaths.some((p) =>
    p === "/" ? location.pathname === "/" : location.pathname.startsWith(p)
  );

  if (shouldHide) return null;

  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
  };

  const handleForward = () => window.history.forward();

  // Scroll al top: múltiples métodos para asegurar que funciona
  const handleTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Box
  component="nav"
  sx={{
    width: "100%",
    mt: 4,
    py: 1.5,
    px: 2,
    display: "flex",
    justifyContent: "center",
    boxShadow: "none",
  }}
>

  <Stack direction="row" spacing={2}>
    <Button
      variant="contained"
      color="primary"
      onClick={handleBack}
      sx={{
        px: 3,
        py: 1,
        fontSize: "0.95rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      ⬅️ Atrás
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={handleForward}
      sx={{
        px: 3,
        py: 1,
        fontSize: "0.95rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      Adelante ➡️
    </Button>
    <Button
      variant="contained"
      color="primary"
      onClick={handleTop}
      sx={{
        px: 3,
        py: 1,
        fontSize: "0.95rem",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    >
      🔝 Arriba
    </Button>
  </Stack>
    </Box >
  );
};

export default NavigationButtons;