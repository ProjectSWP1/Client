import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { Avatar, Button, ClickAwayListener, Grow, MenuItem, MenuList, Paper, Popper, Stack } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import useAuth from '../../auth/auth';

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
    const accessToken = localStorage.getItem('token')
    useEffect(() => {
        if (accessToken) {
            setAuth(true)
        }
    }, [accessToken])

    // Cái này lấy từ auth.js sau khi setAuth bên login
    const { user, logout } = useAuth();
    const { token } = useAuth();
    console.log(user); // in ra để biết có user hay k
    console.log(token);

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
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
                        {user ?
                            <li>
                                <Button
                                    ref={anchorRef}
                                    id="composition-button"
                                    aria-controls={open ? 'composition-menu' : undefined}
                                    aria-expanded={open ? 'true' : undefined}
                                    aria-haspopup="true"
                                    onClick={handleToggle}
                                >
                                    <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.username.charAt(0)}{" "}</Avatar>
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
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList
                                                        autoFocusItem={open}
                                                        id="composition-menu"
                                                        aria-labelledby="composition-button"
                                                        onKeyDown={handleListKeyDown}
                                                    >
                                                        <MenuItem onClick={handleClose}>
                                                            <Link to={'/profile'}
                                                                style={{color: 'black', textDecoration: 'none'}}
                                                                >My Profile</Link>
                                                        </MenuItem>
                                                        {
                                                          user.role.authority === 'Admin' ? (
                                                            <MenuItem onClick={handleClose}>
                                                            <Link to={'/admin'}
                                                                style={{color: 'black', textDecoration: 'none'}}
                                                                >My Management</Link>
                                                            </MenuItem>
                                                          ) : user.role.authority == 'Staff' ? (
                                                            <MenuItem onClick={handleClose}>
                                                            <Link to={'/staff'}
                                                                style={{color: 'black', textDecoration: 'none'}}
                                                                >My Management</Link>
                                                            </MenuItem>
                                                          ) : user.role.authority == 'Trainer' ? (
                                                            <MenuItem onClick={handleClose}>
                                                            <Link to={'/trainer'}
                                                                style={{color: 'black', textDecoration: 'none'}}
                                                                >My Management</Link>
                                                            </MenuItem>
                                                          ) : (
                                                            <MenuItem onClick={handleClose}>
                                                            <Link to={'/trainer'}
                                                                style={{color: 'black', textDecoration: 'none'}}
                                                                >My Order</Link>
                                                            </MenuItem>
                                                          )
                                                        }
                                                        <MenuItem onClick={handleClose}>Setting</MenuItem>
                                                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                                                    </MenuList>
                                                </ClickAwayListener>
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
