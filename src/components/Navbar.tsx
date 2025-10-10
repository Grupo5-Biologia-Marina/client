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

  // Zustand
  const { userId, clearToken } = useAuthStore();

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
    navigate('/login');
  };

  const navbarStyle = {
    background: 'linear-gradient(-45deg, #001f2f, #003d5c, #005f80, #0077aa)',
    backgroundSize: '400% 400%',
    animation: 'gradientMove 15s ease infinite',
    boxShadow: '0 4px 20px rgba(0, 119, 170, 0.3)',
  };

  const buttonStyle = {
    position: 'relative',
    fontWeight: 600,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    background: 'linear-gradient(90deg, #ffffff, #cce9ff, #a7e0ff)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent' as const,
    textShadow: '0 0 10px rgba(255, 255, 255, 0.6), 0 0 15px rgba(0, 180, 255, 0.4)',
    transition: 'all 0.4s ease',

    '&:after': {
      content: '""',
      position: 'absolute',
      left: 0,
      bottom: 0,
      width: 0,
      height: '2px',
      background: 'linear-gradient(90deg, #ffffff, #6ec9ff)',
      transition: 'width 0.3s ease',
      borderRadius: '2px',
    },

    '&:hover': {
      transform: 'translateY(-2px) scale(1.05)',
      textShadow: '0 0 15px rgba(255, 255, 255, 0.9), 0 0 25px rgba(0, 200, 255, 0.8)',
      '&:after': { width: '100%' },
    },
  };

  const categories: Category[] = [
    { text: '🦈 Vida Marina', slug: 'marine-life' },
    { text: '🌊 Ecosistemas Oceánicos', slug: 'ocean-ecosystems' },
    { text: '🤿 Ciencia y Exploración', slug: 'science-exploration' },
    { text: '⚠️ Problemas y Amenazas', slug: 'problems-threats' },
    { text: '🦭 Regiones y Océanos del Mundo', slug: 'world-regions' },
  ];

  return (
    <>
      <AppBar position="static" sx={{ ...navbarStyle, minHeight: '80px', paddingY: '0.3rem' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* LOGO */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/discoveries"
            sx={{
              textDecoration: 'none',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              textShadow: '0 0 8px rgba(0,0,0,0.8)',
              fontWeight: 'bold',
              lineHeight: 1,
              paddingY: '0.5rem',
            }}
          >
            <Box component="span" sx={{ fontSize: '1.7rem', marginBottom: '-6px' }}>El Gran</Box>
            <Box component="span" sx={{ fontSize: '3rem', letterSpacing: '1px', fontWeight: 900, transform: 'scaleY(1.25)', lineHeight: 1 }}>
              AZUL
            </Box>
          </Typography>

          {/* DESKTOP */}
          {!isMobile && (
            <Box>
              {/* Posts solo para usuario logado */}
              {userId && (
                <>
                  <Button color="inherit" onClick={handleMenuOpen(setAnchorPosts)} sx={buttonStyle}>Posts</Button>
                  <Menu anchorEl={anchorPosts} open={Boolean(anchorPosts)} onClose={handleMenuClose(setAnchorPosts)}>
                    <MenuItem component={RouterLink} to="/posts" onClick={handleMenuClose(setAnchorPosts)}>Ver todos</MenuItem>
                    <MenuItem component={RouterLink} to="/posts/new" onClick={handleMenuClose(setAnchorPosts)}>Crear nuevo post</MenuItem>
                  </Menu>
                </>
              )}

              {/* Categorías siempre visibles */}
              <Button color="inherit" onClick={handleMenuOpen(setAnchorCategorias)} sx={buttonStyle}>Categorías</Button>
              <Menu anchorEl={anchorCategorias} open={Boolean(anchorCategorias)} onClose={handleMenuClose(setAnchorCategorias)}>
                {categories.map((cat) => (
                  <MenuItem
                    key={cat.slug}
                    onClick={() => {
                      navigate(`/categories/${cat.slug}`);
                      handleMenuClose(setAnchorCategorias)();
                    }}
                  >
                    {cat.text}
                  </MenuItem>
                ))}
              </Menu>

              {/* Invitado o Usuario */}
              {!userId ? (
                <>
                  <Button color="inherit" component={RouterLink} to="/login" sx={buttonStyle}>Iniciar Sesión</Button>
                  <Button color="inherit" component={RouterLink} to="/register" sx={buttonStyle}>Registrarse</Button>
                  <Button color="inherit" component={RouterLink} to="/creators" sx={buttonStyle}>Creadoras</Button>
                </>
              ) : (
                <>
                  <Button color="inherit" component={RouterLink} to={`/users/${userId}`} sx={buttonStyle}>Mi Cuenta</Button>
                  <Button color="inherit" component={RouterLink} to="/creators" sx={buttonStyle}>Creadoras</Button>
                  <Button color="inherit" onClick={handleLogout} sx={buttonStyle}>Cerrar Sesión</Button>
                </>
              )}
            </Box>
          )}

          {/* MOBILE */}
          {isMobile && (
            <>
              <IconButton edge="end" color="inherit" onClick={() => setMobileOpen(true)}><MenuIcon /></IconButton>
              <Drawer anchor="right" open={mobileOpen} onClose={() => setMobileOpen(false)}>
                <Box sx={{ width: 250 }} role="presentation">
                  <List>
                    {userId && (
                      <>
                        <ListItem>
                          <ListItemButton component={RouterLink} to="/posts">
                            <ListItemText primary="📄 Ver todos los Posts" />
                          </ListItemButton>
                        </ListItem>
                        <ListItem>
                          <ListItemButton component={RouterLink} to="/posts/new">
                            <ListItemText primary="📝 Crear nuevo post" />
                          </ListItemButton>
                        </ListItem>
                        <Divider />
                      </>
                    )}

                    <ListItem><ListItemText primary="📚 Categorías" /></ListItem>
                    {categories.map((cat) => (
                      <ListItem key={cat.slug}>
                        <ListItemButton onClick={() => navigate(`/categories/${cat.slug}`)}>
                          <ListItemText primary={cat.text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <Divider />

                    {!userId ? (
                      <>
                        <ListItem>
                          <ListItemButton component={RouterLink} to="/login"><ListItemText primary="Iniciar Sesión" /></ListItemButton>
                        </ListItem>
                        <ListItem>
                          <ListItemButton component={RouterLink} to="/register"><ListItemText primary="Registrarse" /></ListItemButton>
                        </ListItem>
                        <ListItem>
                          <ListItemButton component={RouterLink} to="/creators"><ListItemText primary="👩‍💻 Creadoras" /></ListItemButton>
                        </ListItem>
                      </>
                    ) : (
                      <>
                        <ListItem>
                          <ListItemButton component={RouterLink} to={`/users/${userId}`}><ListItemText primary="👤 Mi Cuenta" /></ListItemButton>
                        </ListItem>
                        <ListItem>
                          <ListItemButton component={RouterLink} to="/creators"><ListItemText primary="👩‍💻 Creadoras" /></ListItemButton>
                        </ListItem>
                        <ListItem>
                          <ListItemButton onClick={handleLogout}><ListItemText primary="🚪 Cerrar Sesión" /></ListItemButton>
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
