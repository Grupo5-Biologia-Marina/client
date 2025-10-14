import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    image: string;
    likes: number;
    author?: string;
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
        textAlign: "center",
        borderRadius: "1.5rem",
        overflow: "hidden",
        background: "linear-gradient(135deg, #001f3f, #003d6b, #005f99)",
        color: "#e0f7ff",
        boxShadow: "0 0 25px rgba(0, 191, 255, 0.3)",
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px) scale(1.03)",
          boxShadow: "0 0 40px rgba(0, 255, 255, 0.5)",
        },
      }}
    >
      {/* Imagen */}
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="220"
          image={post.image || "https://via.placeholder.com/400x200?text=Sin+imagen"}
          alt={post.title}
          sx={{
            filter: "brightness(0.9)",
            transition: "filter 0.3s ease",
            "&:hover": { filter: "brightness(1)" },
          }}
        />

        {/* Efecto de brillo en hover */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,30,0.6), rgba(0,0,50,0))",
          }}
        />
      </Box>

      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
          p: 3,
        }}
      >
        {/* Título del post */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            color: "#00eaff",
            textShadow: "0 0 8px rgba(0, 255, 255, 0.5)",
          }}
        >
          {post.title}
        </Typography>

        <Divider
          sx={{
            width: "60%",
            borderColor: "rgba(0, 255, 255, 0.4)",
            my: 1,
          }}
        />

        {/* Autor y fecha */}
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          ✦ {post.author ?? "Usuario desconocido"} ✦
        </Typography>
        <Typography variant="caption" sx={{ color: "#b0e0ff" }}>
          {new Date(post.date).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Typography>

        {/* Likes */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mt: 1.5,
            background: "rgba(0, 200, 255, 0.1)",
            borderRadius: "2rem",
            px: 2,
            py: 0.5,
            boxShadow: "inset 0 0 8px rgba(0, 255, 255, 0.3)",
          }}
        >
          <IconButton
            size="small"
            sx={{
              color: "#00ffff",
              "&:hover": { color: "#00bfff", transform: "scale(1.2)" },
              transition: "all 0.3s ease",
            }}
          >
            <FavoriteIcon fontSize="small" />
          </IconButton>
          <Typography
            variant="body2"
            sx={{
              fontWeight: 600,
              color: "#e0f7ff",
              textShadow: "0 0 6px rgba(0,255,255,0.4)",
            }}
          >
            {post.likes}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
