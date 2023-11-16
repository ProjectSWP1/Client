import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from '../Title';
import { Box, Grid, ListItem } from '@mui/material';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import { URL_FETCH_AZURE_SERVER } from '../../../config';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [total, setTotal] = React.useState(0)
  const [numOfEmp, setNumOfEmp] = React.useState(0)
  const [numOfAnimals, setNumOfAnimals] = React.useState(0)
  const [numOfZooArea, setNumOfZooArea] = React.useState(0)

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";

  React.useEffect(() => {
    fetch(`${URL_FETCH_AZURE_SERVER}dashboard/total-price`, {
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
      setTotal(data);
    })

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
      <Title>Recent Deposits</Title>
      {total? <Typography component="p" variant="h4">
        {total} VND
      </Typography> : ''}
      {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
      {/* <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={4} display={'flex'}
        alignItems={'center'}>
          <div style={{
            boxShadow: 'inherit'
          }}>
          <ListItem><AssignmentIndIcon/>  Employees</ListItem>
          <ListItem>{numOfEmp}</ListItem>
          </div>
        </Grid>
        <Grid item xs={12} md={4} lg={4} display={'flex'}
        alignItems={'center'}>
          <ListItem>Animals</ListItem>
          <ListItem>{numOfAnimals}</ListItem>
        </Grid>
        <Grid item xs={12} md={4} lg={4} display={'flex'}
        alignItems={'center'}>
        <ListItem>Zoo Areas</ListItem>
          <ListItem>{numOfZooArea}</ListItem>
        </Grid>                         
      </Grid> */}
    </React.Fragment>
  );
}