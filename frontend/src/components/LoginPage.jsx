import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './LoginPage.css'; // Add this CSS file for styling

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both email and password are required');
      setSuccess('');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        email,
        password,
      });

      setError('');
      setSuccess(response.data.message); // Assuming backend sends a success message
      
      localStorage.setItem('authToken', response.data.token);
      navigate('/'); // This will navigate to the homepage

    } catch (error) {
      if (error.response) {
        // Handle error if the response is from the server
        setError(error.response.data.message || 'Something went wrong');
      } else {
        // Handle network or server errors
        setError('Failed to connect to the server. Please try again later.');
      }
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
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
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
