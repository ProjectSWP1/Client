import React from 'react'
import './UserProfile.css'
import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from '../Theme/Theme';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';

export default function UserProfile() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <div className='profile-container'>
                <div className='profile'>
                    <div className='profile-header'>
                        <Link to={'/'}>
                            <Button className='profile-home-btn'><HomeIcon fontSize='large'/></Button>
                        </Link>
                    </div>
                    <div className='profile-body'>
                        <p className='profile-title'>User Profile</p>
                        <div className='profile-left'>
                            <img src="https://i.pinimg.com/736x/f0/f6/30/f0f63081e758c96e4051a865fb2293b8.jpg" />
                            <Button className='profile-left-btn'>My Profile</Button>
                            <Button className='profile-left-btn'>My Orders</Button>
                        </div>
                        <div className='profile-right'>
                            <form className='profile-form'>
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth
                                        id="TextInput-38"
                                        label="Your Name"
                                        name="name"
                                        value=""
                                        style={{ marginBottom: '20px' }}
                                        className='text-profile'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="TextInput-39"
                                        label="Your Phone"
                                        name="phone"
                                        value=""
                                        style={{ marginBottom: '20px' }}
                                        className='text-profile'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="TextInput-41"
                                        label="Your Email"
                                        name="email"
                                        value=""
                                        style={{ marginBottom: '20px' }}
                                        className='text-profile'
                                    />
                                </Grid>

                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        defaultValue="female"
                                        name="radio-buttons-group"
                                        style={{ width: '800px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}
                                        className='radio-profile'
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" style={{ width: '30%', marginRight: '25px' }} />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" style={{ width: '30%' }} />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" style={{ width: '30%' }} />
                                    </RadioGroup>
                                </FormControl>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div components={['DatePicker']}>
                                        <DatePicker label="Basic date picker" />
                                    </div>
                                </LocalizationProvider>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="TextInput-38"
                                        label="Your Address"
                                        name="adress"
                                        value=""
                                        style={{ margin: '20px 0 50px' }}
                                        className='text-profile'
                                    />
                                </Grid>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}
