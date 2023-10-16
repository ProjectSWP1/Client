import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { Avatar, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Stack } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import useAuth from '../../auth/auth';
import { checkAndRemoveExpiredData, getItemWithTimeout, getWithExpiry } from '../../auth/setTimeOut';

window.onscroll = function () { scrollFunction() }

function scrollFunction() {
    if (document.body.scroll > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("nav-bg_onscroll").style.opacity = "0.9";
        document.getElementById("nav-bg_onscroll").style.backgroundColor = "#5D9C59";
        document.getElementById("nav-bg_onscroll").style.transition = "0.3s";
    } else {
        document.getElementById("nav-bg_onscroll").style.opacity = "1";
        document.getElementById("nav-bg_onscroll").style.backgroundColor = "";
    }
}

export default function Header() {
    const [isAuth, setAuth] = useState(false)
    const [user, setUser] = useState(null)
    // const accessToken = getWithExpiry('token')
    // const accessToken = localStorage.getItem('token')
    const accessToken = getItemWithTimeout('token')
    useEffect(() => {
        if (accessToken) {
            // login(user, token)
            setAuth(true)
            setUser(JSON.parse(atob(accessToken.split('.')[1])))
        }
    }, [accessToken])   
    console.log(user);
    // Cái này lấy từ auth.js sau khi setAuth bên login
    // const { user, logout } = useAuth();
    // const { token } = useAuth();
    // console.log(user); // in ra để biết có user hay k
    // console.log(token);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }
        setAuth(false);
        localStorage.removeItem('token')
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <section className="container-header">
            <section className="nav-bg" id="nav-bg_onscroll">
                {/* logo */}
                <div className="nav-logo">
                    <a href="#">
                        <img src='assets/images/zookay.png' />
                    </a>
                </div>

                {/* menu */}
                <div className="nav-menu">
                    <ul className="nav-menu__list">
                        <li className="nav-menu__item">
                            <a href="#" className="nav-menu__link">
                                Plan The Visit
                            </a>
                        </li>
                        <li className="nav-menu__item">
                            <Link to={"/register"} className="nav-menu__link">Membership</Link>
                        </li>
                        <li className="nav-menu__item">
                            <a href="#" className="nav-menu__link">
                                Contact Us
                            </a>
                        </li>
                        {isAuth ?
                            <li>
                                <Button
                                    ref={anchorRef}
                                    id="composition-button"
                                    aria-controls={open ? 'composition-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                >
                                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.sub.charAt(0)}{" "}</Avatar>
                                </Button>
                                <Popper
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    placement="bottom-start"
                                    transition
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                        >
                                            <Paper>
                                                {/* <ClickAwayListener onClickAway={handleClose}> */}
                                                    <MenuList
                                                        autoFocusItem={open}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                        onKeyDown={handleListKeyDown}
                                                    >
                                                        <MenuItem>
                                                            <Link to={'/profile'}
                                                                style={{color: 'black', textDecoration: 'none'}}
                                                                >My Profile</Link>
                                                        </MenuItem>
                                                        {
                                                          user.roles === 'Admin' ? (
                                                            <MenuItem>
                                                            <Link to={'/admin'}
                                                                style={{color: 'black', textDecoration: 'none'}}
                                                                >My Management</Link>
                                                            </MenuItem>
                                                          ) : user.roles == 'Staff' ? (
                                                            <MenuItem>
                                                            <Link to={'/staff'}
                                                                style={{color: 'black', textDecoration: 'none'}}
                                                                >My Management</Link>
                                                            </MenuItem>
                                                          ) : user.roles == 'Trainer' ? (
                                                            <MenuItem>
                                                            <Link to={'/trainer'}
                                                                style={{color: 'black', textDecoration: 'none'}}
                                                                >My Management</Link>
                                                            </MenuItem>
                                                          ) : (
                                                            <MenuItem>
                                                            <Link to={'/trainer'}
                                                                style={{color: 'black', textDecoration: 'none'}}
                                                                >My Order</Link>
                                                            </MenuItem>
                                                          )
                                                        }
                                                        <MenuItem onClick={handleClose}>Setting</MenuItem>
                                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                                    </MenuList>
                                                {/* </ClickAwayListener> */}
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </li>
                            : <li className="nav-menu__item">
                                <Link to={"/login"} className="nav-menu__link">Login</Link>
                            </li>}
                    </ul>
                </div>
      </section>
    </section>
  );
}
