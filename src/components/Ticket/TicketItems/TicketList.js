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

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const accessToken = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";

  useEffect(() => {
    axios
      .get(`${URL_FETCH_AZURE_SERVER}user/by-visit-date-asc`)
      .then((response) => {
        setTickets(response.data);
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
        {/* <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 16, pb: 6 }}
        >
          <Typography
            variant="h2"
            align="center"
            color={defaultTheme.palette.primary.dark}
            gutterBottom
          >
            Tickets Pricing
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
          >
            Open the gates to animal love, get your tickets now and enjoy
            limitless joy
          </Typography>
        </Container>
        <Container maxWidth="md" component="main">
          <Grid container spacing={3}>
            {tickets.map((ticket) => (
              <Grid item xs={12} sm={6} md={4} key={ticket.ticketId}>
                <Card>
                  <CardMedia
                    component="img"
                    height="194"
                    image={
                      "https://icons.iconarchive.com/icons/custom-icon-design/flatastic-8/512/Ticket-icon.png"
                    }
                    alt="Ticket"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Visit Date:</strong>{" "}
                      {ticket.visitDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Price:</strong> {ticket.ticketPrice} VND
                    </Typography>
                    <Button
                      style={{ marginTop: "10px", backgroundColor: green[500] }}
                      variant="contained"
                      // href="#contained-buttons"
                      onClick={() => setSelectedTicket(ticket)}
                    >
                      Buy Ticket
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container> */}

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

            <div className="ticket-list-right-underneath">
              <div className="ticket-list-right-underneath-header">
                <img src="assets/images/ticket-list-icon.png" />
                <h2>Here available tickets</h2>
              </div>
              <div className="ticket-list-right-available-ticket">
                <div className="ticket-list-right-underneath-A">
                  <h4>TODAY</h4>
                  <p className="ticket-list-right-underneath-A-date">2023-11-22</p>
                  <p className="ticket-list-right-underneath-A-price">Adult Price: 50,000 VNĐ</p>
                  <p className="ticket-list-right-underneath-A-price">Children Price: 30,000 VNĐ</p>
                  <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    style={{ marginTop: '50px' }}
                  >
                    BUY NOW
                  </Button>
                </div>
                <div className="ticket-list-right-underneath-B">
                  <div style={{ width: '100%', display: 'flex' }}>
                    <div className="ticket-list-right-underneath-B-content">
                      <div className="ticket-list-right-underneath-B-date">
                        2023-11-23
                      </div>
                      <div className="ticket-list-right-underneath-B-price">
                        A: 50K
                      </div>
                      <div className="ticket-list-right-underneath-B-price">
                        C: 30K
                      </div>
                    </div>
                    <div className="ticket-list-right-underneath-B-btn">
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        style={{ height: '43px', backgroundColor: 'lightgreen', color: 'darkgreen' }}
                      >
                        BUY
                      </Button>
                    </div>
                  </div>

                  <div style={{ width: '100%', display: 'flex' }}>
                    <div className="ticket-list-right-underneath-B-content">
                      <div className="ticket-list-right-underneath-B-date">
                        2023-11-24
                      </div>
                      <div className="ticket-list-right-underneath-B-price">
                        A: 50K
                      </div>
                      <div className="ticket-list-right-underneath-B-price">
                        C: 30K
                      </div>
                    </div>
                    <div className="ticket-list-right-underneath-B-btn">
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        style={{ height: '43px', backgroundColor: 'lightgreen', color: 'darkgreen' }}
                      >
                        BUY
                      </Button>
                    </div>
                  </div>

                  <div style={{ width: '100%', display: 'flex' }}>
                    <div className="ticket-list-right-underneath-B-content">
                      <div className="ticket-list-right-underneath-B-date">
                        2023-11-25
                      </div>
                      <div className="ticket-list-right-underneath-B-price">
                        A: 50K
                      </div>
                      <div className="ticket-list-right-underneath-B-price">
                        C: 30K
                      </div>
                    </div>
                    <div className="ticket-list-right-underneath-B-btn">
                      <Button
                        variant="contained"
                        size="small"
                        fullWidth
                        style={{ height: '43px', backgroundColor: 'lightgreen', color: 'darkgreen' }}
                      >
                        BUY
                      </Button>
                    </div>
                  </div>

                  <div className="ticket-list-right-underneath-B-member-btn">
                    <Button
                      variant="contained"
                      size="small"
                      style={{ width: '90%',height: '55px', 
                               backgroundColor: 'green', color: 'white',
                               textTransform: 'none', fontWeight: 'bold',
                               fontSize: '14px'}}
                    >
                      You will receive benefits from buying tickets
                      <br />Click here to begin become a member
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    </>
  );
}