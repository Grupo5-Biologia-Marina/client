import React from "react";
import { Card, CardContent, CardMedia, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    image: string;
    likes: number;
    author?: string; // opcional para TS
    date: string;
  };
}

export const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/post/${post.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={post.image || "https://via.placeholder.com/400x200?text=Sin+imagen"}
        alt={post.title}
      />
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Por {post.author ?? `Usuario desconocido`}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(post.date).toLocaleDateString("es-ES")}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <FavoriteIcon sx={{ fontSize: 16, color: "red", mr: 0.5 }} />
          <Typography variant="body2">{post.likes}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
