import { Container, Paper, TableContainer } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
export default function AnimalCage() {
  const [cages, setCages] = useState([]);
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
  useEffect(() => {
    fetch('http://localhost:8080/trainer/get-cage', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      }
    }).then(response => response.json()).then(data => {
      setCages(data);
    })
  }, []);

  const columns = [
    {
      id: 1,
      name: '#',
      selector: (cage, index) => {
        return (
          <p>{index + 1}</p>
        )
      }
    },
    {
      id: 2,
      name: 'Description',
      selector: cage => {
        return (
          <p>{cage.description}</p>
        )
      }
    },
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
      <TableContainer component={Paper} sx={{ mt: '100px' }}>
      <DataTable
        columns={columns}
        data={cages.map(item => ({
          ...item,
        }))}
        title="Zoo Cage"
        pagination
        keyField='cageId'
        paginationPerPage={5} // Number of rows per page
        paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
      />
      </TableContainer>
    </Container>
  )
}
