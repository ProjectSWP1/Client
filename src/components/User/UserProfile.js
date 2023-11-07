import React, { useEffect, useState } from 'react'
import './UserProfile.css'
import { Button, Container, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from '@mui/material'
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from '../Theme/Theme';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import HomeIcon from '@mui/icons-material/Home';
import { Link } from 'react-router-dom';
import { getItemWithTimeout } from '../auth/setTimeOut';
import dayjs from 'dayjs';
import DataTable from 'react-data-table-component';

export default function UserProfile() {
    const [orders, setOrders] = useState([])
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("")
    const [changed, setChanged] = useState(false)
    const [openProfile, setOpenProfile] = useState(true)
    const accessToken = getItemWithTimeout('token');
    const token = !accessToken ? null : JSON.parse(atob(accessToken.split('.')[1]));

    useEffect(() => {
        if (!token) return;
        fetch(`http://localhost:8080/user/get-member-by-email/${token.email}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + accessToken,
            }
        }).then(response => {
            if (!response.ok) throw new Error("");
            return response.json();
        }).then(data => {
            setGender(data.gender || "")
            setName(data.name || "");
            setPhoneNumber(data.phoneNumber || "");
            setAddress(data.address || "");
            if (data.dob)
                setDob(dayjs(new Date(data.dob)));
            setChanged(false)
        }).catch(error => {
            console.log(error);
        })
    }, [changed])

    useEffect(() => {
        if (!token) return;
        fetch(`http://localhost:8080/order/find-order-by-email/${token.email}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + accessToken,
            }
        }).then(response => {
            if (!response.ok) throw new Error("");
            return response.json();
        }).then(data => {
            setOrders(data)
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const handleSubmit = () => {
        const memberDto = {
            email: token.email,
            name: name,
            address: address,
            dob: `${dob.$y}-${dob.$M + 1}-${dob.$D}`,
            gender: gender
        }
        fetch(`http://localhost:8080/user/update/${phoneNumber}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + accessToken,
            },
            body: JSON.stringify(memberDto)
        }).then(response => {
            if (!response.ok) throw new Error("");
            return response.text();
        }).then(data => {
            setChanged(true)
        }).catch(error => {
            console.log(error);
        })
    }

    const handleProfile = () => {
        setOpenProfile(true)
    }

    const handleOrders = () => {
        setOpenProfile(false)
    }

    const columns = [
        {
            id: 1,
            name: 'OrderID',
            selector: (order) => {
                return (
                    <p>{order.orderID}</p>
                )
            }
        },
        {
            id: 2,
            name: 'TicketID',
            selector: (order) => {
                return (
                    <p>{order.ticket.ticketId}</p>
                )
            }
        },
        {
            id: 3,
            name: 'Status',
            selector: (order) => {
                return (
                    <p>{order.orderPayments?.success? "Finished" : "Order has been cancel"}</p>
                )
            }
        },
        {
            id: 4,
            name: 'Total',
            selector: (order) => {
                return (
                    <p>{order.quantity * order.ticket.ticketPrice} VND</p>
                )
            }
        }
    ]

    return (
        <ThemeProvider theme={defaultTheme}>
            <div className='profile-container'>
                <div className='profile'>
                    <div className='profile-header'>
                        <Link to={'/'}>
                            <Button className='profile-home-btn'><HomeIcon fontSize='large' /></Button>
                        </Link>
                    </div>
                    <div className='profile-body'>
                        {openProfile ? <p className='profile-title'>{token?.roles} Profile</p> :
                            <p className='profile-title'>Your Orders</p>}
                        <div className='profile-left'>
                            <img src="https://i.pinimg.com/736x/f0/f6/30/f0f63081e758c96e4051a865fb2293b8.jpg" />
                            <Button className='profile-left-btn' onClick={handleProfile}>My Profile</Button>
                            <Button className='profile-left-btn' onClick={handleOrders}>My Orders</Button>
                        </div>
                        <div className='profile-right'>
                            {openProfile ? <form className='profile-form'>
                                <Grid item xs={12} >
                                    <TextField
                                        fullWidth
                                        id="TextInput-38"
                                        label="Your Name"
                                        name="name"
                                        value={name}
                                        style={{ marginBottom: '20px' }}
                                        className='text-profile'
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="phone"
                                        value={phoneNumber}
                                        style={{ marginBottom: '20px' }}
                                        className='text-profile'
                                        disabled
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        name="email"
                                        value={token.email}
                                        style={{ marginBottom: '20px' }}
                                        className='text-profile'
                                        disabled
                                    />
                                </Grid>

                                <FormControl>
                                    <FormLabel id="demo-radio-buttons-group-label">Gender</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-radio-buttons-group-label"
                                        name="radio-buttons-group"
                                        style={{ width: '800px', marginBottom: '20px', display: 'flex', flexWrap: 'wrap', flexDirection: 'row' }}
                                        className='radio-profile'
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                    >
                                        <FormControlLabel value="female" control={<Radio />} label="Female" style={{ width: '30%', marginRight: '25px' }} />
                                        <FormControlLabel value="male" control={<Radio />} label="Male" style={{ width: '30%' }} />
                                        <FormControlLabel value="" control={<Radio />} label="Other" style={{ width: '30%' }} />
                                    </RadioGroup>
                                </FormControl>

                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <div components={['DatePicker']}>
                                        <DatePicker label="Date of birth"
                                            value={dayjs(dob)}
                                            sx={{ width: '100%', borderColor: 'black' }}
                                            format='MM/DD/YYYY'
                                            onChange={(date) => setDob(date)} />
                                    </div>
                                </LocalizationProvider>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="TextInput-38"
                                        label="Your Address"
                                        name="adress"
                                        value={address}
                                        style={{ margin: '20px 0' }}
                                        className='text-profile'
                                        onChange={(e) => setAddress(e.target.valaue)}
                                    />
                                </Grid>
                                <div className='profile-right-btn'>
                                    {/* <Button
                                        onClick={handleSubmit}
                                        color="primary"
                                        variant="contained"
                                        style={{ width: '100px', textAlign: 'center' }}
                                    >
                                        Update
                                    </Button> */}
                                </div>
                            </form> : (
                                <DataTable
                                    columns={columns}
                                    data={orders.map(item => ({
                                        ...item,
                                    }))}
                                    title="Orders"
                                    pagination
                                    keyField='orderID'
                                    paginationPerPage={5} // Number of rows per page
                                    paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ThemeProvider>
    )
}
