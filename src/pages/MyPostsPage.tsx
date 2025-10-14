import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../services/api";
import '../pages/Discoveries.css';

interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

const MyPostsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMyPosts = async () => {
      if (!userId) {
        setError("Usuario no válido");
        setLoading(false);
        return;
      }

      try {
        const res = await api.get(`/api/posts/user/${userId}`);
        setPosts(res.data);
      } catch (err: any) {
        console.error(err);
        if (err.response?.status === 404) {
          setError("No se encontraron publicaciones para este usuario");
        } else {
          setError("Error al cargar tus publicaciones");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [userId]);

  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-posts-page">
      <h1>Mis publicaciones</h1>
      <button onClick={() => navigate(-1)}>⬅ Volver</button>

      {posts.length === 0 ? (
        <p>No tienes publicaciones todavía.</p>
      ) : (
        <ul>
          {posts.map(post => (
            <li key={post._id} className="post-card">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>Creado el {new Date(post.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyPostsPage;
