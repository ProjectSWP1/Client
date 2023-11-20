import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  TableContainer,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Swal from "sweetalert2";
import { URL_FETCH_AZURE_SERVER } from "../../../config";

export default function FeedingSchedule() {
  const [feedingSchedules, setFeedingSchedules] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [food, setFood] = useState(null);
  const [species, setSpecies] = useState(null);
  const [selectedFoodId, setSelectedFoodId] = useState("");
  const [selectedSpeciesId, setSelectedSpeciesId] = useState("");

  const [open, setOpen] = useState(false);
  const [feedingScheduleDetail, setFeedingScheduleDetail] = useState(null);
  const [feedingSchedule, setFeedingSchedule] = useState(null);

  const ADD_SCHEDULE_TITLE = "Add Feeding Schedule";
  const UPDATE_SCHEDULE_TITLE = "Update Feeding Schedule";

  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token")).value
    : "";

  useEffect(() => {
    fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-all-feedingSchedule`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) return { feedingSchedules: [] };
        return response.json();
      })
      .then((data) => {
        setFeedingSchedules(data);
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-all-animal-food`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => {
            if (!response.ok) return { feedingSchedules: [] };
            return response.json();
          })
          .then((data) => {
            setFood(data);
            fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-all-animalSpecies`, {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
              },
            })
              .then((response) => {
                if (!response.ok) return { feedingSchedules: [] };
                return response.json();
              })
              .then((data) => {
                setSpecies(data);
              });
          });
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenPopupDetail = (id) => {
    fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-feedingSchedule/${id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFeedingScheduleDetail(data);
      });
  };

  const handleOpenPopupUpdateAction = (id) => {
    const scheduleById = feedingSchedules.find(
      (schedule) => schedule.feedScheduleId === id
    );
    setFeedingSchedule(scheduleById);
    setOpen(true);
    setDescription(scheduleById.description);
    setQuantity(scheduleById.quantity);
    setSelectedFoodId(scheduleById.food.foodId);
    setSelectedSpeciesId(scheduleById.species.speciesId);
  };

  const handleOpenPopupAddAction = () => {
    setFeedingSchedule(null);
    setOpen(true);
    setDescription("");
    setQuantity(0);
    setSelectedFoodId(null);
    setSelectedSpeciesId(null);
  };

  const handleAddSave = () => {
    const scheduleDto = {
      description: description,
      quantity: quantity,
      foodId: selectedFoodId,
      speciesId: selectedSpeciesId,
    };
    fetch(`${URL_FETCH_AZURE_SERVER}trainer/add-feedingSchedule`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(scheduleDto),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((message) => {
            throw new Error(message);
          });
        }
        return response.text();
      })
      .then(() => {
        setOpen(false);
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-all-feedingSchedule`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setFeedingSchedules(data);
            Swal.fire({
              title: "Success!",
              text: "Add Successfully",
              icon: "success",
            });
          });
      })
      .catch((error) => {
        setOpen(false);
        Swal.fire({
          title: "Fail!",
          text: `${error.message}`,
          icon: "error",
        });
      });
  };

  const handleUpdateSave = () => {
    const scheduleDto = {
      feedScheduleId: feedingSchedule.feedScheduleId,
      description: description,
      quantity: quantity,
      foodId: selectedFoodId,
      speciesId: selectedSpeciesId,
    };
    fetch(`${URL_FETCH_AZURE_SERVER}trainer/update-feedingSchedule`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(scheduleDto),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((message) => {
            throw new Error(message);
          });
        }
        return response.text();
      })
      .then(() => {
        setOpen(false);
        fetch(
          `${URL_FETCH_AZURE_SERVER}trainer/get-feedingSchedule/${scheduleDto.feedScheduleId}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            const updatedSchedule = data;
            setFeedingSchedules((schedules) => {
              return schedules.map((schedule) => {
                if (schedule.feedScheduleId === scheduleDto.feedScheduleId)
                  return updatedSchedule;
                return schedule;
              });
            });
            Swal.fire({
              title: "Success!",
              text: "Update Successfully",
              icon: "success",
            });
          });
      })
      .catch((error) => {
        setOpen(false);
        Swal.fire({
          title: "Fail!",
          text: `${error.message}`,
          icon: "error",
        });
      });
  };

  const handleDeleteAction = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2e7d32",
      cancelButtonColor: "#DDDDDD",
      confirmButtonText: "Yes!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/remove-feedingSchedule/${id}`, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((message) => {
                throw new Error(message);
              });
            }
            Swal.fire({
              title: "Success!",
              text: "Delete Successfully",
              icon: "success",
            });
            setFeedingSchedules((schedules) => {
              return schedules.filter(
                (schedule) => schedule.feedScheduleId !== id
              );
            });
          })
          .catch((error) => {
            Swal.fire({
              title: "Fail!",
              text: `${error.message}`,
              icon: "error",
            });
          });
      }
    });
  };

  const columns = [
    {
      name: "#",
      selector: (schedule, index) => <p>{index + 1}</p>,
    },
    {
      name: "Description",
      selector: (schedule) => <p>{schedule.description}</p>,
    },
    {
      name: "Quantity",
      selector: (schedule) => <p>{schedule.quantity}</p>,
    },
    {
      name: "Actions",
      selector: (schedule) => (
        <div>
          <Button
            style={{ width: "70px" }}
            variant="contained"
            onClick={() => handleDeleteAction(schedule.feedScheduleId)}
          >
            Delete
          </Button>
          <Button
            style={{ width: "70px" }}
            variant="contained"
            onClick={() => handleOpenPopupUpdateAction(schedule.feedScheduleId)}
          >
            Update
          </Button>
          <Button
            style={{ width: "70px" }}
            variant="contained"
            onClick={() => handleOpenPopupDetail(schedule.feedScheduleId)}
          >
            Detail
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Container
      sx={{
        backgroundColor: (theme) =>
          theme.palette.mode === "light"
            ? theme.palette.background.default
            : theme.palette.grey[900],
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
      }}
    >
      <Dialog
        open={feedingScheduleDetail !== null}
        onClose={() => setFeedingScheduleDetail(null)}
      >
        <DialogTitle>Feeding Schedule Detail</DialogTitle>
        <DialogContent>
          <p>
            You may feed food for animal species based on description, groups
          </p>
          <p>
            <strong>Description:</strong> {feedingScheduleDetail?.description}
          </p>
          <p>
            <strong>Food Details: </strong>
          </p>
          <ul>
            <li>Food Quantity: {feedingScheduleDetail?.quantity}</li>
            <li>Food Name: {feedingScheduleDetail?.food.name}</li>
            <li>Import Date: {feedingScheduleDetail?.food.importDate}</li>
            <li>Description: {feedingScheduleDetail?.food.description}</li>
          </ul>
          <p>
            <strong>Animal Species: </strong>
            {feedingScheduleDetail?.species.groups}
          </p>
          {/* Render the detail component here */}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setFeedingScheduleDetail(null)}
            color="primary"
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {feedingSchedule ? UPDATE_SCHEDULE_TITLE : ADD_SCHEDULE_TITLE}
        </DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
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
                  id="quantity"
                  label="Quantity"
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="select-label-specie">Select Food</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  fullWidth
                  defaultValue={
                    !food
                      ? ""
                      : food?.foodId
                      ? food.foodId
                      : food
                  }
                  onChange={(e) => setSelectedFoodId(e.target.value)}
                >
                  {food?.map((food) => {
                    return (
                      <MenuItem
                        key={food.foodId}
                        value={food.foodId}
                      >
                        {food.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <InputLabel id="select-label-specie">Select Species</InputLabel>
                <Select
                  fullWidth
                  labelId="select-label-specie"
                  id="select-specie"
                  defaultValue={
                    !species
                      ? ""
                      : species?.speciesId
                      ? species.speciesId
                      : species
                  }
                  onChange={(e) => setSelectedSpeciesId(e.target.value)}
                >
                  {species?.map((species) => {
                    return (
                      <MenuItem
                        key={species.speciesId}
                        value={species.speciesId}
                      >
                        {species.groups}
                      </MenuItem>
                    );
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
          <Button
            onClick={feedingSchedule ? handleUpdateSave : handleAddSave}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper} sx={{ mt: "100px" }}>
        <DataTable
          columns={columns}
          data={feedingSchedules.map((item) => ({ ...item }))}
          title="Feeding Schedules"
          pagination
          keyField="feedScheduleId"
          paginationPerPage={5} // Number of rows per page
          paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
        />
        <Button onClick={handleOpenPopupAddAction} color="primary" fullWidth>
          Add
        </Button>
      </TableContainer>
    </Container>
  );
}
