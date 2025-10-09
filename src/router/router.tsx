import { Routes, Route } from "react-router-dom";

// Auth
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";

// Users
import ProfilePage from "../pages/ProfilePage"     // GET /users/:id
import UsersAdminPage from "../pages/UsersAdminPage"; // GET /users (admin)

// Posts
import WelcomePage from "../pages/WelcomePage";        
import DiscoveriesPage from "../pages/DiscoveriesPage"; // GET /posts   
import PostDetailPage from "../pages/PostDetailPage"; // GET /posts/:id
import CreatePostPage from "../pages/CreatePostPage"; // POST /posts

// Common
import NotFoundPage from "../pages/NotFoundPage";


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
      <Route path="/posts" element={<DiscoveriesPage />} /> {/* GET /posts */}    
      <Route path="/posts/:id" element={<PostDetailPage />} /> {/* GET /posts/:id */}
      <Route path="/posts/new" element={<CreatePostPage />} /> {/* POST /posts */}

      {/* Users */}
      <Route path="/users/:id" element={<ProfilePage />} />    {/* GET /users/:id */}
      <Route path="/admin/users" element={<UsersAdminPage />} /> {/* GET /users */}

      {/* Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
