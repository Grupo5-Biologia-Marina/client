import { Card, CardContent, Typography, Button, Stack } from "@mui/material";

export default function QuestionCard({ question, onAnswer, selectedIndex }) {
  return (
    <Card sx={{ maxWidth: 700, mx: "auto", p: 2, borderRadius: 3 }}>
      <CardContent>
        <Typography variant="h6" mb={2}>
          {question.text}
        </Typography>
        <Stack spacing={1}>
          {question.options.map((opt, i) => (
            <Button
              key={i}
              variant={selectedIndex === i ? "contained" : "outlined"}
              onClick={() => onAnswer(i, opt)}
              sx={{
                justifyContent: "flex-start",
                borderRadius: 2,
                textTransform: "none",
                transition: "transform 0.2s ease",
                "&:hover": { transform: "scale(1.03)" },
              }}
            >
              {opt.text}
            </Button>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
