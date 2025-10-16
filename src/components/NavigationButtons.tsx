import { useLocation } from "react-router-dom";
import { Box, Button, Stack } from "@mui/material";

const NavigationButtons = () => {
  const location = useLocation();

  
  const hidePaths = ["/", "/welcome", "/login", "/register"];
  const shouldHide = hidePaths.some((p) =>
    p === "/" ? location.pathname === "/" : location.pathname.startsWith(p)
  );

  if (shouldHide) return null;

  const handleBack = () => {
    if (window.history.length > 1) window.history.back();
  };

  const handleForward = () => window.history.forward();

  const handleTop = () => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const buttonStyle = {
    color: "#00e5ff",
    border: "1px solid rgba(0, 229, 255, 0.3)",
    textShadow: "0 0 8px rgba(0, 229, 255, 0.6)",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    borderRadius: "8px",
    padding: "0.5rem 1.5rem",
    fontSize: "0.95rem",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    background: "rgba(0, 229, 255, 0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "rgba(0, 229, 255, 0.25)",
      transform: "translateY(-2px) scale(1.05)",
      boxShadow: "0 0 15px rgba(0, 229, 255, 0.7)",
      textShadow: "0 0 12px rgba(0,255,255,1)",
      borderColor: "rgba(0, 229, 255, 0.6)",
    },
    "&:active": {
      transform: "scale(0.97)",
    },
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
      }}
    >
      <Stack direction="row" spacing={2}>
        <Button onClick={handleBack} sx={buttonStyle}>
          ⬅️ Atrás
        </Button>
        <Button onClick={handleForward} sx={buttonStyle}>
          Adelante ➡️
        </Button>
        <Button onClick={handleTop} sx={buttonStyle}>
          🔝 Arriba
        </Button>
      </Stack>
    </Box>
  );
};

export default NavigationButtons;
