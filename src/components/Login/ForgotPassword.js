import React from 'react'
import './ForgotPassword.css'

export default function ForgotPassword() {
  return (
    <div className='forgotpw-container'>
      <div className='forgotpw'>
        <p>Enter your email: </p>
        <form className='forgotpw-form'>
          <input type='text' className='forgotpw-enter-email'/>
          <input type='Submit' className='forgotpw-submit-email'/>
        </form>
      </div>
    </div>
  )
}
