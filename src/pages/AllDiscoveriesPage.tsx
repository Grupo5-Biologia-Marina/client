import React, { useEffect, useState } from "react";
import { api } from "../services/api";

interface Post {
  id: number;
  title: string;
  content: string;
  credits?: string;
  categories?: string[];
  images?: string[];
  createdAt: string;
}

export default function AllDiscoveriesPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await api.get("/api/posts"); // endpoint GET /posts

      // Los posts reales están en res.data.data
      if (Array.isArray(res.data.data)) {
        setPosts(res.data.data);
      } else {
        console.warn("Los datos recibidos no son un array:", res.data);
        setPosts([]);
      }
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

  if (loading) return <p>Cargando descubrimientos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="all-discoveries-page">
      <h1>🌊 Todos los Descubrimientos</h1>

      {posts.length === 0 ? (
        <p>No hay descubrimientos aún.</p>
      ) : (
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
              {post.credits && (
                <p>
                  <strong>Créditos:</strong> {post.credits}
                </p>
              )}
              {post.categories && post.categories.length > 0 && (
                <p>
                  <strong>Categorías:</strong> {post.categories.join(", ")}
                </p>
              )}
              <div className="images">
                {post.images &&
                  post.images.map((url, i) => (
                    <img key={i} src={url} alt={`Imagen ${i}`} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}


