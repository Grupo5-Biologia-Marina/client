import { Routes, Route } from "react-router-dom";

// Auth
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

// Users
import ProfilePage from "../pages/ProfilePage"     // GET /users/:id
import UsersAdminPage from "../pages/UsersAdminPage"; // GET /users (admin)

// Posts
import WelcomePage from "../pages/WelcomePage";
import DiscoveriesPage from "../pages/DiscoveriesPage"; // GET /por categoria   
import PostDetailPage from "../pages/PostDetailPage"; // GET /posts/:id
import CreatePostPage from "../pages/CreatePostPage"; // POST /posts
import AllDiscoveriesPage from "../pages/AllDiscoveriesPage" //GET/ posts

// Categories

import MarineLifePage from "../pages/categories/MarineLifePage";
import OceanEcosystemsPage from "../pages/categories/OceanEcosystemsPage.tsx";
import ProblemsThreatsPage from "../pages/categories/ProblemsThreatsPage.tsx";
import ScienceExplorationPage from "../pages/categories/ScienceExplorationPage";
import WorldRegionsPage from "../pages/categories/WorldRegionsPage.tsx";
import { CategoryPostsPage } from "../pages/categories/CategoryPostsPage.tsx";

// Common
import NotFoundPage from "../pages/NotFoundPage";
import Creators from '../pages/CreatorsPage';


export default function AppRoutes() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />          {/* POST /auth/login */}
      <Route path="/register" element={<RegisterPage />} />    {/* POST /auth/register */}

      {/* Welcome */}
      <Route path="/" element={<WelcomePage />} />

      {/* Posts */}
      <Route path="/discoveries" element={<DiscoveriesPage />} /> {/* GET /posts */}
      <Route path="/posts" element={<AllDiscoveriesPage />} /> {/* GET /posts */}
      <Route path="/posts/:id" element={<PostDetailPage />} /> {/* GET /posts/:id */}
      <Route path="/posts/new" element={<CreatePostPage />} /> {/* POST /posts */}

      {/* Users */}
      <Route path="/users/:id" element={<ProfilePage />} />    {/* GET /users/:id */}
      <Route path="/admin/users" element={<UsersAdminPage />} /> {/* GET /users */}

      {/* Categories */}
      <Route path="/categories/marine-life" element={<MarineLifePage />} />
      <Route path="/categories/ocean-ecosystems" element={<OceanEcosystemsPage />} />
      <Route path="/categories/problems-threats" element={<ProblemsThreatsPage />} />
      <Route path="/categories/science-exploration" element={<ScienceExplorationPage />} />
      <Route path="/categories/world-regions" element={<WorldRegionsPage />} />
      <Route path="/category/:slug" element={<CategoryPostsPage />} />

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/creators" element={<Creators />} />
    </Routes>
  );
}
