import * as React from 'react';
import { URL_FETCH_AZURE_SERVER } from '../../../config';
import { ListItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

function createData(name, revenue) {
  return { name, revenue };
}

export default function Deposits() {
  const [total, setTotal] = React.useState([])
  const theme = useTheme();
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
  const current = new Date()
  const [year, setYear] = React.useState(current.getFullYear())
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let isMounted = true;

  // React.useEffect(() => {
  //   fetch(`${URL_FETCH_AZURE_SERVER}dashboard/total-price`, {
  //     method: 'GET',
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': "Bearer " + token,
  //     }
  //   }).then(response => {
  //     if (!response.ok) return [];
  //     return response.json();
  //   }).then(data => {
  //     setTotal(data);
  //   })
  // }, [])

  React.useEffect(() => {
    const fetchData = async () => {
      setTotal([])
      try {
        const requests = months.map(async (month) => {
          const response = await fetch(`${URL_FETCH_AZURE_SERVER}dashboard/total/${current.getFullYear()}/${month}`, {
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
        setTotal((prevTotal) => [...prevTotal, ...results]);
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
      }}>Revenue of {year}</ListItem>
      {/* {total ? <Typography component="p" variant="h4">
        {total.toLocaleString()} VND
      </Typography> : ''} */}
      <ResponsiveContainer>
        <LineChart width={730} height={250} data={total}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}