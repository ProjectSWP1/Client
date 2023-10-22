import { Container, Paper, TableContainer } from '@mui/material';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component'
export default function ZooArea() {
  const [zooAreas, setZooAreas] = useState([]);
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
  useEffect(() => {
    fetch('http://localhost:8080/trainer/get-zoo-area', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      }
    }).then(response => {
      if(!response.ok) return [];
      return response.json();
    }).then(data => {
      setZooAreas(data);
    })
  }, []);

  const columns = [
    {
      id: 1,
      name: 'ID',
      selector: (zooArea, index) => {
        return (
          <p>{zooArea.zooAreaId}</p>
        )
      }
    },
    {
      id: 2,
      name: 'Description',
      selector: zooArea => {
        return (
          <p>{zooArea.description}</p>
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
        data={zooAreas.map(item => ({
          ...item,
        }))}
        title="Zoo Area"
        pagination
        
        keyField='zooAreaId'
        paginationPerPage={5} // Number of rows per page
        paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
      />
      </TableContainer>
    </Container>
  )
}
