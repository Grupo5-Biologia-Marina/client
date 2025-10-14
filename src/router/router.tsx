import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

// Auth
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

// Users
import ProfilePage from "../pages/ProfilePage";       // GET /users/:id
import UsersAdminPage from "../pages/UsersAdminPage"; // GET /users (admin)

// Posts
import WelcomePage from "../pages/WelcomePage";
import DiscoveriesPage from "../pages/DiscoveriesPage"; // GET /posts visibles
import PostDetailPage from "../pages/PostDetailPage";   // GET /posts/:id
import CreatePostPage from "../pages/CreatePostPage";   // POST /posts
import AllDiscoveriesPage from "../pages/AllDiscoveriesPage"; // GET /posts
import EditPostPage from "../pages/EditPostPage";
import MyPostsPage from "../pages/MyPostsPage";

// Categories
import MarineLifePage from "../pages/categories/MarineLifePage";
import OceanEcosystemsPage from "../pages/categories/OceanEcosystemsPage";
import ProblemsThreatsPage from "../pages/categories/ProblemsThreatsPage";
import ScienceExplorationPage from "../pages/categories/ScienceExplorationPage";
import WorldRegionsPage from "../pages/categories/WorldRegionsPage";
import { CategoryPostsPage } from "../pages/categories/CategoryPostsPage";

// Common
import NotFoundPage from "../pages/NotFoundPage";
import Creators from "../pages/CreatorsPage";

/**
 * ProtectedRoute: Solo permite acceso si el usuario está autenticado
 */
interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userId = useAuthStore((state) => state.userId);

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

/**
 * PublicOnlyRoute: Redirige a discoveries si ya está autenticado
 * (para login/register)
 */
function PublicOnlyRoute({ children }: ProtectedRouteProps) {
  const userId = useAuthStore((state) => state.userId);

  if (userId) {
    return <Navigate to="/discoveries" replace />;
  }

  return <>{children}</>;
}

export default function AppRoutes() {
  return (
    <Routes>
      {/* 👋 WELCOME - PÚBLICA */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/welcome" element={<WelcomePage />} />

      {/* 🔍 DISCOVERIES - PÚBLICAS (sin login necesario) */}
      <Route path="/discoveries" element={<DiscoveriesPage />} />
      <Route path="/post/:id" element={<PostDetailPage />} />

      {/* 🧭 CATEGORÍAS - PÚBLICAS */}
      <Route path="/categories/marine-life" element={<MarineLifePage />} />
      <Route path="/categories/ocean-ecosystems" element={<OceanEcosystemsPage />} />
      <Route path="/categories/problems-threats" element={<ProblemsThreatsPage />} />
      <Route path="/categories/science-exploration" element={<ScienceExplorationPage />} />
      <Route path="/categories/world-regions" element={<WorldRegionsPage />} />
      <Route path="/category-posts/:slug" element={<CategoryPostsPage />} />

      {/* 👩‍💻 CREATORS - PÚBLICA */}
      <Route path="/creators" element={<Creators />} />

      {/* ✍️ AUTH - Solo accesible si NO estás logueado */}
      <Route
        path="/login"
        element={
          <PublicOnlyRoute>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicOnlyRoute>
            <RegisterPage />
          </PublicOnlyRoute>
        }
      />

      {/* 🔒 POSTS - PROTEGIDAS (requieren login) */}
      <Route
        path="/posts"
        element={
          <ProtectedRoute>
            <AllDiscoveriesPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/new"
        element={
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-posts/:userId"
        element={
          <ProtectedRoute>
            <MyPostsPage />
          </ProtectedRoute>
        }
      />


      {/*🔒 EDITAR POST (solo admins)*/}
      <Route
        path="/post/edit/:id"
        element={
          <ProtectedRoute>
            <EditPostPage />
          </ProtectedRoute>
        }
      />

      {/* 🔒 USUARIOS - PROTEGIDAS */}
      <Route
        path="/users/:id"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <UsersAdminPage />
          </ProtectedRoute>
        }
      />

      {/* 🚫 FALLBACK - Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}