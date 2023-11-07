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


export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const accessToken = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";

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
      <FormBuy ticket={selectedTicket} setSelectedTicket={setSelectedTicket} token={accessToken}/>
      <ThemeProvider theme={defaultTheme}>
        <Container
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
        </Container>
      </ThemeProvider>
    </>
  );
}