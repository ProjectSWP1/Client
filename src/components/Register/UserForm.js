import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://localhost:3000">
        ZooKay
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
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

export default class UserForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep()
    }
    render(){
        const { values, handleChange } = this.props
        return (
            <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
                >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    User Details
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        onChange={handleChange('username')}
                        defaultValue={values.username}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        onChange={handleChange('email')}
                        defaultValue={values.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        label="Password"
                        type="password"
                        id="password"
                        onChange={handleChange('password')}
                        defaultValue={values.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        required
                        fullWidth
                        label="Number Phone"
                        type="tel"
                        id="phone"
                        onChange={handleChange('phone')}
                        defaultValue={values.phone}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                    </Grid>
                    </Grid>
                    <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={this.continue}
                    >
                        Continue
                    </Button>
                    <Grid container justifyContent="flex-end">
                    <Grid item>
                        <Link href="#" variant="body2">
                        Already have an account? Sign in
                        </Link>
                    </Grid>
                    </Grid>
                </Box>
                </Box>
                <Copyright sx={{ mt: 5 }} />
            </Container>
            </ThemeProvider>
        );
    }
}

