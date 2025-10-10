import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/PostDetailPage.css";

interface User {
  id: number;
  username: string;
  email: string;
}

interface Category {
  id: number;
  name: string;
}

interface PostImage {
  id: number;
  url: string;
  caption?: string;
  credit?: string;
}

interface Post {
  id: number;
  title: string;
  content: string;
  credits?: string;
  user?: User;
  categories?: Category[];
  images?: PostImage[];
}

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Datos de prueba
    const mockPost: Post = {
      id: Number(id) || 1,
      title: "Nuevo Descubrimiento en el Océano Antártico",
      content: `Científicos han encontrado una nueva especie de medusa que brilla bajo el agua fría. 
Se espera que su estudio ayude a entender mejor los ecosistemas marinos polares.`,
      credits: "Foto: Oceanic Research Team",
      user: { id: 1, username: "marine_researcher", email: "research@example.com" },
      categories: [
        { id: 1, name: "Vida Marina" },
        { id: 2, name: "Ecosistemas Oceánicos" }
      ],
      images: [
        { id: 1, url: "https://placekitten.com/800/400", caption: "Medusa recién descubierta", credit: "Oceanic Research Team" },
        { id: 2, url: "https://placekitten.com/800/401", caption: "Vista submarina", credit: "Oceanic Research Team" }
      ]
    };

    // Simulamos fetch async
    setPost(mockPost);
    setLoading(false);
    console.log("Mock post cargado:", mockPost);
  }, [id]);

  if (loading) return <p className="loading">Cargando descubrimiento...</p>;
  if (!post) return <p className="error">No se encontró el descubrimiento.</p>;

  return (
    <div className="detail-background">
      <main className="post-detail-container">
        <h1 className="post-title">{post.title}</h1>

        {post.user && (
          <p className="post-author">
            Publicado por <strong>{post.user.username}</strong>
          </p>
        )}

        {post.categories && post.categories.length > 0 && (
          <p className="post-categories">
            Categorías:{" "}
            {post.categories.map((c) => (
              <span key={c.id} className="category">{c.name}</span>
            ))}
          </p>
        )}

        <article className="post-content">{post.content}</article>

        {post.credits && <p className="post-credits">Créditos: {post.credits}</p>}

        {post.images && post.images.length > 0 && (
          <section className="post-images">
            <h3>Imágenes</h3>
            {post.images.map((img) => (
              <figure key={img.id} className="post-image-item">
                <img src={img.url} alt={img.caption || "Imagen del descubrimiento"} />
                {img.caption && <figcaption>{img.caption}</figcaption>}
                {img.credit && <small className="image-credit">{img.credit}</small>}
              </figure>
            ))}
          </section>
        )}

        <Link to="/posts" className="back-link">
          ← Volver a todos los descubrimientos
        </Link>
      </main>
    </div>
  );
}