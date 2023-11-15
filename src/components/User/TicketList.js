import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router';
import { URL_FETCH_AZURE_SERVER } from '../../../config';
import "bootstrap/dist/css/bootstrap.min.css";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // State to store the total price
  const [userEmail, setUserEmail] = useState(null);
  const [_phoneNumber, set_PhoneNumber] = useState(null);
  const navigate = useNavigate();

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      const decodedToken = atob(accessToken.split(".")[1]);
      const tokenData = JSON.parse(decodedToken);
      setUserEmail(tokenData.email);
      
      // Call the function to fetch the member by email
      getMemberByEmail(tokenData.email);
    }
  }, []);
  

  useEffect(() => {
    axios
      .get("https://zookay.azurewebsites.net/user/get-ticket")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []
  );

  const getMemberByEmail = (email) => {
    axios
      .get(`https://zookay.azurewebsites.net/get-member-by-email/${email}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      })
      .then((response) => {
        // Handle the response data here
        console.log("Member data:", response.data);
        // You can set the phoneNumber state or use the data as needed.
        set_PhoneNumber(response.data.phoneNumber); 
      })
      .catch((error) => {
        console.error("Error fetching member:", error);
        // Handle the error or show an error message
      });
  };  

  const openOrderModal = () => {
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleBuyTicket = (ticketId) => {
    setSelectedTicketId(ticketId); // Set the selected ticket ID
    openOrderModal();
  };

  const handleOrderSubmit = () => {
    if (!userEmail || !_phoneNumber) {
      // Handle the case where the user's email or phone number is not available
      console.error("User email or phone number not available");
      return;
    }
  
    if (selectedQuantity <= 0) {
      // Handle the case where the selected quantity is not valid
      console.error("Selected quantity is not valid");
      return;
    }
  
    // Prepare the order data
    const orderData = {
      ticketId: selectedTicketId,
      ticketQuantity: selectedQuantity,
      email: userEmail,
      phoneNumber: _phoneNumber,
    };
  
    // Send a POST request to create the order
    axios
      .post(`${URL_FETCH_AZURE_SERVER}order/create-order?token=${token}`, orderData, {
       
      })
      .then((response) => {
        // Handle the response data accordingly
        if (response.status === 201) {
          // Order was created successfully
          // You can navigate to the ConfirmOrders page or show a success message
          console.log("Order created successfully:", response.data);
          // You can navigate to the ConfirmOrders page here
          navigate('/payment', { userEmail });
        } else {
          // Handle an error or show an error message
          console.error("Failed to create order:", response.data);
          // Handle the error or show an error message
        }
      })
      .catch((error) => {
        console.error("Error creating order:", error);
        // Handle the error or show an error message
      });
  
    // Close the order modal
    closeOrderModal();
  };  

  // Update the total price when the quantity changes
  useEffect(() => {
    const ticket = tickets.find((ticket) => ticket.id === selectedTicketId);
    if (ticket) {
      const price = ticket.ticketPrice;
      const totalPrice = price * selectedQuantity;
      setTotalPrice(totalPrice);
    }
  }, [selectedQuantity, selectedTicketId, tickets]);

  const renderEmailInput = () => {
    if (userEmail) {
      return null;
    } else {
      return (
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={userEmail || ""}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
      );
    }
  };

  return (
    <div>
      <h1>Available Tickets</h1>
      <ul>
        {tickets.map((ticket, index) => (
          <li key={`${ticket.id}-${index}`}>
            <div className="ticket-item">
              <h3>{ticket.description}</h3>
              <p>Price: ${ticket.ticketPrice}</p>
              <p>Date: {ticket.expDate}</p>
              <button
                onClick={() => {
                  setSelectedTicketId(ticket.id);
                  handleBuyTicket(ticket.id);
                }}
                className="btn btn-primary"
              >
                Buy Ticket
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Modal show={showOrderModal} onHide={closeOrderModal}>
        <Modal.Header closeButton>
          <Modal.Title>Select Ticket Quantity</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderEmailInput()}
          <label>Select Quantity:</label>
          <input
            type="number"
            value={selectedQuantity}
            onChange={(e) => setSelectedQuantity(parseInt(e.target.value, 10))}
          />
          <p>Total Price: ${totalPrice}</p> {/* Display the total price */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeOrderModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleOrderSubmit();
              closeOrderModal();
            }}
          >
            Order
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
