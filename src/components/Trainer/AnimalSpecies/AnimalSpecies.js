import { Box, Button, Container, Grid, Paper, TableContainer, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { URL_FETCH_AZURE_SERVER } from '../../../config';
export default function AnimalSpecies() {
    const [species, setSpecies] = useState([]);
    const [groups, setGroups] = useState("");
    const [name, setName] = useState("");
    const [open, setOpen] = useState(false);
    const ADD_ANIMAL_SPECIES_TITLE = "Add animal species";
    const UPDATE_ANIMAL_SPECIES_TITLE = "Update animal species";
    const [specieId, setSpecieId] = useState(0);
    const [popUpTitle, setPopupTitle] = useState(ADD_ANIMAL_SPECIES_TITLE);
    const [changed, setChanged] = useState(false)
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";

    useEffect(() => {
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-all-animalSpecies`, {
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
            const sortedSpecies = data.sort((a, b) => b.speciesId - a.speciesId)
            setSpecies(sortedSpecies);
        })
    }, [changed]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenPopupUpdateAction = (id) => {
        setChanged(false)
        const specieById = species.filter(specie => {
            return specie.speciesId == id;
        })[0];
        setSpecieId(id);
        setOpen(true);
        setGroups(specieById.groups);
        setName("species.name");
        setPopupTitle(`${UPDATE_ANIMAL_SPECIES_TITLE} ${specieById.name}`);
    }

    const handleOpenPopupAddAction = () => {
        setChanged(false)
        setOpen(true);
        setGroups("");
        setName("");
        setSpecieId(0);
        setPopupTitle(ADD_ANIMAL_SPECIES_TITLE);
    }

    const handleAddSave = () => {
        const animalSpeciesDto = {
            groups: groups,
            name: "species.name"
        }
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/create-animal-species`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(animalSpeciesDto)
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
            // setSpecies([...species, animalSpeciesDto]);
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

    const handleUpdateSave = () => {
        const animalSpeciesDto = {
            speciesId: specieId,
            groups: groups,
            name: "species.name"
        }
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/update-animal-species`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(animalSpeciesDto)
        }).then(response => {
            if (!response.ok) {
                return response.text().then((message) => {
                    throw new Error(message);
                });
            }
            return response.text();
        }).then(data => {
            setChanged(true)
            setOpen(false);
            // setSpecies(species.map(specie => {
            //     if (specie.speciesId === specieId) return animalSpeciesDto;
            //     return specie;
            // }));
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
        setChanged(false)
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
                fetch(`${URL_FETCH_AZURE_SERVER}trainer/remove-animal-species/${id}`, {
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
                    setChanged(true)
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
            name: 'SpeciesID',
            selector: (specie, index) => {
                return (
                    <p>{specie.speciesId}</p>
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
            name: 'Actions',
            selector: specie => {
                return (
                    <div>
                        <Button sx={{mr: '10px'}} size='small' variant="contained" onClick={() => handleDeleteAction(specie.speciesId)}>Delete</Button>
                        <Button sx={{mr: '10px'}} size='small' variant="contained" onClick={() => handleOpenPopupUpdateAction(specie.speciesId)}>Update</Button>
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
                                    id="groups"
                                    label="Groups"
                                    value={groups}
                                    onChange={(e) => setGroups(e.target.value)}
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
