import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import DataTable from 'react-data-table-component';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function ManageEmployee() {
    const [accounts, setAccounts] = useState([])
    const [zooAreas, setZooAreas] = useState([])
    const [open, setOpen] = useState(false);
    const [staffAccounts, setStaffAccounts] = useState([])
    const [changed, setChanged] = useState(false)

    const UPDATE_EMPLOYEE_TITLE = "Update empolyee"
    

    const [popUpTitle, setPopupTitle] = useState(UPDATE_EMPLOYEE_TITLE);
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
    const currentAcc = JSON.parse(atob(token.split('.')[1]))
    useEffect(() => {
        fetch('http://localhost:8080/admin/getAllEmployees', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        }).then(response => response.json()).then(data => {
            setAccounts(data)
            setStaffAccounts(data.filter(acc => {
                return acc.email.role.roleID === "ST"
            }))
        })

        fetch('http://localhost:8080/trainer/get-zoo-area', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        }).then(response => {
            if (!response.ok) return [];
            return response.json();
        }).then(data => {
            setZooAreas(data);
        })
    }, [changed])

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenPopupUpdateAction = (account) => {
        
    }

    const handleUpdateEmployee = () => {

    }

    const columns = [
        {
            id: 1,
            name: 'ID',
            selector: (employee, index) => {
                return (
                    <p>{employee.empId}</p>
                )
            }
        },
        {
            id: 2,
            name: 'Email',
            selector: employee => {
                return (
                    <p>{employee.email.email}</p>
                )
            }
        },
        {
            id: 3,
            name: 'Active',
            width: '100px',
            selector: account => {
                return (
                    <p>{account.active ? <CheckIcon color="success" /> : <CloseIcon color="warning" />}</p>
                )
            }
        },
        {
            id: 4,
            name: 'Zoo Area',
            selector: employee => {
                return (
                    <p>{employee.zooArea?.zooAreaId? employee.zooArea.zooAreaId : employee.zooArea}</p>
                )
            }
        },
        {
            id: 5,
            name: 'Managed by',
            width: '150px',
            selector: employee => {
                return (
                    <p>{employee.managedByEmp?.empId? employee.managedByEmp.empId : employee.managedByEmp}</p>
                )
            }
        },
        {
            id: 5,
            name: 'Active',
            selector: employee => {
                return (
                    <Box sx={{ '& button': { m: 1 } }}>
                        <Button variant="contained" size='small' onClick={() => handleOpenPopupUpdateAction(employee)}>Update</Button>
                    </Box>
                )
            }
        }
    ]

    return (
        <Container sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.background.default
                    : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
        }}>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{popUpTitle}</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={handleUpdateEmployee} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ mt: '100px' }}>
                <DataTable
                    columns={columns}
                    data={accounts.map(item => ({
                        ...item,
                    }))}
                    title="Accounts"
                    pagination
                    keyField='email'
                    paginationPerPage={5} // Number of rows per page
                    paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
                />
            </TableContainer>
        </Container>
    );
}
