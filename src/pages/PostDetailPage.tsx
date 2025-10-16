import { useEffect, useState } from "react";
import { useParams, Link, useNavigate, useLocation } from "react-router-dom";
import { api } from "../services/api";
import { useAuthStore } from "../store/authStore";
import LikeButton from "../components/LikeButton";
import "../styles/PostDetailPage.css";
import { useAlertContext } from "../context/AlertContext";
import NavigationButtons from "../components/NavigationButtons";

interface Post {
  id: number;
  title: string;
  content: string;
  credits?: string;
  userId: number;
  username?: string;
  categories?: { id: number; name: string }[];
  images?: { id: number; url: string; caption?: string; credit?: string }[];
  createdAt?: string;
}

export default function PostDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const role = useAuthStore((state) => state.role);
  const userId = useAuthStore((state) => state.userId);
  const { showAlert } = useAlertContext();

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const backPath = location.state?.from || "/posts";
  const backText = backPath.includes("/my-posts")
    ? "Volver a mis descubrimientos"
    : "Volver a descubrimientos";

  const canEditOrDelete = () => {
    if (!post || !userId) return false;
    if (role === "admin") return true;
    if (role === "user" && Number(post.userId) === Number(userId)) return true;
    return false;
  };

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const res = await api.get(`/api/posts/${id}`);
        setPost(res.data.data);
      } catch (err: any) {
        console.error("❌ Error fetching post:", err);
        setError("No se pudo cargar el descubrimiento");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!post) return;
    try {
      await api.delete(`/api/posts/${post.id}`);
      showAlert("Post eliminado correctamente", "success");
      navigate("/posts");
    } catch (err: any) {
      console.error(err);
      const errorMessage = err.response?.data?.message || "Error al eliminar el post";
      showAlert(errorMessage, "error");
    } finally {
      setConfirmDeleteOpen(false);
    }
  };

  const handleEdit = () => {
    navigate(`/post/edit/${post?.id}`);
  };

  const openConfirmDelete = () => setConfirmDeleteOpen(true);
  const cancelDelete = () => setConfirmDeleteOpen(false);

  if (loading) return <p className="loading">Cargando descubrimiento...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!post) return <p className="error">No se encontró el descubrimiento.</p>;

  return (
    <div className="detail-background">
      <main className="post-detail-container">
        <h1 className="post-title">{post.title}</h1>

        {post.username && (
          <p className="post-author">
            Publicado por <strong>{post.username}</strong>
          </p>
        )}

        {post.createdAt && (
          <p className="post-date">
            Fecha:{" "}
            {new Date(post.createdAt).toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        )}

        {post.categories && post.categories.length > 0 && (
          <div className="post-categories">
            <strong>Categorías: </strong>
            {post.categories.map((c, index) => (
              <span key={c.id}>
                <span className="category">{c.name}</span>
                {index < (post.categories?.length ?? 0) - 1 && ", "}
              </span>
            ))}
          </div>
        )}

        <article className="post-content">
          {post.content.split("\n").map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </article>

        <div className="post-like-section">
          <LikeButton postId={post.id} variant="default" />
        </div>

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
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/800x400?text=Imagen+no+disponible";
                  }}
                />
                {img.caption && <figcaption>{img.caption}</figcaption>}
                {img.credit && (
                  <small className="image-credit">Crédito: {img.credit}</small>
                )}
              </figure>
            ))}
          </section>
        )}

        {canEditOrDelete() && (
          <div className="post-actions-admin">
            <button className="btn btn-edit" onClick={handleEdit}>
              Editar
            </button>
            <button className="btn btn-delete" onClick={openConfirmDelete}>
              Eliminar
            </button>
          </div>
        )}

        <div className="post-actions">
          <Link to={backPath} className="btn btn-back">
            ← {backText}
          </Link>
        </div>

        {confirmDeleteOpen && (
          <div className="confirm-overlay">
            <div className="confirm-box">
              <p>¿Seguro que quieres eliminar este post?</p>
              <div className="confirm-actions">
                <button className="btn btn-confirm" onClick={handleDelete}>
                  Sí, eliminar
                </button>
                <button className="btn btn-cancel" onClick={cancelDelete}>
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
      <NavigationButtons />
    </div>
  );
}
