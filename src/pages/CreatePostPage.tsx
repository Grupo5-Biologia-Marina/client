import PostForm from "../components/PostForm";
import { useNavigate } from "react-router-dom";
import "../pages/CreatePostPage.css";
import { useAlertContext } from "../context/AlertContext";
import NavigationButtons from "../components/NavigationButtons";

export default function CreatePostPage() {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));
  const { showAlert } = useAlertContext(); // ⚡ Hook global de alertas

  if (!userId) {
    navigate("/login");
    return null;
  }

  const handlePostCreated = () => {
    showAlert("¡Descubrimiento creado con éxito!", "success");
    navigate("/posts"); // 👈 redirige a la página de todos los descubrimientos
  };

  return (
    <div className="create-post-page">
      <h1 className="title-post">Crea un nuevo descubrimiento</h1>
      <PostForm userId={userId} onPostSaved={handlePostCreated} />
       <NavigationButtons />
    </div>
  );
}
