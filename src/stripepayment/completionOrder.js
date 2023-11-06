import React from "react";
import { useLocation } from "react-router-dom";

export default function CompleteOrder() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectStatus = queryParams.get("redirect-status");
  const orderDataParam = queryParams.get("orderData");
  const orderData = orderDataParam ? JSON.parse(decodeURIComponent(orderDataParam)) : null;

  return (
    <div className="App">
      {redirectStatus === "succeed" ? (
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
