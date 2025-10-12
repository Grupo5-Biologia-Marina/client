import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "../services/api";
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
  createdAt?: string;
}

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        console.log("📡 Fetching post with ID:", id);
        
        const res = await api.get(`/api/posts/${id}`);
        console.log("✅ Post fetched:", res.data);
        
        // El post viene en res.data.data
        const postData = res.data.data || res.data;
        setPost(postData);
      } catch (err: any) {
        console.error("❌ Error fetching post:", err);
        setError("No se pudo cargar el descubrimiento");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) return <p className="loading">Cargando descubrimiento...</p>;
  if (error) return <p className="error">{error}</p>;
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

        {post.createdAt && (
          <p className="post-date">
            Fecha: {new Date(post.createdAt).toLocaleDateString('es-ES', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        )}

        {post.categories && post.categories.length > 0 && (
          <div className="post-categories">
            <strong>Categorías: </strong>
            {post.categories.map((c, index) => (
              <span key={c.id}>
                <span className="category">{c.name}</span>
                {index < post.categories!.length - 1 && ", "}
              </span>
            ))}
          </div>
        )}

        <article className="post-content">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </article>

        {post.credits && (
          <p className="post-credits">
            <strong>Créditos:</strong> {post.credits}
          </p>
        )}

        {post.images && post.images.length > 0 && (
          <section className="post-images">
            <h3>Galería de imágenes</h3>
            {post.images.map((img) => (
              <figure key={img.id} className="post-image-item">
                <img 
                  src={img.url} 
                  alt={img.caption || post.title} 
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x400?text=Imagen+no+disponible";
                  }}
                />
                {img.caption && <figcaption>{img.caption}</figcaption>}
                {img.credit && <small className="image-credit">Crédito: {img.credit}</small>}
              </figure>
            ))}
          </section>
        )}

        <div className="post-actions">
          <Link to="/discoveries" className="back-link">
            ← Volver a descubrimientos
          </Link>
          <Link to="/posts" className="back-link">
            Ver todos los posts
          </Link>
        </div>
      </main>
    </div>
  );
}