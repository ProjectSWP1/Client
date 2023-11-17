import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import DataTable from 'react-data-table-component';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { URL_FETCH_AZURE_SERVER } from '../../../config';

export default function ManageEmployee() {
    const [accounts, setAccounts] = useState([])
    const [employee, setEmployee] = useState(null)
    const [zooAreas, setZooAreas] = useState([])
    const [selectedZooArea, setSelectedZooArea] = useState(null)
    const [selectedStaff, setSelectedStaff] = useState(null)
    const [open, setOpen] = useState(false);
    const [staffAccounts, setStaffAccounts] = useState([])
    const [changed, setChanged] = useState(false)

    const UPDATE_EMPLOYEE_TITLE = "Update employee"


    const [popUpTitle, setPopupTitle] = useState(UPDATE_EMPLOYEE_TITLE);
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
    const currentAcc = JSON.parse(atob(token.split('.')[1]))
    useEffect(() => {
        fetch(`${URL_FETCH_AZURE_SERVER}admin/getAllEmployees`, {
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

        fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-zoo-area`, {
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
        setEmployee(account)
        setSelectedZooArea(account?.zooArea?.zooAreaId || account?.zooArea)
        setSelectedStaff(account?.managedByEmp?.empId || null)
        setOpen(true)
        setChanged(false)
    }

    const handleUpdateEmployee = () => {
        setOpen(false)
        const employeeDTO = {
            empID: employee.empId,
            address: employee.address,
            dob: employee.doB,
            name: employee.name,
            phone_number: employee.phoneNumber,
            active: employee.active,
            zoo_areaID: selectedZooArea,
            managedByEmpID: selectedStaff,
            email: employee.email?.email
        }
        console.log(employeeDTO);
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/update-profile`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
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
            Swal.fire({
                title: 'Success!',
                text: `${data}`,
                icon: 'success',
            });
            setChanged(true)
        }).catch(error => {
            Swal.fire({
                title: 'Fail!',
                text: `${error}`,
                icon: 'error',
            });
        })
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
            name: 'RoleID',
            width: '100px',
            selector: account => {
                return (
                    <p>{account.email.role.roleID}</p>
                )
            }
        },
        {
            id: 5,
            name: 'Zoo Area',
            selector: employee => {
                return (
                    <p>{employee.zooArea?.zooAreaId ? employee.zooArea.zooAreaId : employee.zooArea}</p>
                )
            }
        },
        {
            id: 6,
            name: 'Managed by',
            width: '150px',
            selector: employee => {
                return (
                    <p>{employee.managedByEmp?.empId ? employee.managedByEmp.name : employee.managedByEmp}</p>
                )
            }
        },
        {
            id: 7,
            name: 'Action',
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
                        <Grid item xs={12}>
                            <TextField
                                disabled
                                fullWidth
                                type='email'
                                id="email"
                                label="Email"
                                value={employee?.email?.email}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <InputLabel id="select-label">Select an zoo area</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={selectedZooArea}
                                onChange={(e) => setSelectedZooArea(e.target.value)}
                            >
                                <MenuItem value={null}></MenuItem>
                                {zooAreas.map(area => {
                                    return (
                                        <MenuItem key={area.zooAreaId} value={area.zooAreaId}>{area.description}</MenuItem>
                                    )
                                })}
                            </Select>
                        </Grid>
                        {employee?.email?.role?.roleID === "ZT" ?
                            <Grid item xs={6}>
                                <InputLabel id="select-label">Managed by: </InputLabel>
                                <Select
                                    labelId="select-label"
                                    id="select"
                                    value={selectedStaff}
                                    onChange={(e) => setSelectedStaff(e.target.value)}
                                >
                                    <MenuItem value={null}></MenuItem>
                                    {staffAccounts.map(staff => {
                                        return (
                                            <MenuItem key={staff.empId} value={staff.empId}>{staff.empId}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </Grid>
                            : ""}
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
                    title="Employee"
                    pagination
                    keyField='item.empId'
                    paginationPerPage={5} // Number of rows per page
                    paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
                />
            </TableContainer>
        </Container>
    );
}

