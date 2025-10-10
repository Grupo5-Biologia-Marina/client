import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  userId: string | null;
  userName: string | null;
  userEmail: string | null;
  token: string | null;
  role: string | null;
  setUserId: (id: string | null) => void;
  setUser: (user: { id: string; name?: string; email?: string; token?: string; role?: string }) => void;
  clearToken: () => void;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      userId: null,
      userName: null,
      userEmail: null,
      token: null,
      role: null,

      // Establecer solo el userId
      setUserId: (id) => {
        console.log('🔹 setUserId llamado con:', id);
        set({ userId: id });
      },

      // Establecer todos los datos del usuario de una vez
      setUser: (user) => {
        console.log('🔹 setUser llamado con:', user);
        set({
          userId: user.id,
          userName: user.name || null,
          userEmail: user.email || null,
          token: user.token || null,
          role: user.role || null,
        });
        console.log('✅ Estado actualizado. Nuevo userId:', get().userId);
      },

      // Limpiar toda la sesión
      clearToken: () => {
        console.log('🔹 clearToken llamado - limpiando sesión');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        set({
          userId: null,
          userName: null,
          userEmail: null,
          token: null,
          role: null,
        });
        console.log('✅ Sesión limpiada');
      },

      // Verificar si el usuario está autenticado
      isAuthenticated: () => {
        const authenticated = get().userId !== null && get().token !== null;
        return authenticated;
      },
    }),
    {
      name: 'auth-storage', // Nombre en localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// 🔍 Debug helper - puedes llamar esto desde la consola del navegador
if (typeof window !== 'undefined') {
  (window as any).debugAuth = () => {
    const state = useAuthStore.getState();
    console.log('📊 Estado actual de Zustand:', state);
    console.log('📦 localStorage auth-storage:', localStorage.getItem('auth-storage'));
    console.log('📦 localStorage userId:', localStorage.getItem('userId'));
    console.log('📦 localStorage token:', localStorage.getItem('token'));
  };
  
  console.log('🔧 Debug helper disponible. Escribe debugAuth() en la consola para ver el estado.');
}