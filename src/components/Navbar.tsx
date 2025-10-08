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

const Navbar: React.FC = () => {
  const [anchorPosts, setAnchorPosts] = useState<null | HTMLElement>(null);
  const [anchorCategorias, setAnchorCategorias] = useState<null | HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  // Handlers
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
    console.log('Cerrando sesión...');
    navigate('/login');
  };

  const navbarStyle = {
    background: `linear-gradient(135deg, #0f2027, #203a43, #2c5364)`,
    backgroundSize: '400% 400%',
    animation: 'moveBg 20s ease infinite',
  };

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
            }}
          >
            El Gran Azul
          </Typography>

          {/* Desktop */}
          {!isMobile && (
            <Box>
              <Button color="inherit" onClick={handleMenuOpen(setAnchorPosts)}>
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
                <MenuItem
                  component={RouterLink}
                  to="/posts/new"
                  onClick={handleMenuClose(setAnchorPosts)}
                >
                  Crear nuevo post
                </MenuItem>
              </Menu>

              <Button color="inherit" onClick={handleMenuOpen(setAnchorCategorias)}>
                Categorías
              </Button>
              <Menu
                anchorEl={anchorCategorias}
                open={Boolean(anchorCategorias)}
                onClose={handleMenuClose(setAnchorCategorias)}
              >
                <MenuItem onClick={handleMenuClose(setAnchorCategorias)}>🦈 Vida Marina</MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorCategorias)}>🌊 Ecosistemas Oceánicos</MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorCategorias)}>🤿 Ciencia y Exploración</MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorCategorias)}>⚠️ Problemas y Amenazas</MenuItem>
                <MenuItem onClick={handleMenuClose(setAnchorCategorias)}>🌍 Regiones y Océanos del Mundo</MenuItem>
              </Menu>

              <Button color="inherit" component={RouterLink} to="/users/:id">
                Mi Cuenta
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Cerrar Sesión
              </Button>
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
                      <ListItem key={text}>
                        <ListItemButton>
                          <ListItemText primary={text} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                    <Divider />
                    <ListItem>
                      <ListItemButton component={RouterLink} to="/users/:id">
                        <ListItemText primary="👤 Mi Cuenta" />
                      </ListItemButton>
                    </ListItem>
                    <ListItem>
                      <ListItemButton onClick={handleLogout}>
                        <ListItemText primary="🚪 Cerrar Sesión" />
                      </ListItemButton>
                    </ListItem>
                  </List>
                </Box>
              </Drawer>
            </>
          )}
        </Toolbar>
      </AppBar>

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