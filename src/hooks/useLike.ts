import { useState, useEffect } from 'react';
import { getLikeInfo, toggleLike } from '../services/api';
import { useAuthStore } from '../store/authStore';

export const useLike = (postId: string | number) => {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const isAuthenticated = useAuthStore((state) => !!state.token);

  // Cargar estado inicial
  useEffect(() => {
    const fetchLikeInfo = async () => {
      try {
        const res = await getLikeInfo(postId);
        setLikesCount(res.data.data.likesCount);
        setIsLiked(res.data.data.isLikedByUser);
      } catch (error) {
        console.error('Error fetching like info:', error);
      }
    };
    fetchLikeInfo();
  }, [postId]);

  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      alert('Debes iniciar sesión para dar like');
      return;
    }

    setLoading(true);
    try {
      const res = await toggleLike(postId);
      const liked = res.data.data.liked;
      
      setIsLiked(liked);
      setLikesCount(prev => liked ? prev + 1 : prev - 1);
    } catch (error: any) {
      console.error('Error toggling like:', error);
      alert('Error al dar like');
    } finally {
      setLoading(false);
    }
  };

  return { likesCount, isLiked, loading, handleToggleLike };
};