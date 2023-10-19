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
import Swal from 'sweetalert2';
export default class Confirm extends Component {
    state = { 
        email: ''
     }
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
        alert('Please wait a minute! We will send you the OTP to verify your email')
        const { values } = this.props;
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
                gender: values.gender,
                name: values.username,
                email : values.email,
                dob : values.dob
            },
        };
        console.log(payload);
        // Make a POST request to the backend to submit the registration data
        fetch('http://localhost:8080/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                //   'Authorizaion': `Bear ${}`
            },
            body: JSON.stringify(payload),
        })
        .then(response => {
            if(!response.ok){
                return response.text().then((message) => {
                    throw new Error(message);
                });
            }
            return response.text()
        })
        .then(data => {
            // Handle the response from the backend, if needed
            //   alert(`Register success!! Welcome ${values.email}`);
            return fetch('http://localhost:8080/user/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    //   'Authorizaion': `Bear ${}`
                },
                body: JSON.stringify(values.email)
            })
        })
        .then(response => {
            if(!response.ok){
                return response.text().then((message) => {
                    throw new Error(message);
                });
            }
            return response.text()
        }).then(data => {
            window.location.href = `/verifyemail?email=${values.email}`
        })
        .catch(error => {
            Swal.fire({
                title: 'Fail!',
                text: `${error}`,
                icon: 'error',
            });
        })
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
                            {this.state.check? <Link to={`/verifyemail?email=${email}`} style={{textDecoration: 'none', color: 'white'}}>Sign Up</Link> : "Sign Up"}
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
