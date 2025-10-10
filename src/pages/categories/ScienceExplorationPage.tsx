import React from "react";
import CategoryPage from "./CategoryPage";
import { useNavigate } from "react-router-dom";
import scienceExplorationBg from "../../assets/categories-backgrounds/science-exploration-background.png";

const ScienceExplorationPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CategoryPage
      title="Ciencia y Exploración"
      intro="Acompaña a los científicos en sus descubrimientos bajo el mar y aprende cómo la tecnología nos ayuda a conocer mejor el océano profundo."
      onShowPosts={() => navigate("/discoveries?category=science-exploration")}
      background={scienceExplorationBg}
    />
  );
};

export default ScienceExplorationPage;
