import * as React from 'react';
import Title from '../Title';
import { URL_FETCH_AZURE_SERVER } from '../../../config';
import DataTable, { createTheme } from 'react-data-table-component';
import { ListItem, TableContainer } from '@mui/material'
// // Generate Order Data

createTheme('solarized', {
  background: {
      default: '#f1f8e9'
  }
}, 'dark');

export default function Orders() {
  const [orders, setOrders] = React.useState([])

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";

  React.useEffect(() => {
    fetch(`${URL_FETCH_AZURE_SERVER}order/all`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        
      }
    }).then(response => {
      if (!response.ok) return [];
      return response.json();
    }).then(data => {
      const sortedOrders = data.sort(
        (a, b) => new Date(b.orderDate) - new Date(a.orderDate)
      )
      const successOrders = sortedOrders.filter((order) => {
        return order.orderPayments?.success
      })
      setOrders(successOrders);
    })
  }, [])

  const columns = [
    {
      id: 1,
      name: 'OrderID',
      width: '100px',
      selector: (order) => {
        return (
          <p>{order.orderID}</p>
        )
      }
    },
    {
      id: 2,
      name: 'Orderer',
      selector: (order) => {
        return (
          <p>{order.email}</p>
        )
      }
    },
    {
      id: 3,
      name: 'Visit Date',
      selector: (order) => {
        return (
          <p>{order.ticket.visitDate}</p>
        )
      }
    },
    {
      id: 4,
      name: 'Quantity',
      selector: (order) => {
        return (
          <p>Adult: {order.quantity - order.childrenQuantity} - Children: {order.childrenQuantity}</p>
        )
      }
    },
    {
      id: 5,
      name: 'Total',
      selector: (order) => {
        return (
          <p>{(order.quantity * order.ticket.ticketPrice).toLocaleString()} VND</p>
        )
      }
    }
  ]

  return (
    <React.Fragment>
      <ListItem style={{
        fontSize: '20px',
        fontWeight: 'bolder',
        color: 'green',
      }}>Recent Orders</ListItem>
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