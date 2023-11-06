import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CompleteOrder() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectStatus = queryParams.get("redirect_status");
  const orderID = queryParams.get("orderID");
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    if (orderID) {
      fetch(`http://localhost:8080/order/get-order/${orderID}`)
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
    <div className="App">
      {redirectStatus === "succeeded" ? (
        <div className="order-receipt">
          <h2>Order Receipt</h2>
          {orderData && (
            <p>
              <strong>Order ID:</strong> {orderData.orderID}
            </p>
            // Include other order details here
          )}
        </div>
      ) : (
        <div className="order-failure">
          <h2>Order Payment Failed</h2>
          {/* Display a message or take appropriate action */}
        </div>
      )}
    </div>
  );
}
