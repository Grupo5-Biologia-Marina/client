import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import sealLike from "../assets/icon/seal-like.png";

export interface PostCardProps {
  post: {
    id: string;
    title: string;
    image: string;
    likes: number;
    author: string;
    date: string;
  };
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/posts/${post.id}`);
  };

  return (
    <Box
      onClick={handleClick}
      sx={{
        width: 300,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        backgroundColor: "#fff",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 6px 16px rgba(0,0,0,0.3)",
        },
      }}
    >
      {post.image && (
        <Box
          component="img"
          src={post.image}
          alt={post.title}
          sx={{ 
            width: "100%", 
            height: 180, 
            objectFit: "cover",
            backgroundColor: "#f0f0f0"
          }}
          onError={(e) => {
            // Si la imagen falla, muestra un placeholder
            (e.target as HTMLImageElement).src = "https://via.placeholder.com/300x180?text=Sin+Imagen";
          }}
        />
      )}
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {post.author} - {new Date(post.date).toLocaleDateString()}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Box 
            component="img" 
            src={sealLike} 
            alt="likes" 
            sx={{ width: 20, height: 20, mr: 1 }} 
          />
          <Typography>{post.likes}</Typography>
        </Box>
      </Box>
    </Box>
  );
};