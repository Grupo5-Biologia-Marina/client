import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../services/api";
import { PostCard } from "../components/PostCard";
import '../styles/PostsPage.css'

interface MyPost {
  _id: string;
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
    const fetchMyPosts = async () => {
      if (!userId) return;

      try {
        const res = await api.get(`/api/posts/user/${userId}`);
        setPosts(res.data);
      } catch (err) {
        console.error(err);
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
            key={post._id}
            post={{
              id: post._id,
              title: post.title,
              image: post.image || "", 
              likes: post.likes?.length || 0,
              author: "Tú",
              date: post.createdAt,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPostsPage;
