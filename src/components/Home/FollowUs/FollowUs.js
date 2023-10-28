import React from 'react'
import './FollowUs.css'

export default function FollowUs() {
  return (
    <div className='follow-us'>
        <p className='title-subscribe'>SUBSCRIBE</p>
        <form className='sign-up'>
            <input type='text' placeholder='Enter your email' className='enter-email'/>
            <input type='submit' className='submit-email' value={"Sign Up"}/>
        </form>
        <div className='follow-title'>FOLLOW US</div>
        <hr width= "25%" align="center" color='#006400' background='transparent' size="10"/> 
        <div className='btn-follow-us'>
            <a href='#' className='link-follow'><img src='assets/images/facebook1.png'/></a>
            <a href='#' className='link-follow'><img src='assets/images/instagram1.png'/></a>
            <a href='#' className='link-follow'><img src='assets/images/tiktok1.png'/></a>
            <a href='#' className='link-follow'><img src='assets/images/youtube1.png'/></a>
        </div>
    </div>
  )
}
