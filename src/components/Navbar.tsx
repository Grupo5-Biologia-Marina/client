import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

interface Category {
  text: string;
  slug: string;
}

const Navbar: React.FC = () => {
  const [anchorPosts, setAnchorPosts] = useState<null | HTMLElement>(null);
  const [anchorCategorias, setAnchorCategorias] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const userId = useAuthStore((state) => state.userId);
  const clearToken = useAuthStore((state) => state.clearToken);

  const handleMenuOpen =
    (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) =>
    (event: React.MouseEvent<HTMLElement>) => {
      setter(event.currentTarget);
    };

  const handleMenuClose =
    (setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>) => () => {
      setter(null);
    };

  const handleLogout = () => {
    clearToken();
    navigate("/login");
  };

  // 🌊 Estilos visuales brillantes tipo "El Gran AZUL"
  const navbarStyle = {
    background: "linear-gradient(-45deg, #001f2f, #003d5c, #0077aa, #00bfff)",
    backgroundSize: "400% 400%",
    animation: "gradientMove 15s ease infinite",
    boxShadow: "0 4px 25px rgba(0, 191, 255, 0.4)",
    borderBottom: "2px solid rgba(0, 191, 255, 0.5)",
  };

  const buttonStyle = {
    color: "#e0f7ff",
    textShadow: "0 0 8px rgba(0, 191, 255, 0.8)",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    borderRadius: "8px",
    marginX: "0.4rem",
    paddingX: "1rem",
    transition: "all 0.3s ease",
    boxShadow: "0 0 8px rgba(0, 191, 255, 0.4)",
    "&:hover": {
      background:
        "radial-gradient(circle at center, rgba(0,191,255,0.3) 0%, rgba(0,119,170,0.2) 80%)",
      transform: "translateY(-2px) scale(1.05)",
      boxShadow: "0 0 15px rgba(0, 191, 255, 0.7)",
      textShadow: "0 0 12px rgba(0,255,255,1)",
    },
    "&:active": {
      transform: "scale(0.97)",
    },
  };

  const titleStyle = {
    textDecoration: "none",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    textShadow: "0 0 15px rgba(0,191,255,0.9)",
    fontWeight: "bold",
    lineHeight: 1,
    paddingY: "0.5rem",
    "& span:first-of-type": {
      fontSize: "1.6rem",
    },
    "& span:last-of-type": {
      fontSize: "3.1rem",
      letterSpacing: "1px",
      fontWeight: 900,
      transform: "scaleY(1.25)",
      color: "#00e5ff",
    },
  };

  const categories: Category[] = [
    { text: "🦈 Vida Marina", slug: "marine-life" },
    { text: "🌊 Ecosistemas Oceánicos", slug: "ocean-ecosystems" },
    { text: "🤿 Ciencia y Exploración", slug: "science-exploration" },
    { text: "⚠️ Problemas y Amenazas", slug: "problems-threats" },
    { text: "🌍 Regiones y Océanos del Mundo", slug: "world-regions" },
  ];

  return (
    <>
      <AppBar position="static" sx={navbarStyle}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" component={RouterLink} to="/discoveries" sx={titleStyle}>
            <Box component="span">El Gran</Box>
            <Box component="span">AZUL</Box>
          </Typography>

          {/* Desktop */}
          {!isMobile && (
            <Box>
              {userId && (
                <>
                  <Button color="inherit" onClick={handleMenuOpen(setAnchorPosts)} sx={buttonStyle}>
                    Posts
                  </Button>
                  <Menu
                    anchorEl={anchorPosts}
                    open={Boolean(anchorPosts)}
                    onClose={handleMenuClose(setAnchorPosts)}
                  >
                    <MenuItem
                      component={RouterLink}
                      to="/posts"
                      onClick={handleMenuClose(setAnchorPosts)}
                    >
                      Ver todos
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/posts/new"
                      onClick={handleMenuClose(setAnchorPosts)}
                    >
                      Crear nuevo post
                    </MenuItem>
                  </Menu>
                </>
              )}

              <Button color="inherit" onClick={handleMenuOpen(setAnchorCategorias)} sx={buttonStyle}>
                Categorías
              </Button>
              <Menu
                anchorEl={anchorCategorias}
                open={Boolean(anchorCategorias)}
                onClose={handleMenuClose(setAnchorCategorias)}
              >
                {categories.map((cat) => (
                  <MenuItem
                    key={cat.slug}
                    component={RouterLink}
                    to={`/categories/${cat.slug}`}
                    onClick={handleMenuClose(setAnchorCategorias)}
                  >
                    {cat.text}
                  </MenuItem>
                ))}
              </Menu>

              <Button color="inherit" component={RouterLink} to="/creators" sx={buttonStyle}>
                Creadoras
              </Button>

              {!userId ? (
                <>
                  <Button color="inherit" component={RouterLink} to="/login" sx={buttonStyle}>
                    Iniciar Sesión
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/register" sx={buttonStyle}>
                    Registrarse
                  </Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={RouterLink} to={`/users/${userId}`} sx={buttonStyle}>
                    Mi Cuenta
                  </Button>
                  <Button color="inherit" onClick={handleLogout} sx={buttonStyle}>
                    Cerrar Sesión
                  </Button>
                </>
              )}
            </Box>
          )}

          {/* Mobile */}
          {isMobile && (
            <>
              <IconButton edge="end" color="inherit" onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
                <Box sx={{ width: 250, backgroundColor: "#001f2f", color: "#e0f7ff" }}>
                  <List>
                    {userId && (
                      <>
                        <ListItem disablePadding>
                          <ListItemButton component={RouterLink} to="/posts">
                            <ListItemText primary="📄 Ver todos los Posts" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton component={RouterLink} to="/posts/new">
                            <ListItemText primary="📝 Crear nuevo post" />
                          </ListItemButton>
                        </ListItem>
                        <Divider />
                      </>
                    )}
                    <ListItem>
                      <ListItemText primary="📚 Categorías" />
                    </ListItem>
                    {categories.map((cat) => (
                      <ListItem key={cat.slug} disablePadding>
                        <ListItemButton component={RouterLink} to={`/categories/${cat.slug}`}>
                          <ListItemText primary={cat.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <Divider />
                    <ListItem disablePadding>
                      <ListItemButton component={RouterLink} to="/creators">
                        <ListItemText primary="👩‍💻 Creadoras" />
                      </ListItemButton>
                    </ListItem>
                    <Divider />
                    {!userId ? (
                      <>
                        <ListItem disablePadding>
                          <ListItemButton component={RouterLink} to="/login">
                            <ListItemText primary="🔐 Iniciar Sesión" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton component={RouterLink} to="/register">
                            <ListItemText primary="📝 Registrarse" />
                          </ListItemButton>
                        </ListItem>
                      </>
                    ) : (
                      <>
                        <ListItem disablePadding>
                          <ListItemButton component={RouterLink} to={`/users/${userId}`}>
                            <ListItemText primary="👤 Mi Cuenta" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem disablePadding>
                          <ListItemButton onClick={handleLogout}>
                            <ListItemText primary="🚪 Cerrar Sesión" />
                          </ListItemButton>
                        </ListItem>
                      </>
                    )}
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* 🎨 Animación del fondo */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </>
  );
};

export default Navbar;
