import React, { Component, useEffect } from 'react'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { ThemeProvider } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { ListItemText } from '@mui/material';
import { Copyright, defaultTheme } from '../Theme/Theme.js';
import { Link } from 'react-router-dom'
import VerifyEmail from './VerifyEmail.js';
export default class Confirm extends Component {
    state = { fetchdata: null }
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
        console.log('Values in Confirm component:', values);
        // Construct the payload with accountDto and memberDto
        const payload = {
            accountDto: {
                email: values.email,
                password: values.password,
                phoneNumber: values.phone,
            },
            memberDto: {
                phoneNumber: values.phone,
                address: values.address,
                age: 30,
                gender: values.gender,
                name: values.username,
            },
        };
        // Make a POST request to the backend to submit the registration data
        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //   'Authorizaion': `Bear ${}`
            },
            body: JSON.stringify(payload),
        }).then(data => {
            // Handle the response from the backend, if needed
            //   alert(`Register success!! Welcome ${values.email}`);
            //   console.log(data);
            return fetch('http://localhost:8080/user/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //   'Authorizaion': `Bear ${}`
                },
                body: JSON.stringify(values.email)
            })
        }).then(response => response.json()).then(data => this.setState({data}))
            .catch(error => {
                // Handle errors, if any
                console.error('Cannot find your email:', error);
                // You can display an error message to the user if needed
            })
            // You can also redirect to a success page or perform other actions here

            .catch(error => {
                // Handle errors, if any
                console.error('Error submitting registration data:', error);
                // You can display an error message to the user if needed
            });
    }
    render() {
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
                            <Link to={`/verifyemail?email=${email}`} style={{textDecoration: 'none', color: 'white'}}>Sign Up</Link>
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

