import React, { useState, useEffect } from "react";
import { Container, Typography, LinearProgress, Stack, Button, Box, Avatar } from "@mui/material";
import QuestionCard, { Question } from "../components/QuestionCard";
import ResultCard, { Post } from "../components/ResultCard";
import { useAuthStore } from "../store/authStore";
import { useAlertContext } from "../context/AlertContext";
import { pickPostByCategory, Answer } from "../utils/matcher";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import Confetti from "react-confetti";

// 10 preguntas
const QUESTIONS: Question[] = [
  { text: "¿Qué te inspira más del océano?", options: [
    { text: "Las criaturas marinas 🐠", category: "marine-life" },
    { text: "Los ecosistemas 🌊", category: "ocean-ecosystems" },
    { text: "Explorar 🔬", category: "science-exploration" },
    { text: "Problemas ⚠️", category: "problems-threats" },
    { text: "Regiones 🌍", category: "world-regions" },
  ]},
  { text: "¿Qué actividad prefieres?", options: [
    { text: "Bucear y ver peces", category: "marine-life" },
    { text: "Estudiar arrecifes", category: "ocean-ecosystems" },
    { text: "Investigar nuevas especies", category: "science-exploration" },
    { text: "Analizar contaminación", category: "problems-threats" },
    { text: "Viajar por océanos del mundo", category: "world-regions" },
  ]},
  { text: "¿Qué te llama más la atención?", options: [
    { text: "Peces coloridos", category: "marine-life" },
    { text: "Corrientes marinas", category: "ocean-ecosystems" },
    { text: "Innovaciones científicas", category: "science-exploration" },
    { text: "Especies en peligro", category: "problems-threats" },
    { text: "Océanos del Pacífico", category: "world-regions" },
  ]},
  { text: "¿Cuál sería tu proyecto soñado?", options: [
    { text: "Catalogar especies marinas", category: "marine-life" },
    { text: "Conservar arrecifes", category: "ocean-ecosystems" },
    { text: "Exploración submarina", category: "science-exploration" },
    { text: "Campaña contra plásticos", category: "problems-threats" },
    { text: "Mapa de océanos", category: "world-regions" },
  ]},
  { text: "Tu color favorito en el océano", options: [
    { text: "Azul turquesa", category: "marine-life" },
    { text: "Azul profundo", category: "ocean-ecosystems" },
    { text: "Verde científico", category: "science-exploration" },
    { text: "Gris contaminado", category: "problems-threats" },
    { text: "Azul global", category: "world-regions" },
  ]},
  { text: "¿Qué animal te representa?", options: [
    { text: "Pez payaso", category: "marine-life" },
    { text: "Tortuga marina", category: "ocean-ecosystems" },
    { text: "Delfín investigador", category: "science-exploration" },
    { text: "Foca preocupada", category: "problems-threats" },
    { text: "Ballena viajera", category: "world-regions" },
  ]},
  { text: "Tu lugar favorito", options: [
    { text: "Acuario", category: "marine-life" },
    { text: "Arrecife de coral", category: "ocean-ecosystems" },
    { text: "Laboratorio submarino", category: "science-exploration" },
    { text: "Playa contaminada", category: "problems-threats" },
    { text: "Océano abierto", category: "world-regions" },
  ]},
  { text: "¿Qué lectura prefieres?", options: [
    { text: "Guías de peces", category: "marine-life" },
    { text: "Ecosistemas marinos", category: "ocean-ecosystems" },
    { text: "Investigación científica", category: "science-exploration" },
    { text: "Problemas medioambientales", category: "problems-threats" },
    { text: "Atlas de océanos", category: "world-regions" },
  ]},
  { text: "Tu superpoder marino", options: [
    { text: "Nadar rápido", category: "marine-life" },
    { text: "Respirar bajo el agua", category: "ocean-ecosystems" },
    { text: "Detectar nuevas especies", category: "science-exploration" },
    { text: "Limpiar océanos", category: "problems-threats" },
    { text: "Viajar por el mundo", category: "world-regions" },
  ]},
  { text: "Tu emoji favorito del océano", options: [
    { text: "🐠", category: "marine-life" },
    { text: "🌊", category: "ocean-ecosystems" },
    { text: "🔬", category: "science-exploration" },
    { text: "⚠️", category: "problems-threats" },
    { text: "🌍", category: "world-regions" },
  ]},
];

export default function TestGamePage(): JSX.Element {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(Answer | null)[]>(Array(QUESTIONS.length).fill(null));
  const [resultPost, setResultPost] = useState<Post | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const { showAlert } = useAlertContext();
  const isAuthenticated = useAuthStore((state) => !!state.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api.get<{ data: Post[] }>("/api/posts");
        setPosts(res.data.data || []);
      } catch (err) {
        console.error("Error fetching posts:", err);
        showAlert("No se pudieron cargar los posts. Intenta más tarde", "error");
      }
    };
    fetchPosts();
  }, []);

  const handleAnswer = (optionIndex: number, option: { text: string; category: string }) => {
    const newAnswers = [...answers];
    newAnswers[index] = { index: optionIndex, category: option.category };
    setAnswers(newAnswers);
  };

  const handleNext = () => setIndex((prev) => Math.min(prev + 1, QUESTIONS.length - 1));
  const handlePrev = () => setIndex((prev) => Math.max(prev - 0, 0));

  const handleFinish = () => {
    if (!isAuthenticated) {
      showAlert("Debes iniciar sesión para hacer el test 🦭", "warning");
      return;
    }
    const chosen = pickPostByCategory(answers.filter(Boolean), posts);
    setResultPost(chosen);
  };

  const categoryMessage = (post: Post) => {
    const category = post.categories?.[0]?.name;
    switch (category) {
      case "problems-threats":
        return "¡Estás muy comprometido con el cuidado de los océanos, gracias!";
      case "marine-life":
        return "¡Tienes una gran conexión con la vida marina!";
      case "ocean-ecosystems":
        return "¡Te preocupan los ecosistemas y su conservación!";
      case "science-exploration":
        return "¡Tu curiosidad científica es inspiradora!";
      case "world-regions":
        return "¡Te encanta explorar los océanos del mundo!";
      default:
        return "¡Tu interés por el océano es admirable!";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #0077be 0%, #00cfff 100%)",
        animation: "wave 10s ease-in-out infinite",
        overflow: "hidden",
        py: 5,
      }}
    >
      <style>
        {`
          @keyframes wave {
            0% { background-position: 0 0; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0 0; }
          }
        `}
      </style>

      <Container sx={{ textAlign: "center", position: "relative" }}>
        <Typography variant="h4" mb={2} color="#fff">🌊 ¿Qué post eres?</Typography>

        {!resultPost && (
          <LinearProgress
            variant="determinate"
            value={((index + 1) / QUESTIONS.length) * 100}
            sx={{ mb: 3, height: 10, borderRadius: 5 }}
          />
        )}

        {!resultPost ? (
          <>
            <QuestionCard
              question={QUESTIONS[index]}
              onAnswer={handleAnswer}
              selectedIndex={answers[index]?.index ?? null}
            />
            <Stack direction="row" justifyContent="center" spacing={2} mt={3}>
              <Button onClick={handlePrev} disabled={index === 0} variant="outlined">Atrás</Button>
              {index < QUESTIONS.length - 1 ? (
                <Button
                  onClick={handleNext}
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    transition: "transform 0.2s ease, box-shadow 0.3s ease",
                    "&:hover": { transform: "scale(1.05)", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" },
                  }}
                >
                  Siguiente
                </Button>
              ) : (
                <Button
                  onClick={handleFinish}
                  variant="contained"
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    transition: "transform 0.2s ease, box-shadow 0.3s ease",
                    "&:hover": { transform: "scale(1.05)", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" },
                  }}
                >
                  Ver resultado
                </Button>
              )}
            </Stack>
          </>
        ) : (
          <Box
            sx={{
              mt: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              position: "relative",
            }}
          >
            {/* Confeti */}
            <Confetti width={window.innerWidth} height={window.innerHeight} />

            {/* Gif de celebración */}
            <Avatar
              src="/assets/VirtualAssistant/dancing-seal.gif"
              sx={{
                width: { xs: 100, sm: 120, md: 150 },
                height: { xs: 100, sm: 120, md: 150 },
                mb: 2,
                border: "3px solid #fff",
                boxShadow: "0 0 15px rgba(0,0,0,0.3)",
                mx: "auto",
              }}
            />

            <Typography variant="h5" mb={2} color="#fff">¡Tu resultado! 🐚</Typography>

            {resultPost && (
              <Box
                onClick={() => navigate(`/post/${resultPost.id}`)}
                sx={{
                  cursor: "pointer",
                  width: { xs: "90%", sm: "60%", md: "40%" },
                  transition: "transform 0.3s ease",
                  "&:hover": { transform: "scale(1.05)" },
                  position: "relative",
                  mt: 2
                }}
              >
                <ResultCard post={resultPost} />
                <Typography
                  variant="subtitle1"
                  sx={{ mt: 1, color: "#fff", fontWeight: "bold" }}
                >
                  {categoryMessage(resultPost)}
                </Typography>
              </Box>
            )}

            <Button sx={{ mt: 3 }} onClick={() => window.location.reload()}>
              Rehacer test
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
