import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

import "bootstrap/dist/css/bootstrap.min.css";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0); // State to store the total price
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/user/get-ticket")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      const decodedToken = atob(accessToken.split(".")[1]);
      const tokenData = JSON.parse(decodedToken);
      setUserEmail(tokenData.email);
    }
  }, []);

  const openOrderModal = () => {
    setShowOrderModal(true);
  };

  const closeOrderModal = () => {
    setShowOrderModal(false);
  };

  const handleBuyTicket = (ticketId) => {
    openOrderModal();
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
              console.log(`Ordered ${selectedQuantity} tickets for email: ${userEmail}`);
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
