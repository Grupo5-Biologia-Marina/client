import { Heart } from 'lucide-react';
import { useLike } from '../hooks/useLike';
import '../styles/LikeButton.css';

interface LikeButtonProps {
  postId: string | number;
  variant?: 'default' | 'card'; // Para diferentes estilos
}

export default function LikeButton({ postId, variant = 'default' }: LikeButtonProps) {
  const { likesCount, isLiked, loading, handleToggleLike } = useLike(postId);

  return (
    <button
      className={`like-button ${variant} ${isLiked ? 'liked' : ''}`}
      onClick={handleToggleLike}
      disabled={loading}
      aria-label={isLiked ? 'Quitar like' : 'Dar like'}
    >
      <Heart 
        className="heart-icon" 
        fill={isLiked ? 'currentColor' : 'none'}
      />
      <span className="likes-count">{likesCount}</span>
    </button>
  );
}