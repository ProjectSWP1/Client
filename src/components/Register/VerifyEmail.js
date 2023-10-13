import './VerifyEmail.css'
import { Button } from '@mui/material'
import SignIn from '../Login/SignIn.js'
import React, { Component } from 'react'

export default class VerifyEmail extends Component {

  render() {
    const { data } = this.props.location.state
    
    console.log(data);
    const handleSubmit = (event) => {
      event.preventDefault()
      if (data.otp == event.target) {
        return <SignIn />
      }
    }
    return (
      <div className='verify-container'>
        <div className='verify'>
          <label id='enterOtp'>Enter your OTP: </label>
          <form className='verify-form'>
            <input id='enterOtp' type='text' className='enter-otp' />
            <input type='Submit' className='submit-otp' />
          </form>
        </div>
      </div>
    )
  }
}

