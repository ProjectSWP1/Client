import React from 'react';
import { Paper, Typography } from '@mui/material';

const AnimalDetail = ({ animalDetail }) => {

    return (
        <Paper sx={{
            padding: "10px",
        }}>
            <Typography variant="h6">Animal Details</Typography>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1">Name: {animalDetail?.name}</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1">Age: {animalDetail?.age}</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1">Gender: {animalDetail?.gender}</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1">Description: {animalDetail?.description}</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1">Height: {animalDetail?.height} cm</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1">Weight: {animalDetail?.weight} kg</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1">Cage : {animalDetail?.cage?.cageID}</Typography>
            </div>

            <div className={{
                marginBottom: "10px",
            }}>
                <Typography variant="subtitle1">Species : {animalDetail?.species?.name}</Typography>
            </div>
        </Paper>
    );
};

export default AnimalDetail;