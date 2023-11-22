import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import DataTable from "react-data-table-component";
import { URL_FETCH_AZURE_SERVER } from "../../../config";

import './Configuration.css'

export default function Configuration() {
  const [timeUntilMonday, setTimeUntilMonday] = useState('');
  const [adultTicketPrice, setAdultTicketPrice] = useState(50000);
  const [childTicketPrice, setChildTicketPrice] = useState(30000);
  const [voucherCoupon, setVoucherCoupon] = useState(0.25);
  const [ticketData, setTicketData] = useState([]);
  const [voucherData, setVoucherData] = useState([]);
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
  }, [token]);

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
      const ticketsData = await ticketsResponse.json();

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
      const vouchersData = await vouchersResponse.json();

      // Update state with the fetched data
      setTicketData(ticketsData);
      setVoucherData(vouchersData);
    } catch (error) {
      console.error("Error fetching data from the backend:", error);
    }
  }

  const removeTicket = (ticket) => {
    // Implement the logic to remove a ticket
    // fetch remove
  };

  const updateTicket = (ticket) => {
    // Implement the logic to update a ticket
    // fetch update
  };

  const removeVoucher = (voucher) => {
    // Implement the logic to remove a voucher
  };

  const updateVoucher = (voucher) => {
    // Implement the logic to update a voucher
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
      setTicketData(ticketsData);
      setVoucherData(vouchersData);
    } catch (error) {
      console.error("Error fetching data from the backend:", error);
    }
  }

  // Define columns for the DataTable
  const ticketColumns = [
    {
      name: "Ticket ID",
      selector: (ticket) => <p>{ticket.ticketId}</p>,
      width: '150px'
    },
    {
      name: "Adult Price",
      selector: (ticket) => <p>{ticket.ticketPrice.toLocaleString()} VND</p>,
      width: '180px'
    },
    {
      name: "Children Price",
      selector: (ticket) => (
        <p>{ticket.childrenTicketPrice.toLocaleString()} VND</p>
      ),
      width: '180px'
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
    <div style={{width: '100%'}}>
      <h1 style={{ marginTop: '70px', marginBottom: '30px', marginLeft: '20px' }}>Time until Monday: {timeUntilMonday}</h1>
      <div className="system-configuration">
        <div className="generate-ticket">
          <div className="generate-ticket-content">
            {/* <p style={{ marginTop: "30px", position: 'absolute', top: '-14%', left: '13%', background: 'white', fontSize: '18px', color: 'darkgreen' }}>
              Time until Monday: {timeUntilMonday}
            </p> */}
            <div style={{ textAlign: 'center', marginBottom: '10px' }}>
              <label>
                Adult Ticket Price:
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
                Child Ticket Price:
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
                Voucher Coupon:
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
          <div style={{width: '100%'}}>
            <h2>Available Tickets</h2>
            <DataTable
              columns={ticketColumns}
              data={ticketData}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 20, 50]}
              style={{width: '100%'}}
            />
          </div>

          <div style={{width: '100%'}}>  
            <h2>Available Vouchers</h2>
            <DataTable
              columns={voucherColumns}
              data={voucherData}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 20, 50]}
            />
          </div>
        </div>
        {/* Other content of your Configuration component */}
      </div>
    </div>
  );
}
