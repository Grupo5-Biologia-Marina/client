import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import { PostCard } from "../../components/PostCard";
import { getPostsByCategory } from "../../redux/actions/postActions";

export const CategoryPostsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useDispatch();
  const posts = useSelector((state: any) => state.postReducer.postsByCategory);

  useEffect(() => {
    if (slug) {
      // @ts-ignore -> para evitar errores de tipo en el dispatch
      dispatch(getPostsByCategory(slug));
    }
  }, [slug, dispatch]);

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
        {slug?.replace("-", " ")}
      </Typography>

      {posts?.length > 0 ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr",
            },
            gap: 3,
          }}
        >
          {posts.map((post: any) => (
            <Box key={post.id}>
              <PostCard post={post} />
            </Box>
          ))}
        </Box>
      ) : (
        <Typography
          variant="h6"
          align="center"
          sx={{ color: "#777", mt: 4 }}
        >
          No hay publicaciones disponibles en esta categoría todavía 🐚
        </Typography>
      )}
    </Box>
  );
};
