import { useState, useEffect } from 'react';
import { getLikeInfo, toggleLike } from '../services/api';
import { useAuthStore } from '../store/authStore';
import { useAlertContext } from '../context/AlertContext'; // ✅ import del contexto global

export const useLike = (postId: string | number) => {
  const [likesCount, setLikesCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = useAuthStore((state) => !!state.token);
  const { showAlert } = useAlertContext(); // ✅ acceso a las alertas globales

  // 🔄 Cargar estado inicial del like
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

  // ❤️ Lógica de toggle del like
  const handleToggleLike = async () => {
    if (!isAuthenticated) {
      showAlert('Debes iniciar sesión para dar like', 'warning'); // ⚠️ reemplazo del alert()
      return;
    }

    setLoading(true);
    try {
      const res = await toggleLike(postId);
      const liked = res.data.data.liked;

      setIsLiked(liked);
      setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
    } catch (error: any) {
      console.error('Error toggling like:', error);
      showAlert('Error al dar like', 'error'); // ❌ reemplazo del alert()
    } finally {
      setLoading(false);
    }
  };

  return { likesCount, isLiked, loading, handleToggleLike };
};
