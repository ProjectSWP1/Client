import { Box, Button, Container, Grid, Paper, TableContainer, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { URL_FETCH_AZURE_SERVER } from '../../../config';

export default function AnimalCage() {
    const [cages, setCages] = useState([]);
    const [zooAreas, setZooAreas] = useState([]);
    const [employee, setEmployee] = useState(null);
    const [capacity, setCapacity] = useState(1);
    const [description, setDescription] = useState("");
    const [cageId, setCageId] = useState("");
    const [selectedZooArea, setSelectedZooArea] = useState("");

    const [open, setOpen] = useState(false);
    const ADD_CAGE_TITLE = "Add animal cage";
    const UPDATE_CAGE_TITLE = "Update animal cage";
    const [popUpTitle, setPopupTitle] = useState(ADD_CAGE_TITLE);
    const [changed, setChanged] = useState(false)

    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
    const email = !token
        ? null
        : JSON.parse(atob(token.split(".")[1]))?.email;

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
                setEmployee(data)
            });

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
        }
    }, [email, token])

    useEffect(() => {
        if (employee && employee.zooArea && employee.zooArea.zooAreaId) {
            fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-cage/${employee.zooArea.zooAreaId}`, {
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
                setCages(data);
            })
        }
    }, [changed, employee]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenPopupUpdateAction = (id) => {
        setChanged(false)
        const cageById = cages.filter(cage => {
            return cage.cageID === id;
        })[0];
        setCageId(id);
        setSelectedZooArea(cageById.zooArea?.zooAreaId ? cageById.zooArea.zooAreaId : cageById.zooArea);
        setOpen(true);
        setDescription(cageById.description);
        setCapacity(cageById.capacity);
        setPopupTitle(`${UPDATE_CAGE_TITLE} ${id}`);
    }

    const handleOpenPopupAddAction = () => {
        setChanged(false)
        setOpen(true);
        setDescription("");
        setCapacity(1);
        setCageId("");
        setSelectedZooArea("");
        setPopupTitle(ADD_CAGE_TITLE);
    }

    const handleCapacityChange = (e) => {
        const inputValue = e.target.value;

        // Use a regular expression to allow only positive integer numbers
        if (/^[1-9]\d*$/.test(inputValue) || inputValue === '') {
            setCapacity(inputValue);
        }
    };

    const handleAddSave = () => {
        const cageDto = {
            cageID: cageId,
            description: description,
            capacity: capacity,
            zoo_AreaID: selectedZooArea
        }
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/create-cage`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(cageDto)
        }).then(response => {
            if (!response.ok) {
                return response.text().then((message) => {
                    throw new Error(message);
                });
            }
            return response.text();
        }).then(data => {
            setOpen(false);
            setChanged(true)
            Swal.fire({
                title: 'Success!',
                text: `${data}`,
                icon: 'success',
            });
        }).catch(error => {
            setOpen(false);
            Swal.fire({
                title: 'Fail!',
                text: `${error}`,
                icon: 'error',
            });
        });
    }

    const handleUpdateSave = () => {
        const cageDto = {
            cageID: cageId,
            description: description,
            capacity: capacity,
            zoo_AreaID: selectedZooArea
        }
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/update-cage`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(cageDto)
        }).then(response => {
            if (!response.ok) {
                return response.text().then((message) => {
                    throw new Error(message);
                });
            }
            return response.text();
        }).then(data => {
            setOpen(false);
            setChanged(true)
            Swal.fire({
                title: 'Success!',
                text: `${data}`,
                icon: 'success',
            });
        }).catch(error => {
            setOpen(false);
            Swal.fire({
                title: 'Fail!',
                text: `${error.message}`,
                icon: 'error',
            });
        });
    }

    const handleDeleteAction = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#2e7d32',
            cancelButtonColor: '#DDDDDD',
            confirmButtonText: 'Yes!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`${URL_FETCH_AZURE_SERVER}trainer/remove-cage/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token,
                    }
                }).then(response => {
                    if (!response.ok) {
                        return response.text().then((message) => {
                            throw new Error(message);
                        });
                    }
                    return response.text()
                }).then(data => {
                    Swal.fire({
                        title: 'Success!',
                        text: `${data}`,
                        icon: 'success',
                    });
                    setCages(cages.filter(cage => {
                        return cage.cageID != id;
                    }));
                })
                    .catch(error => {
                        Swal.fire({
                            title: 'Fail!',
                            text: `${error.message}`,
                            icon: 'error',
                        });
                    });
            }
        });
    }

    const columns = [
        {
            id: 1,
            name: 'ID',
            selector: (cage, index) => {
                return (
                    <p>{cage.cageID}</p>
                )
            }
        },
        {
            id: 3,
            name: 'Description',
            selector: cage => {
                return (
                    <p>{cage.description}</p>
                )
            }
        },
        {
            id: 4,
            name: 'Capacity',
            selector: cage => {
                return (
                    <p>{cage.capacity}</p>
                )
            }
        },
        {
            id: 5,
            name: 'Zoo Area',
            selector: cage => {
                return (
                    <p>{cage.zooArea?.zooAreaId ? cage.zooArea.description :
                        (zooAreas.find(item => item.zooAreaId === cage.zooArea)?.description)}</p>
                )
            }
        },
        {
            id: 6,
            name: 'Actions',
            selector: cage => {
                return (
                    <div>
                        <Button size='small' sx={{ mr: "10px" }} variant="contained" onClick={() => handleDeleteAction(cage.cageID)}>Delete</Button>
                        <Button size='small' variant="contained" onClick={() => handleOpenPopupUpdateAction(cage.cageID)}>Update</Button>
                    </div>
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
                        <Grid container spacing={2}>
                            {popUpTitle === ADD_CAGE_TITLE ? <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="cageId"
                                    label="cageId"
                                    value={cageId}
                                    onChange={(e) => setCageId(e.target.value)}
                                />
                            </Grid> : ""}
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="Capacity"
                                    type="number"
                                    id="capacity"
                                    value={capacity}
                                    onChange={handleCapacityChange}
                                />
                            </Grid>
                            {popUpTitle === ADD_CAGE_TITLE ?
                                <Grid item xs={12}>
                                    <InputLabel id="select-label">Select an zoo area</InputLabel>
                                    <Select
                                        labelId="select-label"
                                        id="select"
                                        fullWidth
                                        value={selectedZooArea}
                                        onChange={(e) => setSelectedZooArea(e.target.value)}
                                    >
                                        <MenuItem value={employee?.zooArea?.zooAreaId}>{employee?.zooArea?.description}</MenuItem>
                                    </Select>
                                </Grid> :
                                <Grid item xs={12}>
                                    <InputLabel id="select-label">Select an zoo area</InputLabel>
                                    <Select
                                        labelId="select-label"
                                        id="select"
                                        fullWidth
                                        value={selectedZooArea}
                                        onChange={(e) => setSelectedZooArea(e.target.value)}
                                    >
                                        {zooAreas.map(area => {
                                            return (
                                                <MenuItem
                                                    // style={{
                                                    //     width: '250px'
                                                    // }}
                                                    key={area.zooAreaId} value={area.zooAreaId}>{area.description}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </Grid>}
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={popUpTitle === ADD_CAGE_TITLE ? handleAddSave : handleUpdateSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ mt: '100px' }}>
                <DataTable
                    columns={columns}
                    data={cages.map(item => ({
                        ...item,
                    }))}
                    title="Zoo Cage"
                    pagination
                    keyField='cageID'
                    paginationPerPage={5} // Number of rows per page
                    paginationRowsPerPageOptions={[5, 10, 15]} // Rows per page options
                />
                <Button onClick={handleOpenPopupAddAction} color="primary" fullWidth>
                    Add
                </Button>
            </TableContainer>
        </Container>
    )
}