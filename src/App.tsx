import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./router/router";
import "./styles/index.css";

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
