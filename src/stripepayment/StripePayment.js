import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useLocation } from "react-router-dom";

import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51NyBn2FupeTxyP9y9poEP8oX5pPErTIvqmPpv3SeSXAFYOUVREsvnCRnmeQy7npxpR7SH3eRIQ4q14JTm5BHHtBK005HxUm2qZ"
);

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState("");
  const [intentId, setIntentId] = useState("");
  const location = useLocation();
  const userEmail = new URLSearchParams(location.search).get("userEmail");
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    // First, fetch the order by email to get the order ID
    fetch("http://localhost:8080/order/find-order-by-email/" + userEmail)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        const orderID = data.orderID;
        setOrderData(data);

        // After obtaining the orderID, make the second fetch request for clientSecret
        fetch("http://localhost:8080/user/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderID: orderID }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            setIntentId(data.intentId);
            setClientSecret(data.clientSecret);

            fetch(
              "http://localhost:8080/qrcode/generateAndDownloadQRCode/350/350",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ orderID }), // Include the orderID in the request body
              }
            )
              .then((res) => {
                if (!res.ok) {
                  throw new Error(`HTTP error! Status: ${res.status}`);
                }
              })
              .catch((error) => {
                console.error("Error fetching and creating QR code:", error);
              });
          })
          .catch((error) => {
            console.error("Error fetching clientSecret:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching order by email:", error);
      });
  }, [userEmail]);

  const appearance = {
    theme: "stripe",
    labels: "floating",
    variables: {
      colorPrimary: "#0570de",
      colorBackground: "#ffffff",
      colorText: "#30313d",
      colorDanger: "#df1b41",
      fontFamily: "Ideal Sans, system-ui, sans-serif",
      spacingUnit: "2px",
      borderRadius: "4px",
    },
    rules: {
      ".Tab": {
        border: "1px solid #E0E6EB",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
      },

      ".Tab:hover": {
        color: "var(--colorText)",
      },

      ".Tab--selected": {
        borderColor: "#E0E6EB",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)",
      },

      ".Input--invalid": {
        boxShadow:
          "0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)",
      },
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {<CheckoutForm orderData={orderData} intentID={intentId} />}
        </Elements>
      )}
    </div>
  );
}
