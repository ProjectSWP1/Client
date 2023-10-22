import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import PetsIcon from '@mui/icons-material/Pets';
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';


import { Link } from 'react-router-dom';
import { ListSubheader } from '@mui/material';

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
          <SupervisedUserCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Trainer Profile" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
  </React.Fragment>
);

export const secondListItem = (
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
  </React.Fragment>
)