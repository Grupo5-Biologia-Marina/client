import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';
import { AlertMessage } from '../hooks/useAlert';
import alertBg from '../assets/icons/alert.png';

interface Props {
  alert: AlertMessage | null;
  onClose: () => void;
}

const CustomSnackbar: React.FC<Props> = ({ alert, onClose }) => {
  if (!alert) return null;

  // Borde según tipo
  const borderColor =
    alert.type === 'success'
      ? 'green'
      : alert.type === 'error'
      ? 'red'
      : alert.type === 'warning'
      ? 'orange'
      : 'blue';

  return (
    <Snackbar
      open={!!alert}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={onClose}
        severity={alert.type as AlertColor}
        variant="filled"
        sx={{
          width: 500,
          minHeight: 160,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundImage: `url(${alertBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#ffffff',
          fontWeight: 'bold',
          fontSize: '1.2rem',
          textAlign: 'center',
          textShadow: '4px 4px 6px #000000',
          border: `3px solid ${borderColor}`,
          borderRadius: 6,
          boxShadow: '0 6px 15px rgba(0,0,0,0.4)',
        }}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
