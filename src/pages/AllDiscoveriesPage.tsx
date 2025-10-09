import { useEffect, useState } from "react";
import { fakePosts, Post } from "../services/FakePosts";

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Simula una llamada a API
    const fetchPosts = async () => {
      await new Promise(res => setTimeout(res, 500)); // retraso simulado
      setPosts(fakePosts);
    };
    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      <h1 className="posts-title">Descubrimientos Marinos 🐚</h1>

      <div className="posts-grid">
        {posts.map(post => (
          <div key={post.id} className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-content">{post.content}</p>

            {post.images.map((img, idx) => (
              <img key={idx} src={img} alt={post.title} className="post-image" />
            ))}

            <p className="post-credits">Créditos: {post.credits}</p>
            <p className="post-categories">
              Categorías: {post.categories.join(", ")}
            </p>
            <p className="post-date">
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}