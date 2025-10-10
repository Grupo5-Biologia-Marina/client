import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { PostCard } from "../../components/PostCard";
import type { Post } from "../../store/postsStore";
import { usePostsStore } from "../../store/postsStore";

export const CategoryPostsPage: React.FC = () => {
  console.log("🎯 CategoryPostsPage component rendering");
  
  const { slug } = useParams<{ slug: string }>();
  console.log("📍 useParams slug:", slug);
  
  const posts = usePostsStore((state) => state.posts);
  const loading = usePostsStore((state) => state.loading);
  const fetchPostsByCategory = usePostsStore((state) => state.fetchPostsByCategory);
  
  console.log("📦 Store state - posts:", posts, "loading:", loading);

  useEffect(() => {
    console.log("🔍 useEffect triggered, slug:", slug);
    console.log("🔍 fetchPostsByCategory function:", typeof fetchPostsByCategory);
    
    if (slug) {
      console.log("✅ Calling fetchPostsByCategory with slug:", slug);
      fetchPostsByCategory(slug);
    } else {
      console.log("❌ slug is undefined or empty");
    }
  }, [slug, fetchPostsByCategory]);

  return (
    <Box sx={{ py: 6, px: 3 }}>
      <Typography
        variant="h3"
        align="center"
        sx={{ mb: 4, fontWeight: "bold", color: "#004d61", textTransform: "uppercase" }}
      >
        {slug?.replace("-", " ")}
      </Typography>

      {loading ? (
        <Typography align="center">Cargando posts...</Typography>
      ) : posts.length > 0 ? (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          {posts.map((post: Post) => (
            <Box key={post.id} sx={{ flex: "1 1 300px", maxWidth: 350 }}>
              <PostCard post={post} />
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