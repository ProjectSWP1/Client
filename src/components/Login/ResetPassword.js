import React from 'react'
import './ResetPassword.css'

export default function ResetPassword() {
  return (
    <div className='resetpw-container'>
      <div className='resetpw'>
        <p className='resetpw-title'>Reset your password</p>
        <form className='resetpw-form'>
          <p>Enter new password: </p>
          <input type='password' className='enter-newpw'/>
          <p style={{paddingTop: '50px'}}>Confirm new password: </p>
          <input type='password' className='enter-newpw'/>
          <input type='submit' value='Reset Password' className='submit-otp'/>
        </form>
      </div>
    </div>
  )
}
