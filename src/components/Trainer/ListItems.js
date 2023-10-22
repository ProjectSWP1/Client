import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LineAxisIcon from '@mui/icons-material/LineAxis';
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
          <LineAxisIcon />
        </ListItemIcon>
        <ListItemText primary="Home" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <Link to={'/trainer/cages'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <LineAxisIcon />
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
          <LineAxisIcon />
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
          <LineAxisIcon />
        </ListItemIcon>
        <ListItemText primary="Animal Species Page" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <Link to={'/trainer/profile'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <LineAxisIcon />
        </ListItemIcon>
        <ListItemText primary="Trainer Profile" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
  </React.Fragment>
);