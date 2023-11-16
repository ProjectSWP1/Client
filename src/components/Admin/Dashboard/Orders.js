import * as React from 'react';
import Title from '../Title';
import { URL_FETCH_AZURE_SERVER } from '../../../config';
import DataTable, { createTheme } from 'react-data-table-component';
import { TableContainer } from '@mui/material'
// // Generate Order Data

createTheme('solarized', {
  background: {
      // default: 'rgb(239, 240, 223)',
      default: '#1b5e20'
  }
}, 'dark');

// function createData(id, date, name, shipTo, paymentMethod, amount) {
//   return { id, date, name, shipTo, paymentMethod, amount };
// }

// const rows = [
//   createData(
//     0,
//     '16 Mar, 2019',
//     'Elvis Presley',
//     'Tupelo, MS',
//     'VISA ⠀•••• 3719',
//     312.44,
//   ),
//   createData(
//     1,
//     '16 Mar, 2019',
//     'Paul McCartney',
//     'London, UK',
//     'VISA ⠀•••• 2574',
//     866.99,
//   ),
//   createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
//   createData(
//     3,
//     '16 Mar, 2019',
//     'Michael Jackson',
//     'Gary, IN',
//     'AMEX ⠀•••• 2000',
//     654.39,
//   ),
//   createData(
//     4,
//     '15 Mar, 2019',
//     'Bruce Springsteen',
//     'Long Branch, NJ',
//     'VISA ⠀•••• 5919',
//     212.79,
//   ),
// ];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [orders, setOrders] = React.useState([])

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";

  React.useEffect(() => {
    fetch(`${URL_FETCH_AZURE_SERVER}order/get-all-order`, {
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
      setOrders(data);
    })
  })

  const columns = [
    {
      id: 1,
      name: 'OrderID',
      selector: (order) => {
        return (
          <p>{order.orderID}</p>
        )
      }
    },
    {
      id: 2,
      name: 'TicketID',
      selector: (order) => {
        return (
          <p>{order.ticket.ticketId}</p>
        )
      }
    },
    {
      id: 3,
      name: 'Status',
      selector: (order) => {
        return (
          <p>{order.orderPayments?.success ? "Finished" : "Order has been cancel"}</p>
        )
      }
    },
    {
      id: 4,
      name: 'Total',
      selector: (order) => {
        return (
          <p>{order.quantity * order.ticket.ticketPrice} VND</p>
        )
      }
    }
  ]

  return (
    <React.Fragment>
      <Title>Recent Orders</Title>
      <TableContainer>
        <DataTable
          theme='solarized'
          columns={columns}
          data={orders.map(item => ({
            ...item,
          }))}
          pagination
          keyField='orderID'
          paginationPerPage={5} // Number of rows per page
          paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
        />
      </TableContainer>
    </React.Fragment>
  );
}