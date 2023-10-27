import { Box, Button, Container, Grid, Paper, TableContainer, TextField, Select, MenuItem, InputLabel } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
import Swal from 'sweetalert2';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import AnimalDetail from './AnimalDetail';
export default function Animal() {
    const genders = ["male", "female"];
    const [animals, setAnimals] = useState([]);
    const [description, setDescription] = useState("");
    const [name, setName] = useState("");
    const [age, setAge] = useState(1);
    const [weight, setWeight] = useState(1);
    const [height, setHeight] = useState(1);
    const [gender, setGender] = useState(genders[0]);
    const [selectedCageId, setSelectedCageId] = useState("");
    const [cages, setCages] = useState([]);
    const [species, setSpecies] = useState([]);
    const [selectedSpeciesId, setSelectedSpeciesId] = useState(0);
    const [open, setOpen] = useState(false);
    const [animalDetail, setAnimalDetail] = useState(null);
    const ADD_ANIMAL_TITLE = "Add animal";
    const UPDATE_ANIMAL_TITLE = "Update animal";
    const [animal, setAnimal] = useState(null);
    const [popUpTitle, setPopupTitle] = useState(ADD_ANIMAL_TITLE);
    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
    useEffect(() => {
        fetch('http://localhost:8080/trainer/get-animal', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        }).then(response => {
            if (!response.ok) return { animal: [] };
            return response.json();
        }).then(data => {
            setAnimals(data.animal);
        });
        fetch('http://localhost:8080/trainer/get-cage/ascending', {
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
        });
        fetch('http://localhost:8080/trainer/get-all-animalSpecies', {
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
            setSpecies(data);
        });
    }, [])

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpenPopupDetail = (id) => {
        fetch(`http://localhost:8080/trainer/get-animal/${id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            }
        }).then(response => response.json()).then(data => {
            setAnimalDetail(data);
        });
    }

    const handleOpenPopupUpdateAction = (id) => {
        const animalById = animals.filter(animal => {
            return animal.animalId === id;
        })[0];
        setAnimal(animalById);
        setOpen(true);
        setDescription(animalById.description);
        setHeight(animalById.height);
        setWeight(animalById.weight);
        setAge(animalById.age);
        setGender(animalById.gender);
        setSelectedCageId(animalById.cage?.cageID ? animalById.cage.cageID : animalById.cage);
        setSelectedSpeciesId(animalById.species?.speciesId ? animalById.species.speciesId : animalById.species);
        setName(animalById.name);
        setPopupTitle(`${UPDATE_ANIMAL_TITLE} ${animalById.name}`);
    }

    const handleOpenPopupAddAction = () => {
        setAnimal(null);
        setOpen(true);
        setDescription("");
        setHeight(1);
        setWeight(1);
        setAge(1);
        setGender(genders[0]);
        setSelectedCageId("");
        setSelectedSpeciesId(0);
        setName("");
        setPopupTitle(ADD_ANIMAL_TITLE);
    }

    const handleAddSave = () => {
        const animalDto = {
            age: age,
            weight: weight,
            gender: gender,
            height: height,
            cageId: selectedCageId,
            speciesId: selectedSpeciesId,
            description: description,
            name: name
        }
        fetch('http://localhost:8080/trainer/create-animal', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(animalDto)
        }).then(response => {
            if (!response.ok) {
                return response.text().then((message) => {
                    throw new Error(message);
                });
            }
            return response.text();
        })
            .then(data => {
                setOpen(false);
                fetch('http://localhost:8080/trainer/get-animal', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Authorization': "Bearer " + token,
                    }
                }).then(response => response.json()).then(data => {
                    setAnimals(data.animal);
                    Swal.fire({
                        title: 'Success!',
                        text: `Add Successfully`,
                        icon: 'success',
                    });
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
        const animalDto = {
            animalId: animal.animalId,
            age: age,
            weight: weight,
            gender: gender,
            height: height,
            cageId: selectedCageId,
            speciesId: selectedSpeciesId,
            description: description,
            name: name
        }
        fetch('http://localhost:8080/trainer/update-animal', {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + token,
            },
            body: JSON.stringify(animalDto)
        }).then(response => {
            if (!response.ok) {
                return response.text().then((message) => {
                    throw new Error(message);
                });
            }
            return response.text();
        }).then(data => {
            setOpen(false);
            fetch(`http://localhost:8080/trainer/get-animal/${animalDto.animalId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + token,
                }
            }).then(response => response.json()).then(data => {
                const updatedAnimal = data;
                setAnimals(animals.map(animal => {
                    if (animal.animalId === animalDto.animalId) return updatedAnimal;
                    return animal;
                }));
                Swal.fire({
                    title: 'Success!',
                    text: `Update Successfully`,
                    icon: 'success',
                });
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
                fetch(`http://localhost:8080/trainer/remove-animal/${id}`, {
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
                    Swal.fire({
                        title: 'Success!',
                        text: `Delete Successfully`,
                        icon: 'success',
                    });
                    setAnimals(animals.filter(animal => {
                        return animal.animalId != id;
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
            name: '#',
            selector: (animal, index) => {
                return (
                    <p>{index + 1}</p>
                )
            }
        },
        {
            id: 2,
            name: 'Name',
            selector: animal => {
                return (
                    <p>{animal.name}</p>
                )
            }
        },
        {
            id: 10,
            name: 'Actions',
            selector: animal => {
                return (
                    <div>
                        <Button variant="contained" onClick={() => handleDeleteAction(animal.animalId)}>Delete</Button>
                        <Button variant="contained" onClick={() => handleOpenPopupUpdateAction(animal.animalId)}>Update</Button>
                        <Button variant="contained" onClick={() => handleOpenPopupDetail(animal.animalId)}>Detail</Button>
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
            <Dialog open={animalDetail !== null} onClose={() => setAnimalDetail(null)} >
                <DialogTitle>Detail</DialogTitle>
                <DialogContent>
                    <AnimalDetail animalDetail={animalDetail} />
                </DialogContent>
            </Dialog>
            <Dialog open={open} onClose={handleClose} >
                <DialogTitle>{popUpTitle}</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="age"
                                    label="age"
                                    type='number'
                                    value={age}
                                    onChange={(e) => setAge(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="weight"
                                    label="weight"
                                    type='number'
                                    value={weight}
                                    onChange={(e) => setWeight(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="height"
                                    label="height"
                                    type='number'
                                    value={height}
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="select-label-gender">Select Gender</InputLabel>
                                <Select
                                    labelId="select-label-gender"
                                    id="select-gender"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    {genders.map(gender => {
                                        return (
                                            <MenuItem key={gender} value={gender}>{gender}</MenuItem>
                                        )
                                    })}
                                </Select>
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
                            <Grid item xs={12}>
                                <InputLabel id="select-label-cage">Select Cage</InputLabel>
                                <Select
                                    labelId="select-label-cage"
                                    id="select-cage"
                                    defaultValue={!animal ? '' : animal.cage?.cageID ? animal.cage.cageID : animal.cage}
                                    onChange={(e) => setSelectedCageId(e.target.value)}
                                >
                                    {cages.map(cage => {
                                        return (
                                            <MenuItem key={cage.cageID} value={cage.cageID}>{cage.cageID}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </Grid>
                            <Grid item xs={12}>
                                <InputLabel id="select-label-specie">Select Specie</InputLabel>
                                <Select
                                    labelId="select-label-specie"
                                    id="select-specie"
                                    defaultValue={!animal ? '' : animal.species?.speciesId ? animal.species.speciesId : animal.species}
                                    onChange={(e) => setSelectedSpeciesId(e.target.value)}
                                >
                                    {species.map(specie => {
                                        return (
                                            <MenuItem key={specie.speciesId} value={specie.speciesId}>{specie.name}</MenuItem>
                                        )
                                    })}
                                </Select>
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    <Button onClick={popUpTitle === ADD_ANIMAL_TITLE ? handleAddSave : handleUpdateSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <TableContainer component={Paper} sx={{ mt: '100px' }}>
                <DataTable
                    columns={columns}
                    data={animals.map(item => ({
                        ...item,
                    }))}
                    title="Animals"
                    pagination
                    keyField='animalId'
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