import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from '../Title';
import { URL_FETCH_AZURE_SERVER } from '../../../config';
import { ListItem } from '@mui/material';

function createData(time, amount) {
  return { time, amount };
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
        <LineChart
          data={tickets}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="time"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          />
          <YAxis
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
          >
            <Label
              angle={270}
              position="left"
              style={{
                textAnchor: 'middle',
                fill: theme.palette.text.primary,
                ...theme.typography.body1,
              }}
            >
              Tickets
            </Label>
          </YAxis>
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amount"
            stroke={theme.palette.primary.main}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}