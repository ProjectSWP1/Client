import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  ThemeProvider,
  Typography,
} from "@mui/material";
import axios from "axios";
import FormBuy from "../FormBuy/FormBuy";
import Loading from "../Loading/Loading";
import { green } from "@mui/material/colors";
import { defaultTheme } from "../../Theme/Theme";
import { URL_FETCH_AZURE_SERVER } from "../../../config";

import './TicketList.css'
import { Link } from "react-router-dom";

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const currentDay = new Date()

  const accessToken = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";

  useEffect(() => {
    axios
      .get(`${URL_FETCH_AZURE_SERVER}user/by-visit-date-asc`)
      .then((response) => {
        const tickets = response.data.filter(ticket => {
          const ticketDate = new Date(ticket.visitDate)
          if (ticketDate.getDate() === currentDay.getDate() &&
            currentDay.getHours() >= 15) {
            return false
          }
          return ticketDate > currentDay
        }).slice(0, 6)
        console.log(tickets);
        setTickets(tickets);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  if (tickets.length <= 0) {
    return (
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center'
        }}
      >
        <Loading />
      </Container>
    );
  }

  return (
    <>
      <FormBuy ticket={selectedTicket} setSelectedTicket={setSelectedTicket} token={accessToken} />
      <ThemeProvider theme={defaultTheme}>
        <div className="ticket-list-container">
          <div className="ticket-list-left">
            <img src="assets/images/ticket-list-image.jpg" />
          </div>
          <div className="ticket-list-right">
            <h1 className="ticket-list-right-title">PLAN YOUR VISIT DATE</h1>
            <div className="ticket-list-right-underline"></div>

            <div className="ticket-list-right-content">
              <h4>Before you buy tickets: </h4>
              <p> &#8250; For adult ticket: above 1.3m height </p>
              <p> &#8250; For children, always need an adult to visit with and height 1m - 1.3m</p>
              <p> &#8250; For babies tickets are free</p>
              <h4>After you buy tickets: </h4>
              <p> &#8250; We will send QR code to your email after successful payment, you can also gift QR code to others</p>
              <p> &#8250; Zoo gates will automatically scan your QR code</p>
            </div>
            {tickets.length > 0 && (
              <div className="ticket-list-right-underneath">
                <div className="ticket-list-right-underneath-header">
                  <img src="assets/images/ticket-list-icon.png" />
                  <h2>Here available tickets</h2>
                </div>
                <div className="ticket-list-right-available-ticket">
                  <div className="ticket-list-right-underneath-A">
                    <h4>Recent days</h4>
                    <p className="ticket-list-right-underneath-A-date">{tickets[0].visitDate}</p>
                    <p className="ticket-list-right-underneath-A-price">Adult Price: {tickets[0].ticketPrice.toLocaleString()} VNĐ</p>
                    <p className="ticket-list-right-underneath-A-price">Children Price: {tickets[0].childrenTicketPrice.toLocaleString()} VNĐ</p>
                    <Button
                      variant="contained"
                      size="small"
                      fullWidth
                      style={{ marginTop: '50px' }}
                      onClick={() => setSelectedTicket(tickets[0])}
                    >
                      BUY NOW
                    </Button>
                  </div>
                  <div className="ticket-list-right-underneath-B">
                    {tickets.map((ticket, index) => (
                      <div key={index}>
                        {index !== 0 && (
                          <div style={{ width: '100%', display: 'flex' }}>
                            <div className="ticket-list-right-underneath-B-content">
                              <div className="ticket-list-right-underneath-B-date">
                                {ticket.visitDate}
                              </div>
                              <div className="ticket-list-right-underneath-B-price">
                                A: {ticket.ticketPrice.toLocaleString()} VNĐ
                              </div>
                              <div className="ticket-list-right-underneath-B-price">
                                C: {ticket.childrenTicketPrice.toLocaleString()} VNĐ
                              </div>
                            </div>
                            <div className="ticket-list-right-underneath-B-btn">
                              <Button
                                variant="contained"
                                size="small"
                                fullWidth
                                onClick={() => setSelectedTicket(ticket)}
                                style={{ height: '43px', backgroundColor: 'lightgreen', color: 'darkgreen' }}
                              >
                                BUY
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ticket-list-right-underneath-B-member-btn">
                  {!accessToken && (
                    <Button
                      variant="contained"
                      size="small"
                      style={{
                        width: '90%', height: '55px',
                        backgroundColor: 'green', color: 'white',
                        textTransform: 'none', fontWeight: 'bold',
                        fontSize: '14px'
                      }}
                    >
                      <Link to={'/register'}
                        style={{ textDecoration: 'none', color: 'white' }}>
                        You will receive benefits from buying tickets
                        <br />Click here to begin become a member
                      </Link>
                    </Button>
                  )}
                </div>
              </div>)}
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}