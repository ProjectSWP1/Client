import Typography from '@mui/material/Typography';
import { createTheme } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link to={'/'} style={{color: 'inherit'}}>
          The ZooKay Park
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  // TODO remove, this demo shouldn't need to reset the theme.
export const defaultTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1b5e20',
      dark: '#2e7d32',
      light: '#7dc381',
    },
    secondary: {
      main: '#924c11',
      dark: '#e0c0aa',
    },
    background: {
      paper: '#f1f8e9',
    },
  },
  typography: {
    fontWeightLight: 400,
    h5: {
      fontSize: '2rem',
      fontWeight: 600,
      fontVariant: '#1b5e20',
    },
  },
});