import React from 'react'
import './ForgotPassword.css'

export default function ForgotPassword() {
  return (
    <div className='forgotpw-container'>
      <div className='forgotpw'>
        <p>Enter your email: </p>
        <form className='forgotpw-form'>
          <input type='text' className='enter-email'/>
          <input type='Submit' className='submit-email'/>
        </form>
      </div>
    </div>
  )
}
