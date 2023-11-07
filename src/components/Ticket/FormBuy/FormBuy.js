import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { green } from "@mui/material/colors";
import {
  Button,
  CardMedia,
  Container,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { defaultTheme } from "../../Theme/Theme";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FormBuy({ ticket, setSelectedTicket, token }) {
  const open = Boolean(ticket);
  const [newPrice, setNewPrice] = useState(ticket?.ticketPrice || 0);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [emailError, setEmailError] = useState('');
  const [numberTicketError, setNumberTicketError] = useState('');
  const [numberTicket, setNumberTicket] = useState(1); // Initialize with 1 ticket

  const handleDecrement = () => {
    if (numberTicket > 1) {
      setNumberTicket(numberTicket - 1);
      setNumberTicketError('');
    }
  };

  const handleIncrement = () => {
    setNumberTicket(numberTicket + 1);
    setNumberTicketError('');
  };

  useEffect(() => {
    if (token) {
      // User is logged in, set the email and clear guestEmail
      const tmpEmail = JSON.parse(atob(token.split(".")[1]));
      setEmail(tmpEmail.email);
    } else {
      // User is not logged in, use the guestEmail if available
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.has("guestEmail")) {
        setUserEmail(searchParams.get("guestEmail"));
      }
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear any previous error messages
    setEmailError('');
    setNumberTicketError('');

    // Validate input fields
    if (numberTicket < 1) {
      setNumberTicketError('Please enter a valid number of tickets.');
      return;
    }

    if (!token && !userEmail) {
      setEmailError('Please enter an email address.');
      return;
    }

    const ordersDto = {
      ticketId: ticket.ticketId,
      email: email || userEmail,
      //phoneNumber: phone,
      ticketQuantity: parseInt(numberTicket, 10),
      visitDate: ticket.visitDate,
      description: ticket.description,
    };
    fetch("http://localhost:8080/order/create-order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(ordersDto),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((message) => {
            throw new Error(message);
          });
        }
        return response.text();
      })
      .then((data) => {
        navigate(
          `/payment?userEmail=${encodeURIComponent(email || userEmail)}`
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
    // navigate("/payment");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Modal
        open={open}
        onClose={() => {
          setSelectedTicket(null);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form style={{ textAlign: "center" }} onSubmit={handleSubmit}>
            <Box
              sx={{
                bgcolor: "background.paper",
                textAlign: "center",
              }}
            >
              <Typography style={{ color: green[500] }} variant="h4">
                Buy This Ticket
              </Typography>
              <CardMedia
                component="img"
                height="194"
                image={
                  "https://st2.depositphotos.com/7358038/10206/v/450/depositphotos_102065516-stock-illustration-flat-ticket-icon.jpg"
                }
                alt="Ticket"
              />
            </Box>
            <Typography variant="h6">
              Price: {newPrice === 0 ? ticket?.ticketPrice : newPrice} VNĐ
            </Typography>
            {/* Numeric input with Material-UI components */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px' }}>
              <Button onClick={handleDecrement}>
                <RemoveIcon />
              </Button>
              <TextField
                type="number"
                value={numberTicket}
                onChange={(e) => setNumberTicket(parseInt(e.target.value, 10))}
                InputProps={{ inputProps: { min: 1 } }}
              />
              <Button onClick={handleIncrement}>
                <AddIcon />
              </Button>
            </div>
            {numberTicketError && <Typography variant="body2" color="error">{numberTicketError}</Typography>}
            {email ? (
              ""
            ) : (
              <TextField
                style={{ width: "500px", marginTop: "20px" }}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                name="email"
                type="email"
                // value={formData.number}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            )}
            {/* Display error messages */}
            {!token && emailError && <div style={{ color: 'red' }}>{emailError}</div>}
            
            <Container
              maxWidth="lg"
              style={{
                margin: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                style={{ backgroundColor: green[500] }}
                type="submit"
                variant="contained"
              >
                Next
              </Button>
            </Container>
          </form>
        </Box>
      </Modal>
    </ThemeProvider>
  );
}
