import React from 'react'
import './Footer.css'

export default function Footer() {
  return (
    <div className='bottom-container'>
    <div className='bottom'>
        <div className='top-btn'>
            <a href='#' className='menu-btn'>HOME</a>
            <a href='#' className='menu-btn'>PLAN THE VISIT</a>
            <a href='#' className='menu-btn'>MEMBERSHIP</a>
            <a href='#' className='menu-btn'>BUY TICKET</a>
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
