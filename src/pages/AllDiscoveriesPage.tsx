import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { api } from "../services/api";
import { PostCard } from "../components/PostCard";

interface Category {
  id: number;
  name: string;
}

interface PostImage {
  id: number;
  url: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  credits?: string;
  categories?: Category[];
  images?: PostImage[];
  createdAt: string;
  userId: number;
}

export default function AllDiscoveriesPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await api.get("/api/posts");

      if (Array.isArray(res.data.data)) {
        setPosts(res.data.data);
      } else {
        console.warn("Los datos recibidos no son un array:", res.data);
        setPosts([]);
      }
    } catch (err: any) {
      console.error("Error al obtener los descubrimientos:", err);
      setError("No se pudieron cargar los descubrimientos. Intenta más tarde.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography>Cargando descubrimientos...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 6, textAlign: "center" }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ py: 6, px: 3, minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <Typography
        variant="h3"
        align="center"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "#004d61",
          textTransform: "uppercase",
        }}
      >
        🌊 Todos los Descubrimientos
      </Typography>

      {posts.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ color: "#777", mt: 4 }}>
          No hay descubrimientos aún 🐚
        </Typography>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
            maxWidth: "1400px",
            margin: "0 auto",
          }}
        >
          {posts.map((post) => (
            <Box key={post.id} sx={{ flex: "1 1 300px", maxWidth: 350 }}>
              <PostCard
                post={{
                  id: String(post.id),
                  title: post.title,
                  image: post.images?.[0]?.url || "",
                  likes: 0,
                  author: `Usuario ${post.userId}`,
                  date: post.createdAt,
                }}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}