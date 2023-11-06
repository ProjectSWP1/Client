import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  LinkAuthenticationElement
} from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm({orderData}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe) {
      return;
    }
  
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
  
    if (!clientSecret) {
      return;
    }
  
    stripe
      .retrievePaymentIntent(clientSecret)
      .then((response) => {
        if (response.status === 200 && response.headers.get('content-type')?.includes('application/json')) {
          return response.json(); // Parse the JSON response
        } else {
          throw new Error('Invalid response or content type');
        }
      })
      .then((data) => {
        // Handle the valid JSON response here
        switch (data.paymentIntent.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            // Fetch về confirmPayment rồi sau đó chuyển qua trang xuất hóa đơn
            // Xuất hóa đơn ở đây
            break;
          case "processing":
            setMessage("Your payment is processing.");
            break;
          case "requires_payment_method":
            setMessage("Your payment was not successful, please try again.");
            break;
          default:
            setMessage("Something went wrong.");
            break;
        }
      })
      .catch((error) => {
        // Handle errors gracefully
        console.error('Error handling JSON response:', error);
        setMessage("An unexpected error occurred.");
      });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const response = await stripe.confirmPayment({
      elements,
      confirmParams: {
       },
      redirect: 'if_required'
     });
     
     if(response.error) {
        setMessage("An unexpected error occurred. Your payment was not successful, please try again.");
     } else {

      // fetch confirm-payment here

        navigate(`/complete-order?orderID=${orderData.orderID}&redirect_status=succeeded`);
     }
     

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <div className="order-details">
      <h2>Order Details</h2>
      <p>
        <strong>Order ID:</strong> {orderData.orderID}
      </p>
      <p>
        <strong>Description:</strong> {orderData.description}
      </p>
      <p>
        <strong>Ticket Quantity:</strong> {orderData.quantity}
      </p>
      <p>
        <strong>Email:</strong> {orderData.email}
      </p>

      <form id="payment-form" onSubmit={handleSubmit}>
        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay now"
            )}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
    </div>
  );
}