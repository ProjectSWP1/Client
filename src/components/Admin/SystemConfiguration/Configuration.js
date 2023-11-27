import React, { useState, useEffect } from "react";
import { Box, Button, Dialog, DialogActions, DialogContent, Grid, TextField } from "@mui/material";
import DataTable from "react-data-table-component";
import { URL_FETCH_AZURE_SERVER } from "../../../config";

import './Configuration.css'
import Swal from "sweetalert2";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

export default function Configuration() {
  const [timeUntilMonday, setTimeUntilMonday] = useState('');
  const [adultTicketPrice, setAdultTicketPrice] = useState(50000);
  const [childTicketPrice, setChildTicketPrice] = useState(30000);
  const [voucherCoupon, setVoucherCoupon] = useState(0.25);
  const [ticketData, setTicketData] = useState([]);
  const [voucherData, setVoucherData] = useState([]);
  const [changed, setChanged] = useState(false)

  //update ticket
  const [openTicketDialog, setOpenTicketDialog] = useState(false)
  const [ticketId, setTicketId] = useState("")
  const [ticketPrice, setTicketPrice] = useState(0)
  const [ticketChildren, setTicketChildren] = useState(0)
  const [visitDate, setVisitDate] = useState("")
  const [description, setDescription] = useState("")

  //update voucher
  const [openVoucherDialog, setOpenVoucherDialog] = useState(false)
  const [voucherId, setVoucherId] = useState("")
  const [coupon, setCoupon] = useState(0)
  const [expDate, setExpDate] = useState("")

  const [token, setToken] = useState(
    localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token")).value
      : ""
  );
  const [generationDone, setGenerationDone] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeUntilMonday(calculateTimeUntilMonday());

      // Check if it's Monday and generation hasn't been done yet
      if (isMonday() && !generationDone) {
        generateTicketsAndVouchers();
        setGenerationDone(true); // Mark generation as done for this Monday
      } else if (!isMonday()) {
        setGenerationDone(false); // Reset generation flag on other days
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [generationDone]);

  useEffect(() => {
    // Fetch available tickets and vouchers when the component mounts
    fetchTicketsAndVouchers();
  }, [token, changed]);

  function calculateTimeUntilMonday() {
    const now = new Date();
    const daysUntilMonday = (1 - now.getDay() + 7) % 7 || 7;
    const nextMonday = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() + daysUntilMonday,
      0,
      0,
      0,
      0
    );
    const timeUntilNextMonday = nextMonday.getTime() - now.getTime();

    const days = Math.floor(timeUntilNextMonday / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeUntilNextMonday % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (timeUntilNextMonday % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeUntilNextMonday % (1000 * 60)) / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  function isMonday() {
    // Check if the current day is Monday
    return new Date().getDay() === 1; // 0 is Sunday, 1 is Monday, and so on
  }

  

  async function generateTicketsAndVouchers() {
    try {
      // Fetch tickets with updated prices
      const ticketsResponse = await fetch(
        `${URL_FETCH_AZURE_SERVER}admin/gen-ticket/${adultTicketPrice}/${childTicketPrice}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const ticketsData = await ticketsResponse.text();

      // Fetch vouchers with updated coupon
      const vouchersResponse = await fetch(
        `${URL_FETCH_AZURE_SERVER}admin/gen-voucher/${voucherCoupon}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const vouchersData = await vouchersResponse.text();

    } catch (error) {
      console.error("Error fetching data from the backend:", error);
    }
  }

  const removeTicket = (ticket) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#DDDDDD',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${URL_FETCH_AZURE_SERVER}admin/remove-ticket/${ticket.ticketId}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
          },
        }).then(response => {
          if (!response.ok) {
            return response.text().then((message) => {
              throw new Error(message);
            });
          }
          return response.text()
        }).then(data => {
          Swal.fire({
            title: 'Success!',
            text: `${data}`,
            icon: 'success',
          });
          setTicketData(ticketData.filter(item => {
            return item.ticketId !== ticket.ticketId
          }))
        })
          .catch(error => {
            Swal.fire({
              title: 'Fail!',
              text: `${error.message}`,
              icon: 'error',
            });
          });
      }
    });
  };

  const updateTicket = (ticket) => {
    // Implement the logic to update a ticket
    // fetch update
    setChanged(false)
    setOpenTicketDialog(true)
    setTicketId(ticket.ticketId)
    setTicketPrice(ticket.ticketPrice)
    setTicketChildren(ticket.childrenTicketPrice)
    setVisitDate(ticket.visitDate)
    setDescription("")
  };

  const handleUpdateTicket = () => {
    setOpenTicketDialog(false)
    const ticketDto = {
      ticketId: ticketId,
      ticketPrice: ticketPrice,
      childrenTicketPrice: ticketChildren,
      visitDate: visitDate,
      description: description
    }
    fetch(`${URL_FETCH_AZURE_SERVER}admin/update-ticket`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify(ticketDto)
    }).then(response => {
      if (!response.ok) {
        return response.text().then((message) => {
          throw new Error(message);
        });
      }
      return response.text();
    }).then(data => {
      Swal.fire({
        title: 'Success!',
        text: `${data}`,
        icon: 'success',
      });
      setChanged(true)
    }).catch(error => {
      Swal.fire({
        title: 'Fail!',
        text: `${error}`,
        icon: 'error',
      });
    })
  }

  const removeVoucher = (voucher) => {
    // Implement the logic to remove a voucher
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#DDDDDD',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`${URL_FETCH_AZURE_SERVER}admin/delete-voucher/${voucher.voucherId}`, {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
          },
        }).then(response => {
          if (!response.ok) {
            return response.text().then((message) => {
              throw new Error(message);
            });
          }
          return response.text()
        }).then(data => {
          Swal.fire({
            title: 'Success!',
            text: `${data}`,
            icon: 'success',
          });
          setVoucherData(voucherData.filter(item => {
            return item.voucherId !== voucher.voucherId
          }))
        })
          .catch(error => {
            Swal.fire({
              title: 'Fail!',
              text: `${error.message}`,
              icon: 'error',
            });
          });
      }
    });
  };

  const updateVoucher = (voucher) => {
    // Implement the logic to update a voucher
    setChanged(false)
    setOpenVoucherDialog(true)
    setVoucherId(voucher.voucherId)
    setCoupon(voucher.coupon)
    setExpDate(voucher.expirationDate)
    setDescription("")
  };

  const handleUpdateVoucher = () => {
    setOpenVoucherDialog(false)
    const voucherDto = {
      voucherId: voucherId,
      coupon: coupon,
      expirationDate: expDate,
      description: description
    }
    fetch(`${URL_FETCH_AZURE_SERVER}admin/update-voucher`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify(voucherDto)
    }).then(response => {
      if (!response.ok) {
        return response.text().then((message) => {
          throw new Error(message);
        });
      }
      return response.text();
    }).then(data => {
      Swal.fire({
        title: 'Success!',
        text: `${data}`,
        icon: 'success',
      });
      setChanged(true)
    }).catch(error => {
      Swal.fire({
        title: 'Fail!',
        text: `${error}`,
        icon: 'error',
      });
    })
  }

  const handleClose = () => {
    setOpenTicketDialog(false);
    setOpenVoucherDialog(false)
  };

  async function fetchTicketsAndVouchers() {
    try {
      // Fetch all available tickets
      const ticketsResponse = await fetch(
        `${URL_FETCH_AZURE_SERVER}admin/get-ticket`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const ticketsData = await ticketsResponse.json();

      // Log the fetched data
      console.log("Tickets Data:", ticketsData);

      // Fetch all available vouchers
      const vouchersResponse = await fetch(
        `${URL_FETCH_AZURE_SERVER}user/get-all-voucher`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const vouchersData = await vouchersResponse.json();

      // Log the fetched data
      console.log("Vouchers Data:", vouchersData);

      // Update state with the fetched data
      const sortedTickets = ticketsData.sort(
        (a, b) => new Date(b.visitDate) - new Date(a.visitDate)
      )
      const sortedVouchers = vouchersData.sort(
        (a, b) => new Date(b.expirationDate) - new Date(a.expirationDate)
      )
      setTicketData(sortedTickets);
      setVoucherData(sortedVouchers);
    } catch (error) {
      console.error("Error fetching data from the backend:", error);
    }
  }

  // Define columns for the DataTable
  const ticketColumns = [
    {
      name: "Ticket ID",
      selector: (ticket) => <p>{ticket.ticketId}</p>,
      width: '100px'
    },
    {
      name: "Adult Price",
      selector: (ticket) => <p>{ticket.ticketPrice.toLocaleString()} VND</p>,
      width: '150px'
    },
    {
      name: "Children Price",
      selector: (ticket) => (
        <p>{ticket.childrenTicketPrice.toLocaleString()} VND</p>
      ),
      width: '150px'
    },
    {
      name: "Visit Date",
      selector: (ticket) => (
        <p>{ticket.visitDate}</p>
      ),
      width: '150px'
    },
    {
      name: "Actions",
      selector: (ticket) => (
        <Box sx={{ "& button": { m: 1 } }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => removeTicket(ticket)}
          >
            Remove
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => updateTicket(ticket)}
          >
            Update
          </Button>
        </Box>
      ),
    },
    // Add more columns as needed
  ];

  const voucherColumns = [
    {
      name: "Voucher ID",
      selector: (voucher) => <p>{voucher.voucherId}</p>,
      width: '100px'
    },
    {
      name: "Coupon",
      selector: (voucher) => <p>{voucher.coupon}</p>,
      width: '100px'
    },
    {
      name: "Expired Date",
      selector: (voucher) => <p>{voucher.expirationDate}</p>,
    },
    {
      name: "Actions",
      selector: (voucher) => (
        <Box sx={{ "& button": { m: 1 } }}>
          <Button
            variant="contained"
            size="small"
            onClick={() => removeVoucher(voucher)}
          >
            Remove
          </Button>
          <Button
            variant="contained"
            size="small"
            onClick={() => updateVoucher(voucher)}
          >
            Update
          </Button>
        </Box>
      ),
    },
    // Add more columns as needed
  ];

  return (
    <div style={{ width: '100%' }}>
      <h1 style={{
        marginTop: '70px', marginBottom: '30px', marginLeft: '20px'
        , color: "green", fontWeight: 'bolder'
      }}>Time until Monday: {timeUntilMonday}</h1>
      <div className="system-configuration">
        <div className="generate-ticket">
          <div className="generate-ticket-content">
            {/* <p style={{ marginTop: "30px", position: 'absolute', top: '-14%', left: '13%', background: 'white', fontSize: '18px', color: 'darkgreen' }}>
              Time until Monday: {timeUntilMonday}
            </p> */}
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <label>
                <b>Adult Ticket Price:</b>
                {/* <input
              type="number"
              value={adultTicketPrice}
              onChange={(e) => setAdultTicketPrice(Number(e.target.value))}
            /> */}
                <TextField
                  hiddenLabel
                  defaultValue="Small"
                  size="small"
                  type="number"
                  value={adultTicketPrice}
                  onChange={(e) => setAdultTicketPrice(Number(e.target.value))}
                  style={{ marginLeft: '10px' }}
                  fullWidth
                />
              </label>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <label>
                <b>Child Ticket Price:</b>
                {/* <input
                type="number"
                value={childTicketPrice}
                onChange={(e) => setChildTicketPrice(Number(e.target.value))}
              /> */}
                <TextField
                  hiddenLabel
                  defaultValue="Small"
                  size="small"
                  type="number"
                  value={childTicketPrice}
                  onChange={(e) => setChildTicketPrice(Number(e.target.value))}
                  style={{ marginLeft: '10px' }}
                  fullWidth
                />
              </label>
            </div>
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <label>
                <b>Voucher Coupon:</b>
                {/* <input
                type="number"
                step="0.01"
                value={voucherCoupon}
                onChange={(e) => setVoucherCoupon(Number(e.target.value))}
              /> */}
                <TextField
                  hiddenLabel
                  defaultValue="Small"
                  size="small"
                  type="number"
                  step="0.01"
                  value={voucherCoupon}
                  onChange={(e) => setVoucherCoupon(Number(e.target.value))}
                  style={{ marginLeft: '10px' }}
                  fullWidth
                />
              </label>
            </div>
            {/* <button onClick={generateTicketsAndVouchers}>Force Generate</button> */}
            <Button
              variant="contained"
              size="small"
              onClick={generateTicketsAndVouchers}
              style={{ marginTop: '20px', width: '100%' }}
            >
              Force Generate
            </Button>
          </div>
        </div>

        <div style={{ width: '65%' }}>
          <div style={{ width: '100%' }}>
            <h2>Available Tickets</h2>
            <DataTable
              columns={ticketColumns}
              data={ticketData.map(item => ({
                ...item,
              }))}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 20, 50]}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ width: '100%' }}>
            <h2>Available Vouchers</h2>
            <DataTable
              columns={voucherColumns}
              data={voucherData.map(item => ({
                ...item,
              }))}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 20, 50]}
            />
          </div>
        </div>
        {/* Other content of your Configuration component */}
      </div>
      <Dialog open={openTicketDialog} onClose={handleClose}
        style={{ p: '20px' }}>
        <div style={{
          margin: '15px',
          fontSize: '20px',
          fontWeight: 'bolder',
          color: 'green',
        }}>Upate ticket {ticketId}</div>
        <DialogContent>
          <Box component="form" noValidate sx={{ pl: '40px', pr: '40px' }}>
            <Grid item xs={12} sx={{ mt: '15px' }}>
              <TextField
                fullWidth
                type='number'
                label="Adult Ticket Price"
                value={ticketPrice}
                onChange={(e) => setTicketPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sx={{ mt: '15px' }}>
              <TextField
                fullWidth
                type='number'
                label="Children Ticket Price"
                value={ticketChildren}
                onChange={(e) => setTicketChildren(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sx={{ mt: '10px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} >
                  <DatePicker label="Visit Date"
                    value={dayjs(visitDate)}
                    onChange={(e) => setVisitDate(`${e.$y}-${e.$M + 1}-${e.$D}`)}
                    format='YYYY/MM/DD'
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sx={{ mt: '15px' }}>
              <TextField
                fullWidth
                type='text'
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleUpdateTicket} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openVoucherDialog} onClose={handleClose}
        style={{ p: '20px' }}>
        <div style={{
          margin: '15px',
          fontSize: '20px',
          fontWeight: 'bolder',
          color: 'green',
        }}>Upate voucher {voucherId}</div>
        <DialogContent>
          <Box component="form" noValidate sx={{ pl: '40px', pr: '40px' }}>
            <Grid item xs={12} sx={{ mt: '15px' }}>
              <TextField
                fullWidth
                type='number'
                label="Coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
              />
            </Grid>
            <Grid item xs={6} sx={{ mt: '10px' }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']} >
                  <DatePicker label="Visit Date"
                    value={dayjs(expDate)}
                    onChange={(e) => setExpDate(`${e.$y}-${e.$M + 1}-${e.$D}`)}
                    format='YYYY/MM/DD'
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sx={{ mt: '15px' }}>
              <TextField
                fullWidth
                type='text'
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={handleUpdateVoucher} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
