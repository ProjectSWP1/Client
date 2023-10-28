import React, { useState } from 'react';
import './ForgotPassword.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/forgot/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage('An email has been sent to: '+email);
        setShowMessage(true);
      } else {
        setMessage('Cannot find any account with email: '+ email);
        setShowMessage(true);
      }
    } catch (error) {
      console.error('Error sending reset password request: ', error);
      setMessage('An error occurred. Please try again later.');
      setShowMessage(true);
    }
  };

  return (
    <div className="forgotpw-container">
      <div className="forgotpw">
        <p>Enter your email:</p>
        <form className="forgotpw-form" onSubmit={handleSubmit}>
          <input
            type="email"
            className="enter-email"
            value={email}
            onChange={handleEmailChange}
          />
          <input type="submit" className="submit-email" value="Submit" />
        </form>
        {showMessage && <p className="message">{message}</p>}
      </div>
    </div>
  );
}
