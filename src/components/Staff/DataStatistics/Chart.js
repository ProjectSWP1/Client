import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import {  ResponsiveContainer, Legend, PieChart, Pie, LabelList, Cell } from 'recharts';
import { URL_FETCH_AZURE_SERVER } from '../../../config';
import { ListItem } from '@mui/material';

function createData(name, value) {
  return { name, value };
}

export default function Chart() {
  const theme = useTheme();
  const [tickets, setTickets] = React.useState([])
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
  const current = new Date()
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  let isMounted = true;
  const color = ['#009933', '#A0522D']

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const [adultResponse, childrenResponse] = await Promise.all([
          fetch(`${URL_FETCH_AZURE_SERVER}dashboard/adult/sold`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token,
            }
          }),
          fetch(`${URL_FETCH_AZURE_SERVER}dashboard/children/sold`, {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + token,
            }
          }),
        ]);
        const [adultData, childrenData] = await Promise.all([
          adultResponse.ok ? adultResponse.json() : [],
          childrenResponse.ok ? childrenResponse.json() : [],
        ]);

        setTickets([createData('adult', adultData), createData('children', childrenData)]);
      } catch (error) {
        console.error('Fetch error:', error);
        // Handle the error as needed
      }
    };

    fetchData();
  }, [])

  return (
    <React.Fragment>
      <ListItem style={{
        fontSize: '20px',
        fontWeight: 'bolder',
        color: 'green',
      }}>Number of sold tickets</ListItem>
      <ResponsiveContainer>
        <PieChart width={730} height={250}>
          <Pie
            data={tickets}
            dataKey="value"
            nameKey="name"
            isAnimationActive={true}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill='#08B8A1'>
            <LabelList
              dataKey="value"
              position="right"
              style={{ fontSize: "10px" }}
            />
            {tickets.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={color[index]} />
            ))}
          </Pie>
          <Legend align="center" verticalAlign="bottom" layout="horizontal" />
        </PieChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}