import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { green } from "@mui/material/colors";
import { Button, CardMedia, Container, TextField } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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

export default function FormBuy({ ticket, setSelectedTicket }) {
  const open = Boolean(ticket);
  const [newPrice, setNewPrice] = useState(ticket?.price || 0);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    number: "",
  });

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value)) {
      setNewPrice(value * ticket?.price);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    navigate("/payment");
  };

  return (
    <div>
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
              <Typography style={{ color: green[500] }} variant="h6">
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
              Total Price: {newPrice === 0 ? ticket?.price : newPrice} $
            </Typography>
            <TextField
              style={{ width: "500px", marginTop: "20px" }}
              id="outlined-basic"
              label="Number Ticket"
              variant="outlined"
              name="number"
              type="number"
              onChange={handleChange}
            />
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
    </div>
  );
}