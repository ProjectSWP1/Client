import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { green } from "@mui/material/colors";
import { Button, CardMedia, Container, TextField, ThemeProvider } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { defaultTheme } from "../../Theme/Theme";

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
  const [numberTicket, setNumberTicket] = useState(0);
  const [phone, setPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState('');

  useEffect(() => {
    if (token) {
      // User is logged in, set the email and clear guestEmail
      const tmpEmail = JSON.parse(atob(token.split(".")[1]));
      setEmail(tmpEmail.email);
      setGuestEmail('');
    } else {
      // User is not logged in, use the guestEmail if available
      const searchParams = new URLSearchParams(location.search);
      if (searchParams.has("guestEmail")) {
        setGuestEmail(searchParams.get("guestEmail"));
      }
    }
  }, [token, location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ordersDto = {
      ticketId: ticket.ticketId,
      email: email,
      phoneNumber: phone,
      ticketQuantity: numberTicket,
      expDate: ticket.expDate,
      description: ticket.description
    }
    console.log(ordersDto.data);
    console.log(token.data);
    fetch('http://localhost:8080/order/create-order', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify(ordersDto)
    }).then(response => {
      if(!response.ok){
        return response.text().then(message => {
          throw new Error(message)
        })
        return response.text()
      }
    }).then(data => {
      if (token) {
        // User is logged in
        navigate(`/payment?userEmail=${encodeURIComponent(email)}`);
      } else {
        // User is not logged in, use guestEmail as a URL parameter
        navigate(`/payment?guestEmail=${encodeURIComponent(guestEmail)}`);
      }
    })
    .catch(error => {
      console.log(error.message);
      console.log(email);
      console.log(ordersDto);
    })
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
              Description: {ticket?.description}
            </Typography>
            <Typography variant="h6">
              Total Price: {newPrice === 0 ? ticket?.ticketPrice : newPrice} VNĐ
            </Typography>
            <TextField
              style={{ width: "500px", marginTop: "20px" }}
              id="outlined-basic"
              label="Number Ticket"
              variant="outlined"
              name="number"
              type="number"
              // value={formData.number}
              onChange={(e) => setNumberTicket(e.target.value)}
            />
            {email ? "" :
              <>
                <TextField
                  style={{ width: "500px", marginTop: "20px" }}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  name="email"
                  type="email"
                  // value={formData.number}
                  onChange={(e) => setGuestEmail(e.target.value)}
                />
              </>
            }
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