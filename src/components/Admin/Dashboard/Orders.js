import * as React from 'react';
import { URL_FETCH_AZURE_SERVER } from '../../../config';
import DataTable, { createTheme } from 'react-data-table-component';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, TableContainer } from '@mui/material'
import DiscountIcon from '@mui/icons-material/Discount';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

createTheme('solarized', {
  background: {
    default: '#f1f8e9'
  }
}, 'dark');

export default function Orders() {
  const [orders, setOrders] = React.useState([])
  const [vouchers, setVouchers] = React.useState([])
  const [selectedOrder, setSelectedOrder] = React.useState(null);
  const [isOrderDetailsModalOpen, setOrderDetailsModalOpen] = React.useState(false);

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
      console.log(successOrders);
    })

    fetch(`${URL_FETCH_AZURE_SERVER}user/get-all-voucher`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    }).then(response => {
      if (!response.ok) return [];
      return response.json();
    }).then(data => {
      setVouchers(data);
    })
  }, [])

  const handleCloseOrderDetailsModal = () => {
    setOrderDetailsModalOpen(false);
  };

  const viewOrderDetails = (orderID) => {
    fetchOrderDetails(orderID);
    setOrderDetailsModalOpen(true);
  };
  const fetchOrderDetails = (orderID) => {
    fetch(`${URL_FETCH_AZURE_SERVER}order/get-order/${orderID}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch order details");
        }
        return response.json();
      })
      .then((data) => {
        setSelectedOrder(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // Define the OrderDetailsModal component
  const OrderDetailsModal = ({ order, open, onClose }) => {
    return (
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <div style={{ display: "flex", alignItems: "center" }}>
          <CheckCircleIcon
            style={{ marginTop: "10px", marginLeft: "30px", fontSize: "30px", color: "green" }}
          />
          <DialogTitle
            style={{
              fontFamily: "Trebuchet MS, sans-serif",
              fontSize: "25px",
              marginTop: "10px",
              fontWeight: "bold",
              color: "green"
            }}
          >
            Order Details
          </DialogTitle>
        </div>
        <h6 style={{ marginLeft: "30px" }}>Customer: {order?.email ? order.email : null}</h6>
        <DialogContent>
          {order && (
            <div>
              <hr />
              <p><strong>Order ID:</strong> {order.orderID}</p>
              <p><strong>Ticket:</strong></p>
              <ul>
                <p><strong>Adult Ticket Amount:</strong> {order.quantity} = {(order.ticket.ticketPrice * order.quantity).toLocaleString()} VND</p>
                <p><strong>Children Ticket Amount:</strong> {order.childrenQuantity} = {(order.ticket.childrenTicketPrice * order.childrenQuantity).toLocaleString()} VND</p>
              </ul>
              <p><strong>Order Date:</strong> {order.orderDate}</p>
              <p><strong>Date of visit: </strong> {order.ticket.visitDate}</p>
              <p>
                <DiscountIcon />{" "}
                <strong>Discount:</strong>{" "}
                {order.orderVoucher?.coupon ? order.orderVoucher.coupon * 100 + "%" : "You didn't apply discount for this payment"}
              </p>
              <p>
                <strong>Total price paid:</strong>{" "}
                {order.orderVoucher?.coupon
                  ? `${(
                    (order.quantity * order.ticket.ticketPrice +
                      order.childrenQuantity *
                      order.ticket.childrenTicketPrice) *
                    (1 - order.orderVoucher.coupon)
                  ).toLocaleString()} VND`
                  : `${(
                    order.quantity * order.ticket.ticketPrice +
                    order.childrenQuantity * order.ticket.childrenTicketPrice
                  ).toLocaleString()} VND`}
              </p>
              <hr />
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

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
      name: 'Customer',
      selector: (order) => {
        return (
          <p>{order.email}</p>
        )
      }
    },
    {
      id: 3,
      name: 'Order Date',
      selector: (order) => {
        return (
          <p>{order.orderDate}</p>
        )
      }
    },
    {
      id: 4,
      name: 'Total',
      selector: (order) => {
        return (
          <p>
            {order.orderVoucher ?
              order.orderVoucher.coupon ?
                `${(
                  (order.quantity * order.ticket.ticketPrice +
                    order.childrenQuantity *
                    order.ticket.childrenTicketPrice) *
                  (1 - order.orderVoucher.coupon)
                ).toLocaleString()} VND` :
                `${(
                  (order.quantity * order.ticket.ticketPrice +
                    order.childrenQuantity *
                    order.ticket.childrenTicketPrice) *
                  (1 - (vouchers.find(item => item.voucherId === order.orderVoucher)?.coupon))
                ).toLocaleString()} VND`
              : `${(
                order.quantity * order.ticket.ticketPrice +
                order.childrenQuantity * order.ticket.childrenTicketPrice
              ).toLocaleString()} VND`}
          </p>
        )
      }
    },
    {
      id: 6,
      name: "View Details",
      selector: (order) => {
        return (
          <Button onClick={() => viewOrderDetails(order.orderID)}>
            View Details
          </Button>
        );
      },
    },
  ]

  return (
    <React.Fragment>
      <OrderDetailsModal
        order={selectedOrder}
        open={isOrderDetailsModalOpen}
        onClose={handleCloseOrderDetailsModal}
      />
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