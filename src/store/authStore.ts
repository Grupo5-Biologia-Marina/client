import { create } from 'zustand';

interface AuthState {
  userId: string | null;
  setUserId: (id: string | null) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  userId: localStorage.getItem('userId') || null, // Inicializa desde localStorage
  setUserId: (id) => {
    if (id) localStorage.setItem('userId', id);
    else localStorage.removeItem('userId');
    set({ userId: id });
  },
  clearToken: () => {
    localStorage.removeItem('userId');
    set({ userId: null });
  },
}));
