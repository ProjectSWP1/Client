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
import { FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default class PersonalForm extends Component {
    continue = e => {
        e.preventDefault();
        this.props.nextStep()
    }
    back = e => {
        e.preventDefault();
        this.props.prevStep()
    }
    render() {
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
                        <h1 style={{ color: 'darkgreen', textAlign: 'center' }}>Enter Personal Details</h1>
                        <Box component="form" noValidate sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <FormLabel id="gender">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="gender"
                                        name="Gender"
                                        onChange={handleChange('gender')}
                                        value={values.gender}
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female"/>
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                    </RadioGroup>
                                </Grid>
                                <Grid item xs={12}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']} >
                                            <DatePicker label="Date of Birth" 
                                                        value={dayjs(values.dob)}   
                                                        onChange={handleChange('dob')}
                                                        format='MM/DD/YYYY'
                                                        />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Address"
                                        id="address"
                                        onChange={handleChange('address')}
                                        value={values.address}
                                    />
                                </Grid>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={this.continue}
                                >
                                    Continue
                                </Button>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={this.back}
                                >
                                    Back
                                </Button>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{ mt: 5 }} />
                </Container>
            </ThemeProvider>
        );
    }
}

