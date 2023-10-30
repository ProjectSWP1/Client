import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import LocationSearchingIcon from '@mui/icons-material/LocationSearching';
import PetsIcon from '@mui/icons-material/Pets';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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
    <ListItemButton>
      <Link to={'/trainer/profile'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
  </React.Fragment>
)
export const adminListItems = (
  <React.Fragment>
    <ListItemButton>
      <Link to={'/admin/dashboard'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <LineAxisIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <Link to={'/admin/manage-account'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <SupervisedUserCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Account" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <Link to={'/admin/manage-employee'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <SupervisedUserCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Employee" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
  </React.Fragment>
);

export const staffListItems = (
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

export const trainerListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Trainer's function
    </ListSubheader>
    <ListItemButton>
      <Link to={'/trainer/cages'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <HouseSidingIcon />
        </ListItemIcon>
        <ListItemText primary="Zoo Cage Page" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <Link to={'/trainer/animals'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="Animal Page" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <Link to={'/trainer/animalspecies'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <PetsIcon />
        </ListItemIcon>
        <ListItemText primary="Animal Species Page" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <Link to={'/trainer/schedule'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <CalendarMonthIcon />
        </ListItemIcon>
        <ListItemText primary="Schedule" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
  </React.Fragment>
);