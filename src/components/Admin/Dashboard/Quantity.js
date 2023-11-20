import React, { useEffect } from 'react'
import { URL_FETCH_AZURE_SERVER } from '../../../config';
import { Grid, ListItem, Paper } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PetsIcon from '@mui/icons-material/Pets';
import CalendarViewWeekIcon from '@mui/icons-material/CalendarViewWeek';

export default function Quantity() {
    const [numOfEmp, setNumOfEmp] = React.useState(0)
    const [numOfAnimals, setNumOfAnimals] = React.useState(0)
    const [numOfZooArea, setNumOfZooArea] = React.useState(0)

    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
    useEffect(() => {
        fetch(`${URL_FETCH_AZURE_SERVER}dashboard/employees`, {
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
            setNumOfEmp(data);
        })

        fetch(`${URL_FETCH_AZURE_SERVER}dashboard/animals`, {
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
            setNumOfAnimals(data);
        })

        fetch(`${URL_FETCH_AZURE_SERVER}dashboard/zoo-areas`, {
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
            setNumOfZooArea(data);
        })
    }, [])
    return (
        <React.Fragment>
            <Grid container spacing={6}>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <ListItem
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bolder',
                                    color: 'green',
                                }}>Employees</ListItem>
                            <ListItem style={{
                                fontSize: '25px',
                                fontWeight: 'bolder'
                            }}>{numOfEmp}</ListItem>
                        </div>
                        <div style={{ paddingRight: '20px' }}><AssignmentIndIcon sx={{ fontSize: '40px' }} /></div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <ListItem
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bolder',
                                    color: 'green',
                                }}>Animals</ListItem>
                            <ListItem style={{
                                fontSize: '25px',
                                fontWeight: 'bolder'
                            }}>{numOfAnimals}</ListItem>
                        </div>
                        <div style={{ paddingRight: '20px' }}><PetsIcon sx={{ fontSize: '40px' }} /></div>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>
                    <Paper style={{
                        display: 'flex',
                        flexWrap: 'nowrap',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div>
                            <ListItem
                                style={{
                                    fontSize: '20px',
                                    fontWeight: 'bolder',
                                    color: 'green',
                                }}>Zoo Areas</ListItem>
                            <ListItem style={{
                                fontSize: '25px',
                                fontWeight: 'bolder'
                            }}>{numOfZooArea}</ListItem>
                        </div>
                        <div style={{ paddingRight: '20px' }}><CalendarViewWeekIcon sx={{ fontSize: '40px' }} /></div>
                    </Paper>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}
