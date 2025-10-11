import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { PostCard } from "../../components/PostCard";
import { api } from "../../services/api";

interface Category {
  id: number;
  name: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  credits?: string;
  categories?: Category[];
  images?: { url: string }[];
  createdAt: string;
  userId: number;
}

// Mapeo de slug a categoría real
const categoryMap: Record<string, string> = {
  "marine-life": "🐠 Vida Marina",
  "ocean-ecosystems": "🌊 Ecosistemas Oceánicos",
  "science-exploration": "🔬 Ciencia y Exploración",
  "problems-threats": "⚠️ Problemas y Amenazas",
  "world-regions": "🌍 Regiones y Océanos del Mundo",
};

export const CategoryPostsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categoryName = slug ? categoryMap[slug] : "";

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        console.log("📡 Fetching all posts from API...");
        
        const res = await api.get("/api/posts");
        console.log("✅ API Response:", res.data);

        const allPosts: Post[] = Array.isArray(res.data.data) ? res.data.data : [];
        console.log("📦 All posts:", allPosts);

        if (!categoryName) {
          console.warn("⚠️ No category name found for slug:", slug);
          setPosts([]);
          return;
        }

        // Filtrar posts por categoría
        const filteredPosts = allPosts.filter((post) => {
          if (post.categories && Array.isArray(post.categories)) {
            const hasCategory = post.categories.some(
              (cat) => cat.name === categoryName
            );
            console.log(
              `🔍 Post "${post.title}" categories:`,
              post.categories.map((c) => c.name),
              "- Has category:",
              hasCategory
            );
            return hasCategory;
          }
          return false;
        });

        console.log("✅ Filtered posts:", filteredPosts);
        setPosts(filteredPosts);
      } catch (err: any) {
        console.error("❌ Error fetching posts:", err);
        setError("No se pudieron cargar los posts");
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchPosts();
    }
  }, [slug, categoryName]);

  return (
    <Box sx={{ py: 6, px: 3 }}>
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
        {categoryName || slug?.replace("-", " ")}
      </Typography>

      {loading ? (
        <Typography align="center">Cargando posts...</Typography>
      ) : error ? (
        <Typography align="center" color="error">
          {error}
        </Typography>
      ) : posts.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {posts.map((post) => (
            <Box key={post.id} sx={{ flex: "1 1 300px", maxWidth: 350 }}>
              <PostCard 
                post={{
                  id: String(post.id),
                  title: post.title,
                  image: post.images?.[0]?.url || '',
                  likes: 0,
                  author: `Usuario ${post.userId}`,
                  date: post.createdAt
                }}
              />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography variant="h6" align="center" sx={{ color: "#777", mt: 4 }}>
          No hay publicaciones disponibles en esta categoría todavía 🐚
        </Typography>
      )}
    </Box>
  );
};