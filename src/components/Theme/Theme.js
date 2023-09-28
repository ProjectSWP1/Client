import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { createTheme } from '@mui/material/styles';

export function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          ZooKay
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
            main: '#9a6213',
          },
          background: {
            default: '#e8e8e0',
            paper: '#e8e8e0',
          },
        },
});