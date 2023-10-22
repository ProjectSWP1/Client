import React, { useState } from 'react'
import './VerifyEmail.css'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2';

export default function VerifyEmail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const navigate = useNavigate()
  const [otp, setOtp] = useState('');

  const handleSubmit = () => {
    const url = `http://localhost:8080/user/verify?email=${email}&otp=${otp}`;
    fetch(url, {
      method: 'PUT'
    }).then(response => {
      if (!response.ok) {
        return response.text().then((message) => {
          throw new Error(message);
        });
      }
      return response.text()
    }).then(data => {
      console.log(data);
      if(data == 'Invalid OTP'){
        throw new Error(data)
      }
      navigate('/login')
    })
      .catch(error => {
        Swal.fire({
          title: 'Fail!',
          text: `${error}`,
          icon: 'error',
        });
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
