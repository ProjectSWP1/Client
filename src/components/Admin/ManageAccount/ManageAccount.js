import React, { useState, useEffect } from 'react';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormLabel, Grid, InputLabel, MenuItem, Radio, RadioGroup, Select, TextField } from '@mui/material';
import DataTable from 'react-data-table-component';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Swal from 'sweetalert2';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

export default function ManageAccount() {
  const [accounts, setAccounts] = useState([])
  const [zooAreas, setZooAreas] = useState([])
  const [open, setOpen] = useState(false);
  const [changed, setChanged] = useState(false)
  // const [currentAcc, setCurrentAcc] = useState(null)

  const ADD_ACCOUNT_TITLE = "Add new account";
  const UPDATE_ROLE_TITLE = "Update role account"
  // const UPDATE_CAGE_TITLE = "Update animal cage";

  //for account
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phone, setPhone] = useState('')
  const [username, setUsername] = useState('')
  const [role, setRole] = useState('')

  //for employee/member
  const [empId, setEmpId] = useState('')
  const [address, setAddress] = useState('')
  const [dob, setDob] = useState('')
  const [name, setName] = useState('')
  const [selectedZooArea, setSelectedZooArea] = useState('')
  const [gender, setGender] = useState('')
  const availableRoles = [
    { key: 'Staff', value: 'ST' },
    { key: 'Trainer', value: 'ZT' },
    { key: 'Member', value: 'MB' }
  ]

  const [popUpTitle, setPopupTitle] = useState(ADD_ACCOUNT_TITLE);
  const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")).value : "";
  const currentAcc = JSON.parse(atob(token.split('.')[1]))
  useEffect(() => {
    fetch('http://localhost:8080/admin/getAccount', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      }
    }).then(response => response.json()).then(data => {
      const newData = data.filter((item) => {
        return item.username !== currentAcc.sub
      })
      if (newData) {
        setAccounts(newData)
      }
      // console.log(data);
      // setAccounts(data)
    })

    fetch('http://localhost:8080/trainer/get-zoo-area', {
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
      setZooAreas(data);
    })
  }, [changed])

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpenPopupAddAction = () => {
    //account
    setOpen(true);
    setEmail("");
    setPassword("");
    setRole("")
    setPhone("")

    //employee/member
    setEmpId("")
    setAddress("")
    setGender("")
    setDob("")
    setName("")
    setSelectedZooArea("");
    setPopupTitle(ADD_ACCOUNT_TITLE);
  }

  const handleAddSave = () => {
    // const payload = {
    const accountDto = {
      email: email,
      password: password,
      phoneNumber: phone
    }
    const memberDto = {
      phoneNumber: phone,
      address: address,
      gender: gender,
      name: name,
      email: email,
      dob: dob
    }
    // const roleID = role
    // }
    fetch(`http://localhost:8080/admin/create-account?roleId=${role}&zooArea_Id=${selectedZooArea}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify({
        accountDto: accountDto,
        memberDto: memberDto
      })
    }).then(response => {
      if (!response.ok) {
        return response.text().then((message) => {
          throw new Error(message);
        });
      }
      return response.text();
    }).then(data => {
      setOpen(false);
      setAccounts([...accounts, {
        email: accountDto.email,
        password: accountDto.password,
        phoneNumber: accountDto.phone,
        role: {
          authority: role
        }
      }]);
      Swal.fire({
        title: 'Success!',
        text: `${data}`,
        icon: 'success',
      });
    }).catch(error => {
      setOpen(false);
      Swal.fire({
        title: 'Fail!',
        text: `${error}`,
        icon: 'error',
      });
    });
  }

  const handleOpenPopupUpdateAction = (account) => {
    setChanged(false);
    setOpen(true);
    setEmail(account.email);
    setUsername(account.username)
    setRole(account.role.roleID)
    setPopupTitle(UPDATE_ROLE_TITLE);
  }

  const handleUpdateRoleSave = () => {
    const accountDto = {
      email: email
    }
    fetch(`http://localhost:8080/admin/assignRole?roleId=${role}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      body: JSON.stringify(accountDto)
    }).then(response => {
      if (!response.ok) {
        return response.text().then((message) => {
          throw new Error(message);
        });
      }
      return response.text();
    }).then(data => {
      setOpen(false);
      setChanged(true);
      Swal.fire({
        title: 'Success!',
        text: `${data}`,
        icon: 'success',
      });
    }).catch(error => {
      setOpen(false);
      Swal.fire({
        title: 'Fail!',
        text: `${error}`,
        icon: 'error',
      });
    });
  }

  const handleDisactiveAction = (email) => {
    setChanged(false)
    Swal.fire({
      title: 'Are you sure?',
      text: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2e7d32',
      cancelButtonColor: '#DDDDDD',
      confirmButtonText: 'Yes!',
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8080/admin/deactivate-account/${email}`, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + token,
          },
        }).then(response => {
          if (!response.ok) {
            return response.text().then((message) => {
              throw new Error(message);
            });
          }
          return response.text()
        }).then(data => {
          Swal.fire({
            title: 'Success!',
            text: `${data}`,
            icon: 'success',
          });
          setChanged(true)
        })
          .catch(error => {
            Swal.fire({
              title: 'Fail!',
              text: `${error.message}`,
              icon: 'error',
            });
          });
      }
    });
  }

  const columns = [
    {
      id: 1,
      name: 'Email',
      selector: (account, index) => {
        return (
          <p>{account.email}</p>
        )
      }
    },
    {
      id: 2,
      name: 'Username',
      selector: account => {
        return (
          <p>{account.username}</p>
        )
      }
    },
    {
      id: 3,
      name: 'Active',
      width: '100px',
      selector: account => {
        return (
          <p>{account.active ? <CheckIcon color="success" /> : <CloseIcon color="warning" />}</p>
        )
      }
    },
    {
      id: 4,
      name: 'Role',
      width: '150px',
      selector: account => {
        return (
          <p>{account.role.authority}</p>
        )
      }
    },
    {
      id: 5,
      name: 'Delete',
      selector: account => {
        return (
          <Box sx={{ '& button': { m: 1 } }}>
            <Button variant="contained" size='small' onClick={() => handleDisactiveAction(account.email)}>Disactive</Button>
            <Button variant="contained" size='small' onClick={() => handleOpenPopupUpdateAction(account)}>Change Role</Button>
          </Box>
        )
      }
    }
  ]

  return (
    <Container sx={{
      backgroundColor: (theme) =>
        theme.palette.mode === 'light'
          ? theme.palette.background.default
          : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
    }}>
      <Dialog open={open} onClose={handleClose} >
        <DialogTitle>{popUpTitle}</DialogTitle>
        <DialogContent>
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {popUpTitle === ADD_ACCOUNT_TITLE ?
                <>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type='email'
                      id="email"
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      type='password'
                      id="password"
                      label="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Phone Number"
                      type="tel"
                      id="phoneNumber"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="select-label">Select role</InputLabel>
                    <Select
                      labelId="select-label"
                      id="select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <MenuItem value='ST'>Staff</MenuItem>
                      <MenuItem value='ZT'>Zoo Trainer</MenuItem>
                    </Select>
                  </Grid>
                  {role == 'ZT' ? <Grid item xs={6}>
                    <InputLabel id="select-label">Select an zoo area</InputLabel>
                    <Select
                      labelId="select-label"
                      id="select"
                      value={selectedZooArea}
                      onChange={(e) => setSelectedZooArea(e.target.value)}
                    >
                      {zooAreas.map(area => {
                        return (
                          <MenuItem key={area.zooAreaId} value={area.zooAreaId}>{area.description}</MenuItem>
                        )
                      })}
                    </Select>
                  </Grid> : ""}
                  {/* member */}
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="EmpID"
                      id="empId"
                      onChange={(e) => setEmpId(e.target.value)}
                      value={empId}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Name"
                      id="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormLabel id="gender">Gender</FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="gender"
                      name="Gender"
                      onChange={(e) => setGender(e.target.value)}
                      value={gender}
                    >
                      <FormControlLabel value="female" control={<Radio />} label="Female" />
                      <FormControlLabel value="male" control={<Radio />} label="Male" />
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']} >
                        <DatePicker label="Date of Birth"
                          value={dayjs(dob)}
                          onChange={(e) => setDob(`${e.$M + 1}/${e.$D}/${e.$y}`)}
                          format='MM/DD/YYYY'
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Address"
                      id="address"
                      onChange={(e) => setAddress(e.target.value)}
                      value={address}
                    />
                  </Grid></> :
                <>
                  {/* pop up for update role */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      value={email}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Username"
                      value={username}
                      disabled
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel id="select-label">Select role</InputLabel>
                    <Select
                      labelId="select-label"
                      id="select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      {availableRoles.map(validRole => {
                        return (
                          <MenuItem key={validRole.key} value={validRole.value}>{validRole.key}</MenuItem>
                        )
                      })}
                    </Select>
                  </Grid>
                  {role == 'ZT' ? <Grid item xs={6}>
                    <InputLabel id="select-label">Select an zoo area</InputLabel>
                    <Select
                      labelId="select-label"
                      id="select"
                      value={selectedZooArea}
                      onChange={(e) => setSelectedZooArea(e.target.value)}
                    >
                      {zooAreas.map(area => {
                        return (
                          <MenuItem key={area.zooAreaId} value={area.zooAreaId}>{area.description}</MenuItem>
                        )
                      })}
                    </Select>
                  </Grid> : ""}
                </>}
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
          <Button onClick={popUpTitle === ADD_ACCOUNT_TITLE ? handleAddSave : handleUpdateRoleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper} sx={{ mt: '100px' }}>
        <DataTable
          columns={columns}
          data={accounts.map(item => ({
            ...item,
          }))}
          title="Accounts"
          pagination
          keyField='email'
          paginationPerPage={5} // Number of rows per page
          paginationRowsPerPageOptions={[5, 10, 20, 50]} // Rows per page options
        />
        <Button color="primary" fullWidth onClick={handleOpenPopupAddAction}>
          Add
        </Button>
      </TableContainer>
    </Container>
  );
}