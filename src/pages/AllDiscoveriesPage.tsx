import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { api } from "../services/api";
import { PostCard } from "../components/PostCard";
import '../styles/PostsPage.css'; 
import NavigationButtons from "../components/NavigationButtons";

interface User {
  id: number;
  username: string;
}

interface PostImage {
  id: number;
  url: string;
}

interface Post {
  id: number;
  title: string;
  images?: PostImage[];
  createdAt: string;
  userId: number;
  user?: User;
  likesCount?: number; 
}

export default function AllDiscoveriesPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await api.get<{ data: Post[] }>("/api/posts");
      const postsData = res.data.data || [];
      setPosts(postsData);
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

  const handleLikeUpdate = (postId: number, newLikesCount: number) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId ? { ...post, likesCount: newLikesCount } : post
      )
    );
  };

  if (loading)
    return <Typography align="center" sx={{ py: 6 }}>Cargando descubrimientos...</Typography>;
  if (error)
    return <Typography align="center" sx={{ py: 6 }} color="error">{error}</Typography>;

  return (
    <Box className="page-container">
      <Typography variant="h3" align="center" sx={{ mb: 4, fontWeight: "bold", textTransform: "uppercase" }}>
        🌊 Todos los Descubrimientos
      </Typography>

      {posts.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No hay descubrimientos aún 🐚
        </Typography>
      ) : (
        <Box className="cards-grid">
          {posts.map((post) => {
            const author = post.user?.username || `Usuario ${post.userId}`;
            return (
              <PostCard
                key={post.id}
                post={{
                  id: String(post.id), // ✅ Convertir a string para compatibilidad
                  title: post.title,
                  image: post.images?.[0]?.url || "",
                  likes: post.likesCount ?? 0, 
                  user: post.user,
                  date: post.createdAt,
                }}
                from="/posts" 
                onLikeUpdate={(newCount) => handleLikeUpdate(post.id, newCount)}
              />
            );
          })}
        </Box>
      )}
      <NavigationButtons />
    </Box>
  );
}
