import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LineAxisIcon from '@mui/icons-material/LineAxis';
import HomeIcon from '@mui/icons-material/Home';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { Link } from 'react-router-dom';

// export default function ListItems() {
//   return (
//     <React.Fragment>
//       <ListItemButton onClick={handleClick}>
//         <ListItemIcon>
//           <LineAxisIcon />
//         </ListItemIcon>
//         <ListItemText primary="Dashboard" />
//       </ListItemButton>
//       <ListItemButton onClick={handleClick}>
//         <ListItemIcon>
//           <SupervisedUserCircleIcon />
//         </ListItemIcon>
//         <ListItemText primary="Manage Account" />
//       </ListItemButton>
//     </React.Fragment>
//   )
// }

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
      <Link to={'/admin/manageaccount'} style={{
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
      <Link to={'/admin/cages'} style={{
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
      <Link to={'/admin/animals'} style={{
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
      <Link to={'/admin/animalspecies'} style={{
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
      <Link to={'/admin/zooarea'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <LineAxisIcon />
        </ListItemIcon>
        <ListItemText primary="Zoo Area Page" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <Link to={'/admin/trainers'} style={{
        textDecoration: 'none',
        color: 'grey',
        width: '100%'
      }}>
        <ListItemIcon>
          <LineAxisIcon />
        </ListItemIcon>
        <ListItemText primary="Zoo Trainer Page" style={{ display: 'inline-block' }} />
      </Link>
    </ListItemButton>
    <ListItemButton>
      <Link to={'/admin/cages'} style={{
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
      <Link to={'/admin/animals'} style={{
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
      <Link to={'/admin/animalspecies'} style={{
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
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);