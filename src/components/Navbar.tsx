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

  const navbarStyle = {
    background: "linear-gradient(135deg, #003d63 0%, #004d7a 50%, #006a99 100%)",
    boxShadow: "0 4px 25px rgba(0, 191, 255, 0.3), inset 0 1px 0 rgba(0, 229, 255, 0.15)",
    borderBottom: "3px solid rgba(0, 229, 255, 0.6)",
    position: "relative",
    overflow: "hidden",
    "&::before": {
      content: "''",
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "radial-gradient(circle at 20% 50%, rgba(0, 229, 255, 0.12) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 150, 255, 0.1) 0%, transparent 50%)",
      pointerEvents: "none",
    },
  };

  const buttonStyle = {
    color: "#00e5ff",
    textShadow: "0 0 8px rgba(0, 229, 255, 0.6)",
    fontWeight: "bold",
    letterSpacing: "0.5px",
    borderRadius: "8px",
    marginX: "0.4rem",
    paddingX: "1rem",
    transition: "all 0.3s ease",
    border: "1px solid rgba(0, 229, 255, 0.3)",
    "&:hover": {
      background: "rgba(0, 229, 255, 0.15)",
      transform: "translateY(-2px) scale(1.05)",
      boxShadow: "0 0 15px rgba(0, 229, 255, 0.7)",
      textShadow: "0 0 12px rgba(0,255,255,1)",
      borderColor: "rgba(0, 229, 255, 0.6)",
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
                    PaperProps={{
                      sx: {
                        background: "linear-gradient(135deg, #003d63 0%, #004d7a 100%)",
                        boxShadow: "0 8px 32px rgba(0, 229, 255, 0.4)",
                        border: "1px solid rgba(0, 229, 255, 0.3)",
                        borderRadius: "12px",
                        mt: 1,
                      },
                    }}
                  >
                    <MenuItem
                      component={RouterLink}
                      to="/posts"
                      onClick={handleMenuClose(setAnchorPosts)}
                      sx={{
                        color: "#00e5ff",
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                        borderLeft: "3px solid transparent",
                        paddingLeft: "15px",
                        "&:hover": {
                          background: "rgba(0, 229, 255, 0.15)",
                          borderLeftColor: "#00e5ff",
                          boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.2)",
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      Ver todos
                    </MenuItem>
                    <MenuItem
                      component={RouterLink}
                      to="/posts/new"
                      onClick={handleMenuClose(setAnchorPosts)}
                      sx={{
                        color: "#00e5ff",
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                        borderLeft: "3px solid transparent",
                        paddingLeft: "15px",
                        "&:hover": {
                          background: "rgba(0, 229, 255, 0.15)",
                          borderLeftColor: "#00e5ff",
                          boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.2)",
                          transform: "translateX(5px)",
                        },
                      }}
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
                PaperProps={{
                  sx: {
                    background: "linear-gradient(135deg, #003d63 0%, #004d7a 100%)",
                    boxShadow: "0 8px 32px rgba(0, 229, 255, 0.4)",
                    border: "1px solid rgba(0, 229, 255, 0.3)",
                    borderRadius: "12px",
                    mt: 1,
                    minWidth: "280px",
                  },
                }}
              >
                {categories.map((cat) => (
                  <MenuItem
                    key={cat.slug}
                    component={RouterLink}
                    to={`/categories/${cat.slug}`}
                    onClick={handleMenuClose(setAnchorCategorias)}
                    sx={{
                      color: "#00e5ff",
                      fontWeight: 600,
                      padding: "12px 16px",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      borderLeft: "3px solid transparent",
                      paddingLeft: "15px",
                      fontSize: "0.95rem",
                      "&:hover": {
                        background: "rgba(0, 229, 255, 0.15)",
                        borderLeftColor: "#00e5ff",
                        boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.2), 0 0 15px rgba(0, 229, 255, 0.3)",
                        transform: "translateX(8px)",
                        textShadow: "0 0 10px rgba(0, 229, 255, 0.8)",
                      },
                    }}
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

          {isMobile && (
            <>
              <IconButton edge="end" color="inherit" onClick={() => setMobileOpen(true)}>
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                ModalProps={{
                  keepMounted: false,
                }}
                PaperProps={{
                  sx: {
                    width: 280,
                    background: "linear-gradient(135deg, #003d63 0%, #004d7a 100%)",
                    boxShadow: "0 8px 32px rgba(0, 229, 255, 0.4)",
                    border: "1px solid rgba(0, 229, 255, 0.3)",
                  }
                }}
              >
                <List sx={{ p: 0, width: "100%" }}>
                  {userId && (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton
                          component={RouterLink}
                          to="/posts"
                          onClick={() => setMobileOpen(false)}
                          sx={{
                            color: "#00e5ff",
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                            borderLeft: "3px solid transparent",
                            paddingLeft: "15px",
                            "&:hover": {
                              background: "rgba(0, 229, 255, 0.15)",
                              borderLeftColor: "#00e5ff",
                              boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.2)",
                              transform: "translateX(5px)",
                            },
                          }}
                        >
                          <ListItemText primary="📄 Ver todos los Posts" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton
                          component={RouterLink}
                          to="/posts/new"
                          onClick={() => setMobileOpen(false)}
                          sx={{
                            color: "#00e5ff",
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                            borderLeft: "3px solid transparent",
                            paddingLeft: "15px",
                            "&:hover": {
                              background: "rgba(0, 229, 255, 0.15)",
                              borderLeftColor: "#00e5ff",
                              boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.2)",
                              transform: "translateX(5px)",
                            },
                          }}
                        >
                          <ListItemText primary="✍️ Crear nuevo post" />
                        </ListItemButton>
                      </ListItem>
                      <Divider sx={{ backgroundColor: "rgba(0, 229, 255, 0.2)" }} />
                    </>
                  )}
                  <ListItem sx={{ color: "#00e5ff", fontWeight: 600, paddingLeft: "15px" }}>
                    <ListItemText primary="📚 Categorías" />
                  </ListItem>
                  {categories.map((cat) => (
                    <ListItem key={cat.slug} disablePadding>
                      <ListItemButton
                        component={RouterLink}
                        to={`/categories/${cat.slug}`}
                        onClick={() => setMobileOpen(false)}
                        sx={{
                          color: "#00e5ff",
                          fontWeight: 600,
                          transition: "all 0.3s ease",
                          borderLeft: "3px solid transparent",
                          paddingLeft: "15px",
                          fontSize: "0.95rem",
                          "&:hover": {
                            background: "rgba(0, 229, 255, 0.15)",
                            borderLeftColor: "#00e5ff",
                            boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.2)",
                            transform: "translateX(5px)",
                            textShadow: "0 0 10px rgba(0, 229, 255, 0.8)",
                          },
                        }}
                      >
                        <ListItemText primary={cat.text} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <Divider sx={{ backgroundColor: "rgba(0, 229, 255, 0.2)" }} />
                  <ListItem disablePadding>
                    <ListItemButton
                      component={RouterLink}
                      to="/creators"
                      onClick={() => setMobileOpen(false)}
                      sx={{
                        color: "#00e5ff",
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                        borderLeft: "3px solid transparent",
                        paddingLeft: "15px",
                        "&:hover": {
                          background: "rgba(0, 229, 255, 0.15)",
                          borderLeftColor: "#00e5ff",
                          boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.2)",
                          transform: "translateX(5px)",
                        },
                      }}
                    >
                      <ListItemText primary="👩‍💻 Creadoras" />
                    </ListItemButton>
                  </ListItem>
                  <Divider sx={{ backgroundColor: "rgba(0, 229, 255, 0.2)" }} />
                  {!userId ? (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton
                          component={RouterLink}
                          to="/login"
                          onClick={() => setMobileOpen(false)}
                          sx={{
                            color: "#00e5ff",
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                            borderLeft: "3px solid transparent",
                            paddingLeft: "15px",
                            "&:hover": {
                              background: "rgba(0, 229, 255, 0.15)",
                              borderLeftColor: "#00e5ff",
                              boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.2)",
                              transform: "translateX(5px)",
                            },
                          }}
                        >
                          <ListItemText primary="🔑 Iniciar Sesión" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton
                          component={RouterLink}
                          to="/register"
                          onClick={() => setMobileOpen(false)}
                          sx={{
                            color: "#00e5ff",
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                            borderLeft: "3px solid transparent",
                            paddingLeft: "15px",
                            "&:hover": {
                              background: "rgba(0, 229, 255, 0.15)",
                              borderLeftColor: "#00e5ff",
                              boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.2)",
                              transform: "translateX(5px)",
                            },
                          }}
                        >
                          <ListItemText primary="📝 Registrarse" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem disablePadding>
                        <ListItemButton
                          component={RouterLink}
                          to={`/users/${userId}`}
                          onClick={() => setMobileOpen(false)}
                          sx={{
                            color: "#00e5ff",
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                            borderLeft: "3px solid transparent",
                            paddingLeft: "15px",
                            "&:hover": {
                              background: "rgba(0, 229, 255, 0.15)",
                              borderLeftColor: "#00e5ff",
                              boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.2)",
                              transform: "translateX(5px)",
                            },
                          }}
                        >
                          <ListItemText primary="👤 Mi Cuenta" />
                        </ListItemButton>
                      </ListItem>
                      <ListItem disablePadding>
                        <ListItemButton
                          onClick={() => {
                            handleLogout();
                            setMobileOpen(false);
                          }}
                          sx={{
                            color: "#00e5ff",
                            fontWeight: 600,
                            transition: "all 0.3s ease",
                            borderLeft: "3px solid transparent",
                            paddingLeft: "15px",
                            "&:hover": {
                              background: "rgba(0, 229, 255, 0.15)",
                              borderLeftColor: "#00e5ff",
                              boxShadow: "inset 0 0 20px rgba(0, 229, 255, 0.2)",
                              transform: "translateX(5px)",
                            },
                          }}
                        >
                          <ListItemText primary="🚪 Cerrar Sesión" />
                        </ListItemButton>
                      </ListItem>
                    </>
                  )}
                </List>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;