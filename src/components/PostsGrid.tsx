import React from "react";
import { Box } from "@mui/material";
import { PostCard } from "../components/PostCard";

interface PostsGridProps {
  posts: any[];
}

export const PostsGrid: React.FC<PostsGridProps> = ({ posts }) => {
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 3 }}>
      {posts.map((post) => (
        <Box key={post.id}>
          <PostCard post={post} />
        </Box>
      ))}
    </Box>
  );
};