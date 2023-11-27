import { TextField, ThemeProvider, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./completionOrder.css";
import { defaultTheme } from "../components/Theme/Theme";
import PaidIcon from "@mui/icons-material/Paid";
import HomeIcon from "@mui/icons-material/Home";
import ReviewsIcon from "@mui/icons-material/Reviews";
import { URL_FETCH_AZURE_SERVER } from "../config.js";
import DiscountIcon from '@mui/icons-material/Discount';
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function CompleteOrder() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectStatus = queryParams.get("redirect_status");
  const orderID = queryParams.get("orderID");
  const [orderData, setOrderData] = useState(null);
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";

  // Calculate the discounted total based on the coupon
  const calculateDiscountedTotal = () => {
    const ticketPrice = orderData.ticket.ticketPrice || 0;
    const quantity = orderData.quantity || 0;
    const coupon = orderData.orderVoucher ? orderData.orderVoucher.coupon : 0;

    const childrenTicketPrice = orderData.ticket.childrenTicketPrice;
    const childrenQuantity = orderData.childrenQuantity;
    // Calculate the total amount without discount
    const totalAmountWithoutDiscount =
      ticketPrice * quantity + childrenTicketPrice * childrenQuantity;

    // Calculate the discounted total
    const discountedTotal =
      totalAmountWithoutDiscount - totalAmountWithoutDiscount * coupon;

    return discountedTotal;
  };

  useEffect(() => {
    if (orderID) {
      fetch(`${URL_FETCH_AZURE_SERVER}order/get-order/${orderID}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setOrderData(data);
        })
        .catch((error) => {
          console.error("Error fetching order by orderID:", error);
        });
    }
  }, [orderID]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <div className="App">
        {redirectStatus === "succeeded" ? (
          <div
            className="order-receipt"
            style={{
              backgroundImage: "url(./assets/images/crocodile.jpg)",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              height: "auto",
            }}
          >
            {/* <h2>Order Receipt</h2> */}
            {orderData && (
              // <p>
              //   <strong>Order ID:</strong> {orderData.orderID}
              // </p>
              // Include other order details here

              <div className="completed-order-container">
                <div className="completed-order-thank-you">
                  <div className="completed-order-thank-you-header">
                    <Typography style={{ fontWeight: "700", fontSize: "50px" }}>
                      THANK YOU!
                    </Typography>
                    <Typography variant="body1">{orderData.email}</Typography>
                  </div>
                  <TextField
                    id="outlined-read-only-input"
                    label={
                      <p
                        style={{
                          fontWeight: "1000",
                          fontSize: "35px",
                          marginLeft: "30px",
                          marginTop: "1px",
                          padding: "0",
                        }}
                      >
                        Order Updates
                      </p>
                    }
                    defaultValue="You will receive email of your orders, please check your email box"
                    InputProps={{
                      readOnly: true,
                      style: { padding: "50px 40px 40px" },
                    }}
                    multiline
                    rows={2}
                    fullWidth
                    style={{ margin: "0 30px", width: "90%" }}
                  />
                  <div className="completed-order-thank-you-body">
                    <Link to="/" className="completed-order-thank-you-btn">
                      {" "}
                      <HomeIcon
                        className="completed-order-thank-you-icon"
                        style={{ marginRight: "10px" }}
                      />
                      Go back to Main Page
                    </Link>
                    {
                      token ? <Link to="/your-orders" className="completed-order-thank-you-btn">
                        <ReviewsIcon
                          className="completed-order-thank-you-icon"
                          style={{ marginRight: "10px" }}
                        />
                        View Order History
                      </Link>
                        : ""
                    }
                  </div>
                  <div className="completed-order-thank-you-footer">
                    <Link className="social-btn">
                      Any problems? Contact Us on Social Media
                    </Link>
                    <div className="thank-you-img">
                      <img src="assets/images/zookay2.png" />
                    </div>
                  </div>
                </div>

                <div className="completed-order-your-order">
                  <Typography
                    style={{
                      fontWeight: "700",
                      fontSize: "40px",
                      textAlign: "center",
                      paddingTop: "0",
                    }}
                  >
                    Your Order
                  </Typography>
                  <div style={{ marginBottom: "10px" }}>
                    <hr />
                    <p><strong>Order ID:</strong> {orderData.orderID}</p>
                    <p><strong>Ticket:</strong></p>
                    <ul>
                      <p><strong>Adult Ticket Amount:</strong> {orderData.quantity} = {(orderData.ticket.ticketPrice * orderData.quantity).toLocaleString()} VND</p>
                      <p><strong>Children Ticket Amount:</strong> {orderData.childrenQuantity} = {(orderData.ticket.childrenTicketPrice * orderData.childrenQuantity).toLocaleString()} VND</p>
                    </ul>
                    <p><strong>Order Date:</strong> {orderData.orderDate}</p>
                    <p><strong>Date of visit: </strong> {orderData.ticket.visitDate}</p>
                    <p>
                      <DiscountIcon />{" "}
                      <strong>Discount:</strong>{" "}
                      {orderData.orderVoucher?.coupon ? orderData.orderVoucher.coupon * 100 + "%" : "You didn't apply discount for this payment"}
                    </p>
                  </div>
                  {/* <div style={{ paddingBottom: "40px" }}>
                    <Typography variant="body1">
                      Adult Ticket: {orderData.quantity}{" "}
                    </Typography>
                    <Typography variant="body1">
                      Children Ticket: {orderData.childrenQuantity}
                    </Typography>
                  </div> */}
                  <div style={{ marginBottom: "10px" }}>
                    {/* <Typography variant="body1">
                      Subtotal:{" "}
                      {(orderData.quantity * orderData.ticket.ticketPrice +
                        orderData.childrenQuantity * orderData.ticket.childrenTicketPrice).toLocaleString()}{" "}
                      VND
                    </Typography> */}

                  </div>
                  <div
                    style={{
                      borderTop: "4px solid black",
                      marginBottom: "40px",
                    }}
                  ></div>
                  <div style={{ marginBottom: "200px" }}>
                    {/* <Typography style={{ fontSize: "30px" }}>
                      Total Price: {calculateDiscountedTotal().toLocaleString()} VND
                    </Typography> */}
                    <Typography variant="body1" style={{ color: "darkgreen" }}>
                      <PaidIcon /> <strong>Total price paid:</strong>{" "}
                    </Typography>
                    <Typography variant="h4" textAlign={'end'}>
                      {orderData.orderVoucher?.coupon
                        ? `${(
                          (orderData.quantity * orderData.ticket.ticketPrice +
                            orderData.childrenQuantity *
                            orderData.ticket.childrenTicketPrice) *
                          (1 - orderData.orderVoucher.coupon)
                        ).toLocaleString()} VND`
                        : `${(
                          orderData.quantity * orderData.ticket.ticketPrice +
                          orderData.childrenQuantity * orderData.ticket.childrenTicketPrice
                        ).toLocaleString()} VND`}
                    </Typography>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="order-failure">
            <h2>Order Payment Failed</h2>
            {/* Display a message or take appropriate action */}
          </div>
        )}
      </div>
    </ThemeProvider >
  );
}
