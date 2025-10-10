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

// Importa la función que ya tienes para obtener el usuario
import { getUserById } from '../services/userService';
import type { User } from '../types/userTypes';

// Imágenes
import luisa from "../assets/creators/luisa.png";
import irina from "../assets/creators/irina.png";
import valentina from "../assets/creators/valentina.png";
import julia from "../assets/creators/julia.png";
import aday from "../assets/creators/aday.png";

interface Creator {
  name: string;
  role: string;
  photo: string;
  github: string;
  linkedin: string;
  description: string;
}

const creators: Creator[] = [
  {
    name: 'Luisa Silva',
    role: 'Full Stack Developer',
    photo: luisa,
    github: 'https://github.com/luisasilva99',
    linkedin: 'www.linkedin.com/in/luisa-silva-martinez',
    description: 'Apasionada por crear interfaces intuitivas y experiencias de usuario memorables.',
  },
  {
    name: 'Irina Tiron',
    role: 'Full Stack Developer',
    photo: irina,
    github: 'https://github.com/irinatiron',
    linkedin: 'https://www.linkedin.com/in/irinatiron/',
    description: 'Especializada en arquitecturas escalables y optimización de bases de datos.',
  },
  {
    name: 'Valentina Montilla',
    role: 'Full Stack Developer',
    photo: valentina,
    github: 'https://github.com/ValenMontilla7',
    linkedin: 'https://www.linkedin.com/in/valentina-montilla-493a7b380/',
    description: 'Desarrolladora versátil con experiencia en todo el stack tecnológico.',
  },
  {
    name: 'Julia Zarco',
    role: 'Full Stack Developer',
    photo: julia,
    github: 'https://github.com/juliazmor',
    linkedin: 'https://linkedin.com',
    description: 'Contribuye en el desarrollo y soporte de la aplicación.',
  },
  {
    name: 'Aday Álvarez',
    role: 'Full Stack Developer',
    photo: aday,
    github: 'https://github.com/Aday25',
    linkedin: 'https://www.linkedin.com/in/adayasc',
    description: 'Perfeccionista y perseverante, en busca conseguir códigos eficientes y diseños únicos. ',
  },
];

const Creadoras: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // 👉 Estado para guardar el nombre del usuario
  const [userName, setUserName] = useState<string>(''); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userId = localStorage.getItem('userId');
        if (!userId) {
          setUserName('invitado/a');
          return;
        }

        const userData: User = await getUserById(userId);
        // Puedes mostrar firstname o username según prefieras
        setUserName(userData.firstname || userData.username);
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setUserName('invitado/a');
      }
    };

    fetchUser();
  }, []);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #e0f7fa 0%, #b2ebf2 50%, #80deea 100%)',
        paddingY: 4,
      }}
    >
      <Container maxWidth="xl">
        {/* 💬 Saludo personalizado */}
        <Box
          sx={{
            textAlign: 'center',
            marginBottom: 6,
            padding: 3,
            background: 'linear-gradient(-45deg, #001f2f, #003d5c, #005f80, #0077aa)',
            backgroundSize: '400% 400%',
            animation: 'gradientMove 15s ease infinite',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0, 119, 170, 0.3)',
          }}
        >
          <Typography
            variant={isMobile ? 'h4' : 'h3'}
            sx={{
              color: 'white',
              fontWeight: 'bold',
              marginBottom: 1,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            }}
          >
            {userName ? `¡${userName}, estamos encantadas de tenerte aquí! 🦀` : 'Cargando...'}
          </Typography>
        </Box>

        {/* Resto de la página igual */}
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          sx={{
            textAlign: 'center',
            marginBottom: 5,
            fontWeight: 'bold',
            color: '#004d66',
            textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
          }}
        >
          Nuestro Equipo de Creadoras
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 3,
          }}
        >
          {creators.map((creator, index) => (
            <Box
              key={index}
              sx={{
                flex: {
                  xs: '1 1 100%',
                  sm: '1 1 calc(50% - 24px)',
                  md: '1 1 calc(20% - 24px)',
                },
                maxWidth: {
                  xs: '100%',
                  sm: 'calc(50% - 24px)',
                  md: 280,
                },
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <Card
                sx={{
                  width: '100%',
                  maxWidth: 280,
                  textAlign: 'center',
                  borderRadius: 3,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                  transition: 'all 0.3s ease',
                  background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 12px 32px rgba(0, 119, 170, 0.25)',
                  },
                }}
              >
                <CardContent sx={{ padding: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                    <Avatar
                      src={creator.photo}
                      alt={creator.name}
                      sx={{
                        width: 120,
                        height: 120,
                        border: '4px solid #0077aa',
                        boxShadow: '0 4px 12px rgba(0, 119, 170, 0.3)',
                      }}
                    />
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#003d5c', marginBottom: 0.5 }}>
                    {creator.name}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#0077aa', fontWeight: 500, marginBottom: 2 }}>
                    {creator.role}
                  </Typography>

                  <Typography variant="body2" sx={{ color: '#555', marginBottom: 2, fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {creator.description}
                  </Typography>

                  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                    <IconButton
                      href={creator.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#003d5c',
                        '&:hover': { color: '#0077aa', transform: 'scale(1.2)' },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <GitHubIcon />
                    </IconButton>
                    <IconButton
                      href={creator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: '#003d5c',
                        '&:hover': { color: '#0077aa', transform: 'scale(1.2)' },
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <LinkedInIcon />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Container>

      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </Box>
  );
};

export default Creadoras;
