import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Container,
  CssBaseline,
  GlobalStyles,
  Grid,
  IconButton,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import axios from "axios";
import FormBuy from "../FormBuy/FormBuy";
import Loading from "../Loading/Loading";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { green } from "@mui/material/colors";

const defaultTheme = createTheme();

export default function TicketList() {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  useEffect(() => {
    axios
      .get("https://654506c45a0b4b04436d7cb5.mockapi.io/api/v1/ticket")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  const convertValue = (value) => {
    const date = new Date(value * 1000);
    return date.toLocaleDateString("en-US");
  };

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
      <FormBuy ticket={selectedTicket} setSelectedTicket={setSelectedTicket} />
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
              <Grid item xs={12} sm={6} md={4} key={ticket.id}>
                <Card>
                  <CardHeader
                    avatar={<Avatar src="assets/images/zookay.png" />}
                    action={
                      <IconButton aria-label="settings">
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={ticket.title}
                  />
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
                      <strong>Description:</strong> {ticket.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Expiration Date:</strong>{" "}
                      {convertValue(ticket.exp_date)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <strong>Price:</strong> {ticket.price} $
                    </Typography>
                    <Button
                      style={{ marginTop: "10px", backgroundColor: green[500] }}
                      variant="contained"
                      href="#contained-buttons"
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