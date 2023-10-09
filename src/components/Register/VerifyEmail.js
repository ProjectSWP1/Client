import React from 'react'
import './VerifyEmail.css'
import { useParams } from 'react-router-dom'

export default function VerifyEmail() {
  let { email } = useParams()
  return (
    <div className='verify-container'>
      <div className='verify'>
        <p>Enter your OTP: </p>
        <form className='verify-form'>
          <input type='text' className='enter-otp'></input>
          <input type='Submit' className='submit-otp'/>
        </form>
      </div>
    </div>
  )
}
