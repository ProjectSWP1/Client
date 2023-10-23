import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import './ResetPassword.css';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const { token } = useParams();
  const [showForm, setShowForm] = useState(false);
 // Lấy token từ URL
 const tokenFromURL = new URLSearchParams(window.location.search).get('token');
 useEffect(() => {
   
  
    if (tokenFromURL) {
      // Thực hiện kiểm tra token bằng cách gửi yêu cầu đến máy chủ
      fetch(`http://localhost:8080/forgot/check-token?token=${tokenFromURL}`, {
        method: 'POST'
      })
        .then((response) => {
          if (response.status === 200) {
            // Nếu token hợp lệ, hiển thị form reset password
            setShowForm(true);
          } else {
            // Nếu token không hợp lệ, hiển thị thông báo lỗi và chuyển hướng người dùng
            setMessage('Invalid token or your link has expired.');
            setShowMessage(true);
            setTimeout(() => {
              window.location.href = 'http://localhost:3000'; // Thực hiện điều hướng đến localhost:3000
            }, 3000); // Chuyển hướng sau 3 giây
          }
        })
        .catch((error) => {
          console.error('Error checking token: ', error);
          setMessage('An error occurred. Please try again later.');
          setShowMessage(true);
        });
    } else {
      // Nếu không có token trong URL, bạn có thể hiển thị thông báo lỗi khác hoặc xử lý theo cách khác.
      setMessage('Invalid token or your link has expired.');
      setShowMessage(true);
    }
  }, []);
  
  

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Password does not match.');
      setShowMessage(true);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/forgot/reset_password?token=${tokenFromURL}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: password, confirmPassword: confirmPassword }),
      });

      if (response.ok) {
        setMessage('You have changed your password successfully.');
        setShowMessage(true);

        window.location.href = 'http://localhost:3000/login';
      } else {
        throw new Error('An error occurred while resetting the password.');
      }
    } catch (error) {
      console.error('Error when sending reset password request: ', error);
      setMessage('An error occurred. Please try again later.');
      setShowMessage(true);
    }
  };

  return (
    <div className="resetpw-container">
      <div className="resetpw">
        <p className="resetpw-title">Reset your password</p>
        {showForm && (
          <form className="resetpw-form" onSubmit={handleSubmit}>
            <p>Enter new password:</p>
            <input
              type="password"
              className="enter-newpw"
              value={password}
              onChange={handlePasswordChange}
            />
            <p>Confirm new password:</p>
            <input
              type="password"
              className="enter-newpw"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            <input type="submit" value="Reset Password" className="submit-otp" />
          </form>
        )}
        {showMessage && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
