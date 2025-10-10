import React from "react";
import CategoryPage from "./CategoryPage";
import { useNavigate } from "react-router-dom";
import oceanEcosystemsBg from "../../assets/categories-backgrounds/ocean-ecosystems-background.png";

const OceanEcosystemsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CategoryPage
      title="Ecosistemas Oceánicos"
      intro="Sumérgete en los hábitats más fascinantes del océano y conoce cómo interactúan sus organismos para mantener la vida marina."
      onShowPosts={() => navigate("/discoveries?category=ocean-ecosystems")}
      background={oceanEcosystemsBg}
    />
  );
};

export default OceanEcosystemsPage;
