import { useState, useEffect } from 'react';
import { getLikeInfo, toggleLike } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useAlertContext } from '../context/AlertContext';

export const useLike = (postId: string | number) => {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useAuthStore((state) => !!state.token);
  const { showAlert } = useAlertContext();

  useEffect(() => {
    const fetchLikeInfo = async () => {
      try {
        const numericPostId = typeof postId === 'string' ? parseInt(postId, 10) : postId;
        
        if (isNaN(numericPostId)) {
          console.error('Invalid postId:', postId);
          return;
        }

        const res = await getLikeInfo(numericPostId);
        setLikesCount(res.data.data.likesCount);
        setIsLiked(res.data.data.isLikedByUser);
      } catch (error: any) {
        console.error('Error fetching like info:', error);
        console.error('PostId:', postId);
        console.error('Error response:', error.response?.data);
      }
    };
    
    if (postId) {
      fetchLikeInfo();
    }
  }, [postId]);

  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      showAlert('Debes iniciar sesión para dar like', 'warning');
      return;
    }

    setLoading(true);
    try {
      const numericPostId = typeof postId === 'string' ? parseInt(postId, 10) : postId;
      
      if (isNaN(numericPostId)) {
        showAlert('Error: ID de post inválido', 'error');
        return;
      }

      const res = await toggleLike(numericPostId);
      const liked = res.data.data.liked;

      setIsLiked(liked);
      setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
    } catch (error: any) {
      console.error('Error toggling like:', error);
      console.error('PostId:', postId);
      console.error('Error response:', error.response?.data);
      showAlert('Error al dar like', 'error');
    } finally {
      setLoading(false);
    }
  };

  return { likesCount, isLiked, loading, handleToggleLike };
};