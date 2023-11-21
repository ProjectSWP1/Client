import React from 'react';
import { Paper, Typography } from '@mui/material';

const AnimalDetail = ({ animalDetail }) => {

    return (
        <Paper sx={{
            padding: "10px",
        }}>
            <Typography style={{
                fontSize: '30px',
                fontWeight: 'bolder',
                color: 'green',
            }}>Animal Details</Typography>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1"><b>Name:</b> {animalDetail?.name}</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1"><b>Age:</b> {animalDetail?.age}</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1"><b>Gender:</b> {animalDetail?.gender}</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1"><b>Description:</b> {animalDetail?.description}</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1"><b>Height:</b> {animalDetail?.height} m</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1"><b>Weight:</b> {animalDetail?.weight} kg</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1">Cage : {animalDetail?.cage?.cageID} - {animalDetail?.cage?.description}</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1">Species : {animalDetail?.species?.groups}</Typography>
            </div>
        </Paper>
    );
};

export default AnimalDetail;