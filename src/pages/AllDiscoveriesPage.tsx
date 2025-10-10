import React, { useEffect, useState } from "react";
import { api } from "../services/api";


export default function AllDiscoveriesPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await api.get("/posts"); // 👈 tu endpoint que devuelve todos los posts
      setPosts(res.data);
    } catch (err) {
      console.error("Error al obtener los descubrimientos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  if (loading) return <p className="loading">Cargando descubrimientos...</p>;

  return (
    <div className="all-discoveries-page">
      <h1 className="title">🌊 Todos los Descubrimientos</h1>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <p>No hay descubrimientos aún.</p>
        ) : (
          posts.map((post) => (
            <div key={post.id} className="post-card">
              <h2>{post.titulo}</h2>
              <p>{post.contenido}</p>

              {post.categorias && (
                <p className="categories">
                  <strong>Categorías:</strong> {post.categorias}
                </p>
              )}

              <div className="images">
                {post.imagenes &&
                  post.imagenes.split(",").map((url: string, i: number) => (
                    <img key={i} src={url} alt={`Imagen ${i}`} />
                  ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
