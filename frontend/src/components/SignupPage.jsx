import React, { useState } from 'react';
import './SignupPage.css'; // Add this CSS file for styling

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadhar, setAadhar] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !aadhar) {
      setError('All fields are required');
      setSuccess('');
      return;
    }

    if (aadhar.length !== 12 || isNaN(aadhar)) {
      setError('Aadhar ID must be a 12-digit number');
      setSuccess('');
      return;
    }

    setError('');
    setSuccess('Signup successful!');
  };

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="aadhar">Aadhar ID:</label>
          <input
            type="text"
            id="aadhar"
            value={aadhar}
            onChange={(e) => setAadhar(e.target.value)}
            placeholder="Enter your 12-digit Aadhar ID"
          />
        </div>
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
