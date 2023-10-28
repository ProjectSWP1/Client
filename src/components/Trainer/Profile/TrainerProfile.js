import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import UploadImage from "./UploadImage";
import { getItemWithTimeout } from "../../auth/setTimeOut";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { DatePicker, LocalizationProvider  } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';

const TrainerProfile = () => {
    const [employee, setEmployee] = useState(null);
    const [name, setName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [dob, setDob] = useState("");
    const accessToken = getItemWithTimeout('token');
    useEffect(() => {
        const email = !accessToken ? null : JSON.parse(atob(accessToken.split('.')[1]))?.email;
        if (!email) return;
        fetch(`http://localhost:8080/trainer/get-employee-by/${email}`, {
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
            setEmployee(data);
            setName(data.name);
            setPhoneNumber(data.phoneNumber);
            setAddress(data.address);
            if(data.doB)
            setDob(dayjs(new Date(data.doB)));
            console.log(data);
        }).catch(error => {
            console.log(error);
        })
    }, [])

    const handleSave = () => {
        const employeeDTO = {
            ...employee
        };
        employeeDTO.name = name;
        employeeDTO.empID = employee.empId;
        employeeDTO.phone_number = phoneNumber;
        employeeDTO.address = address;
        employeeDTO.dob = dob;
        employeeDTO.email = employee?.email?.email;
        employeeDTO.zoo_areaID = employee?.zooArea?.zooAreaId;
        employeeDTO.managedByEmpID = employee?.managedByEmp?.empId
        console.log(employeeDTO);
        fetch(`http://localhost:8080/trainer/update-profile`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + accessToken,
            },
            body: JSON.stringify(employeeDTO)
        }).then(response => {
            if (!response.ok) {
                return response.text().then((message) => {
                    throw new Error(message);
                });
            }
            return response.text();
        }).then(data => {
            setEmployee({
                ...employee,
                name: name,
                address: address,
                phoneNumber: phoneNumber,
                dob : dob
            });
            Swal.fire({
                title: 'Success!',
                text: `${data}`,
                icon: 'success',
            });
        }).catch(error => {
            setAddress(employee.address);
            setName(employee.name);
            setPhoneNumber(employee.phoneNumber);
            setDob(employee.dob ? employee.dob : employee.doB);
            Swal.fire({
                title: 'Fail!',
                text: `${error.message}`,
                icon: 'error',
            });
        })
    }

    return (
        <Box sx={{ display: 'flex', marginTop: 10, mr: 10 }}>
            <UploadImage employeeId={employee?.empId} />
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5">{employee?.email?.email}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            id="name"
                            label="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="phoneNumber"
                            id="phoneNumber"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            required
                            fullWidth
                            label="address"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Date of birth"
                            value={dob}
                            sx={{width : '100%' , borderColor : 'black'}}
                            onChange={(date) => setDob(date)}
                        />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary"
                            fullWidth
                            variant="contained" onClick={handleSave}>Save</Button>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default TrainerProfile;