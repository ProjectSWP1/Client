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
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import Swal from 'sweetalert2';
import { URL_FETCH_AZURE_SERVER } from '../../../config';

export default function FeedingSchedule() {
  const [feedingSchedules, setFeedingSchedules] = useState([]);
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [foodId, setFoodId] = useState(null);
  const [speciesId, setSpeciesId] = useState(null);

  const [open, setOpen] = useState(false);
  const [feedingScheduleDetail, setFeedingScheduleDetail] = useState(null);
  const [feedingSchedule, setFeedingSchedule] = useState(null);

  const ADD_SCHEDULE_TITLE = 'Add Feeding Schedule';
  const UPDATE_SCHEDULE_TITLE = 'Update Feeding Schedule';

  const token = localStorage.getItem('token')
    ? JSON.parse(localStorage.getItem('token')).value
    : '';

  useEffect(() => {
    fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-all-feedingSchedule`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      },
    })
      .then((response) => {
        if (!response.ok) return { feedingSchedules: [] };
        return response.json();
      })
      .then((data) => {
        setFeedingSchedules(data);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenPopupDetail = (id) => {
    fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-feedingSchedule/${id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
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
    setFoodId(scheduleById.food.foodId);
    setSpeciesId(scheduleById.species.speciesId);
  };

  const handleOpenPopupAddAction = () => {
    setFeedingSchedule(null);
    setOpen(true);
    setDescription('');
    setQuantity(0);
    setFoodId(null);
    setSpeciesId(null);
  };

  const handleAddSave = () => {
    const scheduleDto = {
      description: description,
      quantity: quantity,
      foodId: foodId,
      speciesId: speciesId,
    };
    fetch(`${URL_FETCH_AZURE_SERVER}trainer/add-feedingSchedule`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
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
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            setFeedingSchedules(data);
            Swal.fire({
              title: 'Success!',
              text: 'Add Successfully',
              icon: 'success',
            });
          });
      })
      .catch((error) => {
        setOpen(false);
        Swal.fire({
          title: 'Fail!',
          text: `${error.message}`,
          icon: 'error',
        });
      });
  };

  const handleUpdateSave = () => {
    const scheduleDto = {
      feedScheduleId: feedingSchedule.feedScheduleId,
      description: description,
      quantity: quantity,
      foodId: foodId,
      speciesId: speciesId,
    };
    fetch(`${URL_FETCH_AZURE_SERVER}trainer/update-feedingSchedule`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
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
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-feedingSchedule/${scheduleDto.feedScheduleId}`, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
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
              title: 'Success!',
              text: 'Update Successfully',
              icon: 'success',
            });
          });
      })
      .catch((error) => {
        setOpen(false);
        Swal.fire({
          title: 'Fail!',
          text: `${error.message}`,
          icon: 'error',
        });
      });
  };

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
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/remove-feedingSchedule/${id}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
          .then((response) => {
            if (!response.ok) {
              return response.text().then((message) => {
                throw new Error(message);
              });
            }
            Swal.fire({
              title: 'Success!',
              text: 'Delete Successfully',
              icon: 'success',
            });
            setFeedingSchedules((schedules) => {
              return schedules.filter((schedule) => schedule.feedScheduleId !== id);
            });
          })
          .catch((error) => {
            Swal.fire({
              title: 'Fail!',
              text: `${error.message}`,
              icon: 'error',
            });
          });
      }
    });
  };

  const columns = [
    {
      name: '#',
      selector: (schedule, index) => <p>{index + 1}</p>,
    },
    {
      name: 'Description',
      selector: (schedule) => <p>{schedule.description}</p>,
    },
    {
      name: 'Quantity',
      selector: (schedule) => <p>{schedule.quantity}</p>,
    },
    {
      name: 'Actions',
      selector: (schedule) => (
        <div>
          <Button variant="contained" onClick={() => handleDeleteAction(schedule.feedScheduleId)}>
            Delete
          </Button>
          <Button variant="contained" onClick={() => handleOpenPopupUpdateAction(schedule.feedScheduleId)}>
            Update
          </Button>
          <Button variant="contained" onClick={() => handleOpenPopupDetail(schedule.feedScheduleId)}>
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
          theme.palette.mode === 'light' ? theme.palette.background.default : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
      }}
    >
      <Dialog open={feedingScheduleDetail !== null} onClose={() => setFeedingScheduleDetail(null)}>
        <DialogTitle>Detail</DialogTitle>
        <DialogContent>{/* Render the detail component here */}</DialogContent>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{feedingSchedule ? UPDATE_SCHEDULE_TITLE : ADD_SCHEDULE_TITLE}</DialogTitle>
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
                <TextField
                  required
                  fullWidth
                  id="foodId"
                  label="Food ID"
                  type="number"
                  value={foodId}
                  onChange={(e) => setFoodId(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="speciesId"
                  label="Species ID"
                  type="number"
                  value={speciesId}
                  onChange={(e) => setSpeciesId(e.target.value)}
                />
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
      <TableContainer component={Paper} sx={{ mt: '100px' }}>
        <DataTable
          columns={columns}
          data={feedingSchedules.map((item) => ({ ...item }))}
          title="Feeding Schedules"
          pagination
          keyField="feedScheduleId"
          paginationPerPage={5} // Number of rows per page
          paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
        />
        <Button
          onClick={handleOpenPopupAddAction}
          color="primary"
          fullWidth
        >
          Add
        </Button>
      </TableContainer>
    </Container>
  );
}
