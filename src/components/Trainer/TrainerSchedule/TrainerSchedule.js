import FullCalendar from "@fullcalendar/react";

import dayGridPlugin from '@fullcalendar/daygrid';
import React, { useEffect, useState } from "react";
import { getItemWithTimeout } from "../../auth/setTimeOut";
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from "@mui/material";
import { URL_FETCH_AZURE_SERVER } from "../../../config";
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
        fetch(`${URL_FETCH_AZURE_SERVER}trainer/get-employee-by/${email}`, {
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
            fetch(`${URL_FETCH_AZURE_SERVER}staff/view-trainer-schedule?empId=${employee.empId}`, {
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
                        id: schedule.trainerScheduleId,
                        color: schedule?.shift == 1 ? '#3995b1' : '#255645',
                    }
                })}
            />
            <Dialog open={open} onClose={() => setOpen(false)} >
                <DialogTitle>Job Schedule Detail</DialogTitle>
                <DialogContent>
                    <Box component="form" noValidate sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="species"
                                    label="Species"
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
                                    label="Date"
                                    value={schedule?.workDay}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="shift"
                                    label="Shift"
                                    value={schedule?.shift == 1 ? "7:00 AM - 12:00 PM" : "12:30 PM - 5:30 PM"}
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