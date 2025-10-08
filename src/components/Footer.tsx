import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        background: `linear-gradient(135deg, #0f2027, #203a43, #2c5364)`,
        backgroundSize: '400% 400%',
        animation: 'moveBg 20s ease infinite',
        color: 'white',
        py: 4,
        mt: 'auto',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'center', // centra logo y texto juntos
          gap: 2, // espacio entre logo y texto
          textAlign: 'center',
          flexWrap: 'wrap', // si no cabe, el texto baja
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: { xs: 2, md: 0 } }}>
          <img
            src={logo}
            alt="logo"
            style={{
              height: '50px',
            }}
          />
        </Box>

        {/* Texto */}
        <Typography variant="body2" sx={{ maxWidth: 600 }}>
          © 2025 Proyecto colaborativo desarrollado por 5 coders del bootcamp FemCoders de{' '}
          <MuiLink
            href="https://factoriaf5.org"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: '#FFA500', textDecoration: 'underline' }} // naranja
          >
            Factoría F5
          </MuiLink>
          . Todos los derechos reservados.
        </Typography>
      </Container>

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
    </Box>
  );
}