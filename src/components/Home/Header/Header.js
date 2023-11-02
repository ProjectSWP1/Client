import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { Avatar, Button, Grow, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { getItemWithTimeout } from '../../auth/setTimeOut';
import WorkIcon from '@mui/icons-material/Work';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function Header() {
    const [isAuth, setAuth] = useState(false)
    const [user, setUser] = useState(null)
    // const accessToken = getWithExpiry('token')
    // const accessToken = localStorage.getItem('token')
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        // Thêm một sự kiện lắng nghe cho việc cuộn trang
        window.addEventListener('scroll', handleScroll);

        return () => {
            // Loại bỏ sự kiện lắng nghe khi component bị hủy
            window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    const handleScroll = () => {
        // Kiểm tra xem người dùng đã cuộn xuống đủ xa hay chưa, chẳng hạn 100px.
        if (window.scrollY > 100) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    }


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
        <section className={`slide-down-bar ${isScrolled ? 'visible' : ''}`}>
            <section className="nav-bg">
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
                            <Link to={"/register"} className="nav-menu__link">Membership</Link>
                        </li>
                        <li className="nav-menu__item">
                            <Link to={'/buy-ticket'} className="nav-menu__link">
                                Buy Ticket
                            </Link>
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
                                                        <div style={{marginRight: "10px"}}><AccountBoxIcon/></div>
                                                        <Link to={'/profile'}
                                                            style={{ color: 'black', textDecoration: 'none' }}
                                                        >My Profile</Link>
                                                    </MenuItem>
                                                    {
                                                        user.roles === 'Admin' ? (
                                                            <MenuItem>
                                                                <div style={{marginRight: "10px"}}><WorkIcon/></div>
                                                                <Link to={'/admin'}
                                                                    style={{ color: 'black', textDecoration: 'none' }}
                                                                >My Management</Link>
                                                            </MenuItem>
                                                    ) : user.roles == 'Staff' ? (
                                                            <MenuItem>
                                                                <div style={{marginRight: "10px"}}><WorkIcon/></div>
                                                                <Link to={'/staff'}
                                                                    style={{ color: 'black', textDecoration: 'none' }}
                                                                >My Management</Link>
                                                            </MenuItem>
                                                        ) : user.roles == 'Trainer' ? (
                                                            <MenuItem>
                                                                <div style={{marginRight: "10px"}}><WorkIcon/></div>
                                                                <Link to={'/trainer'}
                                                                    style={{ color: 'black', textDecoration: 'none' }}
                                                                >My Management</Link>
                                                            </MenuItem>
                                                        ) : (
                                                            <MenuItem>
                                                            <div style={{marginRight: "10px"}}><ListAltIcon/></div>
                                                                <Link to={'/trainer'}
                                                                    style={{ color: 'black', textDecoration: 'none' }}
                                                                >My Order</Link>
                                                            </MenuItem>
                                                        )
                                                    }
                                                    <MenuItem onClick={handleClose}>
                                                    <div style={{marginRight: "10px"}}><SettingsIcon/></div>
                                                        Setting
                                                    </MenuItem>
                                                    <MenuItem onClick={handleClose}>
                                                    <div style={{marginRight: "10px"}}><LogoutIcon/></div>
                                                        Logout
                                                    </MenuItem>
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
