import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { PostCard } from "../components/PostCard";
import '../pages/Discoveries.css';

interface MyPost {
  id?: number;       
  _id?: number | string; 
  title: string;
  content: string;
  createdAt: string;
  image?: string;
  likes?: any[];
}

const MyPostsPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [posts, setPosts] = useState<MyPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("Usuario no válido");
      setLoading(false);
      return;
    }

    const fetchMyPosts = async () => {
      try {
        const res = await api.get(`/api/posts/user/${userId}`);
        const fetchedPosts: MyPost[] = res.data;

        console.log("Posts recibidos del backend:", fetchedPosts);

        // Mapeamos para asegurar que cada post tenga un id numérico
        const mappedPosts = fetchedPosts.map(post => ({
          ...post,
          id: post.id ?? Number(post._id), // ⚠ usar id o convertir _id a número
        }));

        setPosts(mappedPosts);
      } catch (err) {
        console.error("Error al cargar tus publicaciones:", err);
        setError("Error al cargar tus publicaciones");
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [userId]);

  if (loading) return <p style={{ textAlign: "center" }}>Cargando publicaciones...</p>;
  if (error) return <p style={{ textAlign: "center" }}>{error}</p>;

  return (
    <div className="page-container">
      <h1>Mis publicaciones</h1>

      {posts.length === 0 && <p style={{ textAlign: "center" }}>No tienes publicaciones todavía.</p>}

      <div className="cards-grid">
        {posts.map(post => (
          <PostCard
            key={post.id}
            post={{
              id: post.id!, 
              title: post.title,
              image: post.image || "",
              likes: post.likes?.length || 0,
              author: "Tú",
              date: post.createdAt,
            }}
            from={`/my-posts/${userId}`}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPostsPage;
