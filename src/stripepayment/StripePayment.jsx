import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe("pk_test_51NyBn2FupeTxyP9y9poEP8oX5pPErTIvqmPpv3SeSXAFYOUVREsvnCRnmeQy7npxpR7SH3eRIQ4q14JTm5BHHtBK005HxUm2qZ");

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState("");

  // Chỗ này nên đi tìm orderID bằng email mà orderID lớn nhất hoặc mới nhất bằng orderDate hoặc số (BE chưa có)
  // fetch về 1 hàm bên user controller
  // chỗ này

  useEffect(() => {
    fetch("http://localhost:8080/user/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //body: JSON.stringify({ orderID: 13 }), // Include the order ID in the request body
    })
      .then((res) => {
        if (!res.ok) {
          // Check if the response status is not OK (e.g., 4xx or 5xx)
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setClientSecret(data.clientSecret)
        console.log(data.clientSecret)
      })
      .catch((error) => {
        // Handle errors, e.g., display an error message to the user
        {<div><h1>Something wrong! Please contact Admin or Staff to support</h1></div>}
      });
  }, []);
  

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {/* <CheckoutForm orderID={orderID} /> */}
        </Elements>
      )}
    </div>
  );
}