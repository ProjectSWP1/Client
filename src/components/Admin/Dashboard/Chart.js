import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, CartesianGrid, Legend, Tooltip } from 'recharts';
import Title from '../Title';
import { URL_FETCH_AZURE_SERVER } from '../../../config';
import { ListItem } from '@mui/material';

function createData(name, tickets) {
  return { name, tickets };
}

export default function Chart() {
  const theme = useTheme();
  const [tickets, setTickets] = React.useState([])
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
  const current = new Date()
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let isMounted = true;

  React.useEffect(() => {
    const fetchData = async () => {
      setTickets([])
      try {
        const requests = months.map(async (month) => {
          const response = await fetch(`${URL_FETCH_AZURE_SERVER}dashboard/count-ticket-ordered-month?year=${current.getFullYear()}&month=${month}`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token,
            }
          });

          if (!response.ok) return createData(month, 0);

          const data = await response.json();
          if (month > current.getMonth() + 1) {
            return createData(month, undefined)
          }
          return createData(month, data);
        });

        const results = await Promise.all(requests);
        setTickets((prevTickets) => [...prevTickets, ...results]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (isMounted) {
      fetchData();
      isMounted = false;
    }

    // Cleanup function to handle unmounting
    return () => {
      isMounted = false;
    };
  }, [])

  return (
    <React.Fragment>
      <ListItem style={{
        fontSize: '20px',
        fontWeight: 'bolder',
        color: 'green',
      }}>Revenue of {current.getFullYear()}</ListItem>
      <ResponsiveContainer>
        <LineChart width={730} height={250} data={tickets}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip/>
          <Legend />
          <Line type="monotone" dataKey="tickets" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}