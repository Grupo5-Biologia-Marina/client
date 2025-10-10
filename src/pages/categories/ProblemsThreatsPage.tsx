import React from "react";
import CategoryPage from "./CategoryPage";
import { useNavigate } from "react-router-dom";
import problemsThreatsBg from "../../assets/categories-backgrounds/problems-threats-background.png";

const ProblemsThreatsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <CategoryPage
      title="Problemas y Amenazas"
      intro="Descubre los principales retos que enfrentan los océanos, desde la contaminación hasta el cambio climático, y cómo podemos ayudar a protegerlos."
      onShowPosts={() => navigate("/discoveries?category=problems-threats")}
      background={problemsThreatsBg}
    />
  );
};

export default ProblemsThreatsPage;
