import React, { useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface Category {
  text: string;
  slug: string;
}

const Navbar: React.FC = () => {
  const [anchorPosts, setAnchorPosts] = useState<null | HTMLElement>(null);
  const [anchorCategorias, setAnchorCategorias] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // ✅ Obtener userId desde Zustand para saber si está autenticado
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
    clearToken(); // Limpia el estado de Zustand y localStorage
    navigate('/login');
  };

  const navbarStyle = {
    background: 'linear-gradient(-45deg, #001f2f, #003d5c, #005f80, #0077aa)',
    backgroundSize: '400% 400%',
    animation: 'gradientMove 15s ease infinite',
    boxShadow: '0 4px 20px rgba(0, 119, 170, 0.3)',
  };

  const buttonStyle = {
    textShadow: '0 0 5px rgba(0,0,0,0.7)',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateY(-2px)',
    },
  };

  const categories: Category[] = [
    { text: '🦈 Vida Marina', slug: 'marine-life' },
    { text: '🌊 Ecosistemas Oceánicos', slug: 'ocean-ecosystems' },
    { text: '🤿 Ciencia y Exploración', slug: 'science-exploration' },
    { text: '⚠️ Problemas y Amenazas', slug: 'problems-threats' },
    { text: '🌍 Regiones y Océanos del Mundo', slug: 'world-regions' },
  ];

  return (
    <>
      <AppBar position="static" sx={navbarStyle}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/discoveries"
            sx={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
              textShadow: '0 0 5px rgba(0,0,0,0.7)',
            }}
          >
            El Gran Azul
          </Typography>

          {/* Desktop */}
          {!isMobile && (
            <Box>
              {/* 🔒 POSTS - Solo visible si está autenticado */}
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
                    <MenuItem component={RouterLink} to="/posts" onClick={handleMenuClose(setAnchorPosts)}>
                      Ver todos
                    </MenuItem>
                    <MenuItem component={RouterLink} to="/posts/new" onClick={handleMenuClose(setAnchorPosts)}>
                      Crear nuevo post
                    </MenuItem>
                  </Menu>
                </>
              )}

              {/* 🌊 CATEGORÍAS - Siempre visible */}
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

              {/* 👩‍💻 CREADORAS - Siempre visible */}
              <Button color="inherit" component={RouterLink} to="/creators" sx={buttonStyle}>
                Creadoras
              </Button>

              {/* 🚪 BOTONES según autenticación */}
              {!userId ? (
                // Usuario NO autenticado
                <>
                  <Button color="inherit" component={RouterLink} to="/login" sx={buttonStyle}>
                    Iniciar Sesión
                  </Button>
                  <Button color="inherit" component={RouterLink} to="/register" sx={buttonStyle}>
                    Registrarse
                  </Button>
                </>
              ) : (
                // Usuario autenticado
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
                <Box sx={{ width: 250 }} role="presentation" onClick={() => setMobileOpen(false)}>
                  <List>
                    {/* 🔒 POSTS - Solo si está autenticado */}
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

                    {/* 🌊 CATEGORÍAS */}
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

                    {/* 👩‍💻 CREADORAS */}
                    <ListItem disablePadding>
                      <ListItemButton component={RouterLink} to="/creators">
                        <ListItemText primary="👩‍💻 Creadoras" />
                      </ListItemButton>
                    </ListItem>
                    <Divider />

                    {/* 🚪 BOTONES según autenticación */}
                    {!userId ? (
                      // Usuario NO autenticado
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
                      // Usuario autenticado
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