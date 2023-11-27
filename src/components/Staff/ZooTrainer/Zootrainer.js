import { Button, Container, InputLabel, MenuItem, Paper, Select, TableContainer } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2';
import { URL_FETCH_AZURE_SERVER } from '../../../config';
export default function ZooTrainer() {
    const [zooTrainers, setZooTrainers] = useState([]);
    const [employee, setEmployee] = useState(null)
    const [checkData, setCheckData] = useState(false)
    const [currentUpdatedTrainerEmail, setTrainerEmail] = useState("");
    const [selectedRole, setSelectedRole] = useState("");
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
    const email = !token ? null : JSON.parse(atob(token.split('.')[1]))?.email;
    useEffect(() => {
        if (email) {
            fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-employee-by/${email}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token,
                }
            }).then(response => {
                if (!response.ok) return { employee: null };
                return response.json();
            }).then(data => {
                console.log(data);
                setEmployee(data)
                setCheckData(true)
            })
        }
    }, [])

    useEffect(() => {
        if (employee) {
            fetch(`${URL_FETCH_AZURE_SERVER}staff/get-trainer-employees-managed-by/${employee.empId}`, {
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
                setCheckData(false)
                setZooTrainers(data);
                console.log(data);
            })
        }
    }, [employee]);

    const handleSaveRole = () => {
        if (selectedRole.length === 0) {
            Swal.fire({
                title: 'Fail!',
                text: `Must select an role before hit save button`,
                icon: 'error',
            });
            return;
        }
        Swal.fire({
            title: 'Are you sure?',
            text: 'Change role of trainer , the trainer will no longer appear to this page , do you still want to continue?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2e7d32',
            cancelButtonColor: '#DDDDDD',
            confirmButtonText: 'Yes!',
        }).then((result) => {
            if (result.isConfirmed) {
                const accountDto = {
                    email: currentUpdatedTrainerEmail
                };
                fetch(`${URL_FETCH_AZURE_SERVER}staff/modify-trainer?newRole=${selectedRole}`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token,
                    },
                    body: JSON.stringify(accountDto)
                }).then(response => {
                    if (!response.ok) throw new Error();
                    return response.text();
                }).then(data => {
                    Swal.fire({
                        title: 'Success!',
                        text: `Update trainer role's successfully`,
                        icon: 'success',
                    });
                    setZooTrainers(zooTrainers.filter(trainer => {
                        return trainer.email.email !== currentUpdatedTrainerEmail;
                    }));
                }).catch(error => {
                    Swal.fire({
                        title: 'Fail!',
                        text: `Update role fail`,
                        icon: 'error',
                    });
                }).finally(() => {
                    setTrainerEmail("");
                })
            }
        })
    }

    const columns = [
        {
            id: 1,
            name: '#',
            selector: (zooTrainer, index) => {
                return (
                    <p>{index + 1}</p>
                )
            }
        },
        {
            id: 2,
            name: 'Email',
            selector: zooTrainer => {
                return (
                    <p>{zooTrainer.email.email}</p>
                )
            }
        },
        {
            id: 3,
            name: 'Status',
            selector: zooTrainer => {
                if (zooTrainer.active) {
                    return (
                        <p style={{ color: 'green', fontWeight: 'bold' }}>Active</p>
                    );
                }
                return (
                    <p style={{ color: 'red', fontWeight: 'bold' }}>Inactive</p>
                );
            }
        },
        {
            id: 4,
            name: 'Role',
            selector: zooTrainer => {
                if (zooTrainer.email.email === currentUpdatedTrainerEmail) {
                    return (
                        <div>
                            <InputLabel id="select-label">Select an role</InputLabel>
                            <Select
                                labelId="select-label"
                                id="select"
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                            >
                                <MenuItem value="MB">Member</MenuItem>
                                <MenuItem value="ST">Staff</MenuItem>
                            </Select>
                        </div>
                    );
                }
                return (
                    <p>{zooTrainer.email.role.authority}</p>
                );
            }
        },
        {
            id: 5,
            name: 'Action',
            selector: zooTrainer => {
                if (zooTrainer.email.email === currentUpdatedTrainerEmail) {
                    return (
                        <div>
                            <Button variant="contained" onClick={handleSaveRole}>Save</Button>
                            <Button variant="contained" onClick={() => setTrainerEmail("")}>Cancel</Button>
                        </div>
                    )
                }
                return (
                    <Button variant="contained" onClick={() => { setTrainerEmail(zooTrainer.email.email); setSelectedRole("") }}>Edit Role</Button>
                )
            }
        },
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
            {zooTrainers && <TableContainer component={Paper} sx={{ mt: '100px' }}>
                <DataTable
                    columns={columns}
                    data={zooTrainers.map(item => ({
                        ...item,
                    }))}
                    title="Zoo Trainers"
                    pagination
                    keyField='empId'
                    paginationPerPage={5} // Number of rows per page
                    paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
                />
            </TableContainer>}
        </Container>
    )
}
