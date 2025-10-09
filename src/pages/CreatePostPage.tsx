import React from "react";
import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";
import "../pages/CreatePostPage.css"

export default function CreatePostPage() {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));

  if (!userId) {
    // Si no hay usuario logueado, redirigir al login
    navigate("/login");
    return null;
  }

  const handlePostCreated = () => {
    alert("Post creado con éxito");
  };

  return (
    <div className="create-post-page">
      <h1 className="title-post">Crea un nuevo descubrimiento</h1>
      <PostForm userId={userId} onPostCreated={handlePostCreated} />
    </div>
  );
}
