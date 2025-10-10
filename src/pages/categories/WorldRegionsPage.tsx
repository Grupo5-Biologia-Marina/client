import React from "react";
import CategoryPage from "./CategoryPage";
import { useNavigate } from "react-router-dom";
import worldRegionsBg from "../../assets/categories-backgrounds/world-regions-background.png";

const WorldRegionsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CategoryPage
      title="Regiones del Mundo"
      intro="Viaja por los mares y océanos de cada región del planeta, y descubre cómo su biodiversidad y cultura marina los hacen únicos."
      onShowPosts={() => navigate("/discoveries?category=world-regions")}
      background={worldRegionsBg}
    />
  );
};

export default WorldRegionsPage;
