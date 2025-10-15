import { Typography, Button } from "@mui/material";

export default function TestPage() {
  return (
    <div style={{ padding: "2rem", textAlign: "center", color: "#024873" }}>
      <Typography variant="h3" gutterBottom>
        🌊 Test: ¿Qué post del océano eres?
      </Typography>
      <Typography variant="body1" gutterBottom>
        Responde a unas preguntas para descubrir con qué parte del océano conectas más.
      </Typography>

      <Button
        variant="contained"
        sx={{
          mt: 3,
          backgroundColor: "#0077b6",
          "&:hover": { backgroundColor: "#0096c7" },
        }}
      >
        Empezar test
      </Button>
    </div>
  );
}
