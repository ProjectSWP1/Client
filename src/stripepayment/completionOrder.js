import { TextField, ThemeProvider, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import './completionOrder.css'
import { defaultTheme } from "../components/Theme/Theme";
import PaidIcon from '@mui/icons-material/Paid';
import HomeIcon from '@mui/icons-material/Home';
import ReviewsIcon from '@mui/icons-material/Reviews';

export default function CompleteOrder() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectStatus = queryParams.get("redirect_status");
  const orderID = queryParams.get("orderID");
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    if (orderID) {
      fetch(`https://zookay.azurewebsites.net/order/get-order/${orderID}`)
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
          <div className="order-receipt" style={{backgroundImage: 'url(./assets/images/crocodile.jpg)',
          backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', height: '800px'}}>
            {/* <h2>Order Receipt</h2> */}
            {orderData && (
              // <p>
              //   <strong>Order ID:</strong> {orderData.orderID}
              // </p>
              // Include other order details here

              <div className="completed-order-container" >
                <div className="completed-order-thank-you">
                  <div className="completed-order-thank-you-header">
                    <Typography style={{ fontWeight: '700', fontSize: '50px' }}>THANK YOU!</Typography>
                    <Typography variant="body1">{orderData.email}</Typography>
                  </div>
                  <TextField
                    id="outlined-read-only-input"
                    label={<p style={{ fontWeight: '1000', fontSize: '35px', marginLeft: '30px', marginTop: '1px', padding: '0' }}>Order Updates</p>}
                    defaultValue="You will receive email of your orders, please check your email box"
                    InputProps={{
                      readOnly: true,
                      style: { padding: '50px 40px 40px' }
                    }}
                    multiline
                    rows={2}
                    fullWidth
                    style={{ margin: '0 30px', width: '90%' }}
                  />
                  <div className="completed-order-thank-you-body">
                    <Link to='/' className="completed-order-thank-you-btn"> <HomeIcon className="completed-order-thank-you-icon" style={{marginRight: '10px'}}/>Go back to Main Page</Link>
                    <Link className="completed-order-thank-you-btn"><ReviewsIcon className="completed-order-thank-you-icon" style={{marginRight: '10px'}}/>View Order History</Link>
                  </div>
                  <div className="completed-order-thank-you-footer">
                    <Link className="social-btn">Any problems? Contact Us on Social Media</Link>
                    <div className="thank-you-img">
                      <img src="assets/images/zookay2.png" />
                    </div>
                  </div>
                </div>

                <div className="completed-order-your-order">
                  <Typography style={{ fontWeight: '700', fontSize: '40px', textAlign: 'center', paddingTop: '0' }}>Your Order</Typography>
                  <div style={{ padding: '40px 0' }}>
                    <Typography variant="body1">Your Visit Date: {orderData.ticket.visitDate}</Typography>
                    <Typography variant="body1">Ticker Quantity (1 ticket/person): {orderData.quantity}</Typography>
                  </div>
                  <div style={{ paddingBottom: '40px' }}>
                    {/* <Typography variant="body1">Adult Ticket: </Typography>
                    <Typography variant="body1">Children Ticket: </Typography> */}
                  </div>
                  <div style={{ borderTop: '4px solid black', marginBottom: '40px' }}></div>
                  <div style={{marginBottom: '10px'}}>
                    {/* <Typography variant="body1">Subtotal: </Typography>
                    <Typography variant="body1">Voucher Discount: </Typography> */}
                  </div>
                  <div style={{marginBottom: '270px'}}>
                  <Typography style={{fontSize: '30px'}}>Total Price: {orderData.quantity * orderData.ticket.ticketPrice} VND</Typography>
                  <Typography variant="body1" style={{color: 'darkgreen'}}><PaidIcon/></Typography>
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
    </ThemeProvider>
  );
}
