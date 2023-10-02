import React, { Component } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';
import { Copyright, defaultTheme } from '../Theme/Theme.js';

export default class Confirm extends Component {
    continue = event => {
        event.preventDefault();
        this.props.nextStep()
    }
    back = event => {
        event.preventDefault();
        this.props.prevStep()
    }
    handleSubmit = event => {
        event.preventDefault();
        const { values } = this.props;
        alert(`Register success!! Welcome ${values.email}`)
        console.log(values);
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
                                    primary="Email"
                                    secondary={email}
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
                            onClick={this.handleSubmit}
                            
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

