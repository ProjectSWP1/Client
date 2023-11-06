import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  CssBaseline,
  GlobalStyles,
  Grid,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import FormBuy from "../FormBuy/FormBuy";
import Loading from "../Loading/Loading";
import { green } from "@mui/material/colors";
import { getItemWithTimeout } from "../../auth/setTimeOut";

const defaultTheme = createTheme();

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [user, setUser] = useState(null)

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

  // const convertValue = (value) => {
  //   console.log(value);
  //   const date = new Date(value);
  //   return date.toLocaleDateString("en-US");
  // };

  if (tickets.length <= 0) {
    return (
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Loading />
      </Container>
    );
  }

  return (
    <>
      <FormBuy ticket={selectedTicket} setSelectedTicket={setSelectedTicket} token={accessToken}/>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles
          styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
        />
        <CssBaseline />
        <Container
          disableGutters
          maxWidth="sm"
          component="main"
          sx={{ pt: 16, pb: 6 }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Tickets Pricing
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            component="p"
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
                      <strong>Expiration Date:</strong>{" "}
                      {ticket.visitDate}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Price:</strong> {ticket.ticketPrice} $
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