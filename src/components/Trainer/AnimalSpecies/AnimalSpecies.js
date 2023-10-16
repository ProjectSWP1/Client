import { Box, Button, Container, Grid, Paper, TableContainer, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
export default function AnimalSpecies() {
    const [species, setSpecies] = useState([]);
    const [groups, setGroups] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const ADD_ANIMAL_SPECIES_TITLE = "Add animal specie";
    const UPDATE_ANIMAL_SPECIES_TITLE = "Update animal specie";
    const [specieId , setSpecieId] = useState(0);
    const [popUpTitle, setPopupTitle] = useState(ADD_ANIMAL_SPECIES_TITLE);
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
    useEffect(() => {
        fetch('http://localhost:8080/trainer/get-all-animalSpecies', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        }).then(response => response.json()).then(data => {
            console.log(data);
            setSpecies(data);
        })
    }, []);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenPopupUpdateAction = (id) => {
        const specieById = species.filter(specie => {
            return specie.speciesId === id;
        })[0];
        setSpecieId(id);
        setOpen(true);
        setGroups(specieById.groups);
        setName(specieById.name);
        setPopupTitle(`${UPDATE_ANIMAL_SPECIES_TITLE} ${specieById.name}`);
    }

    const handleOpenPopupAddAction = () => {
        setOpen(true);
        setGroups("");
        setName("");
        setSpecieId(0);
        setPopupTitle(ADD_ANIMAL_SPECIES_TITLE);
    }

    const handleAddSave = () => {
        const animalSpeciesDto = {
            speciesId: species,
            groups: groups,
            name: name
        }
        fetch('http://localhost:8080/trainer/create-animal-species', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(animalSpeciesDto)
        }).then(response => {
            console.log(response.status);
            if (!response.ok) {
                throw new Error("Error");
            }
            return response.text();
        })
        .then(data => {
            console.log("Add sucess" + data);
            setOpen(false);
            setSpecies([...species, animalSpeciesDto]);
            Swal.fire({
                title: 'Success!',
                text: `Add Successfully`,
                icon: 'success',
            });
        }).catch(error => {
            setOpen(false);
            Swal.fire({
                title: 'Fail!',
                text: `Add Fail`,
                icon: 'error',
            });
        });
    }

    const handleUpdateSave = () => {
        const animalSpeciesDto = {
            speciesId : specieId,
            groups: groups,
            name: name
        }
        fetch('http://localhost:8080/trainer/update-animal-species', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(animalSpeciesDto)
        }).then(response => { 
            if (!response.ok) {
                throw new Error("Error");
            }
            return response.text();
         }).then(data => {
            console.log(data);
            setOpen(false);
            setSpecies(species.map(specie => {
                if (specie.speciesId === specieId) return animalSpeciesDto;
                return specie;
            }));
            Swal.fire({
                title: 'Success!',
                text: `Update Successfully`,
                icon: 'success',
            });
        }).catch(error => {
            setOpen(false);
            Swal.fire({
                title: 'Fail!',
                text: `Update Fail`,
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
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:8080/trainer/remove-animal-species/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token,
                    }
                }).then(response => {
                    if (!response.ok) {
                        throw new Error("Error");
                    }
                    Swal.fire({
                        title: 'Success!',
                        text: `Delete Successfully`,
                        icon: 'success',
                    });
                    setSpecies(species.filter(specie => {
                        return specie.speciesId != id;
                    }));
                })
                    .catch(error => {
                        Swal.fire({
                            title: 'Fail!',
                            text: `Delete Fail`,
                            icon: 'error',
                        });
                    });
            }
        });
    }

    const columns = [
        {
            id: 1,
            name: '#',
            selector: (specie, index) => {
                return (
                    <p>{index + 1}</p>
                )
            }
        },
        {
            id: 2,
            name: 'Groups',
            selector: specie => {
                return (
                    <p>{specie.groups}</p>
                )
            }
        },
        {
            id: 3,
            name: 'Name',
            selector: specie => {
                return (
                    <p>{specie.name}</p>
                )
            }
        },
        {
            id: 4,
            name: 'Actions',
            selector: specie => {
                return (
                    <div>
                        <Button variant="contained" onClick={() => handleDeleteAction(specie.speciesId)}>Delete</Button>
                        <Button variant="contained" onClick={() => handleOpenPopupUpdateAction(specie.speciesId)}>Update</Button>
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
                        <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="specie"
                                    label="specie"
                                    value={specieId}
                                    onChange={(e) => setGroups(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="groups"
                                    label="groups"
                                    value={groups}
                                    onChange={(e) => setGroups(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    label="name"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={popUpTitle === ADD_ANIMAL_SPECIES_TITLE ? handleAddSave : handleUpdateSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ mt: '100px' }}>
                <DataTable
                    columns={columns}
                    data={species.map(item => ({
                        ...item,
                    }))}
                    title="Animal Species"
                    pagination
                    keyField='speciesId'
                    paginationPerPage={5} // Number of rows per page
                    paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
                />
                <Button onClick={handleOpenPopupAddAction} color="primary" fullWidth>
                    Add
                </Button>
            </TableContainer>
        </Container>
    )
}
