import React, { Component } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';

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

export default class Confirm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep()
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep()
    }
    render(){
        const { values: { email, password, phone, username, gender,
            dob, address } } = this.props
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
                        <Typography component="h1" variant="h5">
                            Confirm
                        </Typography>
                        <List>
                            <ListItem>
                                <ListItemText
                                    primary="Username"
                                    secondary={username}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Number Phone"
                                    secondary={phone}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Gender"
                                    secondary={gender}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Date of Birth"
                                    secondary={dob}
                                />
                            </ListItem>
                            <ListItem>
                                <ListItemText
                                    primary="Address"
                                    secondary={address}
                                />
                            </ListItem>
                        </List>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={this.prevStep}
                        >
                            Sign Up
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={this.back}
                        >
                            Back
                        </Button>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        );
    }
}

