import React, { useState } from 'react'
import './VerifyEmail.css'
import { useNavigate , useLocation } from 'react-router-dom'
export default function VerifyEmail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const navigate = useNavigate()
  const [otp, setOtp] = useState('');
  const handleSubmit = () => {
    console.log("Email : "+email);
    const url = `http://localhost:8080/user/verify?email=${email}&otp=${otp}`;
    fetch(url, {
      method: 'PUT'
    }).then(response => {
      console.log(response);
    }).then(data => {
      console.log(data);
      navigate("/login");
    })
      .catch(error => {
        // Handle errors, if any
        console.error('Cannot find your email:', error);
        // You can display an error message to the user if needed
      })
  }

  return (
    <div className='verify-container'>
      <div className='verify'>
        <p>Enter your OTP: </p>
        <form className='verify-form' onSubmit={(event) => event.preventDefault()}>
          <input type='text' className='enter-otp' onChange={(event) => setOtp(event.target.value)} />
          <input type='Submit' className='submit-otp' onClick={handleSubmit} />
        </form>
      </div>
    </div>
  )
}
