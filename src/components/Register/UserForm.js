import React, { Component } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import { Copyright, defaultTheme } from '../Theme/Theme.js';
import { Link } from 'react-router-dom';

export default class UserForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep()
    }
    render() {
        const { values, handleChange } = this.props
        return (
            <ThemeProvider theme={defaultTheme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline />
                    <Box sx={{marginTop: 8,display: 'flex',flexDirection: 'column',alignItems: 'center',}}>
                        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <h1 style={{color: 'darkgreen'}}>User Details</h1>
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
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
                                    <Link to={'/login'} style={{textDecoration: 'none', color: 'green'}}>
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

