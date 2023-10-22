import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import { Link } from 'react-router-dom';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <Link to={'/'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
  </React.Fragment>
)

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Staff's function
    </ListSubheader>
    <ListItemButton>
      <Link to={'/staff/zooarea'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <LocationSearchingIcon />
        </ListItemIcon>
        <ListItemText primary="Zoo Area Page" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <Link to={'/staff/trainers'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <SupervisedUserCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Zoo Trainer Page" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
  </React.Fragment>
);