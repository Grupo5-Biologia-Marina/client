import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  IconButton,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FavoriteIcon from '@mui/icons-material/Favorite';

// Función para obtener usuario
import { getUserById } from '../services/userService';
import type { User } from '../types/userTypes';

// Fotos de creadoras
import luisa from "../assets/creators/luisa.png";
import irina from "../assets/creators/irina.png";
import valentina from "../assets/creators/valentina.png";
import julia from "../assets/creators/julia.png";
import aday from "../assets/creators/aday.png";
import codersImg from "../assets/creators/coders.png";

// Fotos de animales favoritos
import orca from "../assets/creators/animals/orca.png";
import seahorse from "../assets/creators/animals/sea-horse.png";
import dolphin from "../assets/creators/animals/dolphin.png";
import shark1 from "../assets/creators/animals/shark1.png";
import turtle1 from "../assets/creators/animals/turtle1.png";

import NavigationButtons from "../components/NavigationButtons";

interface Creator {
  name: string;
  role: string;
  photo: string;
  github: string;
  linkedin: string;
  description: string;
  animal: string;
}

const creators: Creator[] = [
  { name: 'Luisa Silva', 
    role: 'Full Stack Developer', 
    photo: luisa, 
    github: 'https://github.com/luisasilva99', 
    linkedin: 'https://www.linkedin.com/in/luisa-silva-martinez', 
    description: 'Apasionada por crear interfaces intuitivas y experiencias de usuario memorables.', 
    animal: orca 
  },
  { name: 'Irina Tiron', 
    role: 'Full Stack Developer', 
    photo: irina, 
    github: 'https://github.com/irinatiron', 
    linkedin: 'https://www.linkedin.com/in/irinatiron/', 
    description: 'Especializada en arquitecturas escalables y optimización de bases de datos.', 
    animal: seahorse 
  },
  { name: 'Valentina Montilla', 
    role: 'Full Stack Developer', 
    photo: valentina, 
    github: 'https://github.com/ValenMontilla7', 
    linkedin: 'https://www.linkedin.com/in/valentina-montilla-493a7b380/', 
    description: 'Desarrolladora versátil con experiencia en todo el stack tecnológico.', 
    animal: dolphin 
  },
  { name: 'Aday Álvarez', 
    role: 'Full Stack Developer', 
    photo: aday, 
    github: 'https://github.com/Aday25', 
    linkedin: 'https://www.linkedin.com/in/adayasc', 
    description: 'Perfeccionista y perseverante, en busca de códigos eficientes y diseños únicos.', 
    animal: shark1 
  },
  { name: 'Julia Zarco', 
    role: 'Full Stack Developer', 
    photo: julia, 
    github: 'https://github.com/juliazmor', 
    linkedin: 'https://linkedin.com', 
    description: 'Contribuye en el desarrollo y soporte de la aplicación.', 
    animal: turtle1 
  },
];

const Creadoras: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [userName, setUserName] = useState<string>('');
  const [activeCreator, setActiveCreator] = useState<Creator | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) { setUserName('Invitad@'); return; }
        const userData: User = await getUserById(userId);
        setUserName(userData.firstname || userData.username);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setUserName('Invitad@');
      }
    };
    fetchUser();
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)', paddingY: 4 }}>
      <Container maxWidth="xl">
        {/* Saludo */}
        <Box sx={{ textAlign: 'center', marginBottom: 6, padding: 3, background: 'linear-gradient(-45deg, #001f2f, #003d5c, #005f80, #0077aa)', backgroundSize: '400% 400%', animation: 'gradientMove 15s ease infinite', borderRadius: 3, boxShadow: '0 8px 32px rgba(0, 119, 170, 0.3)' }}>
          <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ color: 'white', fontWeight: 'bold', marginBottom: 1, textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
            {userName ? `¡${userName}, estamos encantadas de tenerte aquí! 🦀` : 'Cargando...'}
          </Typography>
        </Box>

        {/* Imagen coders */}
        <Box sx={{ display: 'flex', justifyContent: 'center', marginY: 5 }}>
          <Box component="img" src={codersImg} alt="Coders" sx={{ maxWidth: '90%', height: 'auto', borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }} />
        </Box>

        <Typography variant={isMobile ? 'h4' : 'h3'} sx={{ textAlign: 'center', marginBottom: 5, fontWeight: 'bold', color: '#004d66', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}>
          Nuestro Equipo de Creadoras
        </Typography>

        {/* Grid de creadoras */}
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3 }}>
          {creators.map((creator, index) => (
            <Box key={index} sx={{ flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 24px)', md: '1 1 calc(20% - 24px)' }, maxWidth: { xs: '100%', sm: 'calc(50% - 24px)', md: 280 }, display: 'flex', justifyContent: 'center' }}>
              <Card onClick={() => setActiveCreator(creator)} sx={{ width: '100%', maxWidth: 280, textAlign: 'center', borderRadius: 3, boxShadow: '0 8px 24px rgba(0,0,0,0.15)', transition: 'all 0.3s ease', cursor: 'pointer', backgroundImage: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', color: 'white', '&:hover': { transform: 'translateY(-10px)', boxShadow: '0 12px 32px rgba(0, 229, 255, 0.25)' } }}>
                <CardContent sx={{ padding: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                    <Avatar src={creator.photo} alt={creator.name} sx={{ width: 120, height: 120, border: '4px solid #00e5ff', boxShadow: '0 4px 12px rgba(0,229,255,0.3)' }} />
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 'bold', marginBottom: 0.5 }}>
                    {creator.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 500, marginBottom: 2, color: '#00e5ff' }}>
                    {creator.role}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: 2, fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {creator.description}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton href={creator.github} target="_blank" rel="noopener noreferrer" sx={{ color: 'white', '&:hover': { color: '#00e5ff', transform: 'scale(1.2)' }, transition: 'all 0.2s ease' }}>
                      <GitHubIcon />
                    </IconButton>
                    <IconButton href={creator.linkedin} target="_blank" rel="noopener noreferrer" sx={{ color: 'white', '&:hover': { color: '#00e5ff', transform: 'scale(1.2)' }, transition: 'all 0.2s ease' }}>
                      <LinkedInIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      {/* Overlay card activa */}
      {activeCreator && (
        <Box onClick={() => setActiveCreator(null)} sx={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 9999, cursor: 'pointer', p: 2 }}>
          <Card sx={{ width: { xs: '90%', md: 500 }, borderRadius: 3, boxShadow: '0 12px 40px rgba(0,0,0,0.5)', transform: 'scale(1)', transition: 'all 0.3s ease', backgroundImage: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)', color: 'white' }}>
            <CardContent sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <Avatar src={activeCreator.photo} alt={activeCreator.name} sx={{ width: 150, height: 150, border: '4px solid #00e5ff' }} />
                <FavoriteIcon sx={{ color: '#ff4d6d', fontSize: 32 }} />
                <Avatar src={activeCreator.animal} alt="Animal favorito" sx={{ width: 150, height: 150, border: '4px solid #00e5ff' }} />
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mt: 2 }}>
                {activeCreator.name}
              </Typography>
              <Typography variant="h6" sx={{ mb: 1, color: '#00e5ff' }}>
                {activeCreator.role}
              </Typography>
              <Typography variant="body2" sx={{ fontSize: '0.9rem', marginBottom: 2 }}>
                {activeCreator.description}
              </Typography>

              {/* Links GitHub y LinkedIn en card ampliada */}
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <IconButton href={activeCreator.github} target="_blank" rel="noopener noreferrer" sx={{ color: 'white', '&:hover': { color: '#00e5ff', transform: 'scale(1.2)' }, transition: 'all 0.2s ease' }}>
                  <GitHubIcon />
                </IconButton>
                <IconButton href={activeCreator.linkedin} target="_blank" rel="noopener noreferrer" sx={{ color: 'white', '&:hover': { color: '#00e5ff', transform: 'scale(1.2)' }, transition: 'all 0.2s ease' }}>
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Box>
      )}

      <style>{`
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <NavigationButtons />
    </Box>
  );
};

export default Creadoras;
