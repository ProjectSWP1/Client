import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import LineAxisIcon from '@mui/icons-material/LineAxis';
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
      <Link to={'/trainer/animalcage'} style={{
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
  </React.Fragment>
);