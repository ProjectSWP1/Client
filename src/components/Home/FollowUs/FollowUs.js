import React, { useState } from 'react'
import './FollowUs.css'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'

export default function FollowUs() {
  const [email, setEmail] = useState(null)
  return (
    <div className='follow-us'>
      <p className='title-subscribe'>SUBSCRIBE</p>
      <form className='sign-up'>
        <input onChange={(e) => setEmail(e.target.value)} value={email? email : ""} type='email' placeholder='Enter your email' className='enter-email' />
        <Button variant="contained"
          sx={{ mt: 3, mb: 2, ml: 3, height: '50px'}}
          style={{borderRadius: '5px'}}
          className='submit-email'>
          <Link
            to={email? `/register?email=${email}` : '/register'}
            style={{ textDecoration: "none", color: "white" }}
          >
            Subcribe
          </Link>
        </Button>
        {/* <input onClick={(e) => handleSubmit} type='submit' className='submit-email' value={"Sign Up"}/> */}
      </form>
      <div className='follow-title'>FOLLOW US</div>
      <hr width="25%" align="center" color='#006400' background='transparent' size="10" />
      <div className='btn-follow-us'>
        <a href='#' className='link-follow'><img src='assets/images/facebook1.png' /></a>
        <a href='#' className='link-follow'><img src='assets/images/instagram1.png' /></a>
        <a href='#' className='link-follow'><img src='assets/images/tiktok1.png' /></a>
        <a href='#' className='link-follow'><img src='assets/images/youtube1.png' /></a>
      </div>
    </div>
  )
}
