import React, { useState, MouseEvent } from 'react';
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
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [anchorPosts, setAnchorPosts] = useState<null | HTMLElement>(null);
  const [anchorCategorias, setAnchorCategorias] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Handlers
  const handleMenuOpen = (
    setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  ) => (event: MouseEvent<HTMLElement>) => {
    setter(event.currentTarget);
  };

  const handleMenuClose = (
    setter: React.Dispatch<React.SetStateAction<HTMLElement | null>>
  ) => () => {
    setter(null);
  };

  const handleLogout = () => {
    // Aquí va tu lógica real para cerrar sesión
    console.log('Cerrando sesión...');
    navigate('/login');
  };

  // Estilo de fondo con animación tipo agua
  const navbarStyle = {
    background: `linear-gradient(135deg, #0f2027, #203a43, #2c5364)`,
    backgroundSize: '400% 400%',
    animation: 'moveBg 20s ease infinite',
  };

  return (
    <>
      <AppBar position="static" sx={navbarStyle}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Título a la izquierda */}
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              textDecoration: 'none',
              color: 'white',
              fontWeight: 'bold',
            }}
          >
            El Gran Azul
          </Typography>

          {/* Menú Desktop */}
          {!isMobile && (
            <Box>
              {/* POSTS */}
              <Button color="inherit" onClick={handleMenuOpen(setAnchorPosts)}>
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

              {/* CATEGORÍAS */}
              <Button
                color="inherit"
                onClick={handleMenuOpen(setAnchorCategorias)}
              >
                Categorías
              </Button>
              <Menu
                anchorEl={anchorCategorias}
                open={Boolean(anchorCategorias)}
                onClose={handleMenuClose(setAnchorCategorias)}
              >
                <MenuItem onClick={handleMenuClose(setAnchorCategorias)}>
                  🦈 Vida Marina
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorCategorias)}>
                  🌊 Ecosistemas Oceánicos
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorCategorias)}>
                  🤿 Ciencia y Exploración
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorCategorias)}>
                  ⚠️ Problemas y Amenazas
                </MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorCategorias)}>
                  🌍 Regiones y Océanos del Mundo
                </MenuItem>
              </Menu>

              {/* MI CUENTA */}
              <Button color="inherit" component={RouterLink} to="/mi-cuenta">
                Mi Cuenta
              </Button>

              {/* CERRAR SESIÓN */}
              <Button color="inherit" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
            </Box>
          )}

          {/* Menú móvil (hamburguesa) */}
          {isMobile && (
            <>
              <IconButton
                edge="end"
                color="inherit"
                onClick={() => setMobileOpen(true)}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={() => setMobileOpen(false)}
                >
                  <List>
                    <ListItem button component={RouterLink} to="/posts">
                      <ListItemText primary="📄 Ver todos los Posts" />
                    </ListItem>
                    <ListItem button component={RouterLink} to="/posts/new">
                      <ListItemText primary="📝 Crear nuevo post" />
                    </ListItem>
                    <Divider />
                    <ListItem>
                      <ListItemText primary="📚 Categorías" />
                    </ListItem>
                    {[
                      '🦈 Vida Marina',
                      '🪸 Ecosistemas Oceánicos',
                      '🤿 Ciencia y Exploración',
                      '⚠️ Problemas y Amenazas',
                      '🦭 Regiones y Océanos del Mundo',
                    ].map((text) => (
                      <ListItem button key={text}>
                        <ListItemText primary={text} />
                      </ListItem>
                    ))}
                    <Divider />
                    <ListItem button component={RouterLink} to="/mi-cuenta">
                      <ListItemText primary="👤 Mi Cuenta" />
                    </ListItem>
                    <ListItem button onClick={handleLogout}>
                      <ListItemText primary="🚪 Cerrar Sesión" />
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Animación del fondo */}
      <style>
        {`
          @keyframes moveBg {
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
