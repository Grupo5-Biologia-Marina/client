import { Box, Container, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
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
          justifyContent: 'space-between',
          textAlign: { xs: 'center', md: 'left' },
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
            sx={{ color: 'secondary.light', textDecoration: 'underline' }}
          >
            Factoría F5
          </MuiLink>
          . Todos los derechos reservados.
        </Typography>
      </Container>
    </Box>
  );
}