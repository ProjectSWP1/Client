import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='bottom-container'>
    <div className='bottom'>
        <div className='top-btn'>
            <Link to={'/'} className='menu-btn'>HOME</Link>
            <Link to={'/login'} className='menu-btn'>LOGIN</Link>
            <Link to={'/register'} className='menu-btn'>MEMBERSHIP</Link>
            <Link to={'/buy-ticket'} className='menu-btn'>BUY TICKET</Link>
        </div>
        <p className='contact-us'>CONTACT US</p>
        <div className='btn-contact-us'>
            <a href='#' className='link-contact'><img src='assets/images/facebook.png'/></a>
            <a href='#' className='link-contact'><img src='assets/images/instagram.png'/></a>
            <a href='#' className='link-contact'><img src='assets/images/tiktok.png'/></a>
            <a href='#' className='link-contact'><img src='assets/images/youtube.png'/></a>
        </div>
        <p className='zookay-park'>THE ZOOKAY PARK</p>
        <p className='address'>Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, 
            <br/>Thành phố Hồ Chí Minh 700000</p>
        <p className='phone-number'>028 7300 5588</p>
        <p className='copyright'>Copyright © 2023 The ZooKay Park - TP.HCM . All Rights Reserved.</p>
    </div>
    </div>
  )
}
