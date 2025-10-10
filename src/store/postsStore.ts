import { create } from "zustand";
import { api } from "../services/api";

export interface Post {
  id: string;
  title: string;
  content?: string;
  credits?: string;
  image: string;
  images?: string[];
  likes: number;
  author: string;
  date: string;
  category: string;
  categories?: string[];
  userId?: number;
}

interface PostsState {
  posts: Post[];
  allPosts: Post[];
  loading: boolean;
  fetchAllPosts: () => Promise<void>;
  fetchPostsByCategory: (slug: string) => Promise<void>;
}

// Mapeo de slug a categoría real (debe coincidir EXACTAMENTE con el seeder)
const categoryMap: Record<string, string> = {
  "marine-life": "🐠 Vida Marina",
  "ocean-ecosystems": "🌊 Ecosistemas Oceánicos",
  "science-exploration": "🔬 Ciencia y Exploración",
  "problems-threats": "⚠️ Problemas y Amenazas",
  "world-regions": "🌍 Regiones y Océanos del Mundo",
};

export const usePostsStore = create<PostsState>((set, get) => ({
  posts: [],
  allPosts: [],
  loading: false,

  fetchAllPosts: async () => {
    console.log("📡 Fetching all posts...");
    set({ loading: true });
    try {
      const res = await api.get("/api/posts");
      console.log("✅ All posts fetched:", res.data);
      
      const postsData = res.data.data || res.data;
      set({ allPosts: postsData, posts: postsData });
    } catch (error) {
      console.error("❌ Error fetching all posts:", error);
      set({ posts: [], allPosts: [] });
    } finally {
      set({ loading: false });
    }
  },

  fetchPostsByCategory: async (slug) => {
    console.log("📡 fetchPostsByCategory called with slug:", slug);
    set({ loading: true });
    
    try {
      // Si no hay posts cargados, cargarlos primero
      if (get().allPosts.length === 0) {
        console.log("🔄 No posts in store, fetching all posts first...");
        await get().fetchAllPosts();
      }

      const categoryName = categoryMap[slug];
      console.log("🏷️ Category name from slug:", categoryName);

      if (!categoryName) {
        console.warn("⚠️ No category found for slug:", slug);
        set({ posts: [] });
        return;
      }

      const allPosts = get().allPosts;
      console.log("📦 All posts in store:", allPosts);

      // Filtrar posts que tengan esta categoría
      const filteredPosts = allPosts.filter((post) => {
        // Si el post tiene un array de categorías
        if (post.categories && Array.isArray(post.categories)) {
          const hasCategory = post.categories.includes(categoryName);
          console.log(`🔍 Post "${post.title}" categories:`, post.categories, "- Has category:", hasCategory);
          return hasCategory;
        }
        // Si el post tiene una sola categoría
        if (post.category) {
          const hasCategory = post.category === categoryName;
          console.log(`🔍 Post "${post.title}" category:`, post.category, "- Matches:", hasCategory);
          return hasCategory;
        }
        return false;
      });

      console.log("✅ Filtered posts:", filteredPosts);
      set({ posts: filteredPosts });
    } catch (error) {
      console.error("❌ Error filtering posts by category:", error);
      set({ posts: [] });
    } finally {
      set({ loading: false });
    }
  },
}));