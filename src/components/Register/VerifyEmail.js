import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import './VerifyEmail.css'
import { useNavigate, useLocation } from 'react-router-dom'
import Swal from 'sweetalert2';
import { URL_FETCH_AZURE_SERVER } from '../../config';

export default function VerifyEmail() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('email');
  const navigate = useNavigate()
  const [otp, setOtp] = useState('');

  const handleResendClick = () => {
    // Gọi API để gửi lại email với OTP
    const resendUrl = `${URL_FETCH_AZURE_SERVER}user/send-email`;
  
    fetch(resendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email }),
    })
      .then(response => {
        if (!response.ok) {
          return response.text().then((message) => {
            throw new Error(message);
          });
        }
        return response.text()
      })
      .then(data => {
        Swal.fire({
          title: 'Success!',
          text: 'OTP sent successfully.',
          icon: 'success',
        });
      })
      .catch(error => {
        Swal.fire({
          title: 'Fail!',
          text: `${error}`,
          icon: 'error',
        });
      });
  }
  
  const handleSubmit = () => {
    const url = `${URL_FETCH_AZURE_SERVER}user/verify?email=${email}&otp=${otp}`;
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
      if(data === 'Invalid OTP'){
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
        <h2 style={{textAlign:"center",color:"#2e7d32",marginBottom:"20px" }}>Email Verification</h2>
        <div className='otp-text'>
           <p>We have sent the OTP Verification to your email, please check your mail box</p>
           <p>If you don't receive any OTP code, <Link to={`/verifyemail?email=${email}`} onClick={handleResendClick}>click here</Link> to resend</p>
        </div>
        <div className='otp-text1'> <p>Enter your OTP: </p> </div>
        
        <form className='verify-form' onSubmit={(event) => event.preventDefault()}>
          <input type='text' className='enter-otp' onChange={(event) => setOtp(event.target.value)} />
          <input type='Submit' className='submit-otp' onClick={handleSubmit} />
        </form>
      </div>
    </div>
  )
}
