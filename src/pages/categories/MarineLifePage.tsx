import React from "react";
import CategoryPage from "./CategoryPage";
import { useNavigate } from "react-router-dom";
import marineLifeBg from "../../assets/categories-backgrounds/marine-life-background.png";

const MarineLifePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CategoryPage
      title="Vida Marina"
      intro="Explora la asombrosa diversidad de especies marinas y descubre su papel esencial en el equilibrio del planeta."
      onShowPosts={() => navigate("/discoveries?category=marine-life")}
      background={marineLifeBg}
    />
  );
};

export default MarineLifePage;
