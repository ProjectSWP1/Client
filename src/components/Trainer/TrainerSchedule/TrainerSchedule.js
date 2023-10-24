import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import React, { useEffect, useState } from "react";
import { getItemWithTimeout } from "../../auth/setTimeOut";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
const TrainerSchedule = () => {
    const [schedules, setSchedules] = useState([]);
    const [open, setOpen] = useState(false);
    const [schedule, setSchedule] = useState(null);
    const handleDateClick = (info) => {
        const scheduleId = info.event.id;
        setOpen(true);
        const schedule = schedules.filter(s => {
            return s.trainerScheduleId == scheduleId;
        })[0];
        setSchedule(schedule);
    }

    useEffect(() => {
        const accessToken = getItemWithTimeout('token');
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
        }).then(employee => {
            fetch(`http://localhost:8080/staff/view-trainer-schedule?empId=${employee.empId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + accessToken,
                }
            }).then(response => {
                if (!response.ok) return [];
                return response.json();
            }).then(data => {
                setSchedules(data);
            })
        }).catch(error => {
            console.log(error);
        })
    }, [])

    return (
        <Container sx={{
            backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                    ? theme.palette.background.default
                    : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
            marginTop : 10
        }}>
            <FullCalendar
                plugins={[dayGridPlugin]}
                initialView="dayGridWeek"
                eventClick={handleDateClick}
                events={schedules.map((schedule) => {
                    return {
                        title: schedule.description,
                        date: schedule.workDay,
                        id: schedule.trainerScheduleId
                    }
                })}
            />
            <Dialog open={open} onClose={() => setOpen(false)} >
                <DialogTitle>Detail</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="species"
                                    label="species"
                                    value={schedule?.species?.groups ? schedule?.species?.groups : schedule?.species}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="description"
                                    label="Description"
                                    value={schedule?.description}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="date"
                                    label="date"
                                    value={schedule?.workDay}
                                />
                            </Grid>
                        </Grid>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default TrainerSchedule;