import * as React from 'react';
import Typography from '@mui/material/Typography';
import Title from '../Title';
import { URL_FETCH_AZURE_SERVER } from '../../../config';
import { ListItem } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}

export default function Deposits() {
  const [total, setTotal] = React.useState(0)

  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";

  React.useEffect(() => {
    fetch(`${URL_FETCH_AZURE_SERVER}dashboard/total-price`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      }
    }).then(response => {
      if (!response.ok) return [];
      return response.json();
    }).then(data => {
      setTotal(data);
    })
  }, [])
  return (
    <React.Fragment>
      <ListItem style={{
        fontSize: '20px',
        fontWeight: 'bolder',
        color: 'green',
      }}>Recent Deposits</ListItem>
      {total ? <Typography component="p" variant="h4">
        {total.toLocaleString()} VND
      </Typography> : ''}
      {/* <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */}
    </React.Fragment>
  );
}