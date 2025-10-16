import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adjuntar token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========================================
// ❤️ LIKES API
// ========================================

/**
 * Toggle like/unlike en un post (requiere autenticación)
 * @param postId - ID del post
 * @returns Promise con { success, data: { liked: boolean }, message }
 */
export const toggleLike = (postId: string | number) => {
  return api.post(`/api/posts/${postId}/likes`);
};

/**
 * Obtener información de likes de un post
 * @param postId - ID del post
 * @returns Promise con { success, data: { likesCount: number, isLikedByUser: boolean }, message }
 */
export const getLikeInfo = (postId: string | number) => {
  return api.get(`/api/posts/${postId}/likes`);
};