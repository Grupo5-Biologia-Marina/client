import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import PostForm from "../components/PostForm";
import { useAuthStore } from "../store/authStore";
import "../pages/CreatePostPage.css"

interface PostData {
  title: string;
  content: string;
  credits?: string;
  categories?: string[];
  images?: string[];
}

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [postData, setPostData] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const role = useAuthStore((state) => state.role);
  const userId = useAuthStore((state) => state.userId);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const res = await api.get(`/api/posts/${id}`);
        const post = res.data.data;

        // Solo admin o el mismo usuario que creó el post puede editar
        if (role !== "admin" && post.userId !== userId) {
          setError("No tienes permisos para editar este post");
          return;
        }

        // Mapear post a initialData
        setPostData({
          title: post.title,
          content: post.content,
          credits: post.credits,
          categories: post.categories?.map((c: any) => c.name) || [],
          images: post.images?.map((img: any) => img.url) || [],
        });
      } catch (err: any) {
        console.error("Error fetching post:", err);
        setError("No se pudo cargar el post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, role, userId]);

  if (loading) return <p className="loading">Cargando post...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!postData) return <p className="error">No se encontró el post</p>;

  return (
    <div className="create-post-page">
      <h1 className="title-post">Actualiza tu descubrimiento</h1>
      <PostForm
        postId={id}
        initialData={postData}
        userId={userId ? Number(userId) : undefined}
        onPostSaved={() => navigate("/posts")}
      />
    </div>
  );
}
